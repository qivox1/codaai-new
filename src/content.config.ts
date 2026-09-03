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

/*
 * GEO-Glossar (seit 03.09.2026) — eine Markdown-Datei je Begriff unter
 * src/content/glossar/. Jede Datei wird zu /wissen/geo-glossar/<slug>/,
 * die Übersicht /wissen/geo-glossar/ liest dieselbe Sammlung.
 *
 * Warum eine Seite je Begriff statt einer langen Glossarseite: KI-Systeme
 * extrahieren Passagen, nicht Seiten. Eine Seite mit 50 Begriffen konkurriert
 * bei der Frage „Was ist Grounding?" mit einer semantischen Nähe, die von 49
 * anderen Begriffen verwässert wird. Eine Seite, die nur Grounding behandelt,
 * ist im Initial Retrieval der klarere Kandidat — und zugleich ein sauberer
 * Chunk für das Re-Ranking.
 *
 * Regeln für den Text (abgeleitet aus dem SISTRIX-Meetup-Vortrag von
 * Chrissy Kunisch, September 2026, und den Contentfaktoren der Seite
 * /digital-visibility/):
 *   - Der erste Absatz ist eine deklarative Definition, die mit dem Begriff
 *     selbst beginnt („Grounding ist …") — Bottom Line Up Front + Entity Echoing.
 *   - H2 im Frageformat, jeder Absatz in sich verständlich (Chunking).
 *   - Keine Weichmacher („könnte", „möglicherweise"), kurze Sätze.
 *   - Zahlen nur mit Quelle; eigene Zahlen nur aus der Studie „KI-Blindtest
 *     Mittelstand 2026" und nur in der Formulierung, die auf /studie/ steht.
 */
const glossar = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/glossar' }),
  schema: z.object({
    // Der Begriff, so wie er als H1 steht (z. B. „Grounding").
    title: z.string(),
    // Kurzfassung für <title>: „<seoTitle> – GEO-Glossar | CodaAI" — Google
    // schneidet um 60 Zeichen ab, es bleiben also rund 32 für den Begriff.
    seoTitle: z.string().max(32).optional(),
    // Ein bis zwei Sätze, die den Begriff definieren. Stehen auf der Übersicht,
    // als Lead der Begriffsseite und als DefinedTerm.description im JSON-LD.
    // Die Meta-Description wird daraus auf 160 Zeichen gekürzt (erster Satz,
    // sonst Wortgrenze) — siehe metaDescription() in [slug].astro.
    shortDefinition: z.string().max(240),
    // Andere Schreibweisen und die englischen Fachbegriffe. Werden auf der
    // Seite genannt („auch: …") und als alternateName ausgezeichnet, damit
    // Anfragen in beiden Sprachen auf dieselbe Seite treffen.
    synonyms: z.array(z.string()).optional().default([]),
    // Sieben Gruppen — Reihenfolge entspricht dem Weg eines Inhalts in die
    // KI-Antwort. Die Übersicht ordnet danach.
    category: z.enum([
      'grundlagen',   // Wie LLMs funktionieren
      'grounding',    // Websuche & Grounding
      'pipeline',     // Retrieval-Pipeline: vom Ranking zur Zitierung
      'content',      // Content-Faktoren
      'technik',      // Technik
      'offpage',      // Offpage & Marke
      'messung',      // Messung & Tracking
    ]),
    // Zu welcher Visibility-Stufe der Begriff gehört (1 Gefunden, 2 Empfohlen,
    // 3 Zitiert). Steuert den Link auf /digital-visibility/#…; ohne Angabe
    // führt der Link auf die Seite ohne Anker.
    stufe: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
    // Slugs verwandter Begriffe (Dateiname ohne .md). Werden als Chips
    // gerendert — das ist die interne Verlinkung des Clusters.
    related: z.array(z.string()).optional().default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Zwei bis drei Fragen je Begriff. Achtung, Build-Wächter: jede Frage darf
    // sitewide nur EINMAL in einem FAQPage-Schema stehen — also Fragen so
    // formulieren, dass sie den Begriff enthalten.
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional().default([]),
    noindex: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, glossar };
