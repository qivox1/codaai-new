---
title: "Semantic search"
lang: en
de: semantische-suche
seoTitle: "Semantic search: definition"
seoDescription: "Semantic search explained: how searching by meaning works, how it differs from keyword search and how to structure your website content so that it gets found."
shortDefinition: "Semantic search is a search method that finds results by their meaning rather than by matching words. The query and the texts are compared as embeddings, so sections with no words in common can still match."
synonyms: ["Meaning-based search", "Vector search", "Dense retrieval"]
category: pipeline
related: ["embedding", "cosine-similarity", "hybrid-retrieval", "vector-database", "entity", "semantic-chunking"]
pubDate: 2026-10-05
faq:
  - q: "How does semantic search differ from keyword search?"
    a: "Keyword search counts matching words. Semantic search compares meanings, calculated as embeddings. It therefore also finds texts that answer the question in completely different words, but it sometimes misses exact terms such as part numbers."
  - q: "Does Google use semantic search?"
    a: "Google describes several systems that match meaning rather than just words: RankBrain since 2015, neural matching since 2018 and BERT since 2019 (Pandu Nayak, Google, February 2022). For its AI features, Google also names retrieval-augmented generation based on its core ranking systems."
  - q: "Does semantic search make keywords obsolete?"
    a: "No. Many systems combine semantic search with a word-based search such as BM25 (hybrid retrieval). Word-based search is stronger when exact terms matter. A good section therefore uses the search term verbatim and explains it clearly."
---

Semantic search is a search method that finds results by their meaning rather than by matching words. To do this, the query and the documents are represented as [embeddings](/en/knowledge/geo-glossary/embedding/), numerical vectors that capture their meaning. What counts is closeness in content to the question — even if not a single word matches.

## How does semantic search work?

An embedding model translates every text section into a vector. The vectors are usually kept in a [vector database](/en/knowledge/geo-glossary/vector-database/). When someone searches, the query is translated into a vector with the same model. The system then identifies the sections whose vectors lie closest to the query vector, measured for example by [cosine similarity](/en/knowledge/geo-glossary/cosine-similarity/).

Mike King (iPullRank) sums up the principle like this: documents sit as embeddings in a multi-dimensional space, and the documents whose embeddings are closest to the query embedding are considered the most relevant.

## How do semantic search and keyword search differ?

Keyword search asks: which words do the query and the text share? Semantic search asks: what do the query and the text mean? OpenAI illustrates the difference in its [Retrieval API documentation](https://developers.openai.com/api/docs/guides/retrieval) with the question “When did we go to the moon?”:

| Text | Keyword similarity | Semantic similarity |
|---|---|---|
| The first lunar landing occurred in July of 1969. | 0% | 65% |
| The first man on the moon was Neil Armstrong. | 27% | 43% |
| When I ate the moon cake, it was delicious. | 40% | 28% |

The best answer contains none of the words in the question and still has the highest semantic similarity. The sentence about the moon cake shares the most words with the question and is useless as an answer. OpenAI measures keyword similarity as the share of shared words (intersection over union) and semantic similarity by cosine similarity (OpenAI documentation, as of October 2026).

Semantic search also has a weakness: it matches exact strings such as model designations or error codes less reliably. That is why many systems combine both methods ([hybrid retrieval](/en/knowledge/geo-glossary/hybrid-retrieval/)).

## Since when has Google searched by meaning?

Google stopped matching words alone a long time ago. In February 2022, Pandu Nayak (Google) described three stages: RankBrain, from 2015, understood how words relate to concepts. Neural matching, from 2018, understood how queries relate to pages. BERT, from 2019, understood how combinations of words express meaning and intent.

His example for RankBrain: a question about the title of the consumer at the highest level of a food chain leads to “apex predator”, although the term does not appear in the question.

## Why does semantic search matter for AI visibility?

AI systems search for topics, not addresses. Jairo Guerrero explains in a conversation with the tool vendor AirOps that vector search does not pick up specific URLs but topics and [entities](/en/knowledge/geo-glossary/entity/) related to the original query (AirOps, July 2026). A section is found when its meaning fits the question.

iPullRank argues in its AI Search Manual that in GEO, keyword density matters less than clarity, relevance and how well content maps into vector space. Repeating the same word ten times does not move a section closer to the question. Answering it precisely does.

## What does this mean for your website?

Write for meaning without losing the terms. Three rules help:

- **Synonyms and variants** — Use the technical term verbatim and explain it in your customers' words. The section then suits both word-based and meaning-based search.
- **Name entities clearly** — Give products, people, places and standards their full names, not just “it” or “our system”.
- **One topic per paragraph** — A paragraph with one topic sits closer to the matching question in vector space than a paragraph with two ([semantic chunking](/en/knowledge/geo-glossary/semantic-chunking/)).

Also check whether your pages cover the related questions on a topic ([query coverage](/en/knowledge/geo-glossary/query-coverage/)). Semantic search rewards content that answers the question asked — not content that merely contains its words.
