---
title: "LLM crawlers"
lang: en
de: llm-crawler
shortDefinition: "LLM crawlers are the bots of the AI providers — GPTBot, ClaudeBot, ChatGPT-User, PerplexityBot, CCBot and others — that visit web pages for training or for the live retrieval of an answer. They do not render JavaScript."
synonyms: ["AI user agents", "AI bots", "GPTBot"]
category: technik
related: ["common-crawl", "ttfb", "crawl-budget", "log-files", "url-discovery"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Which LLM crawlers should I allow in robots.txt?"
    a: "At least GPTBot and ChatGPT-User (OpenAI), ClaudeBot and anthropic-ai (Anthropic), PerplexityBot, Google-Extended and CCBot (Common Crawl). Current lists of AI user agents are maintained by Search Engine Journal, among others. Anyone who blocks one of these bots keeps their content out of the respective system."
  - q: "Why do LLM crawlers not render JavaScript?"
    a: "Because rendering is expensive and the providers process billions of pages. The crawlers read the delivered HTML. Content that is only created in the browser via JavaScript is invisible to them — to them, the page is empty. Important content must therefore be in the server-side HTML."
---

LLM crawlers are the user agents with which AI providers retrieve web pages. There are two kinds: training crawlers such as GPTBot, ClaudeBot or CCBot collect content for the [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) of future models. Retrieval agents such as ChatGPT-User or PerplexityBot fetch a page live when a system performs a [web search](/en/knowledge/geo-glossary/web-search/) for an answer. Both read the delivered HTML — and neither of them executes JavaScript.

## How do LLM crawlers work?

An LLM crawler retrieves a URL, reads the HTML, extracts the text and follows links if it is configured to do so. It respects robots.txt and can be blocked or allowed specifically through it. It does not wait for lazily loaded content, does not render scripts and does not repeat a request if the server responds too slowly — at the SISTRIX Meetup in September 2026, Chrissy Kunisch (ONE Beyond Search) cited a [TTFB](/en/knowledge/geo-glossary/ttfb/) below 500 to 800 milliseconds as the benchmark above which requests are aborted.

A retrieval in the log file does not yet mean visibility: the agent validates a page as a candidate; it does not cite it for that reason ([log files](/en/knowledge/geo-glossary/log-files/)).

## Why do LLM crawlers matter for AI visibility?

They are the only route by which your content reaches an AI system — into training or into a live answer. What a crawler cannot retrieve, cannot read or cannot load in time does not exist for the system. That is why the technical side is the entry ticket: it gets a page into the race, but it does not decide whether the page wins.

## What does this mean for your website?

Check your robots.txt for blocked AI bots. Deliver important content server-side in the HTML, not via JavaScript. Keep the server response time low and the DOM lean. Avoid click walls and login walls in front of content that should be found. And analyse your log files for AI user agents to see which pages the systems actually retrieve — with the caveat that Google AI Overviews and AI Mode usually do not generate a live retrieval.
