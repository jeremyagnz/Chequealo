import { getVerificationQueue } from '@/shared/lib/queue';
import type { VerificationJobPayload } from '@/lib/shared-types';

export class QueueAdapter {
  async enqueueVerification(payload: VerificationJobPayload): Promise<string> {
    const job = await getVerificationQueue().add('verify', payload, {
      jobId: payload.verificationId,
    });
    return job.id ?? payload.verificationId;
  }

  async getJobStatus(jobId: string): Promise<string | null> {
    const job = await getVerificationQueue().getJob(jobId);
    if (!job) return null;
    const state = await job.getState();
    return state;
  }
}
