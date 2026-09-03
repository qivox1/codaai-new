---
title: "Common Crawl"
lang: en
de: common-crawl
shortDefinition: "Common Crawl is a non-profit, freely available archive of the internet with over 300 billion web pages from 19 years, and one of the main sources for training AI models."
synonyms: ["CCBot", "Common Crawl dataset"]
category: grundlagen
related: ["model-knowledge", "llm-crawlers", "knowledge-cutoff"]
pubDate: 2026-09-03
faq:
  - q: "How do I check whether my site is in Common Crawl?"
    a: "The Common Crawl index (index.commoncrawl.org) lets you query a domain directly. Easier to use are checking tools such as the Common Crawl Index Checker by dhemant.consulting or the AI Training Data Checker by centium.ai, which prepare the same data."
  - q: "Should I block the Common Crawl bot?"
    a: "Only if you deliberately do not want to appear in training data. The bot is called CCBot. Whoever blocks it in robots.txt keeps their content out of one of the most important training sources, and thus out of the model knowledge of future models."
---

Common Crawl is a non-profit organisation that crawls billions of web pages every month and provides the raw data as an open archive. The archive comprises over 300 billion web pages from 19 years. It is one of the most important sources from which AI providers train the [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) of their language models.

## How does Common Crawl work?

Common Crawl's crawler, the CCBot, visits web pages like a search engine crawler and stores HTML, metadata and extracted text in standardised file formats. The data is published monthly as a new snapshot and is freely available to anyone. AI providers filter and clean this raw data before it goes into a training run; pages with little text, duplicates or poor quality frequently drop out at this stage.

## Why does Common Crawl matter for AI visibility?

What is not in Common Crawl has a hard time in model knowledge. A website that blocks the CCBot, sits behind login walls or loads its content only via JavaScript appears in the training data not at all or only as an empty shell. Conversely, a page in Common Crawl is no assurance that a model has learned its content, but it is the prerequisite for it.

## What does this mean for your website?

Check whether your important URLs appear in the Common Crawl index and whether the CCBot is allowed in your robots.txt. Deliver the text of your pages in the HTML, not only after rendering by JavaScript, and keep the source code lean; the AI providers' cleaning step discards pages where markup outweighs content. How to handle [LLM crawlers](/en/knowledge/geo-glossary/llm-crawlers/) correctly overall is covered in its own entry.
