---
title: "Citation Rate"
lang: en
de: citation-rate
shortDefinition: "The Citation Rate is the share of AI answers in a prompt set in which one of your own pages is cited as a source. It measures whether content is found, extracted and used for the answer."
synonyms: ["AI Citation Rate", "Source rate", "Citation frequency"]
category: messung
related: ["citation", "mention-rate", "prompt-set", "source-analysis", "grounding", "ai-overview-citation-rate"]
pubDate: 2026-09-03
faq:
  - q: "Why is my Citation Rate low even though the Mention Rate is high?"
    a: "Because mentions and citations take different routes. The brand is mentioned from model knowledge or via third-party sites, but your own website is not used in grounding: it does not rank for the fan-out queries, its passages do not pass re-ranking, or it offers nothing that other sources do not say as well."
  - q: "How do I check the grounding probability before the Citation Rate?"
    a: "Determine which prompts trigger a web search at all and list sources; only there is a citation possible. Then check technically whether your pages are retrievable (no JavaScript rendering, TTFB, no block in robots.txt) and whether they rank for the fan-out queries."
---

The Citation Rate is the share of answers in which a page of your own domain is listed as a source, relative to all answers to a fixed [prompt set](/en/knowledge/geo-glossary/prompt-set/). It is the counterpart of the [Mention Rate](/en/knowledge/geo-glossary/mention-rate/): one measures the brand in the text, the other the website in the sources. Both can be high or low independently of each other.

## How does measuring the Citation Rate work?

Four steps. First, check the grounding probability: for which prompts do AI systems list sources at all? Only there can a [citation](/en/knowledge/geo-glossary/citation/) arise. Second, collect the Citation Rate, several times per prompt and system. Third, a technical check for successful retrieval: can the system retrieve all relevant pages? Fourth, the [source analysis](/en/knowledge/geo-glossary/source-analysis/): which third-party sites are cited for the same prompts, and does the brand need to be present there?

For Google AI Overviews, citation can additionally be observed via the "Generative AI" report in Search Console ([AI Overview Citation Rate](/en/knowledge/geo-glossary/ai-overview-citation-rate/)).

## Why does the Citation Rate matter for AI visibility?

Because it shows whether your own website plays a role in AI answers, the third tier of visibility: being the source. A high Mention Rate with a low Citation Rate means the brand is known, but its content does not shape the answer; other sources then say what is said about the brand. At the same time: cited is not visible. A citation in eighth place of an expanded list brings hardly any presence and rarely traffic; the position of the citation therefore belongs in the analysis.

## What does this mean for your website?

Does the citation actually bring me anything? This question belongs at the start. Measure the Citation Rate only for prompts where sources are listed, and analyse which of your pages are cited and at which position. Work on the passages of pages that rank for the fan-out queries but are not cited: what is usually missing there is [Information Gain](/en/knowledge/geo-glossary/information-gain/) or structure, not the ranking.
