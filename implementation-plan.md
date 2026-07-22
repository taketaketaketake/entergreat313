# Implementation Plan

> Static-first rebuild of entergreat313.org: ship the core site fast, then layer on the letter builder, shop, and media features — each phase independently deployable.

---

## Status

**Current Phase:** Phase 1

---

## Phase Completion Rules

A phase may be marked COMPLETE only when:
1. All exit criteria are satisfied
2. All required validation scripts have been executed successfully
3. A phase audit has passed

**Validation is mandatory for phase completion.**

See `docs/invariants.md` for the formal constraint.

---

## Stack

| Component | Purpose |
|-----------|---------|
| Astro 5 (static output) | Site framework, content collections, routing |
| Tailwind CSS 4 | Styling |
| Preact island (Phase 2) | Letter builder interactivity |
| Client-side PDF lib (Phase 2) | Letter PDF generation in-browser |
| GiveButter | Donations (org's existing account) |
| YouTube | Video series hosting |
| Fourthwall or Printful (Phase 3) | Merch storefront |
| Cloudflare Pages or Netlify | Free static hosting, deploy on push |

---

## PHASE 0 — Scaffold & Documentation

### Goal

Repo exists with the docs framework filled out, Astro + Tailwind building, and the content model defined.

### Deliverables

- Astro 5 + Tailwind project, git initialized, framework git hooks installed
- spec-driven-docs installed; vision, architecture, models, invariants, glossary, plan filled out; unused templates removed
- Content collections (`events`, `programs`, `videos`) with schemas and sample entries
- Base layout + placeholder pages for all routes
- `npm run build` green

### Exit Criteria

- [x] `npm run build` succeeds
- [x] All docs describe this project (no template placeholders remain)
- [x] Content collections validate sample content

### Status: COMPLETE

---

## PHASE 1 — Core Site + Donate

### Goal

A deployable replacement for the Squarespace site: all brochure pages designed and populated, donations live.

### Deliverables

- Home: hero, mission, featured video slot, upcoming events, donate CTA, shop teaser section
- About, Programs (from collection), Events (upcoming + recurring, from collection), Gallery, Contact
- Donate page with GiveButter embed + org's fundraising framing
- Content migrated from entergreat313.org (org has rights to all of it)
- Mobile-first, fast (no client JS on brochure pages)
- Deployed to static host on the org's domain (or a preview domain until DNS handover)

### Exit Criteria

- [ ] `npm run build` green; no placeholder copy on any Phase 1 page
- [ ] GiveButter donate flow works end-to-end from the live site
- [ ] Site audited on a phone: navigable, readable, fast
- [ ] ADR recorded for stack + external-services decisions

### Status: NOT STARTED

---

## PHASE 2 — Letter Builder

### Goal

Supporters can compose a personalized letter section-by-section and leave with a mailable PDF and correct mailing instructions.

### Deliverables

- `/letters` page with template chooser (parole support, character/sentencing, reentry commitment, letter to a person inside)
- Section-based composer island: toggle sections, headline + guidance prompt + textarea per section
- Destination directory (Michigan Parole Board, courts, custom address) with per-destination guidance
- Client-side PDF generation (formatted letter + addressed envelope/cover guidance)
- Plain-language "how letters help, what to expect" explainer

### Exit Criteria

- [ ] Full compose → PDF flow works offline (network tab silent after page load)
- [ ] No user text in any request, storage, or log (invariant 2 verified)
- [ ] Letter content reviewed by the org for accuracy of guidance
- [ ] ADR recorded for letter builder design decisions

### Status: NOT STARTED

---

## PHASE 3 — Shop + Media

### Goal

Merch revenue channel live and the video series has a home.

### Deliverables

- Merch platform chosen with the org (Fourthwall vs Printful) — storefront set up, products linked
- Shop page + homepage featured-merch section
- Media/Stories page fed from the `videos` collection; featured video on home + donate pages
- ADR recording merch platform decision

### Exit Criteria

- [ ] Test purchase completes on the storefront
- [ ] Videos added via a markdown file appear on the media page and (if featured) homepage
- [ ] ADR recorded

### Status: NOT STARTED

---

## DEFERRED — Not Scheduled

- **Keystatic editing UI** — layer on only if someone besides Zach needs to edit content
- **Lob auto-mailing for letters** — blocked on an org decision about per-letter cost and human review; requires an ADR before any build (see invariant 4)

---

## End State

After completing all phases, you will have:

1. A modern static site replacing Squarespace at zero monthly cost
2. Working donation, merch, and video channels for the org's fundraising push
3. A letter-writing assistant producing personalized, correctly-addressed printable letters
4. A markdown-only content workflow one volunteer can maintain indefinitely
