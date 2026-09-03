---
title: "Query Fan-out"
lang: en
de: query-fan-out
shortDefinition: "Query fan-out is the splitting of a user question into several related search queries that an AI system sends to the search index in parallel to collect sources for its answer."
synonyms: ["Fan-out queries", "Query expansion", "Fan-out"]
category: grounding
related: ["query-coverage", "initial-retrieval", "grounding", "prompt-set", "topical-authority"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "How do I find the fan-out queries for my topics?"
    a: "From four sources: the follow-up questions AI systems display or pick up in their answers, the ‘People also ask’ boxes in Google, support tickets and sales conversations. What customers actually ask is the best approximation of what the AI queries internally."
  - q: "Do I need a separate page for every fan-out query?"
    a: "No. A topic cluster made of one main page and well-structured sections or subpages is enough, as long as every related question is answered directly somewhere. What matters is that your domain appears for the main query and the fan-out queries, not that there is one URL per question."
---

Query fan-out is the process by which an AI system does not answer a prompt with a single search but splits it into several sub-queries. "Which supplementary dental insurance is worth it for children?", for example, becomes "supplementary dental insurance children cost", "supplementary dental insurance children benefits comparison" and "supplementary dental insurance children waiting period". For each of these fan-out queries, the system collects its own candidate pages.

## How does query fan-out work?

The language model analyses the user question, identifies the sub-aspects it contains and formulates search queries for them, often three to ten, depending on complexity. These are sent to the search index in parallel. The results of all fan-out queries together form the candidate pool for the [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/). A page that does not rank for the main query can therefore still enter the pool if it ranks high for one of the sub-questions, and vice versa.

## Why does query fan-out matter for AI visibility?

Query fan-out shifts the goal from "ranking for a keyword" to "ranking for a topic area". If you only serve the main query, you cover a fraction of the searches an AI system actually runs. If you cover the topic area ([query coverage](/en/knowledge/geo-glossary/query-coverage/)), you appear in several partial results and increase your chance of being considered in re-ranking and grounding. That is the technical rationale for topic clusters instead of individual keyword-optimised pages ([topical authority](/en/knowledge/geo-glossary/topical-authority/)).

## What does this mean for your website?

Think in questions, not keywords. For each core topic, collect the questions customers ask before, during and after a decision, and answer them directly, as headings in question format with a clear answer underneath. Then check for which of these questions your domain is visible in Google and Bing. The gaps are your topic list.
