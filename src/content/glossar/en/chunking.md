---
title: "Chunking"
lang: en
de: chunking
seoTitle: "What Is Chunking? Methods"
seoDescription: "What is chunking? How AI systems split texts into sections, which chunking methods and chunk sizes exist – and how to write so that your passages count."
shortDefinition: "Chunking is the splitting of a text into small, self-contained sections (chunks) that an AI system stores, compares and uses in answers individually."
synonyms: ["Chunks", "Text segmentation", "Parsing & extraction", "Passage indexing"]
category: grundlagen
related: ["semantic-chunking", "embedding", "cosine-similarity", "grounding-snippets", "re-ranking", "bottom-line-up-front"]
pubDate: 2026-09-03
updatedDate: 2026-10-05
faq:
  - q: "How large is a chunk in chunking?"
    a: "Each system decides that for itself. The documented defaults of common RAG services range from 300 to around 1,000 tokens, roughly two to ten paragraphs. Do not rely on a number: write so that each paragraph carries a complete statement on its own; then your text works at any chunk size."
  - q: "What happens during parsing before chunking?"
    a: "The raw text is extracted from the HTML and cleaned: navigation, scripts and ad slots are removed, the main content remains. Clean, semantic HTML with a clear heading hierarchy makes this step easier and prevents content from being discarded as clutter."
  - q: "Do I have to cut my texts into short snippets for chunking?"
    a: "No. Google has spoken out explicitly against content cut into bite-size chunks, and there is no solid evidence for fixed paragraph lengths. What helps is one topic per paragraph and a core statement that is understandable without the rest of the page."
---

Chunking is the systematic splitting of texts into small sections that an AI system processes individually. After parsing — extracting and cleaning the raw text from a web page — the content is cut into chunks, each chunk is translated into a vector ([embedding](/en/knowledge/geo-glossary/embedding/)) and stored. When a question comes in, the system does not search for matching pages but for matching chunks.

## How does chunking work?

The simplified processing chain of an AI system has six steps: collecting data sources, parsing and extraction, chunking, embeddings, storage in a vector database, retrieval and answer. Chunking sits in the middle and determines which unit is compared later. For a query, the system calculates how close each chunk is to the question ([cosine similarity](/en/knowledge/geo-glossary/cosine-similarity/)) and passes the best ones to the language model. A chunk is assessed without the rest of the page.

For web search, the same principle applies under a different name: Mike King (iPullRank) equates chunking with passage indexing, through which Google began to assess not only whole pages but individual sections of a page.

## What chunking methods are there?

Chunking methods differ in where they cut the text:

- **Fixed size:** the text is cut after a fixed number of tokens, usually with overlap so that a statement at the cut is not lost.
- **Sentence- and paragraph-based:** the boundaries follow sentences or paragraphs. A chunk contains whole thoughts instead of cut-off ones.
- **Structure-based:** the boundaries follow the structure of the page — headings, lists, tables. Mike King considers this layout-aware approach more important than purely semantic chunking.
- **Semantic:** the system cuts where the meaning changes, measured by the similarity of consecutive sentences.
- **Recursive:** the text is first split at large boundaries (sections), then at smaller ones (paragraphs, sentences), until every chunk has the target size.

ChatGPT, Gemini and Perplexity do not publish which method they use for web pages. Only one thing is certain: the boundaries are set by the parser, not by the author.

## How large is a chunk in chunking?

Chunk size is measured in tokens. For developer services that companies use to build their own AI search, the defaults are documented. Kai Spriestersbach compiled them (AFAIK, August 2026):

| Service | Default chunk size | Overlap |
|---|---|---|
| OpenAI Vector Stores | up to 800 tokens | 400 tokens |
| Google RAG Engine | 1,024 tokens | 256 tokens |
| AWS Bedrock Knowledge Bases (fixed size) | 300 tokens | 20% |

No values have been published for ChatGPT's web search or Google's AI Overviews. The overlap shows, however, why fixed paragraph lengths achieve little: because neighbouring chunks overlap by 20 to 50 percent, the systems defuse boundary problems themselves.

## Why does chunking matter for AI visibility?

Because AI systems extract passages, not pages. A paragraph that is only understandable with the context of the previous three paragraphs loses out in comparison as soon as it stands alone. A paragraph that fully answers a question wins — even on an otherwise mediocre page. That is why the rule "Optimize for pages to rank and passages to be relevant" applies in GEO: the page has to rank, the passage has to convince.

## Do you need to cut content into small sections for chunking?

No. In January 2026, Danny Sullivan (Google) said on the podcast "Search Off the Record" that Google does not want content cut into bite-size chunks just because language models supposedly like it. Kai Spriestersbach reaches the same conclusion: there is no solid evidence for micro-paragraphs of 300 to 400 characters.

What does work is one topic per paragraph. In a test by Mike King, the semantic closeness to two topics rose measurably after a paragraph that mixed both was split into two paragraphs with one topic each. The rule is therefore not "shorter" but "clearer".

## What does this mean for your website?

Write so that each paragraph is a self-contained answer on one topic and each sentence remains understandable without context. Avoid references such as "as described above" and pronouns whose reference sits in the previous paragraph. Put the core statement first ([bottom line up front](/en/knowledge/geo-glossary/bottom-line-up-front/)) and structure with real headings, lists and tables instead of text in images. What this looks like in practice is described under [semantic chunking](/en/knowledge/geo-glossary/semantic-chunking/).
