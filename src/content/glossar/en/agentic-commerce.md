---
title: "Agentic commerce"
lang: en
de: agentic-commerce
seoTitle: "Agentic commerce explained"
seoDescription: "Agentic commerce explained: how AI agents research, compare and buy, which protocols exist (ACP, AP2, UCP) and what B2B suppliers should be doing about it now."
shortDefinition: "Agentic commerce is commerce in which AI agents research products, compare offers and complete the purchase on a person's behalf — based on machine-readable product data."
synonyms: ["Agentic shopping", "Agent-led commerce", "Agentischer Handel", "Agentic Commerce Optimization", "ACO"]
category: technik
related: ["ai-agents", "webmcp", "structured-data", "ai-mode", "accessibility-tree", "llm-readability"]
pubDate: 2026-10-05
faq:
  - q: "What is the difference between agentic commerce and agentic commerce optimisation?"
    a: "Agentic commerce describes the process: an AI agent buys or prepares a purchase. According to Olaf Kopp, Agentic Commerce Optimization (ACO) is the discipline of preparing product data so that an agent understands it, trusts it and can build a transaction on it."
  - q: "Does a B2B supplier need an online shop for agentic commerce?"
    a: "No. Even without a checkout, the agent researches and compares beforehand. What matters is that specifications, prices or price ranges, lead times and contacts are on the website in machine-readable form. An enquiry can also be offered as a WebMCP tool."
  - q: "Which agentic commerce protocol should I implement first?"
    a: "For most businesses, none. Google said in April 2026 that the Universal Commerce Protocol is still new and not immediately necessary for every e-commerce site. Complete, correct product data on the website and in the feed is the prerequisite for any protocol."
---

Agentic commerce is commerce in which an [AI agent](/en/knowledge/geo-glossary/ai-agents/) researches products, compares offers and prepares or completes the purchase on a person's behalf. The person sets the goal and the conditions — budget, delivery date or brand, for example. Often they no longer see the product detail page at all.

## How does agentic commerce work?

Olaf Kopp describes the process like this: agents in ChatGPT, Google AI Mode, Perplexity, Amazon Rufus or Microsoft Copilot take over the role that people used to play. They search for offers, compare prices, check availability and return conditions — and sometimes make the purchase decision directly (Kopp, July 2026).

For the agent, two surfaces become the interface: the product detail page and the product feed. Whatever is missing or contradictory there, it cannot compare. An offer without a price or lead time simply drops out of a request such as “available by Friday, under 500 euros”.

## Which protocols exist for agentic commerce?

Open protocols are emerging for the purchase itself. The three most important:

| Protocol | Developed by | Purpose |
|---|---|---|
| Agentic Commerce Protocol (ACP) | OpenAI and Stripe, September 2025 | Checkout between buyer, agent and merchant; first implemented in ChatGPT |
| Agent Payments Protocol (AP2) | Google with more than 60 partners, September 2025 | Secure agent payments using cryptographically signed “mandates” that prove the user's instruction |
| Universal Commerce Protocol (UCP) | Google with Shopify, Etsy, Wayfair, Target and Walmart, January 2026 | A common language from product discovery to order management, for example for [AI Mode](/en/knowledge/geo-glossary/ai-mode/) |

ACP and UCP share one principle: the merchant remains the merchant of record and keeps the customer relationship, payment processing and fulfilment. According to the [UCP announcement](https://developers.googleblog.com/en/under-the-hood-universal-commerce-protocol-ucp/), UCP is compatible with AP2.

## What is agentic commerce optimisation?

Olaf Kopp defines Agentic Commerce Optimization (ACO) as a sub-discipline of GEO: it optimises product data so that an autonomous agent understands it, trusts it and ideally builds a transaction on it (Kopp, July 2026). The central levers are trust signals for agents and context at the level of the individual product. Kopp places ACO alongside Brand Context Optimization and [LLM readability](/en/knowledge/geo-glossary/llm-readability/) and sees it as a clear priority for retailers that mainly sell third-party brands.

## Why does agentic commerce matter for AI visibility?

An agent does not choose by design but by data. In an experiment with 252,000 trials across six language models, explicit price information consistently improved citation, while formatting-only changes had little effect (“What Gets Cited”, SIGIR 2026, as analysed by Kai Spriestersbach, August 2026). Spriestersbach recommends keeping product [structured data](/en/knowledge/geo-glossary/structured-data/) complete and correct: prices, availability, variants, ratings, shipping (AFAIK, July 2026).

## What does agentic commerce mean for B2B?

In B2B, buying often ends not in a basket but in an enquiry or a tender. An agent can take over the research beforehand: which suppliers meet standard X, deliver batch size Y, are based in region Z? Anyone who writes “price on request” and only offers data sheets as PDFs gives the agent no comparable facts. Brian Casey (IMPACT) advises giving worked examples with reasons when prices vary; examples are better than a range, and a range is better than “it depends” (August 2026).

## What does this mean for your website?

- **Specifications as text:** dimensions, materials, standards and item numbers are on the page as HTML text or a table, not only in a PDF.
- **Prices and availability:** concrete prices, price examples or ranges; lead times and minimum order quantities.
- **Consistent data:** website, product feed and structured data state the same values.
- **Operable flows:** basket and enquiry buttons as real buttons in the [accessibility tree](/en/knowledge/geo-glossary/accessibility-tree/); the most important enquiry additionally as a [WebMCP](/en/knowledge/geo-glossary/webmcp/) tool.
