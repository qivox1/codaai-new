---
title: "LLM Visibility Tracking"
lang: en
de: llm-visibility-tracking
shortDefinition: "LLM Visibility Tracking is the measurement of AI visibility: prompts are sent to AI systems and the answers are analysed for mentions and citations of the brand, as a probability across many runs rather than a position."
synonyms: ["AI Visibility Tracking", "Prompt Tracking", "AI visibility measurement"]
category: messung
related: ["prompt-set", "mention-rate", "citation-rate", "share-of-ai-search", "baseline-measurement", "log-files"]
pubDate: 2026-09-03
faq:
  - q: "Why does LLM Visibility Tracking not deliver a position like a rank tracker?"
    a: "Because a language model generates instead of looking things up. A rank tracker sends a keyword and receives a reproducible list with positions 1 to 100. An LLM tracker sends a prompt and receives an answer that turns out differently on the next query. Only the tendency is measurable: in what percentage of runs is the brand mentioned?"
  - q: "Which data sources exist for LLM Visibility Tracking?"
    a: "Six: log files with the requests of LLM user agents, the ‘Generative AI’ report in Google Search Console for AI Overviews and AI Mode, the ‘AI Performance’ report in Bing Webmaster Tools for Copilot, referrers from AI chats in analytics, dedicated LLM visibility tools with prompt-based analyses, and your own access to the model APIs."
---

LLM Visibility Tracking is the measurement of whether and how often a brand appears in the answers of AI systems. A fixed set of prompts ([prompt set](/en/knowledge/geo-glossary/prompt-set/)) is sent regularly to ChatGPT, Gemini, Perplexity and other systems; each answer is analysed for whether the brand is mentioned ([mention](/en/knowledge/geo-glossary/mention/)) or cited as a source ([citation](/en/knowledge/geo-glossary/citation/)). The result is not a position but a probability.

## How does LLM Visibility Tracking differ from SEO rank tracking?

| | SEO rank tracking | LLM Visibility Tracking |
|---|---|---|
| How is it measured? | Keyword sent to a search engine; the result is a list with positions 1–100 | Prompt sent to an LLM; the synthesised answer is analysed for mentions/citations |
| How stable is the result? | Reproducible: the same keyword, location and time yield largely the same list | Every query is unique; stochasticity and personalisation change the answer on every run |
| What is measured? | Objective position in an index, an absolute value | Tendency across many runs, a statistical approximation |
| Example insight | "For keyword X, I rank at position Y in Google DE mobile." | "In topic area X, I am mentioned in 40% of the answers to my proxy prompts." |

## Why does LLM Visibility Tracking matter?

Because traffic and rankings do not reflect AI visibility: the decision is made in the answer, before the click. Without your own measurement, it remains invisible whether a brand appears in the questions its customers ask, and whether measures are working. A single value is worthless; only the trend over weeks and the comparison with competitors ([Share of AI Search](/en/knowledge/geo-glossary/share-of-ai-search/)) produce a picture.

## What does this mean for your website?

Define a prompt set along the customer journey, run a [baseline measurement](/en/knowledge/geo-glossary/baseline-measurement/) and then measure regularly: every question several times, in all relevant systems. Collect [Mention Rate](/en/knowledge/geo-glossary/mention-rate/), [Citation Rate](/en/knowledge/geo-glossary/citation-rate/) and [Sentiment](/en/knowledge/geo-glossary/sentiment/), supplemented by the Search Console and Bing reports and the [log files](/en/knowledge/geo-glossary/log-files/). The Digital Visibility Audit by CodaAI follows exactly this pattern with company-specific buyer questions.
