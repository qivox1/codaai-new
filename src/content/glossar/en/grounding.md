---
title: "Grounding"
lang: en
de: grounding
shortDefinition: "Grounding is the process of anchoring an AI answer in external, current sources: the system finds matching web pages, extracts the relevant passages and builds the answer on them."
synonyms: ["Search grounding", "Grounded response", "Source anchoring"]
category: grounding
related: ["web-search", "grounding-snippets", "grounded-response-generation", "grounding-budget", "citation", "document-relevance"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Why is grounding the lever for classic SEO in AI answers?"
    a: "Because grounding begins with a search. Only pages that rank near the top for the query or its fan-out queries come into question as a source. No ranking, no grounding; no grounding, no citation. The sequence cannot be skipped."
  - q: "Does grounding with live retrieval take place in Google AI Overviews?"
    a: "Usually not in the form of a page fetch that shows up in the server log. Google accesses its existing index. That is why log files say nothing about visibility in AI Overviews and AI Mode."
---

Grounding is the process by which an AI system builds its answer on external sources instead of answering from [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) alone. The system searches for web pages that match the question, extracts the relevant passages from them and presents them to the language model as context. The answer is then "grounded": it rests on concrete texts that the system can point to.

## How does grounding work?

Grounding begins with the [web search](/en/knowledge/geo-glossary/web-search/), which the system triggers when its confidence in an answer from memory is low. One question produces several search queries ([query fan-out](/en/knowledge/geo-glossary/query-fan-out/)). For each of them, the top-ranked pages are collected ([initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/)), then individual passages are evaluated ([re-ranking](/en/knowledge/geo-glossary/re-ranking/)). The best passages are extracted as [grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/) and placed in the model's context together with the user's question, personalisation and any attached media. From this the answer is produced, with citations to the sources the snippets came from.

In Google AI Overviews and AI Mode, this access usually does not take place as a live fetch of your page but against the existing Google index. A server log shows nothing there. Gemini additionally applies a [grounding budget](/en/knowledge/geo-glossary/grounding-budget/): whoever ranks better gets more room.

## Why does grounding matter for AI visibility?

Grounding is the path through which classic SEO feeds into the AI answer, and the only path for everything the model does not know from training. The rule is: no ranking, no grounding, no AI visibility. Whoever is not among the top results in the underlying search for the query or its fan-out queries is not even recognised as a citable source ([document relevance](/en/knowledge/geo-glossary/document-relevance/)).

## What does grounding mean for your website?

Two things have to come together: the page must rank, and the passage must convince. The first is classic SEO work — indexability, internal linking, rankings for main and fan-out queries. The second is content work at paragraph level: direct answers, clear structure, fact density. Whether it works is shown by the [citation rate](/en/knowledge/geo-glossary/citation-rate/) across your [prompt set](/en/knowledge/geo-glossary/prompt-set/), not by traffic.
