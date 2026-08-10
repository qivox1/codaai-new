import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    // ── Core ───────────────────────────────────────────────────────────────
    title: z.string(),

    // seoTitle: Kurzfassung für <title> im Suchergebnis. Google schneidet ab
    // rund 60 Zeichen ab — inklusive des Zusatzes " | CodaAI Blog" (14 Zeichen)
    // bleiben also etwa 45 für den Titel selbst. Die H1 auf der Seite darf
    // länger sein und bleibt unberührt: Suchergebnis und Seitenüberschrift
    // haben unterschiedliche Aufgaben. Ohne Angabe wird `title` verwendet.
    seoTitle: z.string().max(45).optional(),

    description: z.string().max(160),   // ideal meta-description length
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['de', 'en']),

    // ── Author (E-E-A-T signals) ───────────────────────────────────────────
    author: z.string(),
    authorTitle: z.string().optional(),       // e.g. "KI-Stratege bei CodaAI"
    authorBio: z.string().optional(),         // 1–2 sentences
    authorImage: z.string().optional(),       // path relative to /public

    // ── Classification ────────────────────────────────────────────────────
    category: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),

    // ── Visuals ───────────────────────────────────────────────────────────
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),

    // ── GEO: AI-Search Optimisation extras ───────────────────────────────
    // summary: Plain-text TL;DR (2–3 sentences). AI models like ChatGPT and
    // Perplexity often surface this verbatim as a direct answer.
    summary: z.string().optional(),

    // faq: Structured Q&A injected as FAQPage JSON-LD → enables Google rich
    // results AND is the exact format AI models prefer for sourcing answers.
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .optional(),

    // canonicalUrl: for syndicated or cross-posted articles
    canonicalUrl: z.string().url().optional(),

    // noindex: hide draft/thin pages from search engines
    noindex: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
