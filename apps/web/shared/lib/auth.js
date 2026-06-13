import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { db, isDatabaseConfigured } from '@chequealo/database';
import { users, tenants } from '@chequealo/database/schema';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
export const authConfig = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            var _a;
            if (!user.email)
                return false;
            if (!isDatabaseConfigured)
                return true;
            // Upsert user and default tenant on first sign-in
            const existing = await db.query.users.findFirst({
                where: eq(users.email, user.email),
            });
            if (!existing) {
                const tenantId = createId();
                await db.insert(tenants).values({
                    id: tenantId,
                    slug: user.email.split('@')[0],
                    name: (_a = user.name) !== null && _a !== void 0 ? _a : user.email,
                    plan: 'free',
                });
                await db.insert(users).values({
                    email: user.email,
                    tenantId,
                    role: 'admin',
                });
            }
            return true;
        },
        async session({ session, token }) {
            var _a, _b, _c;
            if (!isDatabaseConfigured) {
                session.user.id = (_b = (_a = token.sub) !== null && _a !== void 0 ? _a : session.user.email) !== null && _b !== void 0 ? _b : 'anonymous';
                session.user.tenantId = 'public';
                return session;
            }
            if ((_c = session.user) === null || _c === void 0 ? void 0 : _c.email) {
                const dbUser = await db.query.users.findFirst({
                    where: eq(users.email, session.user.email),
                });
                if (dbUser) {
                    session.user.id = dbUser.id;
                    session.user.tenantId = dbUser.tenantId;
                }
            }
            return session;
        },
    },
};
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
