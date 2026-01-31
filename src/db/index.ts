import * as appSchema from './schema'
import * as authSchema from './auth-schema'
import { initPostgresDb } from './init-postgres-db'
import { initPgliteDb } from './init-pglite-db'
import { usePostgres } from './use-postgres'

export const schema  = { ...appSchema, ...authSchema }



export const db = usePostgres() ? initPostgresDb(schema) : initPgliteDb(schema)