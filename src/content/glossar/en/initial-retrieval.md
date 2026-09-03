---
title: "Initial Retrieval"
lang: en
de: initial-retrieval
shortDefinition: "Initial retrieval is the first selection step of an AI system: it collects the pages that rank best for the query and its fan-out queries into a candidate pool."
synonyms: ["Candidate pool", "Retrieval", "First-stage retrieval"]
category: pipeline
related: ["document-relevance", "query-fan-out", "re-ranking", "grounding-budget", "grounding"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "What is the candidate pool in initial retrieval?"
    a: "The set of all pages that qualify as possible sources after the initial retrieval, collected across all fan-out queries. Being in the pool is the entry ticket, nothing more: ‘Being retrieved doesn’t guarantee being cited’."
  - q: "How many pages enter the pool in initial retrieval?"
    a: "That varies by system and question, typically the top results of each fan-out query. The higher a page ranks, the more certain it is to be in the pool; beyond a certain position it is no longer considered."
---

Initial retrieval is the first of four steps in which an AI system selects the sources for an answer. The system takes the search queries from the [query fan-out](/en/knowledge/geo-glossary/query-fan-out/), fetches the best-placed pages from the search index for each of them and puts them into a shared candidate pool. The selection is based on topical relevance, exactly as in classic ranking.

## How does initial retrieval work?

Each fan-out query produces a result list. Position 1 enters the pool for certain, position 4 probably, position 15 hardly ever. Because several fan-out queries run in parallel, a page that does not rank for the main question can enter the pool via a sub-question. The result is a candidate list that says nothing yet about citation: it contains whole pages, not passages. Only the [re-ranking](/en/knowledge/geo-glossary/re-ranking/) assesses what is on these pages.

For Gemini there is one more factor: the position within the pool determines the [grounding budget](/en/knowledge/geo-glossary/grounding-budget/). Whoever ranks better is allowed to contribute more material.

## Why does initial retrieval matter for AI visibility?

It is the point where classic SEO decides. No ranking, no retrieval, and everything that follows happens without your page. At the same time it is only the entry ticket: "Being retrieved doesn't guarantee being cited." A page fetch in the server log shows that a page was in the pool, not that it ended up in the answer.

## What does this mean for your website?

Make sure your important pages rank among the top results for the main query and the related questions, in Google and in Bing, because the AI systems use different indexes. Check [index management](/en/knowledge/geo-glossary/index-management/) and crawlability, because a page that is not in the index cannot be retrieved. And prepare the page for the next step: in the pool the page counts, in re-ranking the passage counts.
