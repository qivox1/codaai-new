---
title: "Vector database"
lang: en
de: vektordatenbank
seoTitle: "Vector database: explained"
seoDescription: "Vector databases explained: what they store, how approximate nearest neighbour (ANN) search works, which kinds exist and what they mean for your website."
shortDefinition: "A vector database is a store for embeddings, the numerical vectors that represent the meaning of texts. For a given query, it finds the stored vectors that lie closest to it."
synonyms: ["Vector store", "Vector index", "Vector DB"]
category: grundlagen
related: ["embedding", "cosine-similarity", "chunking", "retrieval-augmented-generation", "semantic-search", "hybrid-retrieval"]
pubDate: 2026-10-05
faq:
  - q: "Does a RAG system always need a vector database?"
    a: "No. Retrieval also works with keyword search, for example BM25. Anthropic even states that a knowledge base under 200,000 tokens fits into the prompt as a whole, in which case no RAG is needed (Anthropic, September 2024). A vector database pays off once the volume of text is large and the search should work by meaning."
  - q: "How does a vector database differ from a traditional database?"
    a: "A traditional database searches for exact values or words. A vector database searches for closeness: it returns the entries whose vector is most similar to the query vector, even if not a single word matches."
  - q: "What kinds of vector database are there?"
    a: "There are three groups: extensions of existing databases such as pgvector for PostgreSQL, standalone vector databases such as Pinecone, and vector stores built into AI platforms, such as OpenAI's vector stores. Which one fits depends on data volume, infrastructure and operating model."
---

A vector database is a data store that holds texts, images or other content as [embeddings](/en/knowledge/geo-glossary/embedding/) — long numerical vectors that represent their meaning. It does not answer the question “Which document contains this word?” but “Which entries lie closest to this query?”. That makes it the store behind [semantic search](/en/knowledge/geo-glossary/semantic-search/) and behind many systems for [retrieval-augmented generation](/en/knowledge/geo-glossary/retrieval-augmented-generation/).

## What does a vector database store?

Each entry has three parts: the vector, the original text or a reference to it, and metadata such as file name, date or language. Before texts go into the database, they are split into sections ([chunking](/en/knowledge/geo-glossary/chunking/)) and translated into vectors by an embedding model.

OpenAI documents what this looks like in practice for its vector stores: every file added is automatically chunked, embedded and indexed. By default, the chunks are 800 tokens long with a 400-token overlap (OpenAI documentation, as of October 2026). The metadata later serves as a filter, for example for a particular department or time period.

## How does search in a vector database work?

The query is translated into a vector with the same embedding model. The database then looks for the nearest neighbours: the stored vectors with the smallest distance or the highest similarity, measured for example by [cosine similarity](/en/knowledge/geo-glossary/cosine-similarity/). The result is a list of the most similar sections with their similarity scores.

An exact search compares the query with every single vector. With millions of entries, that takes too long. Vector databases therefore usually rely on approximate nearest neighbour search (ANN): an index checks only part of the vectors and accepts that it will occasionally miss a close neighbour.

A widely used ANN method is HNSW (Hierarchical Navigable Small World), a multi-layer graph that Yu. A. Malkov and D. A. Yashunin presented in March 2016. The search moves from coarse to fine layers and gradually homes in on the most similar vectors.

## Which types of vector database exist?

The systems fall into three groups. The list is not a ranking.

| Group | Example | Characteristic |
|---|---|---|
| Extension of an existing database | pgvector for PostgreSQL | vectors sit alongside the other data |
| Standalone vector database | Pinecone | built specifically for vector search |
| Built into AI platforms | OpenAI vector stores | chunking and embedding run automatically |

[pgvector](https://github.com/pgvector/pgvector) describes itself as open-source vector similarity search for Postgres. According to the project page, it supports exact and approximate nearest neighbour search, the index types HNSW and IVFFlat, and distance measures including Euclidean distance, inner product and cosine distance.

## Why does a vector database matter for AI visibility?

In a vector database, it is not the page that competes but the section. Scott Stouffer explained at SEO Week 2026 that AI systems break pages into chunks, map them into vector space and retrieve them by semantic similarity rather than by evaluating the whole page. A small passage can therefore outperform an entire page (iPullRank, May 2026).

Care is needed when applying this to web search. Kai Spriestersbach points out that the documented chunking defaults come from enterprise RAG products, not from Google web search (AFAIK, August 2026). For its AI features, Google describes retrieval through the core ranking systems of Search; its guide does not mention a vector database (Google Search Central, July 2026).

## What does this mean for your website?

An embedding condenses the meaning of a whole section into one vector. If a section covers two topics, its vector lies between the two — and therefore further from each individual question. Write one topic per paragraph ([semantic chunking](/en/knowledge/geo-glossary/semantic-chunking/)) and lead with the key statement.

Name things consistently. Products, services and technical terms should carry the same name on every page, so that the sections land in vector space where questions about them are asked. A vector database cannot replace indexing: in web search, only what has been found beforehand enters the comparison ([initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/)).
