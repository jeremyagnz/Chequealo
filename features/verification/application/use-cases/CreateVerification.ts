import { db } from '@/lib/database';
import { verifications } from '@/lib/database/schema';
import { settings } from '@/lib/database/schema';
import { SearchFactory } from '@/lib/search-engine';
import { AIProviderFactory } from '@/lib/ai-providers';
import { CredibilityEngine } from '@/lib/credibility-engine';
import type { CreateVerificationInput, AIProviderName } from '@/lib/shared-types';
import type { SearchProviderName } from '@/lib/search-engine/interfaces/search-provider.interface';
import { createId } from '@paralleldrive/cuid2';
import { and, eq } from 'drizzle-orm';

const SEARCH_PROVIDER_ENV_KEYS: Record<SearchProviderName, string> = {
  serper: 'SERPER_API_KEY',
  brave: 'BRAVE_SEARCH_API_KEY',
  tavily: 'TAVILY_API_KEY',
};

const AI_PROVIDER_ENV_KEYS: Record<AIProviderName, string> = {
  openai: 'OPENAI_API_KEY',
  anthropic: 'ANTHROPIC_API_KEY',
  gemini: 'GEMINI_API_KEY',
  groq: 'GROQ_API_KEY',
};

function isSearchProviderName(value: string | undefined): value is SearchProviderName {
  return value === 'serper' || value === 'brave' || value === 'tavily';
}

function isAIProviderName(value: string | undefined): value is AIProviderName {
  return value === 'openai' || value === 'anthropic' || value === 'gemini' || value === 'groq';
}

export class CreateVerification {
  async execute(input: CreateVerificationInput): Promise<{ jobId: string }> {
    const id = createId();

    await db.insert(verifications).values({
      id,
      tenantId: input.tenantId,
      userId: input.userId,
      claim: input.claim,
      status: 'pending',
    });

    void this.processVerification({
      verificationId: id,
      claim: input.claim,
      tenantId: input.tenantId,
      userId: input.userId,
    });

    return { jobId: id };
  }

  private async processVerification(input: {
    verificationId: string;
    claim: string;
    tenantId: string;
    userId: string;
  }): Promise<void> {
    try {
      await db
        .update(verifications)
        .set({ status: 'processing', updatedAt: new Date() })
        .where(eq(verifications.id, input.verificationId));

      const userSettings = await db.query.settings.findFirst({
        where: and(eq(settings.userId, input.userId), eq(settings.tenantId, input.tenantId)),
      });

      const requestedSearchProvider = isSearchProviderName(userSettings?.preferredSearchProvider)
        ? userSettings.preferredSearchProvider
        : undefined;
      const searchProvider = this.resolveSearchProvider(requestedSearchProvider);
      const searchProviderInstance = SearchFactory.create(searchProvider.name);
      const evidence = await searchProviderInstance.search(
        {
          query: input.claim,
          maxResults: 5,
          language: userSettings?.language ?? 'en',
        },
        { apiKey: searchProvider.apiKey },
      );

      const requestedAIProvider = isAIProviderName(userSettings?.preferredAIProvider)
        ? userSettings.preferredAIProvider
        : undefined;
      const aiProvider = this.resolveAIProvider(requestedAIProvider);
      const aiProviderInstance = AIProviderFactory.create(aiProvider.name);
      const aiResponse = await aiProviderInstance.analyze(
        {
          claim: input.claim,
          evidence: evidence
            .map((item, idx) => `${idx + 1}. ${item.title}\n${item.snippet}\n${item.url}`)
            .join('\n\n'),
          language: userSettings?.language ?? 'en',
        },
        { apiKey: aiProvider.apiKey },
      );

      const credibility = new CredibilityEngine().compute(evidence, [aiResponse]);

      await db
        .update(verifications)
        .set({
          status: 'completed',
          credibilityScore: credibility.score,
          verdict: credibility.verdict,
          evidence,
          aiResponses: [aiResponse],
          updatedAt: new Date(),
        })
        .where(eq(verifications.id, input.verificationId));
    } catch (err) {
      try {
        await db
          .update(verifications)
          .set({ status: 'failed', updatedAt: new Date() })
          .where(eq(verifications.id, input.verificationId));
      } catch {
        // Ignore: if we can't mark it failed, there's nothing actionable to do here.
      }
    }
  }

  private resolveSearchProvider(preferred?: SearchProviderName): { name: SearchProviderName; apiKey: string } {
    if (preferred) {
      const preferredKey = process.env[SEARCH_PROVIDER_ENV_KEYS[preferred]];
      if (preferredKey) {
        return { name: preferred, apiKey: preferredKey };
      }
    }

    const fallback = (SearchFactory.getAvailableProviders() as SearchProviderName[]).find((provider) => {
      const key = process.env[SEARCH_PROVIDER_ENV_KEYS[provider]];
      return Boolean(key);
    });

    if (!fallback) {
      throw new Error('No search provider API key configured');
    }

    return { name: fallback, apiKey: process.env[SEARCH_PROVIDER_ENV_KEYS[fallback]] as string };
  }

  private resolveAIProvider(preferred?: AIProviderName): { name: AIProviderName; apiKey: string } {
    if (preferred) {
      const preferredKey = process.env[AI_PROVIDER_ENV_KEYS[preferred]];
      if (preferredKey) {
        return { name: preferred, apiKey: preferredKey };
      }
    }

    const fallback = (AIProviderFactory.getAvailableProviders() as AIProviderName[]).find((provider) => {
      const key = process.env[AI_PROVIDER_ENV_KEYS[provider]];
      return Boolean(key);
    });

    if (!fallback) {
      throw new Error('No AI provider API key configured');
    }

    return { name: fallback, apiKey: process.env[AI_PROVIDER_ENV_KEYS[fallback]] as string };
  }
}
