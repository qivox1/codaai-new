---
title: "Grounded Response Generation"
lang: en
de: grounded-response-generation
shortDefinition: "Grounded response generation is the final step of an AI answer: the model synthesises model knowledge and model context — user question, personalisation, media and all grounding snippets — into a text with citations."
synonyms: ["Model context", "Final answer", "Answer synthesis"]
category: grounding
related: ["grounding", "grounding-snippets", "citation", "mention", "model-knowledge"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "What is the model context in grounded response generation?"
    a: "Everything the language model has available during answer generation in addition to its model knowledge: the user's prompt, personalisation from earlier conversations, attached files or images and all grounding snippets from the web search. Brand citations are built into the answer from this context."
  - q: "Why is a source used in grounded response generation but not cited?"
    a: "Because the model has more material in its context than it shows in the answer. It synthesises from all snippets and cites only those that carry a concrete statement. A passage that merely confirms what others also say goes into the answer without being named."
---

Grounded response generation is the step in which an AI system produces the actual answer from everything it has available. The language model combines its [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) with the model context: the user question, personalisation, attached media and all [grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/) that the web search has delivered. The result is a text with brand mentions and source references built in.

## How does grounded response generation work?

The four steps before it, [web search](/en/knowledge/geo-glossary/web-search/), [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/), [re-ranking](/en/knowledge/geo-glossary/re-ranking/) and snippet extraction, fill the context. The model then generates an answer token by token that fits this context. Snippets that provide a concrete, verifiable statement are cited; snippets that merely confirm flow in without being named. Because the model works stochastically, this selection turns out slightly differently with every request.

## Why does grounded response generation matter for AI visibility?

This is where it is decided whether your brand appears in the answer ([mention](/en/knowledge/geo-glossary/mention/)) and whether your page appears as a source ([citation](/en/knowledge/geo-glossary/citation/)). The two are different outcomes: a brand can be mentioned from model knowledge without any page being cited, and a page can be cited without the brand playing a role in the answer text. What gets cited is what carries a statement that other sources do not provide.

## What does this mean for your website?

Provide passages that say something of your own: a concrete figure, your own survey, an experience that appears nowhere else ([information gain](/en/knowledge/geo-glossary/information-gain/)). And name your brand and your products explicitly in these passages, so that the mention enters the context together with the evidence. A passage that answers a question well but says "we" instead of the company name gets cited without the brand being named.
