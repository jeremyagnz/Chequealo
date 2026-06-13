import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db, isDatabaseConfigured } from '@chequealo/database';
import { settings } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json({ databaseDisabled: true });
  }

  const userSettings = await db.query.settings.findFirst({
    where: eq(settings.userId, session.user.id!),
  });

  return NextResponse.json(userSettings ?? {});
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isDatabaseConfigured) {
    return NextResponse.json({ success: true, databaseDisabled: true });
  }

  const body = (await request.json()) as Partial<{
    preferredAIProvider: string;
    preferredSearchProvider: string;
    language: string;
  }>;

  const existing = await db.query.settings.findFirst({
    where: eq(settings.userId, session.user.id!),
  });

  if (existing) {
    await db
      .update(settings)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(settings.id, existing.id));
  } else {
    await db.insert(settings).values({
      userId: session.user.id!,
      tenantId: session.user.tenantId!,
      ...body,
    });
  }

  return NextResponse.json({ success: true });
}
