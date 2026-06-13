import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db, isDatabaseConfigured } from '@/lib/database';
import { verifications } from '@/lib/database/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '20');
  const offset = (page - 1) * limit;

  if (!isDatabaseConfigured) {
    return NextResponse.json({ data: [], page, limit, databaseDisabled: true });
  }

  const results = await db
    .select()
    .from(verifications)
    .where(eq(verifications.userId, session.user.id!))
    .orderBy(desc(verifications.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({ data: results, page, limit });
}
