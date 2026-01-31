import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

export const initPostgresDb = <
  T extends Record<string, unknown> = Record<string, never>,
>(
  schema: T,
) => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  })

  return drizzle(pool, { schema })
}
