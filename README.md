# Spotless Tinting

Vite + React frontend with Vercel serverless API routes (`/api`).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite frontend only (`http://localhost:5173`) — **does not** run `/api` functions |
| `vercel dev` | Local frontend **and** serverless `/api` together (recommended when testing APIs) |
| `npm run build` | Production frontend build |
| `npm run preview` | Preview the production build locally |

## Local API development

Vite’s own `npm run dev` server does **not** execute files under `/api`. To exercise portfolio or segmentation endpoints locally:

1. Install the [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
2. Copy `.env.example` → `.env.local` and fill in values
3. Link the project if needed: `vercel link`
4. Run:

```bash
vercel dev
```

This starts the Vite app and Vercel serverless functions in one local environment (typically `http://localhost:3000`). Call APIs as `/api/portfolio`, `/api/segment-car`, etc.

## Environment variables

See `.env.example`. Confirm these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Where | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Client + server | Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Client + server | Publishable / anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Dashboard → Settings → API → `service_role` — **no `VITE_` prefix** |
| `REPLICATE_API_TOKEN` | Server only | Segmentation |
| `REPLICATE_CAR_SEGMENT_VERSION` | Server only | Model version hash |

`.env` / `.env.*` / `*.local` are gitignored so keys are never committed.

## Supabase schema

Run the SQL in `supabase/migrations/20260313_portfolio_items.sql` in the Supabase SQL Editor. It creates:

- `portfolio_items` (RLS on, public **SELECT** only)
- Storage bucket `portfolio-images` (public read; authenticated upload)

Admin writes go through `/api/portfolio` with the service role key (bypasses RLS).

## Admin account (manual — no signup in the app)

There is **no registration/signup UI**. Provision the single admin user in Supabase:

1. Open **Supabase Dashboard → Authentication → Users → Add User**
2. Create a user with the email + password you choose
3. Sign in at `/admin/login` with those credentials

Keep signup disabled (or unused) in Auth settings so the public cannot self-register.

## Admin UI

| Route | Purpose |
| --- | --- |
| `/admin/login` | Email + password via Supabase Auth |
| `/admin` | Protected dashboard — list / create / edit / delete portfolio items |

Image uploads go to the `portfolio-images` storage bucket; CRUD writes call `/api/portfolio` with the session Bearer token. Use `vercel dev` locally so `/api` works.

## API routes

| Route | Methods | Notes |
| --- | --- | --- |
| `/api/portfolio` | `GET` | Public — optional `?category=tint\|ppf\|wrap` |
| `/api/portfolio` | `POST` / `PUT` / `DELETE` | Requires `Authorization: Bearer <supabase_access_token>` |
| `/api/segment-car` | `POST` | Server-side Replicate car segmentation |

Shared server helpers live in `/api/_lib` (underscore = not exposed as endpoints).

Frontend public reads can also use `src/lib/supabaseClient.ts` (`fetchPortfolioItems`).
