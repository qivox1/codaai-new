---
title: "Log files (LLM crawler requests)"
lang: en
de: logfiles
shortDefinition: "Log files show the actual requests from LLM user agents to the server. They prove that a page was retrieved, not that it ended up in an AI answer. A server log does not yet mean visibility."
synonyms: ["Server logs", "LLM crawler requests", "Log file analysis"]
category: messung
related: ["llm-crawlers", "initial-retrieval", "re-ranking", "ai-overview-citation-rate", "llm-visibility-tracking"]
pubDate: 2026-09-03
faq:
  - q: "What does a request from ChatGPT-User in the log files tell you?"
    a: "That a user asked a question for which ChatGPT triggered a web search and retrieved your page as a candidate. Nothing more: whether the page passed re-ranking and was cited in the answer is not in the log. The request is a validation in case of uncertainty, not the reason for the answer."
  - q: "Why can a page with few log file requests still be cited often?"
    a: "Because of caching. To save latency and cost, the systems cache retrieved pages. A page with few requests can be used very often from the cache; a page with many requests may still only end up in the cache and never be cited."
---

Log files are the records of the web server in which every request is logged with timestamp, URL, status code and user agent. For AI search, the entries from [LLM crawlers](/en/knowledge/geo-glossary/llm-crawlers/) are the interesting ones, such as a request from `ChatGPT-User/1.0` to `/services/technical-seo`. Such entries are the only direct observation that an AI system actually retrieves a page. But they are no proof of visibility.

## What do log files show, and what not?

Four limitations, which SISTRIX describes in detail in an analysis of requests from AI user bots. First: for Google AI Overviews and AI Mode there is generally no live access; these systems access the Google index and leave no logs. Second: a request means the page was considered a candidate in [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/), not that it passed [re-ranking](/en/knowledge/geo-glossary/re-ranking/) and appears in the answer. Third: the request is a validation in case of uncertainty; the system does not answer because of the request. Fourth: to save latency and cost, a lot is cached. Pages with few requests may be used often, pages with many requests may only end up in the cache.

## Why do log files still matter for AI visibility?

Because they reveal technical problems that no other data source shows: which user agents come at all? Which URLs do they request, service pages or filter pages? Which status codes do they get? Do requests abort because of slow response times ([TTFB](/en/knowledge/geo-glossary/ttfb/))? Are pages being retrieved that are set to noindex? For the tier "Found", log files are the most important diagnostic tool.

## What does this mean for your website?

Analyse log files by AI user agents and use them to answer technical questions, not the question of visibility. For visibility you need [LLM Visibility Tracking](/en/knowledge/geo-glossary/llm-visibility-tracking/) across a prompt set, the "Generative AI" report in Search Console for Google AI Overviews and the "AI Performance" report in Bing Webmaster Tools for Copilot. Only the combination yields a complete picture.
