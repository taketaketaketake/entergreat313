# Enter-Great 313 — Website

The public website for [Enter-Great 313](https://www.entergreat313.org/), a Detroit nonprofit supporting returning citizens through peer support, life skills, employment help, and community.

Fully static Astro + Tailwind site: donations via GiveButter, video via YouTube, merch via print-on-demand, and a client-side letter-writing assistant that helps supporters mail personalized letters to parole boards and courts.

## Getting Started

Requires Node 22+.

```sh
npm install
npm run dev        # dev server at localhost:4321
npm run build      # static build to ./dist/
```

## Adding Content

One markdown file = one entry. Drop files into:

- `src/content/events/` — events (title, date, location in frontmatter)
- `src/content/programs/` — program descriptions
- `src/content/videos/` — YouTube videos (just the video ID + title)

Schemas live in `src/content.config.ts`; the build fails loudly if frontmatter is wrong.

## Documentation

- [docs/vision.md](docs/vision.md) — why this exists, what it refuses to be
- [docs/architecture.md](docs/architecture.md) — structure and boundaries
- [docs/invariants.md](docs/invariants.md) — non-negotiables (static-only, letter privacy)
- [implementation-plan.md](implementation-plan.md) — phase status
