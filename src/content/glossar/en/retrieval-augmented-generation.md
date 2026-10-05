---
title: "Retrieval-augmented generation (RAG)"
lang: en
de: retrieval-augmented-generation
seoTitle: "What is RAG? A clear guide"
seoDescription: "Retrieval-augmented generation (RAG) explained: its origin, the four steps, how it relates to grounding and what RAG means for your website's AI visibility."
shortDefinition: "Retrieval-augmented generation (RAG) is a method in which a language model retrieves matching texts from an external source before answering and bases its answer on those texts."
synonyms: ["RAG", "Retrieval augmented generation", "Retrieval-based generation"]
category: grundlagen
related: ["grounding", "model-knowledge", "vector-database", "hybrid-retrieval", "context-window", "grounding-snippets"]
pubDate: 2026-10-05
faq:
  - q: "Is RAG the same as grounding?"
    a: "Essentially, yes. In its guide to generative AI features, Google describes retrieval-augmented generation as a technique also known as grounding (Google Search Central, July 2026). RAG is the term from AI research and applies to any external source. Grounding is the term GEO practice uses when the source is web search."
  - q: "Do Google AI Overviews and AI Mode use RAG?"
    a: "Yes. Google explicitly names retrieval-augmented generation as a technique behind its generative AI features such as AI Overviews and AI Mode. Its core ranking systems retrieve relevant, up-to-date pages from the Search index, and the answer links to those pages (Google Search Central, July 2026)."
  - q: "Where does the term RAG come from?"
    a: "From the paper “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks” by Patrick Lewis and colleagues, submitted in May 2020 and published at the NeurIPS 2020 conference. The authors were affiliated with Facebook AI Research, University College London and New York University."
---

Retrieval-augmented generation (RAG) is a method in which a [language model](/en/knowledge/geo-glossary/llm/) retrieves matching texts from an external source before answering and bases its answer on those texts. The model then does not answer from its [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) alone, but from what it has just looked up for this question.

## Where does the term RAG come from?

The term comes from the paper “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks” by Patrick Lewis and eleven co-authors from Facebook AI Research, University College London and New York University. It was submitted in May 2020 and published at the NeurIPS 2020 conference ([arXiv:2005.11401](https://arxiv.org/abs/2005.11401)).

The authors combined a pre-trained language model with a dense vector index of Wikipedia, searched by a neural retriever. Their argument: knowledge stored in a model's parameters is hard to update and hard to attribute. An external store can be swapped out, and the retrieved passages show where a statement comes from. According to the paper, the RAG models produced more specific, more diverse and more factual text than a model without retrieval.

## How does RAG work?

A RAG system works in four steps:

1. **Query** — The system prepares the user's question and often splits it into several search queries ([query fan-out](/en/knowledge/geo-glossary/query-fan-out/)).
2. **Retrieval** — It looks for matching documents or sections: by keyword search, by vector search in a [vector database](/en/knowledge/geo-glossary/vector-database/), or both ([hybrid retrieval](/en/knowledge/geo-glossary/hybrid-retrieval/)).
3. **Context** — The best sections are placed in the model's [context window](/en/knowledge/geo-glossary/context-window/) together with the question.
4. **Generation** — The model writes the answer based on these sections and refers to the sources.

Mike King (iPullRank) describes the process in AI search systems like this: the query is turned into a vector, a vector search returns candidates, these are re-ranked, and the answer is built on the best passages. Between retrieval and context there is almost always a [re-ranking](/en/knowledge/geo-glossary/re-ranking/) step.

## How does RAG differ from grounding?

In substance, very little. In its guide to generative AI features, Google describes retrieval-augmented generation as a technique “also known as grounding” (Google Search Central, last updated July 2026). Both terms describe the same principle: retrieve first, then answer.

The difference is one of perspective. RAG is the term from AI research and applies to any external source — a copy of Wikipedia, a product database, a company wiki. [Grounding](/en/knowledge/geo-glossary/grounding/) is the GEO view of the same principle when the source is web search. An internal chatbot with RAG draws on your own documents. An AI search engine with grounding draws on the web index, where your page competes with everyone else's.

## Why does RAG matter for AI visibility?

RAG is the mechanism through which current web content reaches AI answers. Google explicitly names RAG as a technique behind its generative AI features such as [AI Overviews](/en/knowledge/geo-glossary/ai-overviews/) and [AI Mode](/en/knowledge/geo-glossary/ai-mode/): its core ranking systems retrieve relevant, up-to-date pages from the Search index, and the answer shows prominent, clickable links to those pages (Google Search Central, July 2026).

This creates a hard condition. Lily Ray argues that the major AI search products rely on RAG, and that content which is not indexed and not ranking cannot enter the model's context window at all (Substack, March 2026). What is not retrieved cannot be cited.

Not every AI answer is produced by RAG. When a system answers without searching, only what it learned in training counts. For visibility you therefore need both routes: presence in the training data and presence in the results a RAG system retrieves.

## What does this mean for your website?

The page has to be indexed and rank for the query or its fan-out queries. Without that step it does not appear in retrieval. Classic SEO work — indexability, internal linking, rankings — remains the precondition for any citation.

After that, the individual section decides. RAG systems usually do not put whole pages into the context, but selected passages ([grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/)). Write sections that make sense on their own, open with the answer and cover exactly one topic ([chunking](/en/knowledge/geo-glossary/chunking/)). Whether this works is shown by the [citation rate](/en/knowledge/geo-glossary/citation-rate/) across your prompt set.
