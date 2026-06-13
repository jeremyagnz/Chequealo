import { db } from '@/lib/database';
import { verifications } from '@/lib/database/schema';
import { eq, and, desc } from 'drizzle-orm';
import type { VerificationRecord } from '@/lib/database/schema';

export class VerificationRepository {
  async findById(id: string): Promise<VerificationRecord | null> {
    const record = await db.query.verifications.findFirst({
      where: eq(verifications.id, id),
    });
    return record ?? null;
  }

  async findByUserId(userId: string, limit = 20, offset = 0): Promise<VerificationRecord[]> {
    return db
      .select()
      .from(verifications)
      .where(eq(verifications.userId, userId))
      .orderBy(desc(verifications.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async deleteById(id: string, userId: string): Promise<void> {
    await db
      .delete(verifications)
      .where(and(eq(verifications.id, id), eq(verifications.userId, userId)));
  }
}
