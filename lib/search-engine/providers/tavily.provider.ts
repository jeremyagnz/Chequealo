import type { EvidenceItem } from '@/lib/shared-types';
import type { ISearchProvider, SearchQuery, SearchProviderConfig } from '../interfaces/search-provider.interface';

interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  published_date?: string;
}

export class TavilyProvider implements ISearchProvider {
  readonly name = 'tavily' as const;
  private readonly baseUrl = 'https://api.tavily.com/search';

  async search(query: SearchQuery, config: SearchProviderConfig): Promise<EvidenceItem[]> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `******`,
      },
      body: JSON.stringify({
        query: query.query,
        max_results: query.maxResults ?? 5,
        search_depth: 'basic',
        include_answer: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.statusText}`);
    }

    const data = (await response.json()) as { results: TavilySearchResult[] };

    return (data.results ?? []).map((item) => ({
      url: item.url,
      title: item.title,
      snippet: item.content,
      publishedAt: item.published_date,
      source: new URL(item.url).hostname,
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
