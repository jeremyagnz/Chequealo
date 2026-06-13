import Groq from 'groq-sdk';
import type { IAIProvider } from '../interfaces/ai-provider.interface';
import type { AIAnalysisRequest, AIAnalysisResult, AIProviderConfig } from '@chequealo/shared-types';

const SYSTEM_PROMPT = `You are a fact-checking expert. Analyze the claim using the evidence provided.
Respond ONLY with JSON: {"verdict":"TRUE|FALSE|MISLEADING|UNVERIFIED","explanation":"...","confidence":0.0-1.0}`;

export class GroqProvider implements IAIProvider {
  readonly name = 'groq' as const;

  async analyze(request: AIAnalysisRequest, config: AIProviderConfig): Promise<AIAnalysisResult> {
    const client = new Groq({ apiKey: config.apiKey });

    const completion = await client.chat.completions.create({
      model: config.model ?? 'llama3-8b-8192',
      max_tokens: config.maxTokens ?? 1024,
      temperature: config.temperature ?? 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Claim: "${request.claim}"\n\nEvidence:\n${request.evidence}`,
        },
      ],
    });

    const raw = JSON.parse(completion.choices[0].message.content ?? '{}') as {
      verdict: AIAnalysisResult['verdict'];
      explanation: string;
      confidence: number;
    };

    return {
      provider: this.name,
      verdict: raw.verdict ?? 'UNVERIFIED',
      explanation: raw.explanation ?? '',
      confidence: raw.confidence ?? 0,
      tokensUsed: completion.usage?.total_tokens,
    };
  }

  async isAvailable(config: AIProviderConfig): Promise<boolean> {
    try {
      const client = new Groq({ apiKey: config.apiKey });
      await client.models.list();
      return true;
    } catch {
      return false;
    }
  }
}
