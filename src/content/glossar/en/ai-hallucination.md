---
title: "AI hallucination"
lang: en
de: halluzination
seoTitle: "AI hallucination: causes"
seoDescription: "AI hallucination explained: why language models invent false details, which forms affect companies and how to find and correct wrong claims about your brand."
shortDefinition: "An AI hallucination is a statement by an AI system that sounds plausible but is false or rests on no source. It arises because language models produce probable answers rather than verified ones."
synonyms: ["Hallucination", "LLM hallucination", "Confabulation", "AI misinformation"]
category: grundlagen
related: ["model-knowledge", "grounding", "knowledge-cutoff", "prompt-set", "baseline-measurement", "corroboration"]
pubDate: 2026-10-05
faq:
  - q: "Does grounding prevent every AI hallucination?"
    a: "No. Grounding reduces hallucinations because the model bases its answer on the sources it finds. If those sources are wrong or out of date, the answer inherits the error. If there are no sources on a company, the model keeps falling back on its memory."
  - q: "How do I find an AI hallucination about my own company?"
    a: "With a fixed set of questions that you put to several AI systems at regular intervals. Compare the answers with your verified facts on services, prices and locations. Questions in which your company name does not appear — for example about providers in a category — are especially revealing."
  - q: "Can an AI hallucination about a brand be corrected for good?"
    a: "Not inside the model itself, but through its sources. Add missing facts as text on your website, update outdated details and make sure independent sources say the same. Grounding and future training data then have something correct to draw on."
---

An AI hallucination is a statement by an AI system that sounds plausible but is false or rests on no source. The system invents, for example, a product feature, a price, a study or a URL and presents it with the same confidence as an established fact. As a rule, there is no indication that it was guessing.

## How does an AI hallucination arise?

The first cause lies in how a language model works. An [LLM](/en/knowledge/geo-glossary/llm/) produces text by calculating the most probable continuation — not the verified one. In September 2025, a research team led by Adam Tauman Kalai (OpenAI) argued that models guess when uncertain because training and evaluation reward guessing and penalise admitting uncertainty ([Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664)).

The second cause is gaps in [model knowledge](/en/knowledge/geo-glossary/model-knowledge/). Models know frequently described facts well and rare ones poorly. Duane Forrester points to research showing that larger models mainly improve their recall of popular facts and gain little on rare ones (August 2026). A mid-sized manufacturer usually sits exactly in that thin part.

The third cause is outdated sources. What a model learned in training ends at its [knowledge cut-off](/en/knowledge/geo-glossary/knowledge-cutoff/). Lily Grozeva observes language models naming executives who left a company 15 years ago (August 2026).

## Which forms of AI hallucination affect companies?

Duane Forrester distinguishes random hallucinations — an invented source, a wrong figure — from systematic “substitution”: when a model has little material on a company, it describes something well documented nearby instead (August 2026). He names four forms:

| Form | What happens |
|---|---|
| Silent analogy | The model describes the nearest well-documented neighbour — often a competitor — as your company. |
| Staleness presented as currency | A state that was once correct appears in the present tense: discontinued products, departed executives. |
| Thin evidence, full confidence | A claim resting on a single source sounds like broad consensus. |
| Category instead of company | The model answers the question for the industry and attaches your name. |

Forrester's conclusion: models are getting better at not inventing things — but not at knowing about companies that hardly anyone has written about.

## How common are AI hallucinations?

Reliable figures exist only for narrowly defined tasks. In a study published in October 2025 by the European Broadcasting Union (EBU) and the BBC, journalists assessed more than 3,000 answers from ChatGPT, Copilot, Gemini and Perplexity on news content. 20% contained major accuracy issues, including hallucinated details and outdated information. That rate cannot be transferred directly to questions about companies.

## Why does grounding reduce hallucinations without preventing them?

[Grounding](/en/knowledge/geo-glossary/grounding/) gives the model sources on which to base its answer. That lowers the risk of invented facts. Three gaps remain:

- **Wrong sources:** if the page it finds is wrong or out of date, the answer inherits the error.
- **Missing sources:** according to Forrester, retrieval also favours well-known entities. Companies that are rarely written about are found less often.
- **Invisible details:** in an experiment by OtterlyAI, ChatGPT and other systems even hallucinated information that appeared only in schema markup and not in the text (Thomas Peham, September 2026).

## Why does AI hallucination matter for AI visibility?

Visibility only helps if the details are right. A recommendation with the wrong price or the wrong service does more harm than no mention at all. Liam Dunne also points out that a model may not recommend a company if sources contradict what it says about itself (May 2026). Hallucinated URLs, moreover, send visitors to error pages.

## What does this mean for your website?

Treat wrong AI statements about your brand as a measurement task:

1. **Baseline:** put together a [prompt set](/en/knowledge/geo-glossary/prompt-set/) and record in a [baseline measurement](/en/knowledge/geo-glossary/baseline-measurement/) what AI systems say about you today. Forrester recommends questions in which your name does not appear: category, comparison and capability questions.
2. **Comparison:** check every statement against your verified facts on services, prices, locations and people.
3. **Correct the sources:** add missing facts as visible text, for example on a [grounding page](/en/knowledge/geo-glossary/grounding-page/), and update outdated pages. Make sure independent sources say the same ([corroboration](/en/knowledge/geo-glossary/corroboration/)).
4. **Check URLs:** John Clark advises analysing visits from AI systems to pages that do not exist and redirecting them to matching pages (Lumar webinar, March 2026).

Repeat the measurement regularly. Substitutions shift, and every correction takes time to reach the answers.
