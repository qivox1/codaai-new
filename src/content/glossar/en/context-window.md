---
title: "Context window"
lang: en
de: kontextfenster
seoTitle: "Context window: what is it?"
seoDescription: "Context window explained: how many tokens a language model handles at once, why AI search still uses only excerpts and what this means for your website content."
shortDefinition: "The context window is the amount of text, measured in tokens, that a language model takes into account at once when answering. It includes instructions, the question, retrieved sources and the answer itself."
synonyms: ["Context length", "Context size", "Token window"]
category: grundlagen
related: ["token", "grounding-budget", "grounding-snippets", "llm", "retrieval-augmented-generation", "bottom-line-up-front"]
pubDate: 2026-10-05
faq:
  - q: "How large is the context window of current language models?"
    a: "According to Anthropic, current Claude models such as Claude Opus 5.5 have a context window of 1 million tokens (Claude documentation, October 2026). Google states 1 million tokens or more for many Gemini models (Gemini API documentation, June 2026). The figures change with every model generation; the vendor's documentation is the authoritative source."
  - q: "Why does AI search use only excerpts despite a large context window?"
    a: "Because more context does not automatically produce better answers. Anthropic describes how accuracy and recall degrade as the token count grows. Every token also costs computing time. AI search therefore selects the most relevant passages instead of loading entire pages."
  - q: "Is a larger context window an advantage for my website's visibility?"
    a: "Only to a limited extent. A larger context window allows more sources, but it does not change the selection: only what has been found and judged relevant beforehand gets into the window. The lever remains ranking and the quality of the individual section."
---

The context window is the amount of text a [language model](/en/knowledge/geo-glossary/llm/) can take into account at once when producing an answer. It is measured in [tokens](/en/knowledge/geo-glossary/token/). Anthropic defines it as all the text a model can reference when generating a response, including the response itself — a kind of working memory, separate from the data the model was trained on ([Claude documentation](https://platform.claude.com/docs/en/build-with-claude/context-windows), as of October 2026).

## How does a context window work?

The context window holds everything the model processes for an answer: the system instructions, the conversation so far, the user's question, retrieved sources and the answer being written. All of it together has to fit within the maximum number of tokens. Whatever does not fit is shortened, summarised or left out.

Google compares the context window to short-term memory: like a person, a generative model can only keep a limited amount of information in mind at the same time (Gemini API documentation, June 2026). The [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) from training is separate. It sits in the model's parameters and takes up no space in the window.

## How large are context windows today?

The sizes change with every model generation. The following figures come from the vendors' official documentation:

| Vendor | Figure | Source |
|---|---|---|
| Anthropic | 1 million tokens for current models such as Claude Opus 5.5 and Claude Sonnet 5.5; 200,000 tokens for models including Claude Sonnet 4.5 | Claude documentation, October 2026 |
| Google | 1 million tokens or more for many Gemini models | Gemini API documentation, June 2026 |

Google translates 1 million tokens into examples: around 50,000 lines of code or eight average-length English novels.

## Why do AI systems use only excerpts despite large windows?

More context does not mean better answers. Anthropic writes that accuracy and recall degrade as the token count grows, and calls this “context rot”. What is in the context is therefore just as important as how large the window is (Claude documentation, October 2026).

Position matters too. In the July 2023 study “Lost in the Middle”, Nelson F. Liu and colleagues showed that language models make best use of information at the beginning or end of a long context and markedly worse use of information in the middle — even models built for long contexts.

Then there is the cost: every token takes computing time. AI search therefore does not place whole pages in the window but selected passages ([grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/)), and divides the limited space among the sources ([grounding budget](/en/knowledge/geo-glossary/grounding-budget/)). Andrea Volpini argued at SEO Week 2026 that putting more information into the context window does not solve retrieval problems; AI systems need better navigation and structure (iPullRank, May 2026).

## Why does the context window matter for AI visibility?

The context window is the stage for the answer: only what is there can feed into the answer and be cited. Lily Ray argues that content which is not indexed and not ranking cannot enter the context window of the major AI search products in the first place (Substack, March 2026).

Being in the window is not enough, though. There, your section competes with excerpts from other sources. Gareth Simpson reported at brightonSEO on tests with local models in which a text-heavy WordPress page overfilled the context window; large providers then compress the content, which leaves it to chance what the model says about a brand (brightonSEO, June 2026).

## What does this mean for your website?

Put the key statement at the start of every section ([bottom line up front](/en/knowledge/geo-glossary/bottom-line-up-front/)). An excerpt that opens with the answer still works when the system shortens it or places it far back in the context.

Write compact, self-contained paragraphs without filler. Every token that contributes nothing to the answer takes up space your actual statement needs. The tool vendor TollBit also points out that layout code, scripts and tracking in HTML pages consume tokens, fill the context window and can reduce answer quality (TollBit, April 2026).
