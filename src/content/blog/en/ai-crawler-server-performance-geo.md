---
title: "GEO Visibility: AI Search Engine Guide"
description: "With the right server performance and GEO-optimized content from CodaAI, AI crawlers like GPTBot and ClaudeBot will reliably cite your website."
pubDate: 2026-03-22
updatedDate: 2026-10-05
lang: en
inUebersicht: false
author: "Oliver Parrizas"
authorTitle: "Digital & Visibility Analyst, CodaAI"
authorBio: "In online marketing since 2001, from the first search engine rankings through SEO and AEO to visibility in AI answers. Conducts CodaAI's visibility audits and analysed the study AI Blind Test 2026."
authorImage: /images/speaker-oliver-parrizas.webp
category: "SEO & GEO"
tags: ["AI Crawler", "GEO", "Server Performance", "GPTBot", "TTFB", "AI Visibility"]
featured: false
heroImage: /images/blog/AI-crawler-server-performance.webp
heroImageAlt: "AI Crawler Server Performance Geo"
summary: "AI crawlers like GPTBot, ClaudeBot and PerplexityBot crawl websites in two modes: for model training indexing and – far more critically – in real-time for user queries. If your server responds too slowly – the guideline is a TTFB under 500 to 800 milliseconds – the live fetch is aborted and other sources are cited. With the right measures – CDN, caching, correct robots.txt configuration and llms.txt – you ensure that AI search engines reliably retrieve your content and cite it as a source."
faq:
  - q: "What is an AI crawler and how does it differ from Googlebot?"
    a: "AI crawlers like GPTBot (OpenAI), ClaudeBot (Anthropic), or PerplexityBot collect website content either for training language models or for real-time responses to user queries. Unlike Googlebot, which indexes for classic search results, AI crawlers determine whether your content appears as a source in ChatGPT, Claude or Perplexity."
  - q: "What TTFB value do I need for AI crawler optimization?"
    a: "Google rates a TTFB (Time to First Byte) of 0.8 seconds or less as good and over 1.8 seconds as poor (web.dev). A stricter guideline applies to AI crawlers: under 500 to 800 milliseconds, as Chrissy Kunisch stated at the SISTRIX Meetup in September 2026. Above that, the risk rises that ChatGPT-User or Claude-User abort the fetch. There are no robust studies on an exact threshold."
  - q: "Should I block GPTBot and ClaudeBot in robots.txt?"
    a: "It depends on your strategy. If you block GPTBot and ClaudeBot, your content won't be used for model training – but you'll also lose AI visibility. For B2B companies wanting to appear as a source in AI responses, it's more sensible to selectively allow training crawlers while explicitly enabling real-time crawlers (ChatGPT-User, Claude-User)."
  - q: "What is llms.txt and do I need it?"
    a: "llms.txt is a standard text file (analogous to robots.txt, but for AI models) that you place in your website's root directory. It summarizes your most important pages and content in machine-readable format and helps AI crawlers understand your content more efficiently. For websites with substantial content, llms.txt is a simple GEO leverage with minimal effort."
  - q: "How do I measure whether AI crawlers are crawling my website?"
    a: "Analyze your server logs from the last 30 days for bot user-agents like 'GPTBot', 'ClaudeBot', 'PerplexityBot', 'ChatGPT-User' and 'Claude-User'. Tools like Cloudflare Analytics, AWStats or even a simple grep analysis show you which bots access your site at what frequency and with what response times."
---

Half of Germans now use AI chats instead of classic search – and while marketing teams invest in GEO-optimized content, many overlook a critical prerequisite: whether your server actually responds fast enough when an AI crawler arrives. This article shows what technical requirements you must meet for your GEO measures to work effectively – and how CodaAI handles the content side once the technical foundation is in place.

<div class="blog-stat-grid not-prose">
  <div class="blog-stat-card">
    <span class="stat-value">50%</span>
    <span class="stat-label">of Germans already use AI chats instead of classic web search</span>
    <span class="stat-source">Bitkom, "Internet Search in Flux", 2025</span>
  </div>
  <div class="blog-stat-card">
    <span class="stat-value">0.8 s</span>
    <span class="stat-label">TTFB limit up to which Google rates the server response as “good”</span>
    <span class="stat-source">Google, web.dev “Time to First Byte (TTFB)”, 2025</span>
  </div>
</div>

## Two Types of AI Crawlers – and Why the Difference Determines Your Ranking

Not all [AI crawlers](/en/knowledge/geo-glossary/llm-crawlers/) work the same way. The critical difference lies in time pressure – and it has direct consequences for your AI visibility.

**Type 1: Training and Indexing Crawlers**

GPTBot from OpenAI, ClaudeBot from Anthropic and PerplexityBot systematically collect web content to train language models or build search machine databases. These bots have no acute time pressure: if they can't get through today, they'll try again tomorrow. For them, response times are less critical – what matters is that they're not blocked by `robots.txt`.

**Type 2: Real-Time Retrieval Crawlers**

ChatGPT-User, Claude-User and similar bots become active when a user asks a question in real-time and the system retrieves current web content. This is called [Retrieval Augmented Generation (RAG)](https://www.frugaltesting.com/blog/behind-perplexitys-architecture-how-ai-search-handles-real-time-web-data): the AI system recognizes that its training data is insufficient and retrieves live sources – while the user waits.

Here, server speed becomes a hard AI ranking metric. The guideline is a TTFB under 500 to 800 milliseconds. If your server responds more slowly, the fetch is aborted and the system works with the sources that delivered in time. The user doesn't notice, and your company doesn't appear in the answer.

### The Blind Spot of Most GEO Strategies

Classic SEO measures PageSpeed for human users. AI crawlers behave differently: GPTBot can send thousands of requests to a domain in a short time – Metehan Yeşilyurt counted more than 29,000 GPTBot requests on a test site in the first twelve hours (March 2026). This means even a server with decent average performance can struggle under this load – and fail precisely when a real-time crawler is waiting for a response.

Moreover: even if the server responds fast enough, content ultimately determines whether your company is cited as a source in the AI response. Technical performance is the entry ticket – GEO-optimized content is the actual ticket. Both must be right.

## Why Server Response Times Are Critical for AI Visibility

[TTFB (Time to First Byte)](/en/knowledge/geo-glossary/ttfb/) is the time between sending an HTTP request and receiving the first byte of the server response. In its developer documentation [web.dev](https://web.dev/articles/ttfb), Google rates a TTFB of 0.8 seconds or less as good and values over 1.8 seconds as poor.

AI crawlers have stricter standards. At the SISTRIX Meetup in September 2026, Chrissy Kunisch (ONE Beyond Search) gave a guideline of under 500 to 800 milliseconds. There is no robust study yet that links an exact threshold to citation rates – figures such as “under 200 milliseconds” come from individual analyses by tool vendors.

The reason lies in the architecture of [RAG systems](/en/knowledge/geo-glossary/retrieval-augmented-generation/): they fetch sources while the user is waiting for the answer. If much of the available time is already used up before the first byte, the risk rises that the system aborts and answers without that page.

### Core Web Vitals and AI Visibility Are Connected

Websites with “Good” Core Web Vitals ratings – such as an LCP under 2.5 seconds – consistently appear more frequently in [Google AI Overviews](/en/knowledge/geo-glossary/ai-overviews/) than structurally similar content on slower servers, according to [research by Fiveblocks](https://www.fiveblocks.com/your-slow-corporate-site-is-hurting-you-in-ai-search/). TTFB itself is not a Core Web Vital, but it precedes all of them: every millisecond before the first byte also delays LCP. This means: whoever has invested in performance for classic SEO automatically benefits from AI visibility too. Those who haven't now pay double: worse Google rankings and lower citation rates in AI responses.

## The 5 Most Important Technical Measures for AI Crawler Performance

These measures can be implemented regardless of your CMS or hosting provider and are ordered by effort-to-benefit ratio.

### 1. Enable CDN and Server-Side Caching

A Content Delivery Network (CDN) is the most effective single measure for TTFB improvements. CDNs like Cloudflare, AWS CloudFront or Fastly deliver cached content from edge servers positioned geographically close to requesting bots. For AI crawlers, which often access sites from US data centres, this mainly shortens the transatlantic connection setup.

Additionally, server-side caching (such as Redis, Varnish or CMS-native page cache solutions) prevents a full database query from running on every crawler request. With many simultaneous GPTBot requests, an uncached WordPress blog can quickly become overwhelmed.

### 2. Configure robots.txt Strategically

The `robots.txt` is your website's gatekeeper protocol for all crawlers – and an often underestimated GEO lever. The central strategic decision: which bots do you let in, and for what purpose?

For most B2B companies, the following basic configuration is recommended:

```
# Classic search engines – always allowed
User-agent: Googlebot
Allow: /

# Training crawlers – depending on strategy
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

# Real-time retrieval – always allow for AI visibility
User-agent: ChatGPT-User
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /
```

Important: Since August 2025, the EU AI Act requires GPAI providers to legally respect robots.txt opt-outs. This gives companies, for the first time, a solid legal basis to control training crawling selectively – without sacrificing real-time crawling visibility.

### 3. Implement llms.txt

`llms.txt` is a newer standard (comparable to `robots.txt`, but for AI models) that you place in your website's root directory. It lists which pages and documents are particularly relevant for AI crawlers – with brief descriptions and direct URLs.

A simple example:

```
# My Company
> B2B software for manufacturing companies in the DACH region.

## Main Pages
- [About Us](https://www.example.com/about-us/): Company, team, history
- [Services](https://www.example.com/services/): Product portfolio
- [Blog](https://www.example.com/blog/): Technical articles on Industry 4.0
```

For Astro, Next.js or other static site frameworks, `llms.txt` can be implemented as an API endpoint that automatically includes all current pages with every build.

### 4. Analyze Server Logs

Before investing, you need to know what's currently happening. Analyze your server logs from the last 30 days for the following bot user-agents:

- `GPTBot` – OpenAI training crawler
- `ChatGPT-User` – OpenAI real-time crawler
- `ClaudeBot` – Anthropic training crawler
- `Claude-User` – Anthropic real-time crawler
- `PerplexityBot` – Perplexity crawler
- `Meta-ExternalAgent` – Meta AI crawler (new since 2024, now a regular sight in server logs)

Important metrics: number of crawl requests, average response time per bot, HTTP status codes (5xx errors are a warning sign), crawled URLs.

### 5. Structured Data and Schema Markup

AI crawlers parse pages faster and more reliably when semantic structure is present via [Schema.org markup](https://schema.org). Particularly relevant for B2B websites:

- `Article` – for blog posts and specialist articles
- `FAQPage` – for FAQ pages (direct citation through AI Overviews)
- `Organization` – for company pages
- `HowTo` – for guides and step-by-step instructions

Combined with fast server performance, [structured markup](/en/knowledge/geo-glossary/structured-data/) gives AI crawlers the complete signal package: "This content is reliable, well-structured and fast to retrieve."

## The Usual Approach: From Assessment to Implementation

The typical starting point: a B2B company barely appears in ChatGPT responses for its core topics – even though Google rankings are solid. The work then runs in three steps.

**Assessment:** measure TTFB, check whether a CDN is active, review `robots.txt` for AI crawler entries, and filter the server logs for bot user-agents.

**Measures:** put a CDN in front of the site and enable server-side caching, configure `robots.txt` for the most important AI crawlers, add an `llms.txt` listing the most relevant specialist articles, and add Article and FAQ schema to blog posts.

**Check:** evaluate the server logs again – are regular ChatGPT-User and Claude-User crawls showing up now? In addition, AI monitoring tools (like [AmICited.com](https://www.amicited.com)) can track whether the brand is being mentioned in AI responses.

This approach illustrates GEO's two-pillar principle: technical infrastructure is the prerequisite for AI crawlers to even access your content. But what they find there – whether fact-dense, directly structured, well-sourced – determines citation. This second part is precisely what [CodaAI](https://www.codaai.ai/en/digital-visibility/) handles for B2B companies.

## How to Measure Your Current AI Crawler Performance

Before investing in optimizations, a baseline assessment is worthwhile. It shows whether AI crawlers are accessing your website at all – and how quickly they're being served.

### Step 1: Evaluate Server Logs

Download your web server's access logs from the last 30 days and filter for known AI crawler user-agents. On Linux/macOS, this works with a simple grep command:

```bash
grep -E "GPTBot|ChatGPT-User|ClaudeBot|Claude-User|PerplexityBot|Meta-ExternalAgent" access.log | wc -l
```

What you should look for: how many requests come from which bot? Which HTTP status codes are returned? What's the average response time? Are 429 (Too Many Requests) or 503 (Service Unavailable) errors accumulating?

If you see no AI crawler entries in your logs at all, there are two possible causes: either your `robots.txt` blocks these bots, or your website simply hasn't been crawled yet. Both can be fixed.

### Step 2: Measure TTFB

Tools like [WebPageTest](https://www.webpagetest.org) or the Chrome DevTools Network panel measure TTFB for individual pages. For a realistic assessment, test from different locations – since AI crawlers often operate from US data centers, transatlantic TTFB is particularly relevant.

As a guideline: a TTFB over 0.8 seconds from the US suggests a missing CDN or inadequate server-side caching. That's your first starting point.

### Step 3: Check Crawlability

Use the [Google Search Console URL Inspection Tool](https://search.google.com/search-console/) or dedicated AI crawlability checkers like [AmICited.com](https://www.amicited.com/faq/what-tools-check-ai-crawlability/) to verify whether your most important pages are fundamentally crawlable. Common errors: accidental `noindex` tags, faulty canonical references or `robots.txt` rules that unintentionally block AI crawlers.

## What Changes Concretely for Mid-Market Companies

The shift toward AI-powered search has reached Germany. [According to Bitkom (2025)](https://www.bitkom.org/Presse/Presseinformation/Internet-Suche-Wandel-Haelfte-nutzt-KI-Chats), half of Germans already use AI chats instead of or in addition to classic search. 67% of the population aged 16+ use generative AI at least occasionally – a year ago it was still 40%.

For B2B companies, this means: the decision-makers researching your products and services are increasingly asking ChatGPT or Perplexity – not a search engine. Whoever doesn't appear in these responses loses visibility with a growing group of potential customers.

The critical difference from classic SEO: while Google rankings take weeks or months to shift, AI crawler optimizations are technical in nature and show results as soon as the next crawl cycle runs.

### The Underestimated Speed Advantage for Mid-Market Companies

Larger corporate websites often struggle with technical debt, legacy CMS and bureaucratic update cycles. A mid-market company with modern infrastructure (or willingness to adapt it quickly) can catch up in AI visibility much faster than in classic Google rankings.

### GEO-Optimized Content: What AI Crawlers Really Cite

A common misconception: whoever ranks well on Google will also be cited by AI search machines. That's only partially true. Classic SEO optimizes for backlinks, domain authority and keyword relevance. AI crawlers, by contrast, prioritize four content criteria – and these determine CodaAI's editorial approach:

**Factual Density:** AI models prefer content with concrete numbers, data and verifiable statements. General introductory texts without substance are rarely cited. CodaAI articles are systematically backed by verified statistics from German sources (Bitkom, Statista DE, Fraunhofer).

**Direct Answer Structure:** Sections beginning with a clear answer to an implicit question are more frequently used as sources than texts that deliver the core only after lengthy introductions. In CodaAI format, this is a structural requirement, not optional.

**Source Quality:** AI models evaluate which external sources an article cites. Linking to professional associations and scientific studies signals reliability – to algorithmic systems as well.

**Freshness:** AI crawlers prioritize fresh content. A 2019 article has worse chances than one from 2025, even if the older one goes deeper. Regular updates with new `updatedDate` in the frontmatter are therefore sensible.

These four factors can be implemented alongside technical performance measures – they're not either-or, but two halves of the same GEO strategy.

## Checklist: AI Crawler Readiness in 30 Minutes

Use this quick check before undertaking larger measures:

**Technical Foundation:**
- [ ] `robots.txt` contains explicit entries for GPTBot, ClaudeBot, ChatGPT-User, Claude-User, PerplexityBot
- [ ] Server logs show AI crawler access (no complete block)
- [ ] TTFB under 0.8 seconds, ideally under 0.5 seconds (measured from the US)
- [ ] CDN active or planned

**Content Foundation:**
- [ ] Important pages have schema markup (Article, FAQ, Organization)
- [ ] `llms.txt` in root directory, present or planned
- [ ] Specialist articles begin with direct answer sentences, not general introductions
- [ ] External, reliable sources linked (professional associations, studies, authorities)
- [ ] GEO-optimized content process established – or partner like [CodaAI](https://www.codaai.ai/en/digital-visibility/) engaged

**Monitoring:**
- [ ] Process for regular log analysis established (monthly)
- [ ] AI mention monitoring set up (for example via AmICited or Perplexity search for your brand)

Whoever can check all ten points has a solid foundation for AI visibility – regardless of how the AI search machine landscape evolves. The points can be prioritized: technical foundation first, content optimization second, monitoring as an ongoing process.

## Technical Foundation Is In Place – Now Comes the Content

The measures described in this article – CDN, TTFB under 0.8 seconds, correct robots.txt, llms.txt – are the prerequisite for AI crawlers to reliably index your website at all. They open the door. But what's behind the door determines whether your company appears in an AI assistant's response.

This is where most B2B companies hit a stumbling block: producing GEO-optimized content requires a different editorial approach than classic SEO writing. Each section must begin with a direct answer. Statistics must be verifiable. The `summary` field must be worded so ChatGPT can use it verbatim as a response. FAQ structures must answer real user questions, not marketing phrases.

[CodaAI](https://www.codaai.ai/en/digital-visibility/) covers precisely this second part – and is thus the natural next step once the technical foundation is in place. Specialist articles are backed by verified German sources, built in the right structure for AI visibility, and delivered directly in the format your Astro, WordPress or any other CMS can use immediately. No agency briefing, no weeks-long editorial process.

**Technical Foundation + GEO-Optimized Content = AI Visibility.** Whoever approaches both systematically is already one decisive step ahead of the majority of German B2B websites today.

**Want to know whether ChatGPT and Google AI Overviews already mention your company?** The [free AI visibility check](https://www.codaai.ai/en/check/) shows you in seconds, no sign-up required. What an ongoing programme with expert articles costs is listed transparently on our [pricing page](https://www.codaai.ai/en/pricing/).
