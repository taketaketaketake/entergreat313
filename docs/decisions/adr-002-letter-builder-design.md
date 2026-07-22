# ADR-002: Letter Builder as Client-Side Guided Composition

**Status:** Accepted
**Date:** 2026-07-21
**Phase:** 2 — Letter Builder

## Context

The org wants supporters to easily send letters to judges, courts, and parole boards on behalf of incarcerated people. The naive design — pick a template, click send, email goes out — fails on three facts: courts do not act on public email (ex parte rules), identical form letters are discounted by decision-makers, and letter content may concern pending legal matters.

## Decisions

1. **Section-based composition, not fill-in-the-blank.** Each template (parole support, character letter for court, reentry commitment, letter to someone inside) is an ordered set of sections — heading + persuasion prompt + free-text box. Optional sections can be excluded; required sections gate output. The template contributes structure, never sentences.
2. **Templates and destinations are typed constants** (`src/data/letterTemplates.ts`, `src/data/destinations.ts`), not content collections — they change rarely, need nested structure, and are consumed by an interactive island.
3. **Preact island, everything in-browser.** State in memory only; no fetch, no localStorage, no analytics on user text (invariant 2). The letters page states this plainly to users.
4. **Output = PDF download (jsPDF, dynamically imported so brochure visitors never pay for it) plus a print window fallback.** Physical mail is the delivery mechanism; the UI routes character letters through defense attorneys and tells users to verify addresses before mailing.
5. **Known destinations ship with verification warnings** (e.g., Michigan Parole Board address must be confirmed at michigan.gov/corrections) rather than being presented as authoritative — addresses drift and a misrouted letter can miss a hearing.

## Consequences

- The feature works offline after page load and can never leak letter content.
- No letter is ever sent automatically; Lob-style auto-mailing remains deferred behind an org decision on cost and review (invariant 4).
- Letter template copy (prompts, guidance) needs review by the org before the page is promoted — it gives procedural guidance to vulnerable users.
