# Vision

## Purpose

This repository exists to build **the public website for Enter-Great 313**, a Detroit nonprofit that supports returning citizens — people transitioning back to society after long-term incarceration — through peer support meetings, life skills, employment help, and community.

The site does **not** replace the org's programs, staff, or fundraising platform.
Instead, it:

- Tells the org's story well enough that a stranger trusts it within one page
- Converts that trust into action: donations, event attendance, merch purchases, letters of support
- Gives supporters a practical tool for writing effective letters to parole boards, courts, and people inside
- Stays cheap and simple enough for one volunteer developer to maintain indefinitely

The long-term objective is a site comparable to any major nonprofit's — while costing the org nothing but a domain name.

---

## What This System Is

This system is:

- A fully static Astro + Tailwind site deployed to a free static host
- Content-driven: events, programs, videos, and gallery items are markdown files
- A front door for fundraising (GiveButter), merch (print-on-demand storefront), and the org's video series (YouTube)
- Home to a client-side **letter-writing assistant** that helps supporters compose personalized letters section-by-section and produces a printable PDF with correct mailing guidance

---

## What This System Is Not

This system is explicitly **not**:

- A web application with accounts, logins, or a database
- A payment processor or e-commerce platform — money is always handled by GiveButter or the merch platform
- A mass-mail or one-click-send tool — identical form letters hurt the people they're meant to help, and courts don't accept public email; the letter builder produces personalized, physically mailable letters
- A CMS platform for non-technical editors — Zach maintains content; a git-based editing UI may be layered on later without changing the content model

---

## Core Principles

### 1. Static Is a Feature

- No servers, no databases, no monthly bills, nothing to patch or breach
- Every push deploys; rollback is `git revert`
- If a proposed feature needs a backend, redesign it until it doesn't — or reject it

---

### 2. Trust Is the Product

- The site's job is to make a visitor believe the org is real, effective, and worth supporting
- Real photos, real testimonials, real program details — never filler copy or stock imagery
- Plain, direct language; no nonprofit jargon

---

### 3. Letters Must Actually Work

- The letter builder is guided composition, not a form-letter machine — every output is personalized
- Built-in destination guidance (parole board formats, MDOC numbers, when to route through an attorney) so letters land correctly
- User-entered letter content never leaves the browser

---

### 4. One-Volunteer Maintainability

- Adding an event is writing one markdown file
- No dependency that requires ongoing ops attention
- Documentation stays current per the markdown glossary contract

---

## Intended Outcome

- The org retires its paid Squarespace subscription with zero loss of function
- Donations, events, videos, and merch all reachable within one click of the homepage
- Supporters produce mailable, personalized letters in under fifteen minutes
- The site runs for years on free hosting with markdown-only content updates
