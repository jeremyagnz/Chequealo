import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db, isDatabaseConfigured } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq, count } from 'drizzle-orm';
export async function GET(_request) {
    var _a;
    const session = await auth();
    if (!(session === null || session === void 0 ? void 0 : session.user)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!isDatabaseConfigured) {
        return NextResponse.json({
            total: 0,
            verdictBreakdown: [],
            databaseDisabled: true,
        });
    }
    const [totalResult] = await db
        .select({ total: count() })
        .from(verifications)
        .where(eq(verifications.userId, session.user.id));
    const verdictBreakdown = await db
        .select({
        verdict: verifications.verdict,
        count: count(),
    })
        .from(verifications)
        .where(eq(verifications.userId, session.user.id))
        .groupBy(verifications.verdict);
    return NextResponse.json({
        total: (_a = totalResult === null || totalResult === void 0 ? void 0 : totalResult.total) !== null && _a !== void 0 ? _a : 0,
        verdictBreakdown,
    });
}
