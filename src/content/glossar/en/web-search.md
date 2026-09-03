---
title: "Web search (live retrieval)"
lang: en
de: websuche
shortDefinition: "Web search is the live retrieval by an AI system from the web, triggered when the model is not confident in its answer from model knowledge. Only here can current content have an effect."
synonyms: ["Live retrieval", "Search grounding", "Retrieval-Augmented Generation (RAG)"]
category: grounding
related: ["grounding", "model-knowledge", "knowledge-cutoff", "initial-retrieval", "log-files"]
pubDate: 2026-09-03
faq:
  - q: "When does an AI system trigger a web search?"
    a: "When its confidence in answering the question from model knowledge is low, typically for current topics, specific providers, prices or dates. If confidence is high, it answers from memory without retrieving a single page."
  - q: "Do all AI systems use the same web search?"
    a: "No. ChatGPT mostly accesses the Bing index, Google AI Overviews and AI Mode the Google index, Perplexity its own index. Anyone who wants to appear in AI answers therefore needs rankings in more than one search engine."
---

Web search is the moment in which an AI system leaves its [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) and looks things up live on the web. It is not triggered for every question, but only when the model rates its own confidence as low. The guiding question inside the system is, in effect: "How confident am I that I can answer this question from memory alone?"

## How does web search work in AI systems?

If confidence is low, the system formulates one or more search queries ([query fan-out](/en/knowledge/geo-glossary/query-fan-out/)), sends them to a search index and collects the hits as candidates ([initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/)). From the candidates, the most relevant passages are selected ([re-ranking](/en/knowledge/geo-glossary/re-ranking/)) and placed in the model's context as [grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/). Only then is the answer produced. The technical term for this procedure is Retrieval-Augmented Generation (RAG).

If confidence is high, none of this happens. The model answers from memory, and no website is retrieved, yours included.

## Why does web search matter for AI visibility?

It is the only way content published after the [knowledge cut-off](/en/knowledge/geo-glossary/knowledge-cutoff/) gets into an answer. And it is the point at which classic SEO feeds into the AI answer: only what ranks near the top in the underlying search makes it into the candidate pool. For questions about providers, products and prices — in other words exactly what your company sells — web search is the rule.

## What does this mean for your website?

Check which of your core questions trigger a web search and which the model answers from memory. For the first group, rankings, crawlability and extractable passages count. For the second group, what was on the web about your brand up to the last training run counts. Bear in mind that a retrieval in the [log file](/en/knowledge/geo-glossary/log-files/) does not yet mean a citation: the system validates when it is uncertain; it does not answer because of the retrieval.
