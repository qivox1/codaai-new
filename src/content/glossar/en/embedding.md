---
title: "Embedding"
lang: en
de: embedding
shortDefinition: "An embedding is the translation of a text into a numeric vector that represents its meaning. Texts with similar meaning lie close to each other in vector space."
synonyms: ["Vector representation", "Text embedding", "Vector database"]
category: grundlagen
related: ["cosine-similarity", "chunking", "token", "re-ranking"]
pubDate: 2026-09-03
faq:
  - q: "What is a vector database for embeddings?"
    a: "A store for embeddings that does not search for exact words but for the vectors closest in content to a query. AI systems store the chunks of web pages there and, when a question arrives, find the semantically best-matching sections in milliseconds."
  - q: "Can I compute embeddings for my own content?"
    a: "Yes. Embedding models such as SentenceTransformer or the embedding APIs of the major providers can be used with a few lines of code. This lets you check how close a page's main content is to the questions it should be found for."
---

An embedding is the representation of a text as a long numeric vector, for example "0.0321 · 0.0539 · −0.0217 · …" across several hundred or thousand dimensions. An embedding model such as SentenceTransformer or the embeddings of the major AI providers produces these vectors so that texts with similar meaning lie close together, regardless of whether they use the same words.

## How do embeddings work?

An AI system splits web pages into sections ([chunking](/en/knowledge/geo-glossary/chunking/)), converts each section into a vector and stores it in a vector database. When a user asks a question, the question is also translated into a vector. The system then searches for the sections whose vectors are closest to the question vector. The measure for this is [cosine similarity](/en/knowledge/geo-glossary/cosine-similarity/).

The decisive difference from keyword search: a page does not have to contain the question word for word to be found. It has to answer it in substance. Conversely, repeating a keyword twenty times achieves nothing; the vector represents meaning, not frequency.

## Why do embeddings matter for AI visibility?

Embeddings are the reason why, in AI systems, passages that answer a question directly and in a focused way win. A section that mixes three topics produces a blurred vector that does not really fit any question. A section that answers exactly one question produces a sharp vector that lands near the top for exactly that question.

## What does this mean for your website?

Write in sections that each deal with one topic and begin with the term they are about. Phrase your customers' questions as headings and answer them directly underneath. If you want to measure it: calculate the cosine similarity between a page's main content and the questions it should be found for. That is the technical version of "does the text match the query?".
