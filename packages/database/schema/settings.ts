import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { tenants } from './tenants';
import { users } from './users';

export const settings = pgTable('settings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  preferredAIProvider: text('preferred_ai_provider').notNull().default('openai'),
  preferredSearchProvider: text('preferred_search_provider').notNull().default('serper'),
  language: text('language').notNull().default('en'),
  config: jsonb('config').notNull().default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Settings = typeof settings.$inferSelect;
export type NewSettings = typeof settings.$inferInsert;
