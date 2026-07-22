# Glossary

This glossary defines **canonical meanings** for terms used throughout the repository.
These definitions are authoritative and intended to prevent semantic drift across time,
contributors, and LLM sessions.

---

## Returning Citizen

A **returning citizen** is a person transitioning back into society after incarceration. This is the org's preferred term.

It:
- replaces stigmatizing terms ("ex-con", "felon", "offender") everywhere on the site
- applies in copy, code comments, and content files alike

---

## Letter Builder

The **letter builder** is the client-side tool at `/letters` that guides a supporter through composing a personalized letter section-by-section and outputs a printable PDF.

It:
- is guided composition, never a fill-in-the-blank form letter
- runs entirely in the browser (see invariant 2)
- pairs each letter with destination-specific mailing guidance

---

## Section

A **section** is one composable unit of a letter: a heading, a guidance prompt, and a user-written text body. Users choose which optional sections to include.

---

## Destination

A **destination** is a mailing target for a letter — a parole board, court clerk, attorney, or facility — with a physical address and formatting guidance (e.g., include the MDOC number).

---

## Content Collection

A **content collection** is an Astro-managed folder of markdown files (`src/content/`) with a Zod-validated frontmatter schema. Collections: `events`, `programs`, `videos`. Adding site content means adding a file to a collection.

---

## GiveButter

**GiveButter** is the org's existing donation platform. All donation flows embed or link to it; the site never processes payments.

---

## MDOC Number

An **MDOC number** is a Michigan Department of Corrections identifier for an incarcerated person. Correspondence about a person generally must reference it to be routed correctly.
