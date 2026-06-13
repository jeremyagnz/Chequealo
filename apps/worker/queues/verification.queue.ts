import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import type { VerificationJobPayload } from '@chequealo/shared-types';

const connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const VERIFICATION_QUEUE_NAME = 'verification';

export const verificationQueue = new Queue<VerificationJobPayload>(VERIFICATION_QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 500 },
  },
});

export { connection };
