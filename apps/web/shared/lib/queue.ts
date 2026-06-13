import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import type { VerificationJobPayload } from '@chequealo/shared-types';

let connection: IORedis | undefined;

function getConnection(): IORedis {
  if (!connection) {
    connection = new IORedis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
    });
  }
  return connection;
}

let _verificationQueue: Queue<VerificationJobPayload> | undefined;

export function getVerificationQueue(): Queue<VerificationJobPayload> {
  if (!_verificationQueue) {
    _verificationQueue = new Queue<VerificationJobPayload>('verification', {
      connection: getConnection(),
    });
  }
  return _verificationQueue;
}

export const verificationQueue = getVerificationQueue();
