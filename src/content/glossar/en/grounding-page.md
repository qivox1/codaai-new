---
title: "Grounding page"
lang: en
de: grounding-page
seoTitle: "Grounding Page: Structure"
seoDescription: "Grounding pages explained: what belongs on a facts page for AI systems, what the open standard requires, what it achieves – and an example you can copy."
shortDefinition: "A grounding page is a page on a company’s own website that provides its verified key facts in one place, dated and citable — as a reliable source for AI systems."
synonyms: ["Grounding pages", "Facts page", "Fact sheet", "Company facts", "Brand facts page", "Single source of truth"]
category: offpage
related: ["consistent-brand-description", "entity", "grounding", "model-knowledge", "entity-echoing", "llms-txt", "entity-home"]
pubDate: 2026-09-22
updatedDate: 2026-10-05
stufe: 2
faq:
  - q: "What belongs on a grounding page?"
    a: "Everything an AI system should reproduce correctly about a company: the name in one spelling, legal entity, location, contact, services, target group, prices or price range, contacts and a description in three lengths (one sentence, 50 words, 150 words). Add a date and, if needed, a distinction from companies with a similar name."
  - q: "Does a grounding page need special markup for AI systems?"
    a: "No. A grounding page is a normal, indexable HTML page. Structured data (Organization, AboutPage) helps search engines classify it; there is no separate markup for AI. What matters is that the page ranks, is linked internally and matches what third-party sites say."
  - q: "How does a grounding page relate to llms.txt?"
    a: "llms.txt is a signpost for AI agents to a website’s most important pages; the grounding page is one of those pages and holds the actual facts. llms.txt should point to the grounding page but does not replace it."
  - q: "Does a grounding page replace the about page?"
    a: "No. The about page tells who is behind a company and what it stands for; the grounding page lists the verifiable facts. The two link to each other and must not contradict each other on any detail."
---

A grounding page is a page on a company’s own website that collects its key facts in one place: who the company is, what it offers, for whom, at what price, who is behind it and where it is based. Every fact is dated and written so that it can be understood without the rest of the page. The term comes from GEO practice; on websites the page is usually simply called “Facts”, “Fact sheet” or “Company at a glance”.

## How is a grounding page structured?

A grounding page consists of a few fixed building blocks. Each one answers a question an AI system asks about a company:

| Building block | Content | Answers the question |
|---|---|---|
| Short description | one sentence, 50 words, 150 words — reusable word for word | What does the company do? |
| Fact sheet | name in one spelling, legal entity, year founded, location, size, contact | Who exactly is this? |
| Services | a list with one service per item, plus what is not offered | Does the supplier fit my request? |
| Target group and market | industries, company size, regions | Who is the offer for? |
| Prices | prices or price range with a date | What does it cost? |
| People | management, contacts, authors with their roles | Who is behind it? |
| Distinction | difference from companies or products with a similar name | Is this the same company as …? |
| Date | visible, updated with every change | Is the information current? |

The language is factual and in the third person: the company name instead of “we” ([entity echoing](/en/knowledge/geo-glossary/entity-echoing/)), facts instead of promises. Every row of the fact sheet delivers one fact that a system can take over on its own.

## How does a grounding page work?

A grounding page works through the normal route of [grounding](/en/knowledge/geo-glossary/grounding/): when someone asks an AI about a company, the system searches the web for suitable sources and takes the most convincing passages into its answer. If the answer to “What does company X do?” or “How much does company X cost?” sits in a self-contained sentence on a well-linked, indexed page, that page is an obvious candidate. The precondition is the same as for any source: the page has to be found and to rank.

The page therefore follows the rules for citable passages: headings as questions, the answer in the first sentence, one idea per paragraph. A fact sheet in table form delivers each fact as its own row.

## Is there a standard for grounding pages?

There is an open standard, but no requirement from the AI providers. The Grounding Page Project, an independent initiative, publishes a specification at [groundingpage.com](https://groundingpage.com/) (version 1.6, as of June 2026). It calls for facts at the level of a single entity, stable definitions, a citation-ready structure and rules for telling apart entities with similar names. Excluded are marketing claims, subjective assessments, constantly changing data, regulated advice and SEO manipulation.

Google, OpenAI and other providers have not defined a page type of this kind. Following the standard produces a particularly clean facts page — the format alone does not bring a ranking advantage.

## How does a grounding page differ from the about page?

The about page tells a story, the grounding page provides evidence. The about page holds history, values and team; the grounding page holds the verifiable facts, plainly and completely. Dixon Jones describes the homepage or the about page as the typical “entity home” of a brand — the page that defines who a company is and that all other pages have to align with. The grounding page adds the level of detail that has no room there. Both pages link to each other and do not contradict each other on any detail.

## Why is a grounding page important for AI visibility?

A grounding page matters because AI systems assemble their picture of a company from many sources and fill gaps themselves. Without collected facts, a model picks up outdated details from directories, confuses companies with similar names or does not describe the company at all. The grounding page gives the system a reference against which other sources can be checked.

On its own it is not enough: an AI system trusts a fact more when third-party sources say the same. The grounding page is therefore the starting point for a [consistent brand description](/en/knowledge/geo-glossary/consistent-brand-description/), not a replacement for it. It affects [model knowledge](/en/knowledge/geo-glossary/model-knowledge/) only with new training data, but answers with web search as soon as it is indexed.

## Is a grounding page essential or just hype?

Neither. At the latest since CAMPIXX 2026, where Hanns Kronenberg presented grounding pages as a tool for brands, products and people, the term has spread through the German SEO scene. What is new is mainly the name: a maintained facts page was good practice before, and Google’s guide to AI search explicitly classifies GEO measures as SEO. The benefit is still real — not because AI systems recognise the page type, but because a company uses it to define its facts once and bindingly and can align all other sources with them.

## What does a grounding page mean for your website?

A grounding page needs four things: its own indexable URL, links from the body text of important pages (not only from the footer), a visible date, and the same wording as on LinkedIn, the Google Business Profile and directories. The description in three lengths can be copied there word for word. One example is [CodaAI’s facts page](/en/facts/): description in three lengths, fact sheet, pricing, people and the distinction from a tool with a similar name.
