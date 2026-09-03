---
title: "LLM (Large Language Model)"
lang: en
de: llm
shortDefinition: "An LLM is a language model that estimates the probability of the next token for a sequence of tokens. It generates text instead of looking it up in an index."
synonyms: ["Large Language Model", "Language model", "AI model"]
category: grundlagen
related: ["token", "model-knowledge", "knowledge-cutoff", "embedding", "llm-visibility-tracking"]
pubDate: 2026-09-03
faq:
  - q: "Why does an LLM answer the same question differently each time?"
    a: "Because an LLM draws probabilities, not records. On every run it picks from the most likely continuations, with a random element. Two answers in direct succession are therefore never identical; that is part of the system, not a bug."
  - q: "Does an LLM know my website?"
    a: "Only if it appeared in the training data or the system retrieves it live during a web search. Whether a domain sits in the model knowledge can be roughly traced with checking tools for Common Crawl; the only certainty is querying the model itself."
---

An LLM (Large Language Model) is a language model whose core function is to estimate the probability that a [token](/en/knowledge/geo-glossary/token/) follows a sequence of other tokens. For the sentence opening "When I wake up in the morning, the first thing I drink is …", a model might estimate "coffee" at 18%, "water" at 9% and "tea" at 4%. From such estimates an answer emerges word by word.

## How does an LLM work?

An LLM does not look things up in an index; it generates. Its knowledge sits as [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) in billions of parameters that were learned from texts during training: web pages, books, Wikipedia, forums, code. Anything that happened after the [knowledge cut-off](/en/knowledge/geo-glossary/knowledge-cutoff/) is unknown to the model; for that it needs a [web search](/en/knowledge/geo-glossary/web-search/), whose results are passed in as context.

Because an LLM draws probabilities, stochasticity is part of the system. The same question asked twice in a row yields two different answers. For measuring AI visibility this has one consequence: a single value says nothing; only the trend across many runs carries weight.

## Why does understanding LLMs matter for AI visibility?

Anyone who understands that an LLM generates instead of looking up understands three things that count in practice. First, there is no "position 1" in an AI answer, only a probability of being mentioned. Second, the website alone does not decide; everything the model has read about a brand does, including on third-party sites. Third, content must be divisible into small, self-contained units, because the model processes passages, not pages.

## What does this mean for your website?

Write so that a model can use sentences individually: clear definitions, short sentences, concrete names instead of vague umbrella terms. And do not expect a reproducible position; measure with a fixed [prompt set](/en/knowledge/geo-glossary/prompt-set/) across many runs how often your company is mentioned.
