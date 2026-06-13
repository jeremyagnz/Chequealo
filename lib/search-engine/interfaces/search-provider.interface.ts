import type { EvidenceItem } from '@/lib/shared-types';

export type SearchProviderName = 'serper' | 'brave' | 'tavily';

export interface SearchQuery {
  query: string;
  maxResults?: number;
  language?: string;
}

export interface SearchProviderConfig {
  apiKey: string;
}

export interface ISearchProvider {
  readonly name: SearchProviderName;
  search(query: SearchQuery, config: SearchProviderConfig): Promise<EvidenceItem[]>;
  isAvailable(config: SearchProviderConfig): Promise<boolean>;
}
