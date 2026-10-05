---
title: "LLM readability"
lang: en
de: llm-readability
seoTitle: "LLM readability: idea & critique"
seoDescription: "LLM readability explained: Olaf Kopp's concept and its target values, the critique from Kai Spriestersbach and Google — and which parts hold up."
shortDefinition: "LLM readability is a concept coined in 2024 by Olaf Kopp (Aufgesang): content should be written and structured so that language models can process it easily and cite it as a source."
synonyms: ["LLM-Lesbarkeit", "LLM Readability Optimization", "AI readability", "Readability for LLMs"]
category: content
related: ["chunking", "semantic-chunking", "bottom-line-up-front", "information-gain", "citation-rate", "cosine-similarity"]
pubDate: 2026-10-05
faq:
  - q: "Are paragraphs under 400 characters necessary for LLM readability?"
    a: "There is no evidence for it. The 400 characters are a target from Olaf Kopp's concept. Kai Spriestersbach finds no basis for this value in the sources cited, and Google states that content does not need to be broken into small pieces. What matters is that a paragraph makes sense on its own."
  - q: "Is there a reliable score for LLM readability?"
    a: "No. Aufgesang has developed its own LLM readability index, but there is no standardised definition and no validated score, according to Kai Spriestersbach (August 2026). Measure the effect by citations in AI answers instead, not by a score."
---

LLM readability is a concept that Olaf Kopp (Aufgesang) developed in 2024 as a sub-discipline of [GEO](/en/knowledge/geo-glossary/geo/). It describes how well large language models can process and understand content, and aims to get passages cited as a source more often. The term is contested: critics such as Kai Spriestersbach consider the basic idea useful but the specific target values unproven.

## What does Olaf Kopp mean by LLM readability?

Aufgesang names seven key factors: language quality, structure, relevance of individual text sections, match with user intent, information hierarchy following the Minto pyramid (key message first), context management with high information density, and consistency and specificity (Aufgesang, February 2026). From these, the concept derives specific target values — as Kopp's guidance, not as research findings:

- self-contained paragraphs of fewer than 400 characters,
- a total length of 1,200 to 1,500 words,
- consistent terminology for all core terms and entities.

For measurement, Aufgesang has developed its own LLM readability index. Kopp places LLM readability alongside Brand Context Optimization and [Agentic Commerce](/en/knowledge/geo-glossary/agentic-commerce/) Optimization and considers it most relevant for publishers (Kopp, July 2026).

## How does LLM readability work according to the concept?

The rationale rests on [retrieval-augmented generation](/en/knowledge/geo-glossary/retrieval-augmented-generation/): AI search systems retrieve documents, extract relevant parts and pass them to the model as context. According to Aufgesang, well-structured, information-rich blocks with direct answers are more likely to be selected and cited. Short, self-contained paragraphs are meant to anticipate the shape of the sections the system processes ([chunking](/en/knowledge/geo-glossary/chunking/)).

## What does Kai Spriestersbach criticise about LLM readability?

Kai Spriestersbach considers the term “useful as a framework, overstated as a ranking promise” (AFAIK, August 2026). He credits Aufgesang with openly labelling the concept as its own development. His objections concern the rationale:

| Point | Kopp's concept | Counter-position |
|---|---|---|
| Paragraph length | under 400 characters | No basis in the sources cited; documented chunk sizes of RAG products range from 300 to 1,024 tokens (Spriestersbach) |
| Text length | 1,200–1,500 words | “There's no ideal page length” (Google, July 2026) |
| Effect of formatting | structure increases the chance of citation | In the “What Gets Cited” experiment (SIGIR 2026, 252,000 trials, six models), formatting factors showed no consistent effect |
| Splitting into small units | self-contained short sections | Danny Sullivan (Google) in January 2026: “We don't want you to do that” |

Google puts it this way in its AI optimisation guide: there is no requirement to break content into tiny pieces, because Google's systems can distinguish several topics on one page (Google Search Central, July 2026). Google does not reject good structure — what it rejects is fragmenting content for machines.

## Why does LLM readability matter for AI visibility?

Both sides share one assumption: a passage is only cited if it makes sense when lifted out of the page. The dispute is about thresholds and about whether formatting alone has an effect. The strongest documented levers lie in the content: in the GEO paper (KDD 2024), statistics, quotations and source citations produced the largest effects, while pure readability edits achieved clearly less (as analysed by Spriestersbach, August 2026). That argues for [information gain](/en/knowledge/geo-glossary/information-gain/) over cosmetic formatting.

## What does this mean for your website?

Adopt what holds up and leave out the numerical targets:

- **One topic per paragraph:** a test by Mike King (SparkToro Office Hours, January 2026) shows that a paragraph with one topic is closer to the search query than one with two ([cosine similarity](/en/knowledge/geo-glossary/cosine-similarity/)).
- **Self-contained statements:** every key statement names the entity, the value and the context — without “as described above”.
- **Answer first:** put the key message at the start ([bottom line up front](/en/knowledge/geo-glossary/bottom-line-up-front/)).
- **Consistent terms:** one name per product, service and concept.

According to Spriestersbach, readability formulas such as Flesch only work as a guardrail. If you have a model simplify your texts, compare the statements in every version with the original — simplification cuts qualifications first. Whether the revision works is shown by the [citation rate](/en/knowledge/geo-glossary/citation-rate/), not by a score.
