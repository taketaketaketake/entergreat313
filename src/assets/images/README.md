# Image slots

Drop photos in this folder using these exact names (any of .jpg/.jpeg/.png/.webp) and they
appear on the site automatically — no code changes. Until a file exists, its slot renders as a
branded green block.

| Filename | Where it appears |
|----------|------------------|
| `home/hero` | Homepage hero (tall, roughly 4:5 — a strong documentary photo of the community) |
| `home/meeting` | Homepage weekly-meeting band (wide) |
| `about/community` | About page, next to "Who we serve" |
| `services/life-skills` | What-we-do card |
| `services/mentorship` | What-we-do card |
| `services/peer-groups` | What-we-do card |
| `services/employment` | What-we-do card |
| `services/financial` | What-we-do card |
| `services/housing` | What-we-do card |
| `programs/<slug>` | Program card, where `<slug>` is the program's filename in `src/content/programs/` (e.g. `programs/jill`) |
| `events/<slug>` | Event card, matching the event's filename in `src/content/events/` |

Event gallery photos are separate: drop any images into `src/assets/gallery/` and they show on
the Gallery page.

Prefer real photos of real people and real meetings (with permission) — documentary style, not
stock. Landscape ~1600px wide is plenty; the build resizes everything.
