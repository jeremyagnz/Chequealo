import { NextResponse } from 'next/server';
import { db, isDatabaseConfigured } from '@chequealo/database';
import { verifications } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';
export async function GET(_request, { params }) {
    if (!isDatabaseConfigured) {
        return NextResponse.json({ error: 'Verification is temporarily unavailable while the database is disabled.' }, { status: 503 });
    }
    const verification = await db.query.verifications.findFirst({
        where: eq(verifications.id, params.jobId),
    });
    if (!verification) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(verification);
}
