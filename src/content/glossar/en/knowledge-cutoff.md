---
title: "Knowledge cut-off"
lang: en
de: knowledge-cutoff
shortDefinition: "The knowledge cut-off is the point in time up to which training data has been fed into a language model. Anything after that date the model knows only via a web search."
synonyms: ["Training cut-off", "Knowledge cutoff date", "Data cut-off"]
category: grundlagen
related: ["model-knowledge", "web-search", "grounding", "freshness"]
pubDate: 2026-09-03
faq:
  - q: "Where do I find the knowledge cut-off of a model?"
    a: "Providers state it in the model documentation, usually as month and year. Overviews such as the one by otterly.ai compare the cut-off dates of the common models. As of August 2026, only three of the widely used models had any training data from 2026 at all."
  - q: "What happens to content created after the knowledge cut-off?"
    a: "It is not in the model knowledge. The system can only use it if it triggers a web search for the question and finds your page as a source in the process. For anything current, grounding is therefore the only way into the answer."
---

The knowledge cut-off is the date up to which a language model's training data extends. Anything published after this date is not part of the [model knowledge](/en/knowledge/geo-glossary/model-knowledge/). A model with a cut-off in autumn 2025 knows, from its own knowledge, no study, no product and no price from 2026.

## How does the knowledge cut-off work?

A model is trained on a fixed dataset. After training, its knowledge no longer changes until the provider trains a new version. Cut-off dates typically lie several months before a model's release; as of August 2026, only three of the widely used models had training data from 2026. The systems close the gap between cut-off and present via a [web search](/en/knowledge/geo-glossary/web-search/), whose results flow into the answer through [grounding](/en/knowledge/geo-glossary/grounding/).

## Why does the knowledge cut-off matter for AI visibility?

It explains why grounding carries so much weight. A model that is not confident about a question — because the topic is new or changes quickly — triggers a web search. At exactly this moment it counts whether your page ranks for the query and whether its passages are extractable. For questions about prices, dates, product launches and current figures, web search is the rule, not the exception.

## What does this mean for your website?

Everything you published after the cut-off of the common models reaches the AI only via web search. So make the currency of your content visible: publication and modification dates in the source code and in the schema markup, current years in the text. The term [freshness](/en/knowledge/geo-glossary/freshness/) describes why AI systems cite older content much less often.
