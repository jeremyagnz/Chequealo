import { db } from '@/lib/database';
import { verifications } from '@/lib/database/schema';
import { getVerificationQueue } from '@/shared/lib/queue';
import type { CreateVerificationInput, Verification } from '@/lib/shared-types';
import { createId } from '@paralleldrive/cuid2';

export class CreateVerification {
  async execute(input: CreateVerificationInput): Promise<{ jobId: string }> {
    const id = createId();

    await db.insert(verifications).values({
      id,
      tenantId: input.tenantId,
      userId: input.userId,
      claim: input.claim,
      status: 'pending',
    });

    await getVerificationQueue().add('verify', {
      verificationId: id,
      claim: input.claim,
      tenantId: input.tenantId,
      userId: input.userId,
    });

    return { jobId: id };
  }
}
