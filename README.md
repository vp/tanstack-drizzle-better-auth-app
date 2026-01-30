## drizzle-better-auth-app

TanStack Start app demonstrating **Drizzle ORM + drizzle-kit** with a **local PGlite database** and **Better Auth** (email/password + **Google OAuth**).

- **Database**: PGlite (Postgres-in-a-file) via `@electric-sql/pglite` + `drizzle-orm/pglite`
- **Auth**: Better Auth with the Drizzle adapter + Google social provider
- **Demo UI**: `/demo/better-auth` (email/password + “Sign in with Google”)

## Getting started (local)

```bash
pnpm install
```

Create `.env.local` (example values only; don’t commit secrets):

```bash
# PGlite database location (file path)
# - Use a relative file path for a persistent local DB
# - If you omit this, the runtime DB may be in-memory (non-persistent)
DATABASE_URL=./pglocal.db

# Better Auth base URL (must match where your app runs)
BETTER_AUTH_URL=http://localhost:3000

# Better Auth secret (generate your own)
BETTER_AUTH_SECRET=replace_me

# Google OAuth (optional; required for Google sign-in)
GOOGLE_CLIENT_ID=replace_me
GOOGLE_CLIENT_SECRET=replace_me
```

Generate a Better Auth secret:

```bash
pnpm dlx @better-auth/cli secret
```

Run database migrations (creates/updates the PGlite DB file):

```bash
pnpm db:migrate
```

Start dev:

```bash
pnpm dev
```

Open:

- App: `http://localhost:3000`
- Auth demo: `http://localhost:3000/demo/better-auth`

## Database (Drizzle + PGlite)

- **Runtime DB**: `src/db/index.ts` creates a `PGlite` client using `DATABASE_URL` and exports a Drizzle `db`.
- **Schema**:
  - App tables: `src/db/schema.ts`
  - Better Auth tables: `src/db/auth-schema.ts`
- **drizzle-kit config**: `drizzle.config.ts` uses `driver: 'pglite'` and reads `DATABASE_URL` (defaults to `file:./pglocal.db` if unset).

Useful commands:

```bash
pnpm db:generate # generate migrations into ./drizzle from schema changes
pnpm db:migrate  # apply migrations to the PGlite DB file
pnpm db:studio   # open Drizzle Studio
```

## Authentication (Better Auth + Google)

- **Better Auth config**: `src/lib/auth.ts`
  - Uses `drizzleAdapter(db, { provider: 'pg' })`
  - Enables email/password auth
  - Configures Google provider via `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
  - Uses `BETTER_AUTH_URL` as `baseURL` (important for correct OAuth redirects)
- **API route**: `src/routes/api/auth/$.ts` forwards `GET` + `POST` to `auth.handler(request)` at `/api/auth/*`.

### Google OAuth setup

In Google Cloud Console, create an OAuth client and set:

- **Authorized JavaScript origins**: `http://localhost:3000`
- **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

For production, repeat the above with your production domain and set:

- `BETTER_AUTH_URL=https://your-domain.com`

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm lint
pnpm format
pnpm check
```

## Styling

Tailwind CSS.

## Shadcn

Add components using the latest Shadcn CLI:

```bash
pnpm dlx shadcn@latest add button
```
