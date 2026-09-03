---
title: "Index Management"
lang: en
de: index-management
shortDefinition: "Index management is the control over which URLs of a website are indexable: noindex only for content that should not appear in AI answers, canonical tags only for unavoidable duplicate content."
synonyms: ["Indexing", "Indexability", "Noindex and canonical"]
category: technik
related: ["crawl-budget", "url-discovery", "document-relevance", "initial-retrieval"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Which pages should be set to noindex in index management?"
    a: "Only those that should appear neither in search results nor in AI answers: thank-you pages, internal search results, login areas, redirect pages. Setting a service page to noindex because it is ‘not finished’ removes it from every retrieval — including that of the AI systems."
  - q: "How do I check whether my index management is correct?"
    a: "Check meta robots and X-Robots headers per URL, verify canonicals against the actual URLs, compare the sitemap with the index in Search Console and in Bing Webmaster Tools. Pages that are in the sitemap but not indexed need an explanation."
---

Index management is the control over which URLs of a website are taken into a search engine's index. The tools are meta robots directives and X-Robots headers (index/noindex), canonical tags that name the main version among duplicates, and the XML sitemap as the list of desired URLs. The guiding question is: are the important URLs indexable — and only those?

## How does index management work?

A crawler fetches a page and checks the robots directives. If the page is set to noindex, it is not taken into the index and cannot appear in any search. If it carries a canonical to another URL, the other one is treated as the main version. Errors in these directives are silent: a page with an accidental noindex or a wrong canonical simply drops out of the index without anyone seeing an error message.

For AI search this means: what is not in Google's or Bing's index cannot be found in [initial retrieval](/en/knowledge/geo-glossary/initial-retrieval/) — the systems draw on exactly these indices.

## Why does index management matter for AI visibility?

Because the chain before every AI answer begins with indexing: no index, no ranking, no retrieval, no grounding. Two rules sum it up: noindex only for content that should not appear in AI answers. Canonical tags only for unavoidable duplicate content — not as a substitute for clean URL structures.

## What does this mean for your website?

Go through your important URLs and check robots directives, canonicals and the index status in Google and Bing. Pay particular attention to Bing: ChatGPT fetches its candidates there, and many websites have never checked Bing. Keep the sitemap current and restricted to indexable URLs so that it works as a reliable list ([crawl budget](/en/knowledge/geo-glossary/crawl-budget/)).
