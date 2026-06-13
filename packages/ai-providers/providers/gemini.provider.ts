import { GoogleGenerativeAI } from '@google/generative-ai';
import type { IAIProvider } from '../interfaces/ai-provider.interface';
import type { AIAnalysisRequest, AIAnalysisResult, AIProviderConfig } from '@chequealo/shared-types';

const PROMPT_PREFIX = `You are a fact-checking expert. Analyze the claim using the evidence provided.
Respond ONLY with JSON: {"verdict":"TRUE|FALSE|MISLEADING|UNVERIFIED","explanation":"...","confidence":0.0-1.0}

`;

export class GeminiProvider implements IAIProvider {
  readonly name = 'gemini' as const;

  async analyze(request: AIAnalysisRequest, config: AIProviderConfig): Promise<AIAnalysisResult> {
    const client = new GoogleGenerativeAI(config.apiKey);
    const model = client.getGenerativeModel({ model: config.model ?? 'gemini-1.5-flash' });

    const prompt = `${PROMPT_PREFIX}Claim: "${request.claim}"\n\nEvidence:\n${request.evidence}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse Gemini response as JSON');
    }

    const raw = JSON.parse(jsonMatch[0]) as {
      verdict: AIAnalysisResult['verdict'];
      explanation: string;
      confidence: number;
    };

    return {
      provider: this.name,
      verdict: raw.verdict ?? 'UNVERIFIED',
      explanation: raw.explanation ?? '',
      confidence: raw.confidence ?? 0,
    };
  }

  async isAvailable(config: AIProviderConfig): Promise<boolean> {
    try {
      const client = new GoogleGenerativeAI(config.apiKey);
      const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
      await model.generateContent('ping');
      return true;
    } catch {
      return false;
    }
  }
}
