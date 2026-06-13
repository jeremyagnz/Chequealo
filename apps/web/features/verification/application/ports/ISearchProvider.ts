import type { EvidenceItem } from '@chequealo/shared-types';

export interface SearchQuery {
  query: string;
  maxResults?: number;
}

export interface ISearchProvider {
  search(query: SearchQuery): Promise<EvidenceItem[]>;
}
