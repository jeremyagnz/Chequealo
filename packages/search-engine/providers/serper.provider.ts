import type { EvidenceItem } from '@chequealo/shared-types';
import type { ISearchProvider, SearchQuery, SearchProviderConfig } from '../interfaces/search-provider.interface';

interface SerperOrganicResult {
  title: string;
  link: string;
  snippet: string;
  date?: string;
  source?: string;
}

export class SerperProvider implements ISearchProvider {
  readonly name = 'serper' as const;
  private readonly baseUrl = 'https://google.serper.dev/search';

  async search(query: SearchQuery, config: SearchProviderConfig): Promise<EvidenceItem[]> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'X-API-KEY': config.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: query.query,
        num: query.maxResults ?? 5,
        hl: query.language ?? 'en',
      }),
    });

    if (!response.ok) {
      throw new Error(`Serper API error: ${response.statusText}`);
    }

    const data = (await response.json()) as { organic: SerperOrganicResult[] };

    return (data.organic ?? []).map((item) => ({
      url: item.link,
      title: item.title,
      snippet: item.snippet,
      publishedAt: item.date,
      source: item.source ?? new URL(item.link).hostname,
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
