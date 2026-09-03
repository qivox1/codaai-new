---
title: "Re-Ranking"
lang: en
de: re-ranking
shortDefinition: "Re-ranking is the second selection step of an AI system: individual text passages of the candidate pages are assessed, and only the most relevant ones pass the relevance threshold into the answer."
synonyms: ["Passage re-ranking", "Relevance threshold", "Cut-off"]
category: pipeline
related: ["initial-retrieval", "grounding-snippets", "semantic-chunking", "cosine-similarity", "information-gain"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "What is the relevance threshold in re-ranking?"
    a: "The cut-off below which passages are discarded. Only what lies above the threshold is processed further. That is why ‘roughly fitting’ is not enough: a passage must answer the question clearly enough to make the cut."
  - q: "What makes a passage relevant in re-ranking?"
    a: "Five properties: it answers the query directly, has a strong topical and semantic match, is clear and machine-readable, highly specific and focused, and it is high-quality and self-contained, understandable without the rest of the page."
---

Re-ranking is the step in which an AI system no longer assesses pages but passages. After the [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/), there is a candidate pool of pages. In re-ranking, the individual text sections of these pages are checked against the question, and only the most relevant ones advance a round. Whatever stays below the relevance threshold drops out, even if the page itself ranks well.

## How does re-ranking work?

The system splits the candidate pages into sections ([chunking](/en/knowledge/geo-glossary/chunking/)), calculates the semantic proximity of each section to the question ([cosine similarity](/en/knowledge/geo-glossary/cosine-similarity/)) and adds further signals: Does the section answer the question directly? Is it specific or general? Is it understandable without context? Then a threshold is applied, the "cut-off". Sections above it become [grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/), sections below it are discarded.

What makes a passage relevant can be summed up in five properties: it answers the query directly. It has a strong topical and semantic match. It is clear and easy to read, for machines too. It is highly specific and focused. And it is high-quality and self-contained.

## Why does re-ranking matter for AI visibility?

Re-ranking is the reason why good rankings do not guarantee a citation. "Being retrieved doesn't guarantee being cited": a page can be in the pool and still not get a single passage over the threshold, because its paragraphs are too general, too promotional or only understandable in context. Conversely, a page in position six can be cited with a single precise paragraph.

## What does this mean for your website?

Optimise at paragraph level. Every section that answers a customer question should begin with the term being asked about, deliver the answer in the first sentences and be understandable without the rest of the page ([semantic chunking](/en/knowledge/geo-glossary/semantic-chunking/)). Cut hedging and introductions, add figures, names and evidence ([information gain](/en/knowledge/geo-glossary/information-gain/)). The page has to rank, the passage has to convince.
