import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { usePostgres } from '@/db/use-postgres'

config({ path: ['.env.local', '.env'] })


const pgliteCredentials = {
  driver: 'pglite',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./pglocal.db',
  },
}

const postgresCredentials = {
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}

console.log('usePostgres', usePostgres())

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/schema.ts', './src/db/auth-schema.ts'],
  dialect: 'postgresql',
  ...(usePostgres() ? postgresCredentials : pgliteCredentials),
})
 