export type AIProviderName = 'openai' | 'anthropic' | 'gemini' | 'groq';

export interface AIAnalysisRequest {
  claim: string;
  evidence: string;
  language?: string;
}

export interface AIAnalysisResult {
  provider: AIProviderName;
  verdict: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';
  explanation: string;
  confidence: number;
  tokensUsed?: number;
}

export interface AIProviderConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}
