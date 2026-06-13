import type { AIAnalysisRequest, AIAnalysisResult, AIProviderConfig } from '@chequealo/shared-types';

export interface IAIProvider {
  analyze(request: AIAnalysisRequest, config: AIProviderConfig): Promise<AIAnalysisResult>;
}
