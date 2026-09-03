---
title: "Grounding Budget"
lang: en
de: grounding-budget
shortDefinition: "The grounding budget is the quota of pages and passages that an AI system, above all Gemini, draws on to ground an answer. Pages that rank well receive more of it."
synonyms: ["Grounding quota", "Grounding chunks"]
category: grounding
related: ["grounding", "initial-retrieval", "document-relevance", "grounding-snippets"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Why is the grounding budget particularly relevant for Gemini?"
    a: "Because Gemini ties the amount of grounding material to the ranking: pages that rank high for the query are allowed to contribute more passages. A good Google ranking is therefore even more important for Gemini and Google AI Overviews than for other systems."
  - q: "Can I influence the grounding budget?"
    a: "Only indirectly, through the ranking and through how extractable the passages are. The higher the position and the clearer the sections, the larger the share of your page in the context the model receives for the answer."
---

The grounding budget is the limited amount of pages and text passages that an AI system draws on for the [grounding](/en/knowledge/geo-glossary/grounding/) of a single answer. A language model's context is finite, every passage costs [tokens](/en/knowledge/geo-glossary/token/), and so the system has to decide which sources get how much room.

## How does the grounding budget work?

After the [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/), there is a list of candidate pages. The system distributes its budget along this list: pages placed high up may contribute more passages, pages placed further down fewer or none at all. With Gemini this relationship is particularly clear: the ranking determines how much grounding material a domain is allowed to supply. Analyses by dejan.ai on the size of Google's grounding chunks and articles by growth.pro on the Google AI grounding budget describe this mechanism in detail.

## Why does the grounding budget matter for AI visibility?

It explains why the position within the top results still counts, even though AI answers show no result list. Position one and position eight both enter the candidate pool, but position one gets more budget and with it a higher probability of being cited with a matching passage. For Gemini and Google AI Overviews, a good Google ranking is therefore more important, not less.

## What does this mean for your website?

Keep working on the position, not just on being present on page one. And make sure that the budget your page receives is not wasted on introductions and promotional copy: the passages that get extracted should answer the question. What such a passage looks like is described under [grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/).
