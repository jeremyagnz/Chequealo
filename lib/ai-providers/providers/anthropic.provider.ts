import Anthropic from '@anthropic-ai/sdk';
import type { IAIProvider } from '../interfaces/ai-provider.interface';
import type { AIAnalysisRequest, AIAnalysisResult, AIProviderConfig } from '@/lib/shared-types';

const SYSTEM_PROMPT = `You are a fact-checking expert. Analyze the claim using the evidence provided.
Respond ONLY with JSON: {"verdict":"TRUE|FALSE|MISLEADING|UNVERIFIED","explanation":"...","confidence":0.0-1.0}`;

export class AnthropicProvider implements IAIProvider {
  readonly name = 'anthropic' as const;

  async analyze(request: AIAnalysisRequest, config: AIProviderConfig): Promise<AIAnalysisResult> {
    const client = new Anthropic({ apiKey: config.apiKey });

    const message = await client.messages.create({
      model: config.model ?? 'claude-3-haiku-20240307',
      max_tokens: config.maxTokens ?? 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Claim: "${request.claim}"\n\nEvidence:\n${request.evidence}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected Anthropic response type');
    }

    const raw = JSON.parse(content.text) as {
      verdict: AIAnalysisResult['verdict'];
      explanation: string;
      confidence: number;
    };

    return {
      provider: this.name,
      verdict: raw.verdict ?? 'UNVERIFIED',
      explanation: raw.explanation ?? '',
      confidence: raw.confidence ?? 0,
      tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
    };
  }

  async isAvailable(config: AIProviderConfig): Promise<boolean> {
    try {
      const client = new Anthropic({ apiKey: config.apiKey });
      await client.models.list();
      return true;
    } catch {
      return false;
    }
  }
}
