---
title: "Document Relevance"
lang: en
de: document-relevance
shortDefinition: "Document relevance is the ‘classic SEO share’ of grounding: a page must rank among the top results for the query or its fan-out queries to be considered a citable source at all."
synonyms: ["Page relevance", "Document-level relevance"]
category: grounding
related: ["initial-retrieval", "grounding", "query-fan-out", "re-ranking", "index-management"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Is a good Google ranking enough for document relevance in ChatGPT?"
    a: "No, because ChatGPT mostly accesses the Bing index. Document relevance has to hold in the index that the respective AI system uses. If you only rank well in Google, you may be invisible to ChatGPT."
  - q: "Is document relevance the same as citation?"
    a: "No. Document relevance decides whether a page enters the candidate pool. Whether it gets cited is decided afterwards by re-ranking at passage level. Being found is the prerequisite, not the result."
---

Document relevance is the relevance of an entire page for a search query, as a search engine assesses it in its ranking. In the grounding process of an AI system it is the first filter: only pages that rank among the top search results for the query or one of its [fan-out queries](/en/knowledge/geo-glossary/query-fan-out/) are recognised as possible sources. This is the "classic SEO part" within GEO.

## How does document relevance work?

An AI system does not re-rank pages itself. It takes over the result lists of a search index, Bing for ChatGPT and Copilot, Google for AI Overviews, AI Mode and Gemini, its own index in the case of Perplexity, and treats the top positions as candidates for the [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/). The higher the position, the greater the probability of entering the candidate pool, and with Gemini the greater the [grounding budget](/en/knowledge/geo-glossary/grounding-budget/).

## Why does document relevance matter for AI visibility?

It is the entry ticket. Without ranking there is no retrieval, without retrieval no grounding, without grounding no citation. At the same time it is only the entry ticket: in the study "AI Blind Test 2026" by CodaAI, classic rankings and mentions in AI answers are only weakly correlated. Good SEO visibility does not guarantee a mention. The reason lies in the next step: after retrieval, the system assesses passages, not pages ([re-ranking](/en/knowledge/geo-glossary/re-ranking/)).

## What does this mean for your website?

Keep the SEO fundamentals intact: indexable URLs, crawlability, internal and external links, rankings for main and fan-out queries, in Google and in Bing. Check Bing separately, because that is where ChatGPT gets its candidates. And treat the ranking as a prerequisite, not a goal: what is on the page must then hold up at paragraph level.
