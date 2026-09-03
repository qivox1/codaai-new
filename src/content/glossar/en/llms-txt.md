---
title: "llms.txt"
lang: en
de: llms-txt
shortDefinition: "llms.txt is a proposed text file in the root directory of a website that offers language models a curated overview of the most important content. A measurable effect on AI citations has not been demonstrated so far."
synonyms: ["llms-full.txt", "LLMs.txt standard"]
category: content
related: ["llm-crawlers", "index-management", "url-discovery", "ai-friendly-content-formats"]
pubDate: 2026-09-03
stufe: 1
faq:
  - q: "Should I create an llms.txt?"
    a: "It does no harm and costs little — as a concise, maintained overview with core statements and links. But do not expect a visibility effect: analyses across hundreds of thousands of domains show no correlation between llms.txt and AI citations. The fundamentals — crawlability, rankings, extractable passages — work; the file on its own does not."
  - q: "What is the difference between llms.txt and llms-full.txt?"
    a: "llms.txt is the curated short version: what the website is, which pages matter, what the core statements are. llms-full.txt contains the complete texts of the pages in one file so that a system could read them without crawling. Both assume that a system retrieves them at all."
---

llms.txt is a proposed convention: a Markdown file at `/llms.txt` that provides language models with a curated summary of the website — description, most important pages with a short explanation, core statements. A companion file, `llms-full.txt`, contains the complete texts. The idea is modelled on robots.txt, but it is not a standard that AI providers are bound to read.

## How does llms.txt work?

The file sits in the root directory and can be retrieved by anyone. In plain Markdown, it describes what the website is, what each page stands for and which statements are reliable. A system that reads the file gets an overview without having to crawl the website. Whether and how the major AI providers actually use the file is not documented. Analyses across large sets of domains — such as the evaluation of 300,000 domains reported by Search Engine Journal, and experiments by otterly.ai and promptwatch — find no measurable effect on AI citations. SISTRIX classifies the file accordingly in its AI fundamentals.

## Why is llms.txt relevant for AI visibility?

Above all as an example of what does not work as long as the fundamentals are missing. An llms.txt does not replace rankings, crawlable pages or extractable passages. It can be useful when an agent explores a website deliberately, and it costs almost nothing. But anyone who plans it as a GEO measure with impact overestimates it.

## What does this mean for your website?

Create an llms.txt if you already have a maintained overview of your core statements — concise, current, free of advertising language, with the same figures as on the website. Keep it in sync with your positioning; an outdated file that still describes the offer from two years ago is worse than none. Invest the real time in crawlability ([LLM crawlers](/en/knowledge/geo-glossary/llm-crawlers/)), indexing and content at paragraph level.
