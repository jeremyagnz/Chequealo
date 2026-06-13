import { db } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { verificationQueue } from '@/shared/lib/queue';
import { createId } from '@paralleldrive/cuid2';
// @paralleldrive/cuid2 is provided by @chequealo/database
export class CreateVerification {
    async execute(input) {
        const id = createId();
        await db.insert(verifications).values({
            id,
            tenantId: input.tenantId,
            userId: input.userId,
            claim: input.claim,
            status: 'pending',
        });
        await verificationQueue.add('verify', {
            verificationId: id,
            claim: input.claim,
            tenantId: input.tenantId,
            userId: input.userId,
        });
        return { jobId: id };
    }
}
