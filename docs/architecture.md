# Architecture

## Current State

### Implemented

- Astro 5 project with Tailwind CSS (via `@tailwindcss/vite`), static output
- Content collections defined for `events`, `programs`, `videos` with sample content
- Base layout with site header/footer navigation
- Placeholder pages for all top-level routes

### Not Yet Implemented

- Real page designs and content migration from entergreat313.org (Phase 1)
- GiveButter donate embed (Phase 1)
- Letter builder island + PDF generation (Phase 2)
- Merch storefront integration and media page (Phase 3)
- Optional git-based editing UI (deferred)

## Layers

```
Content layer      src/content/          markdown + frontmatter (events, programs, videos)
                   src/data/             typed constants (org info, letter templates, destinations)
Presentation       src/layouts/          BaseLayout (head, nav, footer)
                   src/components/       Astro components (server-rendered to static HTML)
                   src/pages/            one file per route
Interactivity      letter builder island client-side only; hydrated with client:* directive
External services  GiveButter            donations (embed)
                   YouTube               video hosting (embeds)
                   Print-on-demand shop  merch (links/embeds)
Delivery           static host           Cloudflare Pages / Netlify; deploy on push to main
```

## Data Flow

1. Build time: Astro reads content collections and `src/data/`, renders every route to static HTML.
2. Runtime: browser receives static HTML/CSS; the only JavaScript shipped is the letter builder island (on `/letters` only) and any embed scripts.
3. Letter builder: user input → in-memory state → client-side PDF generation → download/print. No network calls with user data.
4. Money and commerce flow entirely through external services; this site only links/embeds them.

## Boundaries

### Sacred Rule

**No server-side anything.** The build output is static files. No API routes, no SSR adapter, no database, no serverless functions. Any feature that appears to need one must be redesigned (client-side or external service) or rejected.

### Current Boundary Integrity

Intact — `astro.config.mjs` has no adapter; no server endpoints exist.

## Infrastructure

### Services

| Service | Role | Site's responsibility |
|---------|------|----------------------|
| Cloudflare Pages / Netlify | Hosting + CI deploy | Push to `main` |
| GiveButter | Donations, receipts, donor management | Embed/link only |
| YouTube | Video series hosting | Embed only |
| Print-on-demand storefront (TBD: Fourthwall/Printful) | Merch, payments, fulfillment | Link/embed only |

### Databases

None. Content is markdown in git.
