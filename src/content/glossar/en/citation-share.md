---
title: "Citation Share"
lang: en
de: citation-share
seoTitle: "Citation Share: Bing Metric"
seoDescription: "Citation Share explained: what the metric in the Bing Webmaster Tools AI Performance report measures, how it is calculated and how to read it correctly."
shortDefinition: "Citation Share is a metric in the AI Performance report of Bing Webmaster Tools. It shows what proportion of all citations for a grounding query your website receives in Copilot and Bing's AI answers."
synonyms: ["Bing Citation Share", "Citation share metric", "Share of citations", "Zitieranteil"]
category: messung
related: ["citation-rate", "share-of-ai-search", "citation", "prompt-set", "llm-visibility-tracking", "source-analysis"]
pubDate: 2026-10-05
faq:
  - q: "Where do I find Citation Share in Bing Webmaster Tools?"
    a: "In the “AI Performance” report. Microsoft launched the report as a public preview in February 2026 and added Citation Share, Intents, Topics and a comparison feature in June 2026. You need a verified website in Bing Webmaster Tools."
  - q: "Is a high Citation Share a ranking signal?"
    a: "No. Microsoft explicitly describes Citation Share as an observational metric, not a ranking system or a competitive scoreboard. It does not show competitor domains or traffic share, and it does not assign quality scores."
  - q: "How does Citation Share differ from citation rate?"
    a: "Citation Share measures your share of all citations for a grounding query in Microsoft's AI services. Citation rate measures in how many answers from your own prompt set your page is cited at all, across several AI systems."
---

Citation Share is a metric in the “AI Performance” report of Bing Webmaster Tools. It states what percentage of all citations for a specific grounding query go to your website. It is based on AI answers from Microsoft Copilot, from Bing and from selected partner experiences (Microsoft Bing, June 2026).

## How is Citation Share calculated?

Microsoft defines the metric as follows: Citation Share is the percentage of citations attributed to your site out of all citations shown across all sites for that same grounding query (Microsoft Bing, June 2026). A grounding query is the search phrase the AI system uses internally to retrieve content for an answer.

```text
Citation Share = citations of your site / all citations for the same grounding query × 100
```

A worked example with assumed values: for one grounding query, the AI answers in the period show 40 citations. Six of them point to your website. Your Citation Share is 15%.

The total number of citations shows how often your content appears. Citation Share shows how much of the available citation space for a query you occupy.

## What does the AI Performance report in Bing Webmaster Tools show?

Microsoft launched the report as a public preview in February 2026. It shows total citations, the average number of cited pages per day, the grounding queries and the citations per URL (Microsoft Bing, February 2026).

In June 2026, four features were added (Microsoft Bing, June 2026):

- **Intents** assign grounding queries to categories such as informational, commercial, navigational or local.
- **Topics** group related queries into thematic clusters.
- **Citation Share** shows your share of the citation space per grounding query.
- **Compare** overlays a previous period on the current one.

What the metric is not matters just as much. Microsoft describes Citation Share as an observational metric, “not a ranking system or a competitive scoreboard”. It shows no competitor domains, no traffic share and no quality rating.

## How does Citation Share differ from citation rate and share of AI search?

The three metrics sound alike but measure different things:

| Metric | Base | Data source | Systems |
|---|---|---|---|
| Citation Share | all citations for one grounding query | Microsoft (first-party) | Copilot, Bing, partners |
| [Citation rate](/en/knowledge/geo-glossary/citation-rate/) | all answers from your own prompt set | your own measurement | as many as you track |
| [Share of AI search](/en/knowledge/geo-glossary/share-of-ai-search/) | all mentions and citations of competitors | your own measurement | as many as you track |

Citation Share answers the question “How much space do I get for this query?”. Citation rate answers “Am I cited at all for my customers' questions?”. Share of AI search compares your brand with your competitors.

## Why does Citation Share matter for AI visibility?

The data comes straight from the operator of the AI system. In April 2026, Aleyda Solís called the AI Performance report the only first-party citation data available from any AI ecosystem. Google now shows impressions from [AI Overviews](/en/knowledge/geo-glossary/ai-overviews/) and [AI Mode](/en/knowledge/geo-glossary/ai-mode/) in Search Console, but no citation shares per query.

The metric also shows which pages carry the weight. Claire Carlisle (Whitespark) found that on the websites she examined, deep informational pages rather than the homepage achieved the highest Citation Share (July 2026). In the grounding queries she found very long, conversational prompts.

## What does this mean for your website?

Set up Bing Webmaster Tools if you have not done so yet. The report is free and shows citations in Copilot without any tracking of your own.

Start with the grounding queries. They show the wording the system uses when searching for content. Compare that wording with your [prompt set](/en/knowledge/geo-glossary/prompt-set/) and add any questions that are missing.

Then read Citation Share by topic. A low share for an important grounding query means other sources occupy the citation space. The report does not show which ones; for that you need your own [source analysis](/en/knowledge/geo-glossary/source-analysis/).

Keep the limits in mind: the report covers only Microsoft's AI services. For ChatGPT, Gemini or Perplexity you need your own measurements.
