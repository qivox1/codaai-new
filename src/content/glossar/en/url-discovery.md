---
title: "URL Discovery"
lang: en
de: url-discovery
shortDefinition: "URL Discovery is the question of whether crawlers can find a website's relevant content at all: via HTML links, a current sitemap and without click or login walls in front of important content."
synonyms: ["URL findability", "Crawlability", "Internal linking"]
category: technik
related: ["crawl-budget", "index-management", "llm-crawlers", "ai-friendly-content-formats"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Why are HTML links decisive for URL Discovery?"
    a: "Because crawlers follow links in the HTML — not click handlers in JavaScript, not menus that only appear after an interaction, not buttons without an href. A page reachable only through a JavaScript menu does not exist for an LLM crawler, because it does not execute JavaScript."
  - q: "Do login walls and cookie banners count as obstacles to URL Discovery?"
    a: "Login walls, yes: no crawler sees what lies behind them. Cookie banners, no, as long as the actual content is in the HTML and is not loaded only after consent. Click walls are critical — ‘show more’ buttons with the main content behind them."
---

URL Discovery is the first step of every indexing process: a crawler has to know a URL before it can fetch it. It learns URLs through links on pages it already knows and through the XML sitemap. Can crawlers find the relevant content at all? That is the question that comes before crawl budget, indexing and ranking.

## How does URL Discovery work?

A crawler starts from known URLs — the homepage, the sitemap — and follows the HTML links it finds there. Every linked page becomes the next known URL. Pages without an incoming HTML link are orphans: they are found only if they are listed in the sitemap, and even then the crawler rates them as unimportant because nothing points to them. [LLM crawlers](/en/knowledge/geo-glossary/llm-crawlers/) do not execute JavaScript; links that only appear via script do not exist for them.

Click walls and login walls break the chain at a different point: the URL is known, but the content behind it cannot be reached without an interaction.

## Why does URL Discovery matter for AI visibility?

Because it is the lowest link in the chain: URL Discovery, [crawl management](/en/knowledge/geo-glossary/crawl-budget/), [index management](/en/knowledge/geo-glossary/index-management/), linking, content quality. A service page that is reachable only through a JavaScript menu is not discovered by AI crawlers, not taken into training and not fetched for a live answer — regardless of its quality.

## What does this mean for your website?

All important pages must be reachable via HTML links — from the navigation, from related pages, from the footer. Keep the sitemap current. Do not put click or login walls in front of content that is meant to be found. And check the link graph: pages with only one incoming link are hard to find for humans too.
