# Hunter Website — Frontend

Astro 4 + Svelte SSR frontend for Hunter Albert's personal/consulting website. Consumes the Go backend API (Strapi-compatible envelopes) and renders server-side on every request.

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Astro 4 (`output: 'server'`) |
| Interactive islands | Svelte 4 |
| Styles | TailwindCSS 3 |
| Adapter | `@astrojs/node` (standalone) |
| Deployment | AWS Amplify (SSR compute) |

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Start dev server (default: http://localhost:4321)
npm run dev
```

## Environment Variables

| Variable | Purpose |
|---|---|
| `API_URL` | Server-side API base URL (not exposed to browser) |
| `PUBLIC_API_URL` | Client-side API base URL (exposed to Svelte islands) |

Both typically point to the same Go backend, e.g. `http://localhost:1337`.

## Building

```bash
npm run build
# Output is in dist/
# Start prod server:
npm start
```

## AWS Amplify Deployment

1. Connect this repo to an Amplify app in the AWS Console.
2. Set environment variables (`API_URL`, `PUBLIC_API_URL`) in Amplify → App settings → Environment variables.
3. Amplify will pick up `amplify.yml` automatically and run `npm install && npm run build`.
4. **Enable SSR compute** — in Amplify Console, ensure the app is configured for SSR (not static hosting). Amplify Gen 2 supports Node server-rendered apps natively; the `dist/` folder includes `server/entry.mjs` which Amplify runs.
5. Set the start command (if prompted) to `node dist/server/entry.mjs`.

## Project Structure

```
src/
  components/
    Nav.astro          — Top navigation bar
    BlogCard.astro     — Blog post preview card
    CareerCard.astro   — Job listing card
    ContactForm.svelte — Contact form island
    PricingToggle.svelte — Pricing monthly/yearly toggle island
    LoginForm.svelte   — Login form island
  layouts/
    BaseLayout.astro   — Root HTML shell with nav + footer
  pages/
    index.astro        — Home (hero + blog preview + CTA)
    blog/
      index.astro      — Blog listing
      [guid].astro     — Individual blog post
    careers/index.astro — Open positions
    pricing/index.astro — Pricing plans
    contact/index.astro — Contact form
    login/index.astro   — Login
  types/
    api.ts             — TypeScript interfaces for all API types
  lib/
    api.ts             — Fetch helpers for the Go backend
```

## API Contract

The Go backend returns Strapi-style envelopes:

```typescript
// List endpoints
{ data: T[], meta: { pagination: { page, pageSize, pageCount, total } } }

// Single-item endpoints
{ data: T }
```

All fetch helpers live in `src/lib/api.ts`.
