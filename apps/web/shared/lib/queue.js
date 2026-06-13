import { Queue } from 'bullmq';
function createVerificationQueue() {
    var _a;
    return new Queue('verification', {
        connection: {
            url: (_a = process.env.REDIS_URL) !== null && _a !== void 0 ? _a : 'redis://localhost:6379',
            maxRetriesPerRequest: null,
        },
    });
}
let _verificationQueue;
export function getVerificationQueue() {
    if (!_verificationQueue) {
        _verificationQueue = createVerificationQueue();
    }
    return _verificationQueue;
}
export const verificationQueue = getVerificationQueue();
