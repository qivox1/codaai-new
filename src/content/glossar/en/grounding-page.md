---
title: "Grounding page"
lang: en
de: grounding-page
shortDefinition: "A grounding page is a page on a company’s own website that provides its verified key facts in one place, dated and citable — as a reliable source for AI systems."
synonyms: ["Facts page", "Fact sheet", "Company facts", "Brand facts page"]
category: offpage
related: ["consistent-brand-description", "entity", "grounding", "model-knowledge", "entity-echoing", "llms-txt"]
pubDate: 2026-09-22
stufe: 2
faq:
  - q: "What belongs on a grounding page?"
    a: "Everything an AI system should reproduce correctly about a company: the name in one spelling, legal entity, location, contact, services, target group, prices or price range, contacts and a description in three lengths (one sentence, 50 words, 150 words). Add a date and, if needed, a distinction from companies with a similar name."
  - q: "Does a grounding page need special markup for AI systems?"
    a: "No. A grounding page is a normal, indexable HTML page. Structured data (Organization, AboutPage) helps search engines classify it; there is no separate markup for AI. What matters is that the page ranks, is linked internally and matches what third-party sites say."
  - q: "How does a grounding page relate to llms.txt?"
    a: "llms.txt is a signpost for AI agents to a website’s most important pages; the grounding page is one of those pages and holds the actual facts. llms.txt should point to the grounding page but does not replace it."
---

A grounding page is a page on a company’s own website that collects its key facts in one place: who the company is, what it offers, for whom, at what price, who is behind it and where it is based. Every fact is dated and written so that it can be understood without the rest of the page. The term comes from GEO practice; on websites the page is usually simply called “Facts”, “Fact sheet” or “Company at a glance”.

## How does a grounding page work?

A grounding page works through the normal route of [grounding](/en/knowledge/geo-glossary/grounding/): when someone asks an AI about a company, the system searches the web for suitable sources and takes the most convincing passages into its answer. If the answer to “What does company X do?” or “How much does company X cost?” sits in a self-contained sentence on a well-linked, indexed page, that page is an obvious candidate. The precondition is the same as for any source: the page has to be found and to rank.

The page therefore follows the rules for citable passages: headings as questions, the answer in the first sentence, the company name instead of “we” ([entity echoing](/en/knowledge/geo-glossary/entity-echoing/)), one idea per paragraph. A fact sheet in table form delivers each fact as its own row.

## Why is a grounding page important for AI visibility?

A grounding page matters because AI systems assemble their picture of a company from many sources and fill gaps themselves. Without collected facts, a model picks up outdated details from directories, confuses companies with similar names or does not describe the company at all. The grounding page gives the system a reference against which other sources can be checked.

On its own it is not enough: an AI system trusts a fact more when third-party sources say the same. The grounding page is therefore the starting point for a [consistent brand description](/en/knowledge/geo-glossary/consistent-brand-description/), not a replacement for it. It affects [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) only with new training data, but answers with web search as soon as it is indexed.

## What does a grounding page mean for your website?

A grounding page needs four things: its own indexable URL, links from the body text of important pages (not only from the footer), a visible date, and the same wording as on LinkedIn, the Google Business Profile and directories. The description in three lengths can be copied there word for word. One example is [CodaAI’s facts page](/en/facts/): description in three lengths, fact sheet, pricing, people and the distinction from a tool with a similar name.
