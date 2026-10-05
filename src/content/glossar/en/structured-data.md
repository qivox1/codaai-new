---
title: "Structured data (Schema.org)"
lang: en
de: strukturierte-daten
seoTitle: "Structured data and AI search"
seoDescription: "Structured data (Schema.org, JSON-LD) explained: which types matter in B2B, what Google says about AI features and why markup never replaces visible text."
shortDefinition: "Structured data is machine-readable information in a web page's source code that uses the Schema.org vocabulary to describe what is on the page — such as a company, a product or an article."
synonyms: ["Schema.org", "Schema markup", "JSON-LD", "Structured markup"]
category: technik
related: ["entity", "knowledge-graph", "entity-home", "chunking", "ai-overviews", "grounding-page"]
pubDate: 2026-10-05
stufe: 1
faq:
  - q: "Do you need structured data to appear in AI Overviews or AI Mode?"
    a: "No. Google states in its guide to generative AI features that structured data is not required for them and that there is no special schema.org markup to add. Google still recommends it for rich results in classic search."
  - q: "Do ChatGPT and other AI systems read structured data?"
    a: "Only to a limited extent. In a test by Ahrefs, five major AI systems relied on the visible text and ignored JSON-LD. Structured data mainly works indirectly: through the search index and the knowledge graph that AI systems draw on."
  - q: "Which structured data should a B2B company use as a minimum?"
    a: "Organization on the page that describes the company, with sameAs links to official profiles. In addition, Person for authors and contacts, Product with Offer for products, and Article with dates for expert content. Everything in the markup must also be visible on the page."
---

Structured data is machine-readable information in a web page's source code that describes what is on the page: a company, a product, an article, a person. It follows a shared vocabulary, Schema.org, and is usually embedded in the JSON-LD format. Search engines use it to recognise entities and their attributes without having to interpret the running text.

## How does structured data work?

Schema.org is a catalogue of types (such as Organization, Product, Article) and properties (such as name, address, author). Google, Bing and Yahoo launched the initiative in June 2011 so that site owners would not have to mark up their pages differently for each search engine (Google Search Central Blog, June 2011).

There are three formats: JSON-LD, Microdata and RDFa. Google recommends JSON-LD in most cases because it is the easiest to implement and maintain. The code sits in its own script block and does not mix with the visible text:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Example Ltd",
  "url": "https://www.example.co.uk/",
  "foundingDate": "1998",
  "sameAs": ["https://www.linkedin.com/company/example-ltd"]
}
```

According to Google, Search uses structured data to understand a page's content and to gather information about the world — about people or companies, for instance. This information feeds into the [knowledge graph](/en/knowledge/geo-glossary/knowledge-graph/).

## Which types matter for B2B companies?

| Type | Used for | Note |
|---|---|---|
| Organization | Company, logo, address, profiles | On the [entity home](/en/knowledge/geo-glossary/entity-home/), with sameAs |
| Person | Authors, management, contacts | Links expertise to people |
| Product and Offer | Products, prices, availability | Basis for product rich results |
| Article | Expert articles, guides | With author, datePublished and dateModified |
| FAQPage | Questions and answers | Google has not shown FAQ rich results since 7 May 2026 |

iPullRank counts Organization and Person among the most effective types because they make entities unambiguous.

## What does Google say about structured data in AI features?

Google is clear. Its [guide to generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) states that structured data is not required for generative AI search and that there is no special schema.org markup to add (as of July 2026). Google nonetheless continues to recommend it, because it makes pages eligible for rich results. What matters is that the structured data matches the visible text on the page.

Mark Williams-Cook (September 2026) puts this in context: Google uses its Knowledge Graph with its AI systems, and structured data reduces ambiguity. Keep using it, he says, but do not sell it as a new GEO formula.

## Why should Schema.org not be overrated?

Several tests show that AI systems mainly read the visible text:

- **Chunking:** according to WordLift (a tool vendor, March 2026), RAG systems usually ingest a page as flat text. During [chunking](/en/knowledge/geo-glossary/chunking/), the chunker slices the relationships in the JSON-LD into disconnected fragments. In WordLift's experiment, adding a standard JSON-LD block improved fact extraction by just 0.17 points on a five-point scale.
- **Visible text wins:** in a test by Ahrefs, five major AI systems ignored JSON-LD as well as hidden Microdata and RDFa (September 2026). Malte Landwehr reports that when text and markup contradict each other, the text wins (August 2026).
- **Correlation is not effect:** according to an Ahrefs report from May 2026, pages cited by AI were about three times more likely to contain JSON-LD — but adding schema did not clearly increase citations (Search Engine Journal, September 2026).

Jason Barnard sums it up: markup should repeat what is already clear on the page. If the information is missing from the page, schema will not save you (July 2026). Schema does not replace a sentence.

## Why does structured data matter for AI visibility?

Its effect is indirect. Olaf Kopp (Aufgesang) calls Schema.org a “hygiene factor”: its influence runs through indexing, the knowledge graph and retrieval layers, not through the markup being read directly (May 2026). That matters for Google, because [AI Overviews](/en/knowledge/geo-glossary/ai-overviews/) and AI Mode build on the search index, and according to Google, AI Mode also draws on the Knowledge Graph. In an experiment by OtterlyAI, additional schema attributes improved visibility in Google and in AI Overviews, but not in ChatGPT (Thomas Peham, September 2026).

## What does this mean for your website?

- Mark up your company with Organization and point to your official profiles via sameAs.
- Add Person for authors, Product and Offer for products, and Article with dates for expert content.
- Write every detail from the markup as visible text on the page too — prices, product features, founding year.
- Deliver JSON-LD in the HTML rather than loading it via JavaScript. Seokratie's reasoning is that AI crawlers do not process JavaScript (August 2026).
- Keep markup and text consistent. Contradictions weaken both.

Expect clarity from structured data, not citations. Whether a page is cited depends on its text.
