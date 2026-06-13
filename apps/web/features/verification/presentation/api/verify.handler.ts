import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { isDatabaseConfigured } from '@chequealo/database';
import { CreateVerification } from '../../application/use-cases/CreateVerification';

const createVerification = new CreateVerification();

export async function verifyHandler(request: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json(
      { error: 'Verification is temporarily unavailable while the database is disabled.' },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { claim?: string };
  if (!body.claim?.trim()) {
    return NextResponse.json({ error: 'claim is required' }, { status: 400 });
  }

  const { jobId } = await createVerification.execute({
    claim: body.claim.trim(),
    tenantId: session.user.tenantId!,
    userId: session.user.id!,
  });

  return NextResponse.json({ jobId }, { status: 202 });
}
