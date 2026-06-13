import type { EvidenceItem } from '@chequealo/shared-types';
import type { ISearchProvider, SearchQuery, SearchProviderConfig } from '../interfaces/search-provider.interface';

interface BraveWebResult {
  title: string;
  url: string;
  description: string;
  age?: string;
  meta_url?: { hostname: string };
}

export class BraveSearchProvider implements ISearchProvider {
  readonly name = 'brave' as const;
  private readonly baseUrl = 'https://api.search.brave.com/res/v1/web/search';

  async search(query: SearchQuery, config: SearchProviderConfig): Promise<EvidenceItem[]> {
    const params = new URLSearchParams({
      q: query.query,
      count: String(query.maxResults ?? 5),
      search_lang: query.language ?? 'en',
    });

    const response = await fetch(`${this.baseUrl}?${params}`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': config.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Brave Search API error: ${response.statusText}`);
    }

    const data = (await response.json()) as { web?: { results: BraveWebResult[] } };

    return (data.web?.results ?? []).map((item) => ({
      url: item.url,
      title: item.title,
      snippet: item.description,
      publishedAt: item.age,
      source: item.meta_url?.hostname ?? new URL(item.url).hostname,
    }));
  }

  async isAvailable(config: SearchProviderConfig): Promise<boolean> {
    try {
      await this.search({ query: 'test', maxResults: 1 }, config);
      return true;
    } catch {
      return false;
    }
  }
}
