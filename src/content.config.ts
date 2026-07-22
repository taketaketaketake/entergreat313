import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endTime: z.string().optional(),
    location: z.string(),
    address: z.string().optional(),
    recurring: z.string().optional(),
    image: z.string().optional(),
  }),
});

const programs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/programs" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    image: z.string().optional(),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/videos" }),
  schema: z.object({
    title: z.string(),
    youtubeId: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

export const collections = { events, programs, videos };
