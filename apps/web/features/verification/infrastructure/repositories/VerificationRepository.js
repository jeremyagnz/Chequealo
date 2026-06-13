import { db } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq, and, desc } from 'drizzle-orm';
export class VerificationRepository {
    async findById(id) {
        const record = await db.query.verifications.findFirst({
            where: eq(verifications.id, id),
        });
        return record !== null && record !== void 0 ? record : null;
    }
    async findByUserId(userId, limit = 20, offset = 0) {
        return db
            .select()
            .from(verifications)
            .where(eq(verifications.userId, userId))
            .orderBy(desc(verifications.createdAt))
            .limit(limit)
            .offset(offset);
    }
    async deleteById(id, userId) {
        await db
            .delete(verifications)
            .where(and(eq(verifications.id, id), eq(verifications.userId, userId)));
    }
}
