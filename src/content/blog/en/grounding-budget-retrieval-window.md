---
title: "What AI Systems Really Read From Your Page: Grounding Budget and Retrieval Window"
seoTitle: "Grounding Budget: What AI Really Reads"
description: "ChatGPT opens around 5,700 characters per page, Google's AI answer spreads around 1,900 words across all sources. What that means for your key pages."
pubDate: 2026-11-02
lang: en
heroImage: "/images/blog/grounding-budget-abruffenster-en.webp"
heroImageAlt: "Page source code on a screen beside a printed page layout; overlaid finding: ChatGPT opens around 5,700 characters on the first fetch of a page (Peec AI, June 2026)"
author: "Oliver Parrizas"
authorTitle: "Digital & Visibility Analyst, CodaAI"
authorBio: "In online marketing since 2001, from the first search engine rankings through SEO and AEO to visibility in AI answers. Conducts CodaAI's visibility audits and analysed the study AI Blind Test 2026."
authorImage: /images/speaker-oliver-parrizas.webp
category: "Readable for AI"
reihe: technik
tags: ["Grounding budget", "Retrieval window", "Retrieval", "GEO", "Deep Research"]
featured: false
summary: "An AI system never reads a whole page. In deep research mode, ChatGPT opens a window of around 5,700 characters per page, and for pages with 60 or more links only around 33 percent of that is genuine content. Google's AI answer spreads around 1,900 words per query across all sources together; the first source receives around 531 words of that, the fifth around 266. What matters, therefore, is whether the answer to the question sits inside the window fetched and not somewhere further down the page."
faq:
  - q: "How much of a page's text does an AI system actually fetch in one retrieval?"
    a: "Only a limited window. Peec AI analysed the logs of ChatGPT's deep research mode across more than ten accounts and around 200 runs (June 2026). The first fetch of a page opens around 5,700 characters at the median there, a maximum of around 8,000. A repeat fetch of the same page comes to around 6,200 characters. What is read is linearised HTML in source order, without any content that only JavaScript creates."
  - q: "What is a retrieval window and how big is it?"
    a: "The retrieval window is the extract of text an AI system gets to see at all in a single page fetch. In Peec AI's log analysis it comes to around 5,000 to 6,000 characters per fetch. Before that, an even smaller window decides: a Bing snippet per result runs to around 250 characters at the median and at most around 285. Those 285 characters are all a page has to earn the fetch with."
  - q: "Do navigation and menus use up part of the retrieval window?"
    a: "Yes, and a considerable part. Peec AI measured the share of genuine content in the first fetch against the number of link markers in the window read. For pages with fewer than 20 links, around 78 percent of the fetch is content; between 20 and 59 links around 55 percent; from 60 links on around 33 percent. A typical first fetch contained around 50 link markers."
  - q: "Do longer pages get more room in an AI answer?"
    a: "Proportionally less. Dan Petrovic (dejan.ai) analysed 7,060 queries, 2,275 pages and 883,262 text excerpts: a page under 1,000 words achieves a coverage of around 61 percent, and from 3,000 words on it is around 13 percent. Selection reaches a plateau at around 540 words, so about 3,500 characters. Length does no harm, it is simply not rewarded with more grounding budget."
  - q: "What decides which passage of my page ends up in the AI answer?"
    a: "Whether the passage answers the question on its own. In an analysis of 193,507 AI answers by TJ Robertson (TJ Digital), 23 percent of the cited pages opened in the first few lines with an answer to the question; for pages that were fetched but not cited it was 14 percent. In a blind assessment, around half of the pages passed over were missing an answer in the part that was read, and the cited pages in 23 percent of cases."
---

Anyone who wants to know why a good page does not appear in AI answers first has to know how little of it gets read at all. **An AI system never reads a whole page. In deep research mode, ChatGPT opens a window of around 5,700 characters per page at the median ([Peec AI, log analysis across more than ten accounts, June 2026](https://peec.ai/blog/how-chatgpt-deep-research-reads-your-site-what-the-logs-reveal)), and Google's AI answer spreads a total of around 1,900 words per query across all sources together ([dejan.ai, 7,060 queries](https://dejan.ai/posts/grounding-snippets)).** What stands in that window can be cited. Everything else on the page does not exist for this one answer.

That shifts the question. It is no longer about whether your page contains the answer. It is about whether the answer sits in the place that gets read.

<div class="blog-stat-grid not-prose">
  <div class="blog-stat-card">
    <span class="stat-value">5,700</span>
    <span class="stat-label">characters at the median are what ChatGPT opens on the first fetch of a page, a maximum of around 8,000</span>
    <span class="stat-source">Peec AI, deep research logs, June 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">33%</span>
    <span class="stat-label">of the first fetch is genuine content when the page contains 60 or more links</span>
    <span class="stat-source">Peec AI, deep research logs, June 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">1,929</span>
    <span class="stat-label">words of grounding budget at the median per query, spread across all sources together</span>
    <span class="stat-source">dejan.ai, 7,060 queries, June 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">23%</span>
    <span class="stat-label">of cited pages open in the first few lines with an answer – for pages not cited it is 14%</span>
    <span class="stat-source">TJ Digital via Search Engine Journal, 193,507 AI answers, October 2026</span>
  </div>
</div>

## How much of a page does an AI system actually fetch?

An AI system fetches a limited window on a page visit and does not work with the full page text. Peec AI analysed the logs of ChatGPT's deep research mode for this, across more than ten accounts and around 200 runs in June 2026. The agent knows three commands there: search, open a page, search for a keyword inside the opened page. A fourth command for clicking links was not used in a single logged session.

The sizes of these steps are measurable:

- A Bing snippet per result runs to around 250 characters at the median, at most around 285.
- The result list of a search brings around 740 characters at the median.
- The first fetch of a page opens around 5,700 characters at the median, a maximum of around 8,000.
- A repeat fetch of the same page comes to around 6,200 characters.
- A keyword search inside the page returns around 435 characters on a hit and around 49 on a miss.

Three things follow from this. First, the snippet is the entire window in which your page has to earn the fetch. The decision about the fetch is taken on 285 characters, not on the page content. Second, the agent reads linearised HTML in source order, without the head of the document and without anything that only comes into being in the browser through JavaScript. Third, it does not follow links. A sub-page that can only be reached through a click in the menu does not appear in this session. That [AI crawlers](/en/knowledge/geo-glossary/llm-crawlers/) do not execute scripts is known. What is new is that they do not click onwards inside a fetched page either.

If the agent finds its keyword, it opens the page again at the matching line. In the analysis, this second window contained the line sought in 95 percent of cases. If it does not find it, it tries another keyword in around 60 percent of cases. In about a quarter of cases it leaves the page.

## What does the retrieval window get used up on before the content begins?

The retrieval window fills first with everything that stands before the content in the source code: navigation, language switcher, notice banners, an expanded main menu, breadcrumbs. Peec AI counted how much of the first fetch is actually content, measured against the number of link markers in the window read. The more links, the less text is left over.

```grafik
typ: kennzahl_vergleich
titel: How much of the first fetch is genuine content
werte:
  - { label: "Page with fewer than 20 links", wert: 78, anzeige: "78%" }
  - { label: "Page with 20 to 59 links", wert: 55, anzeige: "55%" }
  - { label: "Page with 60 or more links", wert: 33, anzeige: "33%", markiert: true }
max: 100
quelle: "Peec AI, “How ChatGPT Deep Research reads your site: What the logs reveal”, David Konitzny, 22 June 2026 – logs from more than ten accounts and around 200 runs, June 2026"
alt: "For pages with fewer than 20 links, around 78 percent of the first fetch is genuine content; with 20 to 59 links around 55 percent; and from 60 links on only around 33 percent."
```

A typical first fetch contained around 50 link markers and therefore fell into the middle group. For a corporate website grown over years, with a full main menu, a footer sitemap and a contact column, that means: about half of the window goes on structure before the first sentence of your subject-matter text is read.

That is not an argument against navigation. People need it, and Google renders the page in full anyway. It is an argument for putting the answer to the question high up in the source code. Where the main content begins in the source code is a decision of the template, not a question of the text.

## What is the grounding budget of an AI answer?

The [grounding budget](/en/knowledge/geo-glossary/grounding-budget/) is the amount of text an AI system takes from all sources together per query. Dan Petrovic (dejan.ai) measured it for Google's AI answers, across 7,060 queries, 2,275 complete pages and 883,262 individual text excerpts. Per query the budget comes to around 2,000 words, 1,929 at the median and 2,798 at the 95th percentile. The individual [grounding snippets](/en/knowledge/geo-glossary/grounding-snippets/) are short, around 15.5 words on average.

This budget is distributed by relevance. The source in first place receives around 531 words and therefore 28 percent of the budget. The fifth source receives around 266 words and therefore 13 percent. Per sub-question the system typically fetches five to twenty sources, and Gemini works with around ten results per query.

The retrieval window and the grounding budget are two different limits. The window limits what a system sees of your page at all. The budget limits how much of that ends up in the finished answer. A page can pass the window and fail at the budget because four other sources stand ahead of it.

```grafik
typ: kette
titel: The retrieval path from search query to cited passage
schritte:
  - { t: "Search", s: "The system puts a sub-question to the search index and receives a result list, around 740 characters at the median" }
  - { t: "Snippet", s: "Per result, around 250 characters decide whether the page is opened at all" }
  - { t: "First fetch", s: "What opens is a window of around 5,700 characters, linearised HTML without JavaScript, without a click on links" }
  - { t: "Keyword search", s: "On a hit the agent opens the page again at the matching line, with the line sought inside the window in 95% of cases" }
  - { t: "Answer", s: "Around 1,929 words of budget per query, spread across all sources: first place receives around 531 words, fifth place around 266" }
schwelle:
  nach: 2
  text: "This is where the decision is taken: 250 characters of snippet are the entire window in which to earn the fetch"
quelle: "Own illustration based on Peec AI, deep research logs (22 June 2026), and Dan Petrovic, dejan.ai, “Grounding Snippets” (21 June 2026)"
alt: "A five-step process: search with a result list, snippet of around 250 characters, first fetch with around 5,700 characters, keyword search with a repeat fetch, answer with around 1,929 words of budget. After the snippet comes the threshold at which the fetch is decided."
```

## Why do long pages get less of their content into the answer?

Long pages get proportionally less because the budget per source is capped and does not grow with the length of the page. In the dejan.ai analysis, a page under 1,000 words achieves a coverage of around 61 percent of its text. From 3,000 words on it is around 13 percent. Selection reaches a plateau at around 540 words, so about 3,500 characters. Across all the sources studied, the coverage of a single page lies between 21 and 65 percent.

No recommendation to shorten texts follows from this. A guide of 4,000 words can deliver more text into AI answers in absolute terms than a page of 600 words, because it fits more different sub-questions. What follows is a different question: which 540 words of a long page does the system select?

Anyone mixing seven topics on one advice page leaves that selection to [re-ranking](/en/knowledge/geo-glossary/re-ranking/). Anyone keeping one page per topic makes the selection themselves. That is the same reason we built our glossary as one page per term instead of one page with every term.

## What decides which passage ends up in the answer?

A passage is decided on by whether it answers the question on its own. A study by TJ Robertson (TJ Digital), reported by Search Engine Journal, analysed 193,507 AI answers from ChatGPT, Google AI Mode and the AI Overviews on 4,167 questions, collected in eight weekly snapshots between 27 August and 21 October 2026. The contents of 21,874 cited pages were compared with 4,507 comparison pages on 434 questions ([Search Engine Journal, 28 October 2026](https://www.searchenginejournal.com/ai-cited-pages-more-often-got-straight-to-the-answer/594781/)).

The finding concerns the first few lines. **23 percent of the cited pages opened in the first few lines with an answer to the question asked. For pages that the same systems fetched but did not cite, it was 14 percent.** In a second comparison, cited pages stood at 20 percent and Google top-10 pages that the system never opened at all at 5 percent.

A blind assessment of 195 page pairs rounds out the picture. For around half of the pages passed over, an answer to the question was missing from the part the assessors read. For the cited pages it was missing in 23 percent of cases. The completeness of the answer was rated 2.3 out of 5 for cited pages and 1.7 for those passed over.

These are correlations and not proof of a cause. The same analysis names further features that go together with higher chances: tables at 69 percent, first-hand experience at 45 percent, a date within the last twelve months at more than double the chance. It is notable that an author byline went together with 28 percent lower chances and a call to action with 12 percent lower chances. Both suggest that the systems react to the text before the answer and not to trust signals.

In practice that means: [Bottom Line Up Front](/en/knowledge/geo-glossary/bottom-line-up-front/) is not a question of style. A paragraph that begins with context, the state of the industry and company history uses up the window before the answer arrives.

## How do you check the retrieval window of your own pages?

The retrieval window of one of your own pages can be reconstructed in a few minutes. Four steps are enough:

1. **Look at the source code, not the rendered page.** Call up the page source as it comes from the server. What is not in there, an AI system does not see, even if it appears in the browser.
2. **Mark off the first 5,700 characters or so.** Count from the start of the document. What comes after that is not part of the first fetch.
3. **Check whether the answer is in there.** Take a real buyer question and look for the answer in that extract. If it is not in there, the page is not ready to be fetched for that question.
4. **Count the links before the content.** If more than 60 links stand before the first substantive paragraph, navigation costs two thirds of the window.

Repeat this for the five pages that carry your business. Experience shows the result turns out worse for service pages than for blog articles, because service pages begin with image galleries, reference logos and teaser tiles while the explanatory text sits far down in the source code.

What order of magnitude of invisibility this adds up to is shown by our own survey. In the study [AI Blind Test 2026](/en/study/) of 449 companies, **54.7% of the 3,592 buyer questions went without a mention** of the company examined, and for 46.8% of the companies the systems recommended competitors by name instead. That has several causes, and one of them is technical: the answer was not in the place that gets read.

## What follows from this for your most important pages?

Five decisions follow from the retrieval window and the grounding budget, and all of them sit in the template or in the page structure:

1. **Put the main content early in the source code.** The order in the HTML decides what lands in the window. Visually, the navigation can stay where it is.
2. **Put the answer in the first few lines.** A declarative sentence that answers the question and repeats the term comes before any context.
3. **Keep one page per topic.** That way you decide which 540 words are selected instead of leaving it to re-ranking.
4. **Limit the number of links before the content.** Mega menus with 80 entries cost more in the fetch than they bring users.
5. **Deliver what is meant to be read without JavaScript.** What only comes into being in the browser is not present in the window.

None of these points calls for new content. All five call for a decision about the order in which existing content is delivered. That is the part of AI visibility that can be improved without an editorial budget.
