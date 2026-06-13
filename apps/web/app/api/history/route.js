import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db, isDatabaseConfigured } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq, desc } from 'drizzle-orm';
export async function GET(request) {
    var _a, _b;
    const session = await auth();
    if (!(session === null || session === void 0 ? void 0 : session.user)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const page = Number((_a = searchParams.get('page')) !== null && _a !== void 0 ? _a : '1');
    const limit = Number((_b = searchParams.get('limit')) !== null && _b !== void 0 ? _b : '20');
    const offset = (page - 1) * limit;
    if (!isDatabaseConfigured) {
        return NextResponse.json({ data: [], page, limit, databaseDisabled: true });
    }
    const results = await db
        .select()
        .from(verifications)
        .where(eq(verifications.userId, session.user.id))
        .orderBy(desc(verifications.createdAt))
        .limit(limit)
        .offset(offset);
    return NextResponse.json({ data: results, page, limit });
}
