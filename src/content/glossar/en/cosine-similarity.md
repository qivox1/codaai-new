---
title: "Cosine similarity"
lang: en
de: kosinus-aehnlichkeit
shortDefinition: "Cosine similarity measures how similar two text vectors are, for example a page's main content and a search query. The higher the value, the more likely the content counts as relevant."
synonyms: ["Semantic similarity", "Vector similarity"]
category: grundlagen
related: ["embedding", "query-coverage", "re-ranking", "semantic-chunking"]
pubDate: 2026-09-03
faq:
  - q: "Which cosine similarity value is good?"
    a: "There is no fixed threshold; the values depend on the embedding model. What makes sense is the comparison: is your page's main content closer to the target question than the content of the pages the AI cites today? That is the question that counts."
  - q: "How do I increase the cosine similarity to a search query?"
    a: "By having the section answer the question directly, begin with the term being asked about and contain nothing unrelated. Promotional sentences, introductions and changes of topic pull the vector away from the question."
---

Cosine similarity is a mathematical measure of how similar two vectors are. In AI systems it is used to calculate how close the [embedding](/en/knowledge/geo-glossary/embedding/) vector of a text section lies to the vector of a search query. The value ranges from −1 to 1; the closer to 1, the more similar the meaning.

## How does cosine similarity work?

Two texts are translated into vectors. Cosine similarity is the cosine of the angle between these vectors: if they point in the same direction, the value is close to 1; if they are perpendicular to each other, it is 0. Because only the direction counts and not the length, the measure is independent of how long a text is; a short, precise section can be closer to a question than a long article.

In the [retrieval pipeline](/en/knowledge/geo-glossary/initial-retrieval/) of an AI system, cosine similarity is a central criterion for which passages clear the relevance threshold in [re-ranking](/en/knowledge/geo-glossary/re-ranking/).

## Why does cosine similarity matter for AI visibility?

It is the technical version of the question "Does this content match the query?". Classic SEO answers this question via keywords and links; AI systems answer it via closeness of meaning. A page can rank for a keyword and still have a low value for the specific user question if its main content only touches on the question. It is then found, but not cited.

## What does this mean for your website?

Compare the main content of your important pages with the questions from your [prompt set](/en/knowledge/geo-glossary/prompt-set/). Sections that answer a question directly and begin with the term being asked about lie closer to the query than sections with an introduction, promotion and changes of topic. Cover the related questions too ([query coverage](/en/knowledge/geo-glossary/query-coverage/)), because an AI system rarely asks just one.
