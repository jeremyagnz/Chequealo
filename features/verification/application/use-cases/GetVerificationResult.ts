import { db } from '@/lib/database';
import { verifications } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';
import type { VerificationRecord } from '@/lib/database/schema';

export class GetVerificationResult {
  async execute(verificationId: string): Promise<VerificationRecord | null> {
    const record = await db.query.verifications.findFirst({
      where: eq(verifications.id, verificationId),
    });

    return record ?? null;
  }
}
