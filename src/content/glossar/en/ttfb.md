---
title: "TTFB (Time to First Byte)"
lang: en
de: ttfb
shortDefinition: "TTFB is the time from the request to the first byte of the server response. For LLM crawlers the guideline is under 500 to 800 milliseconds — otherwise the fetch is aborted, with no retry."
synonyms: ["Time to First Byte", "Server response time", "Server latency"]
category: technik
related: ["llm-crawlers", "crawl-budget", "url-discovery"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Why is TTFB more critical for AI crawlers than for Google?"
    a: "Googlebot is patient and comes back. LLM crawlers, especially the live agents working during an answer, have a narrow time window: the answer to the user is expected within seconds. If the server responds too slowly, the request is aborted and not retried — the page drops out of that answer."
  - q: "How do I measure the TTFB of my website?"
    a: "With PageSpeed Insights or WebPageTest, in the browser via the network panel, or on the command line with curl and the time_starttransfer variable. Measure several pages and times of day — a TTFB that rises under load is exactly the problem crawlers run into."
---

TTFB (Time to First Byte) is the span between sending a request and the arrival of the first byte of the response. It measures how quickly the server reacts before any content is transferred: DNS resolution, connection setup, processing on the server, first byte. For [LLM crawlers](/en/knowledge/geo-glossary/llm-crawlers/), TTFB is more critical than for classic search engines.

## How does TTFB affect AI crawlers?

A live agent fetching pages during an AI answer works under time pressure: the user is waiting for the answer. If a server responds too slowly, the agent aborts the request — and does not retry. As a guideline, at the SISTRIX Meetup in September 2026, Chrissy Kunisch (ONE Beyond Search) cited a TTFB under 500 to 800 milliseconds. For training crawlers the same applies in a weaker form: slow hosts get fewer fetches per unit of time ([crawl budget](/en/knowledge/geo-glossary/crawl-budget/)).

## Why does TTFB matter for AI visibility?

Because a page whose fetch is aborted does not exist for that answer — regardless of how good its content is. In classic SEO, a slow TTFB costs ranking points; in AI search, it costs the appearance in the specific answer. That is why TTFB, together with JavaScript rendering, sits at the top of the list of technical factors that are even more critical for GEO than for SEO.

## What does this mean for your website?

Measure the TTFB of your most important pages, including under load. Typical levers are server-side caching, a CDN, a leaner backend and statically served pages. A CodaAI blog article describes how server performance and AI crawlers are connected: [AI crawlers and server performance](/en/blog/ai-crawler-server-performance-geo/). Also check whether your content is present in the HTML without JavaScript — the two factors usually occur together.
