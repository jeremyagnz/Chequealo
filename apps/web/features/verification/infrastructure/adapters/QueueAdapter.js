import { verificationQueue } from '@/shared/lib/queue';
export class QueueAdapter {
    async enqueueVerification(payload) {
        var _a;
        const job = await verificationQueue.add('verify', payload, {
            jobId: payload.verificationId,
        });
        return (_a = job.id) !== null && _a !== void 0 ? _a : payload.verificationId;
    }
    async getJobStatus(jobId) {
        const job = await verificationQueue.getJob(jobId);
        if (!job)
            return null;
        const state = await job.getState();
        return state;
    }
}
