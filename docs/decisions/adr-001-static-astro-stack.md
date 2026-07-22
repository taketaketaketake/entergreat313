# ADR-001: Fully Static Astro Stack with External Service Delegation

**Status:** Accepted
**Date:** 2026-07-21
**Phase:** 0 — Scaffold & Documentation

## Context

Rebuilding entergreat313.org for a small nonprofit with one volunteer developer (Zach). Requirements: brochure pages, easy event/video updates, donations, merch, a video series, and a letter-writing assistant for supporters of returning citizens. Next.js + Supabase was considered and explicitly rejected by the maintainer as too heavy.

## Decisions

1. **Astro 5 + Tailwind 4, static output, no adapter.** Every feature must be static, client-side, or delegated to an external service. Zero hosting cost, zero ops.
2. **Content collections over a database or CMS.** Events, programs, and videos are markdown files with Zod-validated frontmatter. A git-based editing UI (Keystatic) is deferred until someone besides the maintainer needs to edit.
3. **Delegate money and media:** GiveButter (org's existing donation platform — kept over a PayPal integration), YouTube for video, print-on-demand storefront for merch (platform TBD in Phase 3).
4. **Letter builder is guided composition, client-side only.** No one-click send: courts don't accept public email, and identical form letters harm the people they're meant to support. Output is a personalized printable PDF with mailing guidance. User text never leaves the browser (invariant 2). Lob physical-mail automation deferred pending an org decision on cost and review.
5. **Docs framework:** spec-driven-docs v1.1.0 installed; stubs/artifacts/contracts templates deleted as inapplicable to a content site; framework git hooks (no AI attribution) installed.

## Consequences

- Adding content = writing a markdown file; deploys are pushes to `main`.
- No feature may require a server; anything that seems to must be redesigned (recorded as invariant 1).
- The org's donation history and receipts stay in GiveButter — no migration risk.
- Node 22+ required (create-astro rejects Node 20).
