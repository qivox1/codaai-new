---
title: "Knowledge graph"
lang: en
de: knowledge-graph
seoTitle: "What is a knowledge graph?"
seoDescription: "Knowledge graph explained: how it links entities, what Google's Knowledge Graph and knowledge panels are, and how AI systems use them to check facts."
shortDefinition: "A knowledge graph is a knowledge base that stores real-world things as entities with a unique identifier and maps how they relate to one another. Search engines and AI systems use it to check facts."
synonyms: ["Google Knowledge Graph", "Knowledge base graph", "Entity graph"]
category: grundlagen
related: ["entity", "entity-home", "corroboration", "structured-data", "ai-mode", "ai-hallucination"]
pubDate: 2026-10-05
faq:
  - q: "Can a company add itself to the Google Knowledge Graph?"
    a: "No. There is no submission form. Google takes entities from sources across the web. You can only influence it indirectly — through structured data, matching statements from independent sources and, where appropriate, a well-referenced Wikidata item. Once a knowledge panel exists, you can claim it and suggest changes."
  - q: "What is the difference between a knowledge graph and a knowledge panel?"
    a: "The knowledge graph is the database in the background. The knowledge panel is the information box Google shows in search results when someone searches for an entity that is in its Knowledge Graph. A knowledge panel is therefore a visible sign that Google recognises your brand as an entity."
  - q: "Does work on the knowledge graph also reach ChatGPT?"
    a: "Only to a limited extent. According to Duane Forrester, entity work mainly pays off on Google, because there is an actual graph to feed there. A language model, by contrast, learns from large volumes of text during training. What counts there is how many independent texts describe your brand in the same way."
---

A knowledge graph is a knowledge base that stores real-world things as entities and the relationships between them as connections. Every [entity](/en/knowledge/geo-glossary/entity/) — a person, a company, a product, a place — has a unique identifier, attributes and links to other entities. Search engines and AI systems use knowledge graphs to work out who or what is meant and to check facts.

## How does a knowledge graph work?

A knowledge graph stores knowledge as statements made of three parts: subject, relationship, object. The sentence “Example Ltd is headquartered in Bielefeld” becomes a link between the entity “Example Ltd” and the entity “Bielefeld”. These groups of three are called semantic triples. Many triples together form a network in which a system can move from one entity to the next.

The unique identifier is what makes it work. Wikidata, the open knowledge base of the Wikimedia projects, gives every item a number made of Q and a digit sequence — Douglas Adams is Q42 — and every property a number made of P and digits. These identifiers let a system tell apart things that share a name: the city from the company of the same name, the brand from the surname.

## What is the Google Knowledge Graph?

Google introduced its Knowledge Graph in May 2012. Amit Singhal, then Senior Vice President of Engineering at Google, described it on the [Google blog](https://blog.google/products/search/introducing-knowledge-graph-things-not/) as a model that understands real-world entities and their relationships — “things, not strings”. At launch, according to Google, it contained more than 500 million objects and more than 3.5 billion facts about the relationships between them.

The Google Knowledge Graph becomes visible in the knowledge panel. According to Google's help pages, this is the information box that appears when someone searches for an entity that is in the Knowledge Graph. Knowledge panels are generated automatically from sources across the web. Whoever officially represents an entity can claim the panel and suggest changes.

There is no direct way in. According to Duane Forrester (July 2026), you influence the Knowledge Graph only indirectly: through structured data, consistent confirmation by third parties and, where appropriate, a clean Wikidata item that independent sources agree with.

## What role does the knowledge graph play in AI systems?

Jason Barnard (Kalicube) calls the three technologies behind AI assistants the “Algorithmic Trinity”: the [LLM](/en/knowledge/geo-glossary/llm/) for the conversation, the search engine for current and niche information, and the knowledge graph for validating facts. In Barnard's view, Google is the only major provider that owns all three itself (Kalicube livestream, July 2026).

Google confirms the link for [AI Mode](/en/knowledge/geo-glossary/ai-mode/): according to its announcement in March 2025, AI Mode draws on real-time sources such as the Knowledge Graph alongside web content. Duane Forrester adds that Google's AI answers resolve entities against that same graph before they generate a response.

Other providers work differently. A language model contains no knowledge graph for anyone to feed. It learns from large volumes of text, and what survives is the consensus of many sources (Forrester, July 2026). For ChatGPT and similar systems, what matters most is how many independent texts describe a brand in the same way.

## Why does a knowledge graph matter for AI visibility?

An AI system can only talk about a brand it recognises unambiguously. If a brand is recorded as an entity with clear attributes, the system attributes facts to it correctly. Without that clarity, confusion follows. Hanns Kronenberg lists entity confusion alongside [AI hallucinations](/en/knowledge/geo-glossary/ai-hallucination/) as one of four structural risks in AI answers (CAMPIXX, June 2026).

On Google, the knowledge graph works twice over: in classic search through the knowledge panel, and in the AI features through entity resolution. A brand that does not exist there as an entity has to rely on text signals alone.

## What does this mean for your website?

Make your company unambiguous. No single measure achieves this; it comes from agreement across many places:

- **One central page:** decide which page describes your company authoritatively — your [entity home](/en/knowledge/geo-glossary/entity-home/).
- **One description:** use the same name, founding year, location and description of services everywhere ([consistent brand description](/en/knowledge/geo-glossary/consistent-brand-description/)).
- **Machine-readable details:** mark up your company with [structured data](/en/knowledge/geo-glossary/structured-data/) of the type Organization and point to your profiles via sameAs.
- **Plain sentences:** phrase facts as simple statements of subject, relationship and object. iPullRank recommends this explicitly, because such triples are the building blocks of knowledge graphs.
- **Third-party confirmation:** make sure independent sources state the same facts ([corroboration](/en/knowledge/geo-glossary/corroboration/)).

A Wikidata item only makes sense if your company meets Wikidata's notability criteria. It has to be describable using serious, publicly available references. An item without such references will not be accepted and will not help.
