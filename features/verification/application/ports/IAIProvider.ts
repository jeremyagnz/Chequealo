import type { AIAnalysisRequest, AIAnalysisResult, AIProviderConfig } from '@/lib/shared-types';

export interface IAIProvider {
  analyze(request: AIAnalysisRequest, config: AIProviderConfig): Promise<AIAnalysisResult>;
}
