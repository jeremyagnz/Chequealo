import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db, isDatabaseConfigured } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const record = await db.query.verifications.findFirst({
    where: and(
      eq(verifications.id, params.id),
      eq(verifications.userId, session.user.id!),
    ),
  });

  if (!record) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(record);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json({ success: true, databaseDisabled: true });
  }

  await db
    .delete(verifications)
    .where(
      and(
        eq(verifications.id, params.id),
        eq(verifications.userId, session.user.id!),
      ),
    );

  return NextResponse.json({ success: true });
}
