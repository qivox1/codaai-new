---
title: "Token"
lang: en
de: token
shortDefinition: "A token is the smallest unit a language model works with: a word, part of a word or a single character. All probabilities of an LLM refer to tokens."
synonyms: ["Tokens", "Tokenisation", "Tokenizer"]
category: grundlagen
related: ["llm", "embedding", "chunking"]
pubDate: 2026-09-03
faq:
  - q: "How many tokens does a German text have?"
    a: "As a rule of thumb, 100 German words correspond to roughly 150 to 200 tokens, because compound words and umlauts are split into several parts. The exact number depends on the tokenizer of the respective model."
  - q: "Why are tokens relevant for AI visibility?"
    a: "Because AI systems measure and limit context in tokens. Bloated source code consumes tokens for markup instead of content; whoever delivers lean pages gets more of their actual text into the model's context."
---

A token is the smallest unit a [language model](/en/knowledge/geo-glossary/llm/) computes with. Depending on the model, a token is a whole word, part of a word or a single character. The German word "Sichtbarkeit" (visibility), for example, is split into two or three tokens, and a full stop is a token of its own. Everything a model does — reading, weighting, generating — happens at this level.

## How do tokens work?

Before a model processes a text, a tokenizer splits it into tokens and assigns a number to each one. The model then estimates, for each position, which token follows with which probability. For further processing as meaning, tokens or whole sections are translated into vectors (see [embedding](/en/knowledge/geo-glossary/embedding/)).

Tokens are also the currency of the context window. Each model can only keep a certain number of tokens "in view" at once. The user's question, the system's instructions and all excerpts from web pages the system found in a web search must fit into this window.

## Why do tokens matter for AI visibility?

Because context is scarce and expensive, AI systems do not give a page unlimited room. They extract passages ([grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/)) instead of taking over whole pages. A text that delivers its core statement early and in short, self-contained sentences has better chances within this budget than a text that gets to the point on page three.

## What does this mean for your website?

Keep an eye on the ratio of visible text to source code. On pages where readable text makes up only a few percent of the HTML, agents and crawlers mainly process markup. Lean, semantic HTML and content that is available without JavaScript ensure that the tokens a system spends on your page actually carry your content.
