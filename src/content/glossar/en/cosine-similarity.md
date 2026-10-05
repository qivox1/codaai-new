---
title: "Cosine similarity"
lang: en
de: kosinus-aehnlichkeit
seoTitle: "Cosine Similarity: Formula"
seoDescription: "Cosine similarity explained: the formula, a worked example, Python code, how it differs from the dot product – and why it shapes which passages AI cites."
shortDefinition: "Cosine similarity measures how similar two vectors are: their dot product divided by the product of their lengths. AI systems use it to judge how well a text passage matches a search query."
synonyms: ["Semantic similarity", "Vector similarity", "Cosine similarity score"]
category: grundlagen
related: ["embedding", "chunking", "initial-retrieval", "re-ranking", "query-coverage", "semantic-chunking", "hybrid-retrieval"]
pubDate: 2026-09-03
updatedDate: 2026-10-05
faq:
  - q: "Which cosine similarity value is good?"
    a: "There is no fixed threshold; the values depend on the embedding model. What makes sense is the comparison: is your page's main content closer to the target question than the content of the pages the AI cites today? That is the question that counts."
  - q: "How do I increase the cosine similarity to a search query?"
    a: "By having the section answer the question directly, begin with the term being asked about and contain nothing unrelated. Promotional sentences, introductions and changes of topic pull the vector away from the question."
  - q: "Is cosine similarity the same as the dot product?"
    a: "Only for normalised vectors. The dot product depends on the length of the vectors; cosine similarity divides the length out. If both vectors have length 1 — as OpenAI's embeddings do — the two values are identical."
  - q: "What is the difference between cosine similarity and cosine distance?"
    a: "Cosine distance is 1 minus cosine similarity. For similarity a higher value is better, for distance a lower one. Many vector databases report the distance, so always check which measure is shown before comparing results."
---

Cosine similarity is a mathematical measure of how similar two vectors are. In AI systems it is used to calculate how close the [embedding](/en/knowledge/geo-glossary/embedding/) vector of a text section lies to the vector of a search query. The value ranges from −1 to 1; the closer to 1, the more similar the meaning.

## What is the cosine similarity formula?

The cosine similarity of two vectors A and B is their dot product divided by the product of their lengths:

```text
cos(θ) = (A · B) / (‖A‖ × ‖B‖)
```

The dot product A · B is the sum of the products of the individual components. The length ‖A‖ is the square root of the sum of the squared components. The result is the cosine of the angle θ between the two vectors: if they point in the same direction, the value is 1. If they are perpendicular, it is 0. If they point in opposite directions, it is −1.

## What does a worked cosine similarity example look like?

An example with two dimensions shows the principle. The search query has the vector q = (3, 4), two text sections have the vectors a = (6, 8) and b = (4, −3).

| Comparison | Dot product | Product of lengths | Cosine similarity |
|---|---|---|---|
| q and a | 3·6 + 4·8 = 50 | 5 × 10 = 50 | 50 / 50 = **1.0** |
| q and b | 3·4 + 4·(−3) = 0 | 5 × 5 = 25 | 0 / 25 = **0.0** |

Vector a is twice as long as q but points in the same direction, so the cosine similarity is still 1. Because only the direction counts and not the length, a short, precise section can be closer to a question than a long article. Vector b is perpendicular to q and has nothing to do with the query. Real embeddings have a few hundred to a few thousand dimensions instead of two; the calculation stays the same.

## How do you calculate cosine similarity in Python?

With NumPy, one line is enough:

```python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print(cosine_similarity(np.array([3, 4]), np.array([6, 8])))   # 1.0
print(cosine_similarity(np.array([3, 4]), np.array([4, -3])))  # 0.0
```

For texts, an embedding model supplies the vectors. The query and the section must be translated with the same model; values from different models are not comparable. For many vectors at once, the scikit-learn library provides the function `cosine_similarity`.

## How do cosine similarity, dot product and Euclidean distance differ?

All three measures describe how close two vectors are — in different ways:

- **Cosine similarity** measures only the angle. The length of the vectors plays no role.
- **Dot product** measures angle and length together. Longer vectors score higher.
- **Euclidean distance** measures the straight-line distance between the end points. A smaller value means more similar.

For normalised vectors with length 1, the differences disappear: the dot product then equals cosine similarity, and all three measures produce the same ranking. According to [OpenAI's embeddings FAQ](https://help.openai.com/en/articles/6824809-embeddings-faq), OpenAI's embeddings are normalised this way by default.

## How do AI systems use cosine similarity?

Search systems and language models place queries and documents as vectors in a shared space. Sections whose vector lies close to the query vector count as more relevant — measured, for example, by cosine similarity. That is how Mike King (iPullRank) describes it. In the [retrieval pipeline](/en/knowledge/geo-glossary/initial-retrieval/) of an AI system, this closeness is a central criterion for which passages clear the relevance threshold in [re-ranking](/en/knowledge/geo-glossary/re-ranking/).

Closeness of meaning is rarely the only signal. Many systems combine semantic search with a classic word-based search such as BM25 (hybrid retrieval). Word-based search performs better when exact terms matter — product names, standards, part numbers. A section should therefore offer both: the right meaning and the right words.

## Why does cosine similarity matter for AI visibility?

It is the technical version of the question "Does this content match the query?". Classic SEO answers this question via keywords and links; AI systems answer it via closeness of meaning. A page can rank for a keyword and still have a low value for the specific user question if its main content only touches on the question. It is then found, but not cited.

A test by Mike King shows how much structure matters: he split a paragraph that covered two topics into two paragraphs with one topic each. The cosine similarity to the topic "machine learning" rose from 0.6481 to 0.7477, the similarity to "data privacy" from 0.6948 to 0.7634 (SparkToro Office Hours, January 2026). A section with one topic sits closer to the question than a section with two.

## What does this mean for your website?

Compare the main content of your important pages with the questions from your [prompt set](/en/knowledge/geo-glossary/prompt-set/). Sections that answer a question directly and begin with the term being asked about lie closer to the query than sections with an introduction, promotion and changes of topic. Cover one topic per paragraph ([semantic chunking](/en/knowledge/geo-glossary/semantic-chunking/)) and the related questions too ([query coverage](/en/knowledge/geo-glossary/query-coverage/)), because an AI system rarely asks just one.

The effect can be measured: translate the target question and the section with the same embedding model and compare the cosine similarity before and after the revision. If the value rises, the section is closer to the question — whether it gets cited is then decided by the comparison with the other sources.
