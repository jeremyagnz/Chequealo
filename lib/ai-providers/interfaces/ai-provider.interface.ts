import type { AIAnalysisRequest, AIAnalysisResult, AIProviderConfig, AIProviderName } from '@/lib/shared-types';

export interface IAIProvider {
  readonly name: AIProviderName;
  analyze(request: AIAnalysisRequest, config: AIProviderConfig): Promise<AIAnalysisResult>;
  isAvailable(config: AIProviderConfig): Promise<boolean>;
}
