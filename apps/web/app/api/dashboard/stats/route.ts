import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq, count, sql } from 'drizzle-orm';

export async function GET(_request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [totalResult] = await db
    .select({ total: count() })
    .from(verifications)
    .where(eq(verifications.userId, session.user.id!));

  const verdictBreakdown = await db
    .select({
      verdict: verifications.verdict,
      count: count(),
    })
    .from(verifications)
    .where(eq(verifications.userId, session.user.id!))
    .groupBy(verifications.verdict);

  return NextResponse.json({
    total: totalResult?.total ?? 0,
    verdictBreakdown,
  });
}
