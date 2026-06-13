import type { EvidenceItem } from '@/lib/shared-types';

export interface SearchQuery {
  query: string;
  maxResults?: number;
}

export interface ISearchProvider {
  search(query: SearchQuery): Promise<EvidenceItem[]>;
}
