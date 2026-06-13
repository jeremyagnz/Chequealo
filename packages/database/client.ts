import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Use a single connection for migrations and a pool for queries
const queryClient = postgres(connectionString);

export const db = drizzle(queryClient, { schema });

export type Database = typeof db;
