# System Invariants

This document defines **non-negotiable invariants** of the system.

These invariants are architectural constraints that must hold regardless
of implementation details, agent behavior, model choice, or future
feature additions.

If a change violates one of these invariants, the change is incorrect
and must be revised or rejected.

---

## 1. Static Output Only

The build produces static files. No SSR adapter, no API routes, no serverless functions, no database. Features that appear to require a server must be redesigned as client-side code or delegated to an external service.

---

## 2. Letter Content Never Leaves the Browser

Text a user types into the letter builder is never transmitted, logged, stored, or sent to any analytics or third-party script. Composition and PDF generation happen entirely client-side. Users may be writing about pending legal matters — treat their words as privileged.

---

## 3. No Money Handling

The site never collects payment details. Donations go through GiveButter; merch goes through the print-on-demand platform. The site links or embeds — nothing more.

---

## 4. No Mass Identical Letters

The letter builder must not produce one-click identical form letters, and must not send anything automatically on a user's behalf. Every letter requires user-written section content. (Identical mass mail is discounted by parole boards and can harm the person it supports. Any future auto-mailing feature requires an explicit org decision on review/moderation, recorded in an ADR.)

---

## 5. Org Facts Come From Content, Not Imagination

Addresses, meeting times, program details, and testimonials come from content files sourced from the org. LLMs must never fabricate them; gaps are flagged to Zach.

---

## Phase Completion Requires Passing Audit

**No phase may transition to COMPLETE without a passing phase audit.**

The mandatory sequence is:

| Step | Required |
|------|----------|
| Implementation | Yes |
| Validation scripts pass | Yes |
| Phase audit invoked | Yes |
| ADR created and valid | Yes |
| Glossary triggers satisfied | Yes |
| Audit verdict: PASS | Yes |
| Only then mark COMPLETE | Yes |

This invariant is enforced by:
- `skills/llm/phase-audit.md` (procedure)
- `CLAUDE.md` Phase Completion Protocol (behavioral rule)

---

## Phase Completion Requires Validation

**A phase MUST NOT be marked COMPLETE unless its corresponding validation script has been executed successfully.**

Rules:
- Every phase that introduces or modifies executable behavior MUST have a validation script.
- Validation scripts MUST be run before phase status is marked COMPLETE.
- A passing test suite is insufficient without phase-scoped validation.

For this project, `npm run build` completing without errors is the baseline validation for every phase; phases define additional checks in `implementation-plan.md`.

Violation of this invariant invalidates phase completion.
