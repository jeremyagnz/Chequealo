import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '20');
  const offset = (page - 1) * limit;

  const results = await db
    .select()
    .from(verifications)
    .where(eq(verifications.userId, session.user.id!))
    .orderBy(desc(verifications.createdAt))
    .limit(limit)
    .offset(offset);

  return NextResponse.json({ data: results, page, limit });
}
