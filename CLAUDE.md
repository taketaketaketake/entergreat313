# CLAUDE.md

Persistent context for LLMs working in this repository. Read this before making changes.

## What This Repo Is

The public website for **Enter-Great 313**, a Detroit nonprofit supporting returning citizens (people transitioning out of long-term incarceration). The site replaces their Squarespace site at entergreat313.org.

Maintainer: Zach (sole developer and content editor).

## Stack — Do Not Deviate

- **Astro + Tailwind CSS**, fully static output. No SSR, no database, no backend services.
- Content lives in **Astro content collections** (markdown + frontmatter). Adding an event/video/program means adding a markdown file, never touching a database.
- Interactive features (letter builder) are client-side islands. They must work without any server and must not transmit or store user-entered data.
- Donations: **GiveButter** (embed/link — the org's existing account). Do not build payment handling.
- Merch: external print-on-demand storefront (embed/link). Do not build e-commerce.
- Video: YouTube embeds. Do not host video files.

If a feature seems to need a server or database, stop and re-read `docs/vision.md` — the answer is almost always "it doesn't."

## Assumptions to Make

- Deploy target is a static host (Cloudflare Pages/Netlify); every push to `main` deploys.
- The audience includes people on older phones and slow connections. Performance and plain HTML are features.
- Use Node 22 (`~/.nvm/versions/node/v22.22.1`) — Node 20 is too old for this Astro version.

## Assumptions NOT to Make

- Do not assume users have accounts. There are no accounts.
- Do not assume letter-builder content may be logged, saved, or sent anywhere. It is client-side only (see `docs/invariants.md`).
- Do not invent org facts (programs, hours, addresses). Use content files; flag gaps for Zach.

## Design Voice

Plain, direct, human. No nonprofit clichés, no generic AI-template design tells (no eyebrow labels, no gradient hero boilerplate). Real photos and real testimonials over stock imagery.

## Authoritative Files

- `docs/vision.md` — why this exists, non-goals
- `docs/architecture.md` — structure and data flow
- `docs/invariants.md` — non-negotiable constraints (privacy, static-only)
- `docs/models.md` — content collection schemas
- `docs/glossary/markdown-glossary.md` — which docs to update when (follow its Documentation Update Protocol after every phase)
- `implementation-plan.md` — phase status
- `AGENTS.md` — Astro dev-server usage and framework docs links

## Git

- Commit and push proactively when a unit of work is done and verified (build green).
- No AI co-authorship attributions in commits — git hooks enforce this.
