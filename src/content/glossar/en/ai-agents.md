---
title: "AI agents"
lang: en
de: ki-agenten
seoTitle: "What are AI agents? Explained"
seoDescription: "AI agents explained: how ChatGPT agent, Claude in Chrome and others read and operate websites — and what your website needs so that agents can actually use it."
shortDefinition: "AI agents are AI systems that complete tasks independently on a person's behalf: they plan steps, read and operate websites, fill in forms and compare offers."
synonyms: ["KI-Agenten", "Browser agents", "Agentic AI", "AI agent", "Autonomous agents"]
category: grundlagen
related: ["webmcp", "accessibility-tree", "agentic-commerce", "llm-crawlers", "web-search", "ttfb"]
pubDate: 2026-10-05
faq:
  - q: "Do AI agents need a separate version of my website?"
    a: "No. The Chrome team says that what makes a website good for people also makes it good for AI agents — semantic HTML, a clear hierarchy, good accessibility. Google Search also ignores files such as llms.txt. Invest in the existing site rather than a parallel version."
  - q: "Are AI agents the same as AI crawlers?"
    a: "No. A crawler collects pages for an index or for training. An AI agent works through a specific task for a person and interacts like a user: it clicks, scrolls and fills in forms. Tory Gray stresses that being agent-ready is not the same as being visible in AI."
  - q: "Which content do AI agents most often miss on a website?"
    a: "Content behind hover effects, elements under transparent overlays and controls built as a div instead of a button. Google explicitly names such patterns as problems in its guide to agent-friendly websites."
---

AI agents are AI systems that complete tasks independently on a person's behalf. Google describes them as “autonomous systems that can perform tasks on behalf of people, such as booking a reservation or comparing product specifications” (Google Search Central, AI optimisation guide, July 2026). Unlike a chatbot, an agent does not just write an answer: it opens websites, reads them and operates them.

## Which AI agents use websites today?

The major providers have released their own agents. The overview below only includes details from the vendors' own sources:

| Agent | Provider | How it uses websites |
|---|---|---|
| ChatGPT agent | OpenAI, since July 2025 | Its own virtual computer with a visual and a text-based browser; asks for permission before consequential actions |
| Claude in Chrome | Anthropic, pilot since August 2025 | Browser extension that sees pages, clicks buttons and fills in forms; on all paid plans since December 2025 |
| Google Agent | Google, documented since April 2026 | Crawler used by AI agents running on Google's infrastructure |

In addition, there are agents that run directly on a website and agents for the command line. Andre Bandarra (Chrome team, Google) names these three forms and stresses that the agentic web is not a separate web but an evolution of the existing one (Chrome for Developers, July 2026).

## How do AI agents work on a website?

An agent does not see your page on a monitor but as a machine-readable representation. According to Google, there are three ways (web.dev, Kasper Kulikowski, April 2026):

- **Screenshot:** a vision model identifies elements on the rendered page. This is slow and uses many tokens, so it serves as a fallback.
- **HTML/DOM:** the agent reads nesting, attributes and text. This is how it knows that a “Buy” button belongs to a particular product.
- **[Accessibility tree](/en/knowledge/geo-glossary/accessibility-tree/):** the browser-generated summary of the roles, names and states of interactive elements.

Modern agents combine all three. The longer the task, the more context builds up — and, according to the Chrome team, the greater the risk that the model misreads a signal and takes a wrong turn (Chrome for Developers, July 2026). With [WebMCP](/en/knowledge/geo-glossary/webmcp/), a website can shorten this detour and offer actions directly as tools.

## How do AI agents differ from AI crawlers?

[LLM crawlers](/en/knowledge/geo-glossary/llm-crawlers/) collect pages for training or a search index. They do not interact like users. Agents do exactly that and therefore need different conditions, Tory Gray explained in a Sitebulb webinar (June 2026). She also warns against confusing the two: an agent-ready website is not automatically visible in AI answers.

## Why do AI agents matter for AI visibility?

Agents move part of the purchase decision into the machine. At SEO Week 2026, Crystal Carter described a new “validation layer”: the stage where agents assess whether a brand meets a user's preferences and requirements before surfacing it as a recommendation (iPullRank, June 2026). A site that offers missing details or an unusable interface at this stage drops out — even if it was found earlier in the [web search](/en/knowledge/geo-glossary/web-search/).

In retail this is already concrete: agents compare prices, check availability and return conditions, and sometimes buy themselves ([agentic commerce](/en/knowledge/geo-glossary/agentic-commerce/)).

## What does this mean for your website?

A website that works well for people also works for agents — that is the Chrome team's core message. In practice:

- **Content in the HTML:** important text, prices and specifications are in the delivered HTML, not loaded later by JavaScript.
- **Semantic controls:** `<button>` and `<a>` instead of repurposed `<div>` elements; form fields linked with `<label for>`.
- **Stable layout:** no transparent overlays, no hover-only content, important buttons in the same position on every product page.
- **Fast response:** for agentic recommendations, Kevin Indig recommends a technically fast, easily accessible website (Growth Memo, July 2026) — [TTFB](/en/knowledge/geo-glossary/ttfb/) is a good place to start.
- **Open facts:** what an agent needs for validation — scope of services, prices or price ranges, lead times, certifications — is on the page, not behind a form.

For its browser agent in ChatGPT Atlas, OpenAI explicitly recommends WAI-ARIA best practices, meaning descriptive roles, labels and states on buttons, menus and forms (OpenAI, help article for publishers, as of September 2026).
