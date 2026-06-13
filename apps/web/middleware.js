import { NextResponse } from 'next/server';
import { db, isDatabaseConfigured } from '@chequealo/database';
import { tenants } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';
export async function middleware(request) {
    var _a, _b, _c;
    const hostname = (_a = request.headers.get('host')) !== null && _a !== void 0 ? _a : '';
    // Resolve tenant from subdomain (e.g., acme.chequealo.ai → slug: acme)
    const rootDomain = (_c = (_b = process.env.APP_URL) === null || _b === void 0 ? void 0 : _b.replace(/^https?:\/\//, '')) !== null && _c !== void 0 ? _c : 'localhost:3000';
    const subdomain = hostname.replace(`.${rootDomain}`, '');
    const isSubdomain = subdomain !== hostname && subdomain !== 'www';
    if (isSubdomain) {
        if (!isDatabaseConfigured) {
            return NextResponse.next();
        }
        const tenant = await db.query.tenants.findFirst({
            where: eq(tenants.slug, subdomain),
        });
        if (!tenant) {
            return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
        }
        const response = NextResponse.next();
        response.headers.set('x-tenant-id', tenant.id);
        response.headers.set('x-tenant-slug', tenant.slug);
        return response;
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
