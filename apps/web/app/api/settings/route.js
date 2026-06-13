import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db, isDatabaseConfigured } from '@chequealo/database';
import { settings } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';
export async function GET(_request) {
    const session = await auth();
    if (!(session === null || session === void 0 ? void 0 : session.user)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!isDatabaseConfigured) {
        return NextResponse.json({ databaseDisabled: true });
    }
    const userSettings = await db.query.settings.findFirst({
        where: eq(settings.userId, session.user.id),
    });
    return NextResponse.json(userSettings !== null && userSettings !== void 0 ? userSettings : {});
}
export async function PATCH(request) {
    const session = await auth();
    if (!(session === null || session === void 0 ? void 0 : session.user)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!isDatabaseConfigured) {
        return NextResponse.json({ success: true, databaseDisabled: true });
    }
    const body = (await request.json());
    const existing = await db.query.settings.findFirst({
        where: eq(settings.userId, session.user.id),
    });
    if (existing) {
        await db
            .update(settings)
            .set(Object.assign(Object.assign({}, body), { updatedAt: new Date() }))
            .where(eq(settings.id, existing.id));
    }
    else {
        await db.insert(settings).values(Object.assign({ userId: session.user.id, tenantId: session.user.tenantId }, body));
    }
    return NextResponse.json({ success: true });
}
