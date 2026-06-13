import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { db } from '@chequealo/database';
import { tenants } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';

  // Resolve tenant from subdomain (e.g., acme.chequealo.ai → slug: acme)
  const rootDomain = process.env.APP_URL?.replace(/^https?:\/\//, '') ?? 'localhost:3000';
  const subdomain = hostname.replace(`.${rootDomain}`, '');
  const isSubdomain = subdomain !== hostname && subdomain !== 'www';

  if (isSubdomain) {
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
