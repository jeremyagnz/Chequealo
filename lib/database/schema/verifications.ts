import { pgTable, text, timestamp, jsonb, integer, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { tenants } from './tenants';
import { users } from './users';

export const verificationStatusEnum = pgEnum('verification_status', [
  'pending',
  'processing',
  'completed',
  'failed',
]);

export const verificationVerdictEnum = pgEnum('verification_verdict', [
  'TRUE',
  'FALSE',
  'MISLEADING',
  'UNVERIFIED',
]);

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  claim: text('claim').notNull(),
  status: verificationStatusEnum('status').notNull().default('pending'),
  credibilityScore: integer('credibility_score'),
  verdict: verificationVerdictEnum('verdict'),
  evidence: jsonb('evidence').notNull().default([]),
  aiResponses: jsonb('ai_responses').notNull().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type VerificationRecord = typeof verifications.$inferSelect;
export type NewVerification = typeof verifications.$inferInsert;
