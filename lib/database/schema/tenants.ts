import { pgTable, text, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const tenantPlanEnum = pgEnum('tenant_plan', ['free', 'pro', 'enterprise']);

export const tenants = pgTable('tenants', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  plan: tenantPlanEnum('plan').notNull().default('free'),
  whiteLabelConfig: jsonb('white_label_config'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
