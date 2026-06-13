import { Queue } from 'bullmq';
import type { VerificationJobPayload } from '@chequealo/shared-types';

type VerificationQueue = Queue<VerificationJobPayload, void, 'verify'>;

function createVerificationQueue(): VerificationQueue {
  return new Queue<VerificationJobPayload, void, 'verify'>('verification', {
    connection: {
      url: process.env.REDIS_URL ?? 'redis://localhost:6379',
      maxRetriesPerRequest: null,
    },
  });
}

let _verificationQueue: VerificationQueue | undefined;

export function getVerificationQueue(): VerificationQueue {
  if (!_verificationQueue) {
    _verificationQueue = createVerificationQueue();
  }
  return _verificationQueue;
}

export const isQueueConfigured = Boolean(process.env.REDIS_URL);
