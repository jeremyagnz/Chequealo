import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index';

export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

let database: ReturnType<typeof drizzle<typeof schema>> | null = null;

function createDatabase() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const queryClient = postgres(connectionString);
  return drizzle(queryClient, { schema });
}

function getDatabase() {
  database ??= createDatabase();
  return database;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop, receiver) {
    const value = Reflect.get(getDatabase(), prop, receiver);
    return typeof value === 'function' ? value.bind(getDatabase()) : value;
  },
}) as ReturnType<typeof drizzle<typeof schema>>;

export type Database = typeof db;
