---
title: "AI Overview Citation Rate"
lang: en
de: ai-overview-citation-rate
shortDefinition: "The AI Overview Citation Rate measures how often a page appears as a source in Google AI Overviews, observable via the ‘Generative AI’ report in Search Console."
synonyms: ["AIO Citation Rate", "AI Overviews visibility", "AI Overview source rate"]
category: messung
related: ["citation-rate", "grounding", "log-files", "document-relevance", "grounding-budget"]
pubDate: 2026-09-03
faq:
  - q: "Where can I see my AI Overview Citation Rate?"
    a: "In Google Search Console, in the ‘Generative AI’ report (beta), which shows impressions and clicks for AI Overviews and AI Mode. Dedicated LLM visibility tools additionally measure, via their own prompts, whether and at which position a domain is cited in AI Overviews."
  - q: "Why do AI Overviews not show up in my server logs?"
    a: "Because for AI Overviews and AI Mode, Google generally does not fetch the page live but accesses its existing index. A log file therefore shows no requests, yet the citation is still there. For these systems, Search Console and prompt tracking are the only data sources."
---

The AI Overview Citation Rate is the frequency with which a page is shown as a source in Google AI Overviews, above the classic search results and in AI Mode. It is the special case of the [Citation Rate](/en/knowledge/geo-glossary/citation-rate/) for the system with the largest reach in the German market, and it is the only AI citation that can be observed directly in a Google-owned tool.

## How is the AI Overview Citation Rate measured?

In two ways. Google Search Console shows impressions and clicks from AI Overviews and AI Mode in the "Generative AI" report (beta); Google therefore still assigns this metric to classic search reporting. Dedicated tracking tools complement the view with their own prompts: they ask the questions of the [prompt set](/en/knowledge/geo-glossary/prompt-set/) on Google, check whether an AI Overview appears, and analyse which sources it cites and at which position.

What does not work: [log files](/en/knowledge/geo-glossary/log-files/). For AI Overviews and AI Mode, there is generally no live access to the page; Google accesses its index.

## Why does the AI Overview Citation Rate matter for AI visibility?

Because Google AI Overviews mark the transition between classic search and AI answer: they appear for a growing share of search queries, push the result list downwards and name few sources. A page that ranks at position three for a query but is not cited in the AI Overview above loses part of the clicks it used to get. For Gemini and AI Overviews, the [Grounding Budget](/en/knowledge/geo-glossary/grounding-budget/) also applies: the better the Google ranking, the more room in the overview.

## What does this mean for your website?

Activate the "Generative AI" report in Search Console and watch which pages receive impressions in AI Overviews. Compare with the prompts in your set: does an AI Overview appear for your core questions, and are you cited in it? Where an overview appears and you are missing although you rank, the problem lies at passage level ([Re-Ranking](/en/knowledge/geo-glossary/re-ranking/)), not with the ranking.
