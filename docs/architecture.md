# Architecture

## Current State

### Implemented

- Astro 5 + Tailwind 4 + Preact integration, static output; Libre Franklin variable font
- Content collections (`events`, `programs`, `videos`) populated with content migrated from entergreat313.org (mission, programs incl. J.I.L.L., testimonials, partnerships)
- Full page set: home, about, programs, events, partnerships, gallery, media, donate, letters, shop, contact — designed, mobile-first, sticky header with mobile menu
- Letter builder island (`src/components/LetterBuilder.tsx`): 4 templates × section composer × destination directory → jsPDF download (lazy-loaded) or print window; fully client-side
- Gallery page auto-globs `src/assets/gallery/`; media page renders the `videos` collection with an empty state
- Image slot system (`src/components/ImageSlot.astro`): every photo location on the site maps to a conventional filename under `src/assets/images/` (documented in that folder's README); a dropped file appears optimized and responsive, a missing file renders a branded placeholder block. Homepage also has a stats band that renders only when `stats` in `src/data/site.ts` has entries.

### Not Yet Implemented / Blocked on Org Inputs

- GiveButter embed on /donate (needs campaign URL — placeholder links to old site meanwhile)
- YouTube channel link + first video entries (site renders empty states until then)
- Merch storefront (platform choice pending; /shop shows coming-soon)
- Deployment + DNS handover (needs domain access)
- Gallery photos (org's photo library not yet migrated)
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
