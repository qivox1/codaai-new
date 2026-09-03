---
title: "Model knowledge"
lang: en
de: modellwissen
shortDefinition: "Model knowledge is everything a language model saw during training, no more and no less. Answers from model knowledge are produced without a web search."
synonyms: ["Parametric knowledge", "Training knowledge"]
category: grundlagen
related: ["common-crawl", "knowledge-cutoff", "web-search", "grounding", "brand-mentions"]
pubDate: 2026-09-03
faq:
  - q: "How does my brand get into model knowledge?"
    a: "Through the training data: web pages from Common Crawl, Wikipedia, forums such as Reddit, trade media and licensed sources. What is written there about a brand often, consistently and in connection with clear terms becomes part of what the model ‘knows’ about it."
  - q: "Can I check whether my domain is in the model knowledge?"
    a: "Approximately. Tools such as the AI Training Data Checker by centium.ai or the Common Crawl Index Checker show whether a domain appears in Common Crawl. Whether and how the model actually learned the content only becomes clear by querying the model itself, without web search."
---

Model knowledge is the knowledge a [language model](/en/knowledge/geo-glossary/llm/) learned from texts during training and that is stored in its parameters. A model knows only what appeared in its training data. It does not know anything that happened afterwards, unless it fetches that knowledge via a [web search](/en/knowledge/geo-glossary/web-search/).

## How does model knowledge come about?

The training data comes from a few large sources: [Common Crawl](/en/knowledge/geo-glossary/common-crawl/) as the largest web snapshot, Wikipedia for structured knowledge, books and literature for long, coherent text, scientific papers for specialist depth, Reddit and forums for conversational tone, GitHub for code, news archives for events up to the [knowledge cut-off](/en/knowledge/geo-glossary/knowledge-cutoff/), and licensed data depending on the provider.

From these texts the model does not learn facts in the sense of a database, but probabilities: which terms appear together, which brand is associated with which service, which answer typically follows which question. What is described often and consistently becomes reliably retrievable. What appears rarely or inconsistently stays vague.

## Why does model knowledge matter for AI visibility?

Answers from model knowledge are produced without a web search, and thus without any chance to influence anything at the moment of the question. When the model is confident, it answers from memory, and then only what was on the web about a brand up to the time of training counts. That is why measures on third-party sites ([brand mentions](/en/knowledge/geo-glossary/brand-mentions/), trade media, Wikipedia) act on model knowledge in the long term, while your own website works mainly through grounding.

## What does this mean for your website?

Model knowledge only changes with the next training run. In the short term you reach the AI via web search, in the long term via a consistent brand image across the whole web. Check both separately: ask the model with web search switched off what it knows about your company, and compare the result with the answer including web search. The difference shows which path you need to work on first.
