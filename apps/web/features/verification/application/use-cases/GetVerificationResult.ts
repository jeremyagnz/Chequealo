import { db } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';
import type { VerificationRecord } from '@chequealo/database/schema';

export class GetVerificationResult {
  async execute(verificationId: string): Promise<VerificationRecord | null> {
    const record = await db.query.verifications.findFirst({
      where: eq(verifications.id, verificationId),
    });

    return record ?? null;
  }
}
