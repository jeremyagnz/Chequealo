import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { tenants } from './tenants';

export const userRoleEnum = pgEnum('user_role', ['admin', 'member', 'viewer']);

export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  role: userRoleEnum('role').notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
