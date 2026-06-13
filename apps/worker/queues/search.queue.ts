import { Queue } from 'bullmq';
import { connection } from './verification.queue';

export const SEARCH_QUEUE_NAME = 'search';

export const searchQueue = new Queue(SEARCH_QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: { count: 500 },
    removeOnFail: { count: 200 },
  },
});
