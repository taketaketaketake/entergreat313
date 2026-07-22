# Models

## Data Models

Content collections are defined in `src/content.config.ts` with Zod schemas. One markdown file = one entry. Frontmatter fields below; the markdown body is the long-form description where noted.

### Event

| Field | Type | Purpose |
|-------|------|---------|
| title | string | Event name |
| date | date | Start date/time |
| endTime | string (optional) | Human-readable end time, e.g. "7:30 PM" |
| location | string | Venue name |
| address | string (optional) | Street address for maps |
| recurring | string (optional) | e.g. "Every Tuesday" — recurring events render in their own section |
| image | string (optional) | Path under `/public/images/events/` |
| body | markdown | Full description |

### Program

| Field | Type | Purpose |
|-------|------|---------|
| title | string | Program name |
| summary | string | One-liner for cards/homepage |
| order | number | Display order |
| image | string (optional) | Illustration/photo |
| body | markdown | Full program description |

### Video

| Field | Type | Purpose |
|-------|------|---------|
| title | string | Video title |
| youtubeId | string | YouTube video ID (not full URL) |
| date | date | Publish date, newest first |
| featured | boolean | Featured videos surface on homepage/donate page |
| description | string (optional) | Short context line |

### LetterTemplate (`src/data/letterTemplates.ts`, not a collection)

| Field | Type | Purpose |
|-------|------|---------|
| id | string | Template key |
| name | string | e.g. "Parole Support Letter" |
| audience | string | Who this letter is for (parole board, judge via attorney, person inside) |
| intro | string | Shown on the template chooser card |
| guidance | string[] | "Before you write" bullets (mailing rules, tone, MDOC number) |
| sections | LetterSection[] | Ordered composable sections |
| LetterSection.id | string | Stable key for state |
| LetterSection.heading | string | e.g. "How I Know This Person" |
| LetterSection.prompt | string | Guidance on what makes this section persuasive |
| LetterSection.required | boolean | Required sections gate PDF output; optional ones can be excluded |

### Destination (`src/data/destinations.ts`)

| Field | Type | Purpose |
|-------|------|---------|
| id | string | Key |
| name | string | e.g. "Michigan Parole Board" |
| addressLines | string[] | Mailing address; empty array = user enters a custom address |
| guidance | string | Routing/formatting rule, always including "verify before mailing" where an address ships |

Custom (user-typed) destinations are always allowed alongside these.

---

## Mental Models

### Content vs. Data

**Content** (collections) is what Zach adds routinely: events, programs, videos. **Data** (`src/data/`) is what changes rarely and ships as typed constants: org contact info, letter templates, destination directory. Content is markdown; data is code.

### Letter as Composition

A letter is not a filled-in form; it is a **selection of sections, each written by the user under guidance**. The template contributes structure and prompts, never sentences. This is why output quality survives contact with a parole board.

### The Site as Front Door

Every dollar, viewer, and letter is handled by a system better suited than us (GiveButter, YouTube, USPS). The site's job is routing motivated visitors to the right door with minimum friction.

---

## Design Decisions

### Why frontmatter `image` paths instead of Astro image() assets

Keeps content files portable and editable without touching imports; a git-based CMS can be layered on later with zero schema change. Optimization can be added per-component where it matters.

### Why letter templates are code, not a collection

Templates change rarely, need typed structure (nested sections), and are consumed by an interactive island — importing typed constants is simpler and safer than parsing markdown at runtime.
