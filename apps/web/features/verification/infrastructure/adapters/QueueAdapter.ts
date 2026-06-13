import { verificationQueue } from '@/shared/lib/queue';
import type { VerificationJobPayload } from '@chequealo/shared-types';

export class QueueAdapter {
  async enqueueVerification(payload: VerificationJobPayload): Promise<string> {
    const job = await verificationQueue.add('verify', payload, {
      jobId: payload.verificationId,
    });
    return job.id ?? payload.verificationId;
  }

  async getJobStatus(jobId: string): Promise<string | null> {
    const job = await verificationQueue.getJob(jobId);
    if (!job) return null;
    const state = await job.getState();
    return state;
  }
}
