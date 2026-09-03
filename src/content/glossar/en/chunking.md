---
title: "Chunking"
lang: en
de: chunking
shortDefinition: "Chunking is the splitting of a text into small, self-contained sections (chunks) that an AI system stores, compares and uses in answers individually."
synonyms: ["Chunks", "Text segmentation", "Parsing & extraction"]
category: grundlagen
related: ["semantic-chunking", "embedding", "grounding-snippets", "bottom-line-up-front"]
pubDate: 2026-09-03
faq:
  - q: "How large is a chunk in chunking?"
    a: "Each system decides that for itself, often between a few sentences and a few paragraphs. Do not rely on a number: write so that each paragraph carries a complete statement on its own; then your text works at any chunk size."
  - q: "What happens during parsing before chunking?"
    a: "The raw text is extracted from the HTML and cleaned: navigation, scripts and ad spaces are removed, the main content remains. Clean, semantic HTML with a clear heading hierarchy makes this step easier and prevents content from being discarded as clutter."
---

Chunking is the systematic splitting of texts into small sections that an AI system processes individually. After parsing — extracting and cleaning the raw text from a web page — the content is cut into chunks, each chunk is translated into a vector ([embedding](/en/knowledge/geo-glossary/embedding/)) and stored. When a question arrives, the system does not search for matching pages but for matching chunks.

## How does chunking work?

The simplified processing chain of an AI system has six steps: collecting data sources, parsing and extraction, chunking, embeddings, storage in a vector database, retrieval and answer. Chunking sits in the middle and determines which unit is compared later. Some systems cut by fixed length, others along headings and paragraphs. In both cases the same applies: a chunk is evaluated without the rest of the page.

## Why does chunking matter for AI visibility?

Because AI systems extract passages, not pages. A paragraph that is only understandable with the context of the previous three paragraphs loses the comparison as soon as it stands alone. A paragraph that answers a question completely wins, even on an otherwise mediocre page. That is why the rule "Optimize for pages to rank and passages to be relevant" applies in GEO: the page has to rank, the passage has to convince.

## What does this mean for your website?

Write so that each paragraph is a self-contained answer on one topic and each sentence remains understandable without context. Avoid references such as "as described above". Put the core statement first ([Bottom Line Up Front](/en/knowledge/geo-glossary/bottom-line-up-front/)). What this looks like in practice is described under [semantic chunking](/en/knowledge/geo-glossary/semantic-chunking/).
