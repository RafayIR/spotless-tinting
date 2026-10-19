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
| `SUPABASE_URL` | Server (recommended) | Same URL — ensures `/api` works on Vercel |
| `SUPABASE_ANON_KEY` | Server (recommended) | Same as publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Dashboard → Settings → API → `service_role` — **no `VITE_` prefix** |
| `VITE_RECAPTCHA_SITE_KEY` | Client | reCAPTCHA v2 site key |
| `RECAPTCHA_SECRET_KEY` | Server only | reCAPTCHA secret |
| `RESEND_API_KEY` | Server only | Sends Contact / Quote / Book emails |
| `CONTACT_TO_EMAIL` | Server only | Owner inbox (e.g. `spotlesstinting@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Server only | Verified Resend sender |
| `REPLICATE_API_TOKEN` | Server only | Segmentation |
| `REPLICATE_CAR_SEGMENT_VERSION` | Server only | Model version hash |

`.env` / `.env.*` / `*.local` are gitignored so keys are never committed.

### Portfolio API (`/api/portfolio`) troubleshooting

If admin gallery returns a server error, check Vercel logs for the exact message. Usual causes:

1. Missing `SUPABASE_URL` / `SUPABASE_ANON_KEY` (or `VITE_*` equivalents) in Vercel
2. Missing `SUPABASE_SERVICE_ROLE_KEY` (writes only)
3. SQL migration not run — `portfolio_items` table / RLS missing

### Form emails

Contact, Quote, Book and Careers submit to `/api/send-enquiry`, which verifies reCAPTCHA then emails the owner via [Resend](https://resend.com) and saves the submission to Wix CMS (see [Wix CMS (form enquiries)](#wix-cms-form-enquiries)). Create a free Resend account, add `RESEND_API_KEY`, set `CONTACT_TO_EMAIL`, and (for production) verify your domain then set `CONTACT_FROM_EMAIL`.

## Wix CMS (portfolio projects)

Portfolio projects can be managed in Wix CMS while this site stays on its current hosting. The browser never talks to Wix: `GET /api/wix-portfolio` reads the collection with a server-only API key and returns only items where `published` is true.

| Piece | File |
| --- | --- |
| Serverless endpoint | `api/wix-portfolio.ts` |
| Client service (maps items to the site's `Project` type) | `src/lib/wixPortfolio.ts` |
| React hook (`projects`, `loading`, `error`) | `src/lib/useWixProjects.ts` |

The existing gallery still renders from `src/data/projects.ts`. To switch it to Wix later, use `useWixProjects()` in place of the static `projects` import — items already match the `Project` type.

### Setup

1. **Create the collection** — Wix Dashboard → CMS → *Create Collection* named **PortfolioProjects** (collection ID must be `PortfolioProjects`, or set `WIX_PORTFOLIO_COLLECTION`). Add these fields:

   | Field key | Type | Notes |
   | --- | --- | --- |
   | `title` | Text | Required |
   | `slug` | Text | Required, unique, URL-friendly |
   | `shortDescription` | Text | Shown on cards |
   | `description` | Text | Full description (plain Text, not Rich content) |
   | `coverImage` | Image | Required (items without any image are skipped) |
   | `galleryImages` | Media gallery | Multiple images |
   | `category` | Text | Plain Text, not Tags. Use: Window Tinting, PPF, Vehicle Wraps, Residential, Commercial, Smart Tint, Other |
   | `technologies` | Tags / Text | Optional |
   | `projectUrl` | URL | Optional |
   | `featured` | Boolean | |
   | `displayOrder` | Number | Lower shows first |
   | `published` | Boolean | Only `true` appears on the site |
   | `location` | Text | Optional (e.g. "Howrah, Tasmania") |
   | `service` | Text | Optional (defaults from category) |

2. **Permissions** — leave the collection on the default (*Admin* can read/write; nobody else). The server API key does the reading, so do **not** make the collection publicly readable or writable.
3. **API key** — Wix Dashboard → Settings → *API Keys* → Generate. Grant only the Wix Data permission to read items. Copy the key and your **Site ID** (the GUID in the dashboard URL).
4. **Environment** — set `WIX_API_KEY` and `WIX_SITE_ID` in `.env.local` and in Vercel (Production + Preview). No `VITE_` prefix; redeploy after adding them.
5. **Test locally** — `vercel dev`, then open `http://localhost:3000/api/wix-portfolio`. You should see `{ "projects": [...] }` with only published items. (`npm run dev` does not run `/api`.)

Edits in Wix appear on the site within about a minute (CDN cache `s-maxage=60`). Unpublishing an item removes it on the next refresh.

## Wix CMS (form enquiries)

Every Contact, Quote, Book and Careers submission is also saved as an item in a Wix CMS collection (`api/_lib/wixEnquiries.ts`), alongside the Resend email. Email and Wix run side by side: if one fails the other still goes through (check Vercel logs), and the visitor only sees an error if both fail. If `WIX_API_KEY` / `WIX_SITE_ID` are not set, the Wix step is skipped.

1. **Create the collection** — Wix Dashboard → CMS → *Create Collection* named **Enquiries**. The code uses the collection **ID** `enquiries`; IDs are case-sensitive and shown at the end of the collection's dashboard URL (`.../database/data/<id>`). If yours differs, set `WIX_ENQUIRIES_COLLECTION`. Leave permissions on *Admin* only. Add these fields (all Text):

   | Field key | Notes |
   | --- | --- |
   | `title` | Default primary field, e.g. "New quote request — Jane Smith" |
   | `formType` | `contact`, `quote`, `book` or `careers` |
   | `name`, `email`, `phone`, `suburb` | Contact details |
   | `message` | Message / notes, if given |
   | `details` | Every submitted field as `Label: value` lines |
   | `status` | Starts as `New`; change it in Wix as you follow up |

   Submission time is Wix's built-in *Created Date*.
2. **API key permission** — the key must be allowed to **write/manage** Wix Data items, not just read them (Settings → *API Keys* → edit the key).

## SEO files

- `/robots.txt` — allows crawling, blocks `/admin`, points to sitemap
- `/sitemap.xml` — public page list for Google

## Security

`vercel.json` sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and a Content-Security-Policy. Admin routes send `X-Robots-Tag: noindex`.

ABN displayed in the footer: **59 645 122 916**.


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
| `/api/send-enquiry` | `POST` | Contact / Quote / Book → owner email (Resend + captcha) |
| `/api/verify-recaptcha` | `POST` | Captcha token check |
| `/api/segment-car` | `POST` | Server-side Replicate car segmentation |

Shared server helpers live in `/api/_lib` (underscore = not exposed as endpoints).

Frontend public reads can also use `src/lib/supabaseClient.ts` (`fetchPortfolioItems`).
