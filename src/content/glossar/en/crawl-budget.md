---
title: "Crawl Budget"
lang: en
de: crawl-budget
shortDefinition: "Crawl budget is the number of fetches a crawler devotes to a website in a given period. Crawl management makes sure this budget goes to the pages that really count."
synonyms: ["Crawl management", "Crawl control", "Crawl allocation"]
category: technik
related: ["llm-crawlers", "url-discovery", "index-management", "ttfb"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "How do I direct the crawl budget to the important pages?"
    a: "Clear the unimportant out of the way: exclude filter and parameter URLs, internal search results and duplicates via robots.txt or noindex, mask unnecessary links, restrict the XML sitemap to indexable URLs and keep it current. What the crawler does not see costs no budget."
  - q: "Does the crawl budget also apply to AI crawlers?"
    a: "Yes, with one difference: many LLM crawlers are less patient than Googlebot and come back less often. A website that keeps the bot busy with thousands of unimportant URLs risks the important ones never being reached at all."
---

Crawl budget is the number of page fetches a crawler grants a website within a given period. It depends on the size of the website, its response speed and its importance. Crawl management is the work of making sure this budget goes to the content that really counts — and not to filter pages, parameter URLs and duplicates.

## How does the crawl budget work?

A crawler discovers URLs through links and sitemaps ([URL Discovery](/en/knowledge/geo-glossary/url-discovery/)) and works through them in an order it determines itself. Every URL costs one fetch. If the server responds slowly ([TTFB](/en/knowledge/geo-glossary/ttfb/)), the number of fetches per unit of time drops. If the website contains many URLs without value of their own — sort orders, session parameters, internal search results — the budget is spread across them, and the important pages are visited less often or later.

For [LLM crawlers](/en/knowledge/geo-glossary/llm-crawlers/) this applies even more strictly: they return less often than Googlebot and do not retry aborted fetches.

## Why does the crawl budget matter for AI visibility?

Because content a crawler does not reach makes it neither into training nor into a live answer. The crawl budget is part of the chain that precedes every ranking: URL Discovery, crawl management, [index management](/en/knowledge/geo-glossary/index-management/), linking, content quality. If one link fails, the rest happens without the page.

## What does this mean for your website?

Keep the XML sitemap current and restrict it to indexable URLs. Exclude parameter, filter and duplicate URLs from crawling. Mask links that crawlers should not follow. Check in the log files which URLs AI bots actually fetch — if filter pages appear there instead of service pages, the budget is misallocated.
