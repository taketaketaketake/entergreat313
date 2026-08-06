# ADR-003: Resume Builder with User-Mediated LLM Handoff

---

## Status
Accepted

## Date
2026-08-06

## Phase
N/A — Cross-cutting feature, added alongside the letter builder tooling.

## Context

The site already had one client-side island, the letter builder (ADR-002), aimed at
*supporters* of returning citizens. Nothing on the site served the returning citizen
directly with a practical job-seeking task.

Employment is one of the six service areas the org names, and the hardest resume problems
for a long-term-serving returning citizen are not formatting problems that a commodity
resume tool solves. They are:

- a multi-decade employment gap that the applicant must frame before an employer guesses at it
- substantial work performed while incarcerated that never got written down as experience
- trades and certifications earned inside, often without surviving paperwork
- a disclosure decision about the record that is genuinely the applicant's to make

A secondary goal from the maintainer: introduce members to LLM tools in a low-stakes,
concrete way rather than abstractly.

## Decisions

### 1. Compose locally, hand off manually to a third-party LLM

**Decision:** The page collects section text in the browser, assembles it into a single
prompt, and the user copies that prompt and pastes it into ChatGPT or Claude themselves.
The site makes no API call and holds no API key.

**Rationale:** Invariant 1 forbids server-side code, and an LLM API call requires a secret
that a static site cannot hold. A manual handoff also keeps the user in control of what
gets disclosed and to whom, and makes the prompt itself visible — which serves the
teaching goal better than a hidden call would.

### 2. The generated prompt carries mandatory anti-fabrication instructions

**Decision:** `buildPrompt()` in `src/data/resumeSections.ts` prefixes the user's content
with numbered rules forbidding invented employers, titles, dates, duties, and
certifications; requiring `[ADD DATES]`-style placeholders instead of guesses; and
forbidding the sharpening of approximate dates into exact ones.

**Rationale:** An LLM given sparse resume input will confidently fill gaps. For a person
whose credibility is already scrutinized, and who may be subject to parole conditions
regarding honesty with employers, a fabricated resume line is a material harm, not a
formatting defect. These rules are the most important text on the page and must not be
weakened for brevity.

### 3. Disclosure of the record is an explicit user choice that rewrites the prompt

**Decision:** Three options (`omit`, `brief`, `direct`) each map to a distinct instruction
injected into the prompt. Default is `omit`.

**Rationale:** Whether to disclose is a legal and personal judgment belonging to the
applicant, not a default this site should make silently. Defaulting to `omit` is the
conservative choice — a resume is usually not where disclosure happens.

### 4. Draft persistence in `localStorage`, opt-out, with a visible destructive clear

**Decision:** Section text, include-toggles, and the disclosure choice are saved to
`localStorage` under `eg313-resume-draft`. A checkbox disables and immediately purges it.
"Erase everything" is always visible and confirms before wiping. A banner appears when a
draft is restored.

**Rationale:** The audience is on older phones where an interrupting call can destroy
twenty minutes of typing. That argues for persistence. Shared and library computers argue
against it. Opt-out persistence plus a loud clear serves both, with the restore banner
ensuring a user on a borrowed device learns that a draft exists.

## Constraints Enforced

- **Invariant 1 (static only):** preserved. No SSR, no API route, no serverless function,
  no API key. The island is client-side Preact.
- **Invariant 3 (no money handling):** unaffected.
- **Invariant 5 (org facts from content):** the page invents no org facts. The one org
  reference (the sample reference entry) uses the leadership data already sourced from the
  org.
- **No transmission by the site:** the component contains no `fetch`, no analytics, and no
  network calls of any kind. Data leaves only by the user's own copy-paste.

## Relationship to Invariant 2

Invariant 2 states that letter content never leaves the browser, on the grounds that users
may be writing about pending legal matters.

This feature does not violate it — the *site* still transmits nothing — but it is
deliberately adjacent, because the intended workflow ends with the user pasting their
content into a third-party service. That difference is material and is why it is recorded
here rather than assumed.

Two mitigations are in place, and **must not be removed without a new ADR**:

1. The page states plainly, above the form, that ChatGPT and Claude are outside companies
   and that the user should not paste their Social Security number, street address, or case
   details.
2. No section asks for a street address; the contact section explicitly tells the user that
   city and state are sufficient on a resume.

Invariant 2 is deliberately left worded as-is and scoped to the letter builder. If a future
change causes *this* page to transmit content, that requires a new ADR and an invariant
revision, not a quiet edit.

## Alternatives Considered

**Call an LLM API from the site.** Rejected: impossible under Invariant 1 without a server,
and it would place the org in the position of transmitting members' criminal-history-adjacent
data to a vendor under the org's own account.

**Generate a finished resume locally with a fixed template and no LLM.** Rejected: it solves
formatting, which is already a commodity, and cannot do the actual hard work of translating
"six years in the kitchen" into civilian skill language. It also forfeits the teaching goal.

**Link out to an existing free resume builder (Indeed, Canva).** Rejected: none of them have
sections for work performed while incarcerated, gap framing, or a disclosure decision, which
is the entire reason this page justifies its existence.

**Persist nothing, matching the letter builder exactly.** Rejected on audience grounds; see
Decision 4.

## Consequences

### Positive
- A returning citizen can produce a defensible resume draft from a phone, at no cost.
- Work and training completed while incarcerated is treated as ordinary experience.
- The disclosure decision is surfaced as an explicit, informed choice.
- Members see a well-constructed prompt, which is a concrete first lesson in using LLMs.

### Negative / Tradeoffs
- The workflow depends on a third-party account (both ChatGPT and Claude require signup),
  which is a real drop-off point for this audience and cannot be fixed from this codebase.
- Output quality is outside the site's control; the page can instruct but cannot enforce.
- `localStorage` persistence is a new class of local data this project did not previously
  create.

### Neutral
- Adds a second Preact island; no change to the build target or hosting model.

## Outcome

- `/resume` builds as a static page (site total 15 → 16 pages).
- `src/components/ResumeBuilder.tsx` — client-side island, no network calls.
- `src/data/resumeSections.ts` — eight reentry-specific sections, three disclosure
  instructions, and `buildPrompt()`.
- Linked from the navbar under Tools & Resources.

## Validation

- `npm run build` completes with no errors; 16 pages emitted.
- All eight section headings verified present in `dist/resume/index.html`.
- Island confirmed hydrating (`component-url="/_astro/ResumeBuilder.*.js"`).
- Anti-fabrication instruction text confirmed present in the emitted client bundle.
- Component grepped for `fetch`/analytics: none present.

## Notes for Future Phases

- **Do not weaken or trim the anti-fabrication rules in `buildPrompt()`.** They are the
  safety mechanism of this feature, not boilerplate.
- **Do not change the disclosure default away from `omit`** without an explicit org decision.
- **Do not add a direct LLM API call** to this page. That changes the trust model entirely
  and requires a new ADR plus an Invariant 2 revision.
- The section list is intentionally reentry-specific. Generic
  Experience/Education/Skills sections would make the page redundant with free tools.
- Sample text in `placeholder` fields is illustrative and contains no real person's data;
  keep it that way.
