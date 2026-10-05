---
title: "Citation"
lang: en
de: citation
seoDescription: "Citation explained: when an AI answer links a specific source URL, what has to happen first – retrieval, extraction, selection – and how to earn citations."
shortDefinition: "A citation is an AI answer's reference to a specific source (URL). It requires that the page was found, a passage was extracted and that passage was used for the answer."
synonyms: ["AI citation", "Source link", "Source reference", "Retrieved vs. cited"]
category: pipeline
related: ["mention", "citation-rate", "grounding-snippets", "re-ranking", "zero-click", "citation-share"]
pubDate: 2026-09-03
updatedDate: 2026-10-05
stufe: 3
faq:
  - q: "Does a citation bring traffic?"
    a: "Rarely much. Most users read the answer and do not click on a source. The value of a citation lies in its role as evidence: whoever is cited shapes the answer and is perceived as an authority, even without a click."
  - q: "Is a citation higher up in the source list worth more?"
    a: "Usually yes, because it is more likely to be seen and mostly backs the central statement of the answer. But cited is not yet visible: a source in eighth place in an expanded list brings hardly any presence. That is why measurement also counts the position."
---

A citation is the reference to a source in an AI answer, as a link, footnote or source card pointing to a specific URL. It is the result of the entire selection chain: the page was found in the [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/), a passage passed the [re-ranking](/en/knowledge/geo-glossary/re-ranking/), the [grounding snippet](/en/knowledge/geo-glossary/grounding-snippets/) was used for the answer, and the model marked it as evidence.

## How does a citation arise?

The model synthesises the answer from several snippets. A source is cited when its snippet carries a statement that appears in the answer: a figure, a definition, a recommendation. Snippets that merely repeat what other sources also say go into the answer without being cited. What is citable is therefore what contributes something of its own ([information gain](/en/knowledge/geo-glossary/information-gain/)).

## Why do citations matter for AI visibility?

Citations are the proof that your content shapes the answer. They arise almost exclusively through grounding, that is, through your own website, unlike [mentions](/en/knowledge/geo-glossary/mention/), which mostly arise through third-party sites and model knowledge. But: cited is not visible. A citation rarely brings notable traffic ([zero-click](/en/knowledge/geo-glossary/zero-click/)), and a source far down in an expanded list has hardly any presence. The value lies in the role as evidence and in the authority that builds from it over time.

## How do retrieved and cited pages differ?

Not every page an AI system reads appears in the answer. Lily Ray distinguishes “retrieved” — pages ChatGPT fetched during its fan-out queries — from “cited” — pages that appear as a link in the visible answer (August 2026). She advises checking which of the two any study of AI search actually measured. An example from Jason Barnard and Nick Ranger shows how large the gap is: during [grounding](/en/knowledge/geo-glossary/grounding/), around 200 sections were checked and four were cited (Kalicube, July 2026). Being cited is therefore the narrower and more valuable stage. Microsoft reports the share of all citations for a query as [Citation Share](/en/knowledge/geo-glossary/citation-share/).

## What does this mean for your website?

Provide passages that carry a statement nobody else provides: your own data, concrete figures from experience, clear definitions with numbers. Structure them so that they work as a snippet. Measure the [citation rate](/en/knowledge/geo-glossary/citation-rate/) with your prompt set and evaluate which third-party sites are cited frequently in your topic area. You need to be present there as well ([source analysis](/en/knowledge/geo-glossary/source-analysis/)).
