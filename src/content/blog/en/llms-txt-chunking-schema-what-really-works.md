---
title: "Google Says GEO Is SEO. What llms.txt, Chunking and Special Schema Really Achieve"
seoTitle: "llms.txt, Chunking, Schema: What Works?"
description: "Google calls GEO “still SEO”. What llms.txt, chunking and schema markup do for AI answers – checked against Google's documentation and three large studies."
pubDate: 2026-10-30
lang: en
# Hero image to follow (Oli picks from three photo proposals with finding card).
# Planned: heroImage: "/images/blog/llms-txt-schema-en.webp"
# heroImageAlt: "… overlaid finding: 97% of llms.txt files were not fetched a single time in May 2026 (Ahrefs)"
author: "Oliver Parrizas"
authorTitle: "Digital & Visibility Analyst, CodaAI"
authorBio: "In online marketing since 2001, from the first search engine rankings through SEO and AEO to visibility in AI answers. Conducts CodaAI's visibility audits and analysed the study AI Blind Test 2026."
authorImage: /images/speaker-oliver-parrizas.webp
category: "Readable for AI"
reihe: technik
tags: ["llms.txt", "Chunking", "Structured data", "GEO", "Google AI Mode"]
featured: false
summary: "In its guide to AI features in Search, Google writes that optimising for generative AI search is still SEO: it requires neither an llms.txt, nor content cut into small pieces, nor special schema markup. Independent studies confirm this: 97% of llms.txt files were not fetched a single time in May 2026 (Ahrefs), and JSON-LD added to existing pages brought no meaningful increase in AI citations. For ChatGPT the statement only partly holds, because a strong Google ranking does not protect a company from being invisible there."
faq:
  - q: "What does Google say about llms.txt, chunking and schema for AI answers?"
    a: "In its guide to generative AI features in Search (last updated 10 July 2026), Google writes that optimising for AI Overviews and AI Mode is still SEO. New machine-readable files such as an llms.txt are not needed, and Google Search ignores them. Content does not have to be broken into small pieces, and there is no special schema markup for AI features. Google still recommends structured data, but for rich results in classic search."
  - q: "Do AI crawlers actually fetch llms.txt files?"
    a: "Hardly ever. Ahrefs analysed server data from around 137,000 domains: of the roughly 38,000 domains with a valid llms.txt, 97% recorded not a single request for the file in May 2026. The few requests came mostly from bots, led by GPTBot and Claude-Code – in other words from developer tools rather than AI search systems."
  - q: "Does schema markup increase the number of AI citations?"
    a: "Not according to the available data. Ahrefs tracked 1,885 pages that added JSON-LD between August 2025 and March 2026 and compared them with unchanged control pages: in Google AI Mode and ChatGPT the increase was statistically indistinguishable from zero, and in AI Overviews citations even fell slightly. Structured data is still worthwhile because it describes companies and products unambiguously."
  - q: "Does Google's statement that GEO is SEO also apply to ChatGPT?"
    a: "Only partly. Google speaks exclusively about its own search. ChatGPT often answers from model knowledge and, when it searches the web, relies heavily on the Bing index. In the study AI Blind Test 2026, 34.9% of the 361 companies with more than 100 top-10 rankings on Google were completely invisible in ChatGPT."
  - q: "Should an existing llms.txt be deleted?"
    a: "No, as long as it is maintained. According to Google, the file neither harms nor helps visibility in Google Search. It costs little and can show agents and developer tools the way to a site's most important pages. A file that describes an outdated offering should be updated or removed."
---

Anyone preparing a website for AI answers currently hears three pieces of advice more than any other: create an llms.txt, cut content into small sections and add special schema markup. **In its guide to AI features in Search, Google says that optimising for generative AI search is “still SEO” and that none of the three is necessary for it. The data backs Google up: 97% of llms.txt files were not fetched a single time in May 2026 ([Ahrefs, around 137,000 domains](https://ahrefs.com/blog/llmstxt-study/)).**

That does not mean technology is irrelevant. It means the levers are the same ones that have mattered on Google for years: readable pages, a place in the index, good rankings and content that says something not found everywhere else. For ChatGPT there is one caveat that Google does not mention.

<div class="blog-stat-grid not-prose">
  <div class="blog-stat-card">
    <span class="stat-value">97%</span>
    <span class="stat-label">of the roughly 38,000 domains with a valid llms.txt: not a single request for the file in May 2026</span>
    <span class="stat-source">Ahrefs, around 137,000 domains, June 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">10.13%</span>
    <span class="stat-label">of around 300,000 domains have an llms.txt – with no detectable link to AI citations</span>
    <span class="stat-source">SE Ranking via Search Engine Journal, November 2025</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">1,885</span>
    <span class="stat-label">pages that added JSON-LD – no meaningful increase in AI citations</span>
    <span class="stat-source">Ahrefs, May 2026</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">34.9%</span>
    <span class="stat-label">of the 361 companies with more than 100 top-10 rankings on Google are completely invisible in ChatGPT</span>
    <span class="stat-source">CodaAI, AI Blind Test 2026</span>
  </div>
</div>

```grafik
typ: anteil
titel: Almost no llms.txt file is ever fetched
wert: 97
anzeige: "97%"
label: "of the roughly 38,000 domains with a valid llms.txt recorded not a single request for the file in May 2026 – neither from people nor from bots."
label_kurz: "Domains without a request"
rest_label: "Domains with at least one request"
fehlstelle: true
quelle: "Ahrefs, “We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read”, Louise Linehan, 15 June 2026 – server data from Ahrefs Web Analytics, May 2026"
alt: "97 percent of the roughly 38,000 domains with a valid llms.txt recorded not a single request for the file in May 2026."
```

## What exactly does Google say about GEO, llms.txt, chunking and schema?

Google answers all three questions unusually clearly in its [guide to generative AI features in Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). The page appeared in May 2026 ([Search Engine Journal, 15 May 2026](https://www.searchenginejournal.com/googles-new-ai-search-guide-calls-aeo-and-geo-still-seo/575026/)) and was last updated on 10 July 2026. The key statements:

- **GEO and AEO:** “optimizing for generative AI search is optimizing for the search experience, and thus still SEO.”
- **llms.txt and Markdown:** you “don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search”. Google Search ignores such files – they neither harm nor help visibility.
- **Chunking:** “There's no requirement to break your content into tiny pieces for AI to better understand it.” There is no ideal page length either.
- **Schema:** “Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add.”

The reasoning lies in the technology behind it. AI Overviews and AI Mode retrieve their content from the Google Search index via the core ranking systems. To do so, the model breaks a question down into several related searches, the [query fan-out](/en/knowledge/geo-glossary/query-fan-out/). For a page to qualify at all, it must be indexed and eligible to be shown with a snippet. A site that does not rank on Google will therefore not be found by these systems either – with or without a special file.

One sentence stands out because it runs against an entire industry: no third-party tool has access to Google's internal ranking or AI systems. Anyone who promises to “unlock” selection in AI Overviews with a tool is selling something that does not exist.

## What does an llms.txt do for AI visibility?

An [llms.txt](/en/knowledge/geo-glossary/llms-txt/) delivers nothing measurable for visibility in AI answers, according to all the data available. The file is a proposal: a Markdown overview in the root directory that shows language models the most important pages of a website. It is not a standard that AI providers are bound to read.

Three independent analyses reach the same result:

- **Requests:** Ahrefs analysed server data from around 137,000 domains. Of the roughly 38,000 domains with a valid file, 97% recorded not a single request in May 2026. 96% of the few requests came from bots, led by GPTBot and the developer tool Claude-Code. Slackbot fetched the files more often than PerplexityBot did ([Ahrefs, 15 June 2026](https://ahrefs.com/blog/llmstxt-study/)).
- **Citations:** SE Ranking examined around 300,000 domains. 10.13% had an llms.txt. Neither simple statistical tests nor an XGBoost model showed a link to AI citations; removing the llms.txt variable actually made the model more accurate ([Search Engine Journal, 20 November 2025](https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/)).
- **Content:** Common Crawl analysed 584,107 llms.txt files from its July 2026 crawl. 68.27% were templated, with Wix alone accounting for 41.34% of all files. Only 49.90% had the complete shape the specification asks for ([Common Crawl, 31 August 2026](https://commoncrawl.org/blog/a-content-analysis-of-llms-txt-files-from-the-july-2026-crawl-archive)).

The figures explain each other. Most files exist because a website builder or plugin creates them automatically, not because anyone maintains them. That is not a signal an AI system could rely on.

In the German-speaking market, SISTRIX takes the same view: the major providers do not currently use the file actively, and conventional company websites have “no acute need for action” ([Udo Raaf, Frag SISTRIX, updated 27 October 2026](https://www.sistrix.de/frag-sistrix/ai-grundlagen/llms-txt/), our translation).

We have an [llms.txt](/llms.txt) ourselves. It was quick to set up, and we do not expect a single additional mention from it. Its value lies elsewhere: agents and developer tools that explore a website deliberately find the right pages faster. If you have a file, there is no need to delete it. If you do not, you are not missing anything.

## Do texts have to be broken into small sections for AI?

[Chunking](/en/knowledge/geo-glossary/chunking/) – splitting pages into passages – does happen, but inside the AI system, not at the writing stage. Google says explicitly that nobody needs to cut their content into small pieces for AI, because the systems can tell several topics on one page apart and find the relevant part themselves.

How much text actually makes it into an answer was measured by Dan Petrovic (dejan.ai) for Google's AI answers. He analysed 7,060 queries with at least three sources and compared the text excerpts used with 2,275 full pages ([dejan.ai, 20 December 2025](https://dejan.ai/blog/how-big-are-googles-grounding-chunks/)). The result: each query has a fixed [grounding budget](/en/knowledge/geo-glossary/grounding-budget/) of around 2,000 words, distributed by relevance. The source in rank 1 received a median of 531 words (28%), the one in rank 5 only 266 (13%). A typical page contributes around 377 words.

```grafik
typ: kette
titel: How a page gets into Google's AI answer
schritte:
  - { t: "Crawling and index", s: "The page is readable for the regular Googlebot and indexed – no special file needed" }
  - { t: "Query fan-out", s: "The model breaks the question down into several related searches" }
  - { t: "Ranking", s: "The core ranking systems select suitable pages from the index" }
  - { t: "Grounding", s: "Passages are taken from those pages, around 2,000 words per query" }
  - { t: "Answer", s: "Rank 1 supplies roughly twice as much text as rank 5 (median)" }
schwelle:
  nach: 3
  text: "This is where ranking decides – not llms.txt, chunk length or special schema"
quelle: "Own illustration based on Google Search Central, guide to generative AI features (last updated 10 July 2026), and Dan Petrovic, dejan.ai (20 December 2025)"
alt: "Process in five steps: crawling and index, query fan-out, ranking, grounding with around 2,000 words per query, answer. After the ranking step comes the threshold: this is where ranking decides, not a special file."
```

Two things follow from this. First, ranking decides how much of a page ends up in the answer. Rank 1 gets roughly twice as much space as rank 5. That is classic search engine optimisation.

Second, a passage has to make sense on its own, because it appears in the answer without the rest of the page. That is an argument not for snippets but for clean writing – one idea per paragraph, the statement first, technical terms spelled out rather than pointing back to earlier paragraphs with “this” and “here”. Writing like that is also better for people. Chopping a specialist article into twenty disconnected mini-sections, on the other hand, loses exactly what Google explicitly wants to reward: a point of view of your own that goes beyond common knowledge.

## Does schema markup help a page get cited in AI answers?

[Structured data](/en/knowledge/geo-glossary/structured-data/) helps search engines identify companies, products and people unambiguously – according to the available data, it does not bring more AI citations. Google still recommends it, but for rich results in classic search, not as an entry ticket to AI Overviews.

The most robust study comes from Ahrefs. It tracked 1,885 pages that added JSON-LD between August 2025 and March 2026 against 4,000 control pages, each measured 30 days before and after the change. The result in its own words: “Adding schema produced no major uplift in citations on any platform.” In Google AI Mode (+2.4%) and ChatGPT (+2.2%) the increase was statistically indistinguishable from zero, and in AI Overviews citations even fell slightly, by 4.6% ([Ahrefs, 11 May 2026](https://ahrefs.com/blog/schema-ai-citations/)).

The same study shows where the myth comes from: pages cited by AI systems were almost three times more likely to have JSON-LD than pages that were not cited. That is a correlation. Well-maintained websites simply tend to have both schema and good content. The markup itself is not the cause.

Search Atlas arrives at the same picture with a different method. The study groups domains into five buckets by schema coverage, from “no schema” to “full”, and compares their visibility in OpenAI, Gemini and Perplexity. Domains with complete coverage performed no better than those with minimal or no schema ([Search Atlas, Manick Bhan, 14 December 2025, updated 19 June 2026](https://searchatlas.com/blog/limits-of-schema-markup-for-ai-search/)). The study reports no correlation value; it compares distributions. It only measured whether schema was present, not which type or in what quality.

Olaf Kopp (Aufgesang) puts it this way: Schema.org is a “hygiene factor” for search engines and a useful, indirect lever – but not a stand-alone “LLM lever”. Its influence runs through indexing, the knowledge graph and retrieval layers, not through the markup being “read” directly ([Aufgesang, 4 May 2026](https://www.aufgesang.de/blog/wie-wichtig-sind-schema-markups-fuer-die-generative-engine-optimization-geo/), our translation).

In practice that means: Organization on the homepage, Person for authors, Product for products, Article with dates for specialist articles. Every statement in the markup must also appear as visible text on the page. Anyone buying “AI schema” beyond this basic set is not buying citations.

## Does “GEO is SEO” also apply to ChatGPT?

The statement “GEO is SEO” applies to Google and only partly to ChatGPT. In its guide, Google speaks exclusively about its own search. How ChatGPT or Perplexity weigh their sources is not addressed – Search Engine Journal points this out as well.

Our own research shows how large the difference is. In the study [AI Blind Test 2026](/en/study/) covering 449 companies, **34.9% of the 361 companies with more than 100 top-10 rankings on Google are completely invisible in ChatGPT.** Average visibility is 24.9% in ChatGPT and 39.4% in Google AI Overviews. We queried ChatGPT without web search – the figure measures what the model knows on its own.

The reason lies in the mechanics. ChatGPT often answers from model knowledge without searching. When it does search, it relies heavily on the Bing index ([more on this in the article on ChatGPT and Bing](/en/blog/chatgpt-seo-perplexity-visibility/)). A top position on Google is therefore a good starting point, but no guarantee. What also counts in ChatGPT are mentions on third-party sites and a consistent description of the company across the web – the evidence is in the article [Getting recommended by ChatGPT as a supplier](/en/blog/get-recommended-by-chatgpt-as-a-supplier/).

None of this requires a special file either. The crawlers of OpenAI, Anthropic and Perplexity do not execute JavaScript ([Vercel and MERJ, December 2024](https://vercel.com/blog/the-rise-of-the-ai-crawler)). What only appears in the browser, they do not see. Readable HTML helps every system; an llms.txt, as things stand, helps none.

## What should you do instead?

Instead of special files and extra markup, put the time into the fundamentals that work for Google and ChatGPT alike. Sorted by impact:

1. **Be readable.** The most important service pages must be in the HTML without JavaScript, and the AI crawlers must not be blocked in robots.txt.
2. **Rank.** AI Overviews and AI Mode draw on the Google index, ChatGPT relies heavily on Bing when it searches the web. Pages that are not near the top there get little or no space in the answer.
3. **Say something of your own.** Google explicitly asks for content that goes beyond common knowledge. Your own figures, experience from projects and clear assessments are what a model cannot produce by itself.
4. **Write clearly.** One idea per paragraph, the answer first, terms spelled out – then every passage makes sense on its own.
5. **A basic set of schema.** Organization, Person, Product, Article, matching the visible text. That is enough.
6. **llms.txt is optional.** Create one if it will be maintained, otherwise leave it. Do not budget agency hours for it.

This order matches what the [GEO optimisation guide](/en/knowledge/geo-optimization/#what-does-not-work) sets out in its section on measures that do not work. Nobody can promise a placement in AI answers – not even with the most complete llms.txt in the world.
