import type { IAIProvider } from './interfaces/ai-provider.interface';
import type { AIProviderName } from '@/lib/shared-types';
import { OpenAIProvider } from './providers/openai.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { GroqProvider } from './providers/groq.provider';

const providerRegistry: Record<AIProviderName, () => IAIProvider> = {
  openai: () => new OpenAIProvider(),
  anthropic: () => new AnthropicProvider(),
  gemini: () => new GeminiProvider(),
  groq: () => new GroqProvider(),
};

export class AIProviderFactory {
  static create(name: AIProviderName): IAIProvider {
    const factory = providerRegistry[name];
    if (!factory) {
      throw new Error(`Unknown AI provider: ${name}`);
    }
    return factory();
  }

  static getAvailableProviders(): AIProviderName[] {
    return Object.keys(providerRegistry) as AIProviderName[];
  }
}
