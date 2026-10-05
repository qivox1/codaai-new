---
title: "SynthID (AI watermark)"
lang: en
de: synthid
seoTitle: "SynthID: AI Watermark Explained"
seoDescription: "SynthID explained: how Google's invisible watermark marks AI-generated text, images, audio and video, what the EU AI Act requires and what it means for GEO."
shortDefinition: "SynthID is Google DeepMind's watermarking technology for AI-generated content. It embeds a signal that humans cannot perceive into text, images, audio and video, which Google's verification tools can detect."
synonyms: ["AI watermark", "Google SynthID", "SynthID Text", "SynthID Detector", "KI-Wasserzeichen"]
category: grundlagen
related: ["e-e-a-t", "information-gain", "ai-hallucination", "token", "llm"]
pubDate: 2026-10-05
faq:
  - q: "Does Google demote content carrying a SynthID watermark in Search?"
    a: "There is no evidence of that. Google has not said it uses SynthID as a negative ranking factor (SISTRIX, September 2026). Google's guidelines judge AI content by the value it adds; mass-producing pages without added value can violate the spam policy on scaled content abuse."
  - q: "How reliably does SynthID detect AI-generated text?"
    a: "Well for longer, linguistically varied texts, less well for short or fact-heavy answers. According to Google, detection confidence drops sharply when a text is thoroughly rewritten or translated. A missing watermark therefore does not prove that a person wrote the text."
  - q: "Do companies have to mark their texts with SynthID because of the EU AI Act?"
    a: "No. The obligation to mark output in a machine-readable format under Article 50(2) applies to the providers of AI systems. Those who publish AI-generated text only have to disclose it if it informs the public on matters of public interest and has not undergone human review with editorial responsibility."
---

SynthID is a technology from Google DeepMind that adds a digital watermark to AI-generated content. The watermark cannot be perceived by humans but can be detected with Google's verification tools. SynthID works with text, images, audio and video created with Google's AI models.

## How does SynthID work?

For images, video and audio, SynthID embeds the signal directly in the file, invisibly or inaudibly (Google DeepMind). For text, it works on word choice. An [LLM](/en/knowledge/geo-glossary/llm/) selects each [token](/en/knowledge/geo-glossary/token/) based on probabilities. SynthID shifts these probabilities slightly, so that a statistical pattern emerges across many tokens (Google AI for Developers). According to Google, this does not significantly affect text quality.

Google introduced SynthID in 2023. By November 2025, more than 20 billion pieces of content had been watermarked with it, according to Google. The text version is open source and available in the Hugging Face Transformers library from version 4.46.0 (Google AI for Developers).

Content can be checked in several places. In May 2025, Google presented the SynthID Detector verification portal. In the Gemini app, users can upload images, videos and audio files and ask whether they were created with Google AI. Since May 2026, Google has been extending verification to Search, for example in Lens, AI Mode and Circle to Search, and then to Chrome (Google I/O, May 2026).

## Where are the limits of SynthID?

According to Google, the SynthID Detector checks content created with Google AI. It does not detect content from other providers that carries no SynthID watermark.

For text, detection is also uncertain. According to Google, the watermark is less effective on factual answers, because there is less room for variation in word choice. Thorough rewriting or translation can greatly reduce detection confidence (Google AI for Developers). Minor edits or cropped passages, on the other hand, it survives.

It follows that a missing watermark is neither a mark of quality nor proof that no AI was involved (SISTRIX, September 2026).

## What does the EU AI Act require?

Article 50(2) of the EU AI Act obliges providers of AI systems that generate synthetic text, images, audio or video to mark their outputs in a machine-readable format and make them detectable as artificially generated. The obligation has applied since 2 August 2026. For systems placed on the market before that date, it only applies from 2 December 2026 (European Commission, FAQ on Article 50). Invisible watermarks such as SynthID are one form of this machine-readable marking.

For companies that publish AI-generated text, Article 50(4) applies. They must disclose AI-generated text that informs the public on matters of public interest. This does not apply if the text has undergone human review and someone holds editorial responsibility. According to the Commission, mere spell-checking does not count as review.

## Why does SynthID matter for AI visibility?

A watermark says something about where content comes from, nothing about its quality. Whether an AI system cites a page depends on whether it answers the question, adds new information ([information gain](/en/knowledge/geo-glossary/information-gain/)) and is credible ([E-E-A-T](/en/knowledge/geo-glossary/e-e-a-t/)).

The same applies to Google. Google allows AI-generated content as long as it adds value. Generating many pages without added value can violate the spam policy on scaled content abuse (Google Search Central, October 2026). Google also asks site owners to fact-check AI-generated text before publication, because it can contain [hallucinations](/en/knowledge/geo-glossary/ai-hallucination/).

## What does this mean for your website?

For images: do not strip provenance data. For shops in Google Merchant Center, Google requires AI-generated product images to carry the IPTC metadata `DigitalSourceType` with the value `TrainedAlgorithmicMedia` (Google Search Central, October 2026). Check whether your image optimiser removes this metadata during compression.

For text: make editorial responsibility visible. SISTRIX recommends author details, dates, methodology and verifiable sources for figures and legal statements (September 2026). This helps readers, documents the human review that matters under the AI Act and strengthens citability.

Do not use watermark checkers as quality control. Whether a text is cited depends on its content, not on proof of its origin.
