import { Worker, type Job } from 'bullmq';
import { connection } from '../queues/verification.queue';
import { SEARCH_QUEUE_NAME } from '../queues/search.queue';
import { SearchFactory } from '@chequealo/search-engine';

interface SearchJobPayload {
  query: string;
  maxResults?: number;
}

async function processSearch(job: Job<SearchJobPayload>): Promise<void> {
  const searchProvider = SearchFactory.create('serper');
  await searchProvider.search(
    { query: job.data.query, maxResults: job.data.maxResults ?? 5 },
    { apiKey: process.env.SERPER_API_KEY ?? '' },
  );
}

export function createSearchWorker(): Worker {
  return new Worker<SearchJobPayload>(
    SEARCH_QUEUE_NAME,
    processSearch,
    { connection, concurrency: 5 },
  );
}
