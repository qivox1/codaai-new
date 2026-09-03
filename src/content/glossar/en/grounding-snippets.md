---
title: "Grounding Snippets"
lang: en
de: grounding-snippets
shortDefinition: "Grounding snippets are the text passages that an AI system extracts from source pages and places as excerpts in the model's context in order to generate the answer from them."
synonyms: ["Grounding chunks", "Snippets", "Source excerpts"]
category: pipeline
related: ["re-ranking", "grounded-response-generation", "citation", "semantic-chunking", "bottom-line-up-front"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "How long is a grounding snippet?"
    a: "Usually one to a few paragraphs: the section that answers the specific question, not the whole page. Analyses by dejan.ai on the extraction method and size of Google's grounding chunks show that the excerpts are cut tightly around the relevant statement."
  - q: "Can I see which grounding snippet from my page was used?"
    a: "Partly. Some systems show the cited section when you click on a source. Tools such as the grounding snippet extraction tool by dejan.ai simulate the extraction for a URL and show which passages count as candidates."
---

Grounding snippets are the text excerpts that an AI system cuts out of the source pages after [re-ranking](/en/knowledge/geo-glossary/re-ranking/). They are query-specific: it is not the page that is taken over but the section that answers the specific question. Together with the user question, these excerpts form the model context from which the answer is created ([grounded response generation](/en/knowledge/geo-glossary/grounded-response-generation/)).

## How do grounding snippets work?

After re-ranking, the passages that lie above the relevance threshold are fixed. The system extracts them tightly around the relevant statement, often one to a few paragraphs, and hands them to the language model with a reference to the source. From several snippets from different sources, the model then synthesises an answer. Snippets that carry a concrete statement are shown as a [citation](/en/knowledge/geo-glossary/citation/); snippets that merely confirm flow in without being named.

## Why do grounding snippets matter for AI visibility?

They are the unit in which your content actually arrives in an answer. This leads to the core rule for content in AI search: "Optimize for pages to rank and passages to be relevant." The page has to be found, but it is the passage that gets cited. A 2,000-word article that hides the answer to a question in the second-to-last paragraph delivers a worse snippet than an 80-word section that begins with the answer.

## What does this mean for your website?

Build your pages from sections that work as a snippet: heading in question format, first sentences with the answer ([Bottom Line Up Front](/en/knowledge/geo-glossary/bottom-line-up-front/)), concrete figures and names, no references to other parts of the page. Name your brand explicitly in such sections, otherwise the passage gets cited without your name being mentioned.
