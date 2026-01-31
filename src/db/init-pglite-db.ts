import { drizzle } from 'drizzle-orm/pglite'
import { PGlite } from '@electric-sql/pglite'

export const initPgliteDb = <
  T extends Record<string, unknown> = Record<string, never>,
>(
  schema: T,
) => {
  const client = new PGlite(process.env.DATABASE_URL || undefined)

  return drizzle(client, { schema })
}
