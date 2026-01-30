import { drizzle } from 'drizzle-orm/pglite'
import { PGlite } from '@electric-sql/pglite'
import * as appSchema from './schema'
import * as authSchema from './auth-schema'

export const schema  = { ...appSchema, ...authSchema }

const client = new PGlite(process.env.DATABASE_URL || undefined)

export const db = drizzle(client, { schema })
