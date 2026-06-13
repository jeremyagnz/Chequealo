import { Worker, type Job } from 'bullmq';
import { connection, VERIFICATION_QUEUE_NAME } from '../queues/verification.queue';
import type { VerificationJobPayload } from '@chequealo/shared-types';
import { AIProviderFactory } from '@chequealo/ai-providers';

async function processAI(job: Job<VerificationJobPayload>): Promise<void> {
  const { claim } = job.data;
  const aiProvider = AIProviderFactory.create('openai');
  await aiProvider.analyze(
    { claim, evidence: '' },
    { apiKey: process.env.OPENAI_API_KEY ?? '' },
  );
}

export function createAIWorker(): Worker {
  return new Worker<VerificationJobPayload>(
    `${VERIFICATION_QUEUE_NAME}:ai`,
    processAI,
    { connection, concurrency: 3 },
  );
}
