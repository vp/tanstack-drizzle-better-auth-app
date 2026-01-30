import { drizzle } from 'drizzle-orm/pglite'
import { PGlite } from '@electric-sql/pglite'

import * as schema from './schema.ts'

const client = new PGlite(process.env.DATABASE_URL || undefined);

export const db = drizzle(client, { schema });
