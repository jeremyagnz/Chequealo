import type { ISearchProvider, SearchProviderName } from './interfaces/search-provider.interface';
import { SerperProvider } from './providers/serper.provider';
import { BraveSearchProvider } from './providers/brave.provider';
import { TavilyProvider } from './providers/tavily.provider';

const searchRegistry: Record<SearchProviderName, () => ISearchProvider> = {
  serper: () => new SerperProvider(),
  brave: () => new BraveSearchProvider(),
  tavily: () => new TavilyProvider(),
};

export class SearchFactory {
  static create(name: SearchProviderName): ISearchProvider {
    const factory = searchRegistry[name];
    if (!factory) {
      throw new Error(`Unknown search provider: ${name}`);
    }
    return factory();
  }

  static getAvailableProviders(): SearchProviderName[] {
    return Object.keys(searchRegistry) as SearchProviderName[];
  }
}
