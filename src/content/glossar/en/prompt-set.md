---
title: "Prompt set"
lang: en
de: promptset
shortDefinition: "A prompt set is a fixed set of proxy prompts that represents the topics and customer questions of a brand. It is the basis of every measurement of AI visibility, comparable to the keyword set in SEO."
synonyms: ["Proxy prompts", "Prompt list", "Question set"]
category: messung
related: ["llm-visibility-tracking", "baseline-measurement", "query-coverage", "mention-rate", "citation-rate", "share-of-ai-search"]
pubDate: 2026-09-03
faq:
  - q: "How many prompts belong in a prompt set?"
    a: "Enough that every core topic and every phase of the customer journey is represented; in practice between 20 and 100. More important than the number is coverage: brand-neutral questions for mentions, brand-specific questions for correctness and citations, and a categorisation by topic, funnel stage and intent for later analysis."
  - q: "Which prompts in the prompt set matter most?"
    a: "Those shortly before the decision: recommendation and comparison questions (‘Miele or BORA, who makes the better hobs?’) and trust questions (‘Is Allianz supplementary dental insurance good, what are the experiences?’). General research questions are less relevant because there is no purchase intent behind them yet."
---

A prompt set is the collection of questions used to measure the AI visibility of a brand. Each prompt stands in for a class of questions that real customers ask, hence "proxy prompts". The prompt set is to AI search what the keyword set is to SEO: without a fixed set there is no comparable measurement, no [baseline measurement](/en/knowledge/geo-glossary/baseline-measurement/) and no measures derived from it.

## How do you build a prompt set?

The customer journey serves as a guide: awareness, consideration, conversion, retention. In which phase does the customer ask which questions, and where does the brand need to be present to play a role in the decision? This yields eight prompt categories with different relevance:

| Category | Example | Phase | Relevance |
|---|---|---|---|
| General research | "What should I pay attention to when planning a kitchen?" | Awareness | low — no purchase intent yet |
| Problem-oriented | "What alternatives to an extractor hood are there for a sloped ceiling?" | Awareness | medium — a problem exists |
| Selection process | "What should I look for in a hob with integrated extractor?" | Consideration | medium — solution found, selection under way |
| Recommendation & comparison | "Miele or BORA, who makes the better hobs with extractor?" | Consideration | high — shortly before the decision |
| Product & brand | "Does BORA also offer induction hobs?" | Consideration | indirect — can the AI read everything? |
| Trust & reputation | "Are there test reports on the BORA X Pure?" | Consideration | high — whoever fails to convince here loses |
| Purchase & closing | "Where can I buy a BORA hob?" | Conversion | medium — availability, terms |
| After-sales & service | "How often do I need to change the filter on the BORA X Pure?" | Retention | indirect — trust and reputation |

Brand-neutral prompts (research through comparison) measure whether the brand is mentioned at all: [Mention Rate](/en/knowledge/geo-glossary/mention-rate/). Brand-specific prompts (product through after-sales) measure whether the system holds correct information and whether it cites your own pages: [Citation Rate](/en/knowledge/geo-glossary/citation-rate/).

## Why does the prompt set matter for AI visibility?

Because every analysis and every measure depends on it. A prompt set made up of general research questions measures awareness, but not whether the brand appears in purchase decisions. A prompt set without trust questions misses whether the AI deters an interested person shortly before closing. The categorisation by topic, funnel stage and intent later shows exactly where the gap lies.

## What does this mean for your website?

Collect the questions your customers ask from sales, support, forums and the follow-up questions of the AI systems themselves, assign them to the categories and weight them by proximity to purchase. Run the baseline measurement with this set and keep it stable: only an unchanged set shows development. The same questions are also the topic list for your content ([Query Coverage](/en/knowledge/geo-glossary/query-coverage/)).
