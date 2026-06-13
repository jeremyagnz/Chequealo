import { NextRequest, NextResponse } from 'next/server';
import { db, isDatabaseConfigured } from '@/lib/database';
import { verifications } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  _request: NextRequest,
  { params }: { params: { jobId: string } },
) {
  if (!isDatabaseConfigured) {
    return NextResponse.json(
      { error: 'Verification is temporarily unavailable while the database is disabled.' },
      { status: 503 },
    );
  }

  const verification = await db.query.verifications.findFirst({
    where: eq(verifications.id, params.jobId),
  });

  if (!verification) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(verification);
}
