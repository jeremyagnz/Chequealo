import { db } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';
export class GetVerificationResult {
    async execute(verificationId) {
        const record = await db.query.verifications.findFirst({
            where: eq(verifications.id, verificationId),
        });
        return record !== null && record !== void 0 ? record : null;
    }
}
