---
title: "Hybrid retrieval (BM25 and embeddings)"
lang: en
de: hybrid-retrieval
seoTitle: "Hybrid retrieval explained"
seoDescription: "Hybrid retrieval explained: how AI systems combine BM25 with embeddings, what reciprocal rank fusion does and what this means for the content on your website."
shortDefinition: "Hybrid retrieval is the combination of lexical search such as BM25 and semantic search with embeddings. Both result lists are merged into one ranking that takes exact terms and meaning into account at the same time."
synonyms: ["Hybrid search", "BM25 plus embeddings", "Lexical-semantic search"]
category: pipeline
related: ["initial-retrieval", "re-ranking", "embedding", "semantic-search", "vector-database", "retrieval-augmented-generation"]
pubDate: 2026-10-05
faq:
  - q: "What role does BM25 play in hybrid retrieval?"
    a: "BM25 is the lexical part. It scores documents by exact word matches and therefore reliably finds product names, standards and identifiers that an embedding model can miss. Semantic search adds the results that say the same thing in different words."
  - q: "How much does hybrid retrieval improve retrieval accuracy?"
    a: "In a test by Anthropic, the failure rate for retrieving the top 20 chunks fell from 5.7 per cent to 2.9 per cent when contextual embeddings were combined with contextual BM25. With added reranking it was 1.9 per cent (Anthropic, September 2024). The figures apply to that test set-up, not to web search."
  - q: "Does ChatGPT use hybrid retrieval?"
    a: "OpenAI has not officially described this for ChatGPT search. The tool vendor Peec AI reports a BM25 component alongside vector search in ChatGPT's shopping stack (September 2026). In its own Retrieval API, OpenAI offers a hybrid search that merges both result lists with reciprocal rank fusion."
---

Hybrid retrieval is the combination of lexical search and semantic search in a single retrieval step. Lexical search, usually BM25, finds documents through exact word matches. [Semantic search](/en/knowledge/geo-glossary/semantic-search/) finds documents through closeness of meaning, measured with [embeddings](/en/knowledge/geo-glossary/embedding/). Both result lists are merged into a shared ranking.

## What is BM25?

BM25 (Best Matching 25, often called Okapi BM25) is a ranking function for lexical search. It scores how well the words in a document match the search terms. Stephen Robertson and Hugo Zaragoza described the method comprehensively in 2009 in “The Probabilistic Relevance Framework: BM25 and Beyond”. Three factors determine the score:

- **Term frequency** — The more often a search term appears in the document, the higher the score. The effect saturates, though: each further occurrence adds less weight.
- **Inverse document frequency (IDF)** — Rare terms weigh more than words that appear in almost every document.
- **Document length** — Long documents are normalised so that they do not collect more matches simply because they are long.

BM25 does not understand meaning. In return, it recognises exact strings reliably. Anthropic gives the example of a search for “Error code TS-999” in a technical database: BM25 finds the exact match that semantic embeddings can miss (Anthropic, September 2024).

## How does hybrid retrieval work?

Both searches run in parallel over the same sections. Anthropic describes the process in its post on [contextual retrieval](https://www.anthropic.com/news/contextual-retrieval) (September 2024): split documents into chunks, find the best chunks by BM25 and by embedding similarity, merge both lists with rank fusion and remove duplicates, then add the best chunks to the prompt.

A widely used fusion method is reciprocal rank fusion (RRF), introduced by Gordon Cormack, Charles Clarke and Stefan Büttcher at the SIGIR 2009 conference. Each document receives the value 1 / (k + rank) for every result list it appears in; the values are added up. The authors set k = 60.

| Document | BM25 rank | Vector search rank | RRF score |
|---|---|---|---|
| A | 1 | 3 | 1/61 + 1/63 ≈ **0.0323** |
| B | — | 2 | 1/62 ≈ **0.0161** |

Document A ranks high in both lists and wins clearly. OpenAI uses this principle in its Retrieval API: two weights control how reciprocal rank fusion balances semantic matches against keyword matches (OpenAI documentation, as of October 2026). In many systems, fusion is followed by [re-ranking](/en/knowledge/geo-glossary/re-ranking/).

## Why combine BM25 and embeddings?

Both methods have blind spots. Mike King (iPullRank) explains that lexical search performs better when exact words and their frequency matter, while semantic search finds additional documents through synonyms. The combination covers both cases.

Anthropic measured the effect. The failure rate for retrieving the top 20 chunks was 5.7 per cent without optimisation, 3.7 per cent with contextual embeddings and 2.9 per cent with contextual BM25 added. With reranking it fell to 1.9 per cent, a reduction of 67 per cent (Anthropic, September 2024). The figures come from Anthropic's own test set-up, not from a web search.

## Why does hybrid retrieval matter for AI visibility?

AI systems do not search by meaning alone. Mike King said at SEO Week 2026 that search has shifted towards semantic systems, hybrid retrieval and agent-driven experiences (iPullRank, May 2026). For ChatGPT, the tool vendor Peec AI reports a BM25 component in the shopping stack that narrows the field to ten sources, alongside vector search and a rerank of 400 candidates (Peec AI, September 2026). OpenAI has not officially confirmed this architecture.

For your content, this means a section has to be found in [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/) through at least one of the two routes. It is strongest when it ranks high on both.

## What does this mean for your website?

Offer both: the right words and the right meaning. Use product names, standards, model designations and your customers' terms verbatim — at least once in exactly the form people search for. Synonyms help semantic search, but they do not replace the exact term.

Repeating keywords achieves nothing. BM25 saturates term frequency, and every superfluous sentence dilutes the section's embedding vector. A clear paragraph with one topic, the term being searched for and a direct answer performs well in both methods ([semantic chunking](/en/knowledge/geo-glossary/semantic-chunking/)).
