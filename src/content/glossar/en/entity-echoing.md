---
title: "Entity echoing"
lang: en
de: entity-echoing
shortDefinition: "Entity echoing is the technique of repeating the term from a heading in the first sentence of the answer: if the H2 asks about site power, the answer begins with the words ‘site power’."
synonyms: ["Term echo", "Entity reinforcement"]
category: content
related: ["entity", "semantic-chunking", "bottom-line-up-front", "cosine-similarity"]
pubDate: 2026-09-03
stufe: 3
faq:
  - q: "Is entity echoing not simply keyword repetition?"
    a: "No. It is about a single repetition in a specific place — the term from the heading stands at the start of the answer. That anchors question and answer semantically. Scattering the term ten times across the paragraph achieves nothing and harms readability."
  - q: "Does entity echoing also work with brand names?"
    a: "Yes, and that is where it is particularly effective. If a heading asks ‘What does an audit from CodaAI cost?’, the answer begins with ‘An audit from CodaAI costs …’. The brand then sits in exactly the passage that is extracted — and is cited together with it."
---

Entity echoing is the technique of repeating the central term of a heading in the first sentence of the paragraph that follows. If the H2 asks "What is site power?", the answer begins with "Site power is …". The term — the [entity](/en/knowledge/geo-glossary/entity/) — is echoed, and question and answer are unambiguously linked for humans and machines alike.

## How does entity echoing work?

An AI system evaluates passages individually ([re-ranking](/en/knowledge/geo-glossary/re-ranking/)). The paragraph beneath a heading is treated as a chunk, often together with the heading. If the term asked about appears both in the heading and at the start of the answer, the semantic proximity to the user question is at its maximum ([cosine similarity](/en/knowledge/geo-glossary/cosine-similarity/)), and the paragraph stays unambiguous even if the heading is lost during chunking. If the answer instead begins with "This is …" or "What we have here is …", the chunk on its own no longer carries a term.

## Why does entity echoing matter for AI visibility?

Because passages in answers are mixed with those of other sources and have to hold up without their surroundings. A paragraph that begins with the term is recognisable as the answer to the question about that term — as a snippet, as a citation, as a definition. With brand names there is an additional effect: if the brand stands at the start of the passage, it is extracted together with the evidence and appears in the answer, instead of the passage being cited anonymously.

## What does this mean for your website?

Phrase headings as questions or terms and begin the first sentence beneath them with exactly that term. Combine this with declarative definitions ("X is Y") and the answer first ([Bottom Line Up Front](/en/knowledge/geo-glossary/bottom-line-up-front/)). And write out your brand and your products wherever they are meant: "CodaAI measures …" instead of "We measure …".
