---
title: "TTFB (Time to First Byte)"
lang: en
de: ttfb
seoTitle: "TTFB – Time to First Byte"
seoDescription: "TTFB (Time to First Byte) explained: what a good value is, how to measure and reduce it – and why AI crawlers give up on slow servers faster than Google does."
shortDefinition: "TTFB is the time from the request to the first byte of the server response. For LLM crawlers the guideline is under 500 to 800 milliseconds — otherwise the fetch is aborted, with no retry."
synonyms: ["Time to First Byte", "Server response time", "Server latency"]
category: technik
related: ["llm-crawlers", "crawl-budget", "log-files", "url-discovery"]
pubDate: 2026-09-03
updatedDate: 2026-10-05
stufe: 1
faq:
  - q: "Why is TTFB more critical for AI crawlers than for Google?"
    a: "Googlebot is patient and comes back. LLM crawlers, especially the live agents during an answer, have a narrow time window: the answer to the user should be ready in seconds. If the server responds too slowly, the request is aborted and not repeated — the page drops out of that answer."
  - q: "How do I measure my website's TTFB?"
    a: "With PageSpeed Insights or WebPageTest, in the browser via network analysis, or on the command line with curl and the time_starttransfer value. Measure several pages and times of day — a TTFB that rises under load is exactly the problem crawlers run into."
  - q: "Is TTFB a Core Web Vital?"
    a: "No. The Core Web Vitals are LCP, INP and CLS. TTFB comes before them: every millisecond until the first byte also delays the Largest Contentful Paint. Google therefore treats TTFB as a supporting metric, not as an assessment criterion of its own."
---

TTFB (Time to First Byte) is the time between sending a request and receiving the first byte of the response. It measures how quickly the server reacts before any content is transferred at all. For [LLM crawlers](/en/knowledge/geo-glossary/llm-crawlers/), TTFB is more critical than for classic search engines, because they abort slow fetches and do not retry them.

## What is a good TTFB?

In its developer documentation [web.dev](https://web.dev/articles/ttfb), Google rates a TTFB of 0.8 seconds or less as good. A stricter guideline applies to AI crawlers:

| Rating | Google (web.dev) | Guideline for AI crawlers |
|---|---|---|
| good | up to 0.8 s | under 0.5 to 0.8 s |
| needs improvement | 0.8 to 1.8 s | above that, the fetch risks being aborted |
| poor | over 1.8 s | fetch frequently fails |

Chrissy Kunisch (ONE Beyond Search) gave the guideline for AI crawlers at the SISTRIX Meetup in September 2026. It applies to every page an AI is supposed to cite — not just the homepage, and also when the server is under load.

## What makes up TTFB?

TTFB covers everything that happens before the first byte. Google counts:

- **Redirects:** every redirect restarts the request.
- **DNS lookup:** the domain is translated into an IP address.
- **Connection and TLS:** browser or crawler and server negotiate the encrypted connection.
- **Server processing:** the server builds the page — database queries, templates, plugins — and sends the first byte.

On dynamic websites, server processing is usually the largest item. Pages delivered statically or from a cache skip it almost entirely.

## How does TTFB affect AI crawlers?

A live agent that fetches pages during an AI answer works under time pressure: the user is waiting for the answer. If a server responds too slowly, the agent aborts the request — and does not retry. A milder form of the same applies to training crawlers: slow hosts receive fewer fetches per unit of time ([crawl budget](/en/knowledge/geo-glossary/crawl-budget/)). For AI agents that operate websites on a user's behalf, Jessica Frederick (Sitebulb) also recommends optimising TTFB and payload size — agents have little patience.

## Why does TTFB matter for AI visibility?

Because a page whose fetch is aborted does not exist for that answer — regardless of how good its content is. In classic SEO a slow TTFB costs ranking points; in AI search it costs the appearance in the specific answer. That is why TTFB, together with JavaScript rendering, sits at the top of the list of technical factors that are even more critical for GEO than for SEO.

## How do you measure TTFB?

The quickest way is the command line:

```bash
curl -o /dev/null -s -w "TTFB: %{time_starttransfer} s\n" https://www.your-domain.com/
```

Measure several pages, several times a day. PageSpeed Insights also shows the TTFB of real visitors, provided the website has enough traffic. Also check the response times AI crawlers actually experience: they are in the server [log files](/en/knowledge/geo-glossary/log-files/), separated by user agent. Bot protection that first redirects crawlers to a challenge page lengthens the TTFB for exactly these visitors — or locks them out completely.

## How do you reduce TTFB?

The most effective levers, ordered by effort:

1. **Page cache:** serve finished pages from the cache instead of generating them anew for every request.
2. **Resolve redirect chains:** point internal links directly at the target URL.
3. **CDN:** deliver content from servers close to the requester.
4. **Lighten the backend:** remove slow database queries and unnecessary plugins, use current server software.
5. **Static delivery:** generate pages as finished HTML at publication. Server processing then disappears almost entirely.

## What does this mean for your website?

Measure the TTFB of your most important pages, including under load, and compare it with the guideline for AI crawlers. A CodaAI blog article describes how server performance and AI crawlers are connected: [AI crawlers and server performance](/en/blog/ai-crawler-server-performance-geo/). Also check whether your content is in the HTML without JavaScript — the two factors usually occur together.
