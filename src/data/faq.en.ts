/**
 * English counterpart to `faq.ts` — one source for every question & answer on
 * the English pages.
 *
 * Mirrors the German split by place of decision (Oli, 03.08.2026): each question
 * sits where it comes up in the reader's head — pricing on /en/pricing/,
 * subject-matter on /en/digital-visibility/, webinar on /en/webinar/, and
 * questions about CodaAI itself on the homepage below the appointment teaser.
 * `/en/faq/` is the collected page and shows all four groups.
 *
 * Rules for new entries — identical to the German file:
 *   - A question belongs to EXACTLY ONE group. Entering it twice produces
 *     duplicate answers on two pages.
 *   - Phrase the question the way a prospect asks it, not the way we wish they
 *     would.
 *   - Every figure needs its source in the sentence. No promises of success —
 *     that would contradict our commitment never to guarantee a placement.
 *
 * The FAQPage schema sits on the topic page, NOT additionally on /en/faq/ —
 * otherwise the same question would appear twice marked up in the index.
 *
 * Translated with DeepL (EN-GB) on 04.08.2026, then edited against
 * `en-relaunch-2026-08-04/KONVENTIONEN.md`. Wording that must not drift:
 * tier / base fee / building block / Google AI Overviews / commitment (never
 * "guarantee") / the AI is always "it".
 */

import type { FaqItem } from './faq';

/* ── Homepage: CodaAI in general and what working together looks like ────── */
export const faqGeneralEn: FaqItem[] = [
  {
    q: 'What does CodaAI actually do?',
    a: 'We make sure your company shows up in AI answers — in ChatGPT, in Google AI Overviews and in classic search. It runs in three tiers: first we make your website readable for AI systems, then we get you present where those systems pull their evidence from, and finally we turn you into a cited source in your own right. Every month you get it in black and white: where you stand.',
  },
  {
    q: 'How do I get started — and what do I have to provide?',
    a: 'You start with your free Digital Visibility Audit: we document what ChatGPT and Google AI Overviews say about your company today, and you get it as a personal dashboard. In a 30-minute call we go through the findings together. To begin, we need nothing from you but your domain — expertise from inside your company and a named contact only become necessary once you decide to work with us.',
  },
  {
    q: 'What sets CodaAI apart from an AI writing tool and from a traditional agency?',
    a: 'A writing tool delivers text without strategy and without verification. A traditional agency delivers work but asserts the effect. We make it measurable: your audit comes before the contract starts, and monthly monitoring of your AI mentions runs throughout. The basis is our own study with 7,184 documented AI answers (CodaAI study “AI Blind Test 2026”, 449 mid-sized companies in Germany).',
  },
  {
    q: 'We already have an agency. Is CodaAI still worth it?',
    a: 'Yes — and nobody has to make room. Your agency knows your market, your tone and your audience; we are not replacing that. We bring in the building blocks for AI visibility and hand them over in a form your agency or your marketing team can work with directly. On request, your audit findings go to both sides.',
  },
  {
    q: 'Does CodaAI work directly in our CMS?',
    a: 'Only if you want us to. Everything that works without access to your systems, we take over completely: content, digital PR, directories and portals, monitoring and reporting. For changes to your website we hand your web team ready-to-implement material — finished copy, concrete code snippets, step-by-step instructions. If you want us to and give us access, we implement it ourselves.',
  },
  {
    q: 'Is this a fit for our industry?',
    a: 'Our core is mid-sized B2B companies in the German-speaking market, typically 50 to 500 employees, where management and marketing decide together. What matters is not the industry but whether your customers research before they buy. Terminology, tone and topics we agree with you at the start. For pure consumer business built on impulse purchases we are the wrong partner — and we will say so.',
  },
  {
    q: 'Who owns the content created for us?',
    a: 'You do. Every text, graphic and analysis produced during our work together belongs entirely to your company — as do your audit results and every monthly report. That holds after the engagement ends, too.',
  },
];

/* ── /en/digital-visibility/: how AI visibility works ────────────────────── */
export const faqVisibilityEn: FaqItem[] = [
  {
    q: 'What is the difference between SEO, AEO and GEO?',
    a: 'SEO gets your website ranking on Google and Bing — the foundation. AEO gets your content into the answer box above the results, the Google AI Overview. GEO gets your company recommended by name in ChatGPT, Gemini, Perplexity and Claude. The three build on each other: whatever an AI system cannot read, it will not cite.',
  },
  {
    q: 'We rank well on Google. Isn’t that enough?',
    a: 'Apparently not. In our own study, 35% of companies with more than 100 top-10 rankings on Google are completely invisible in ChatGPT (CodaAI study “AI Blind Test 2026”, 449 companies). Classic search engines judge pages; AI systems judge evidence — and for that, what counts is who writes about you away from your own website.',
  },
  {
    q: 'How do you measure AI visibility?',
    a: 'Every month we put the same buyer questions to the AI systems and document three things: how often your company is mentioned, which sources get cited for it, and how your share compares with your competitors. One thing matters for reading the numbers: AI answers are not deterministic — the same question can be answered differently tomorrow. What can honestly be claimed is the trend, not a single day.',
  },
  {
    q: 'Why don’t you guarantee a particular position in ChatGPT?',
    a: 'Because nobody credibly can. There is no scheme through which a mention could be bought or booked, and the same question may be answered differently tomorrow. Anyone promising “number one in ChatGPT” is promising something technically impossible. We work the levers that demonstrably move the needle, and we put the development on the table every month — including the months when it stays flat.',
  },
  {
    q: 'How do you know which measures work?',
    a: 'From measurement, not opinion. Brand mentions on third-party sites correlate with AI visibility at r = 0.664; backlinks only at r = 0.218 (Ahrefs, 75,000 brands). That is why the mention comes first with us, not the link. Each of the fourteen building blocks is tied to an observation like that, and which one is stated alongside it.',
  },
  {
    q: 'How long until something shows?',
    a: 'First mentions typically appear in the German market after 8 to 12 weeks, dependable visibility after 3 to 6 months. The reason is the sequence behind it: content has to be found, classified and picked up by others before an AI system uses it as evidence. Visibility is something you build, not a switch you flip.',
  },
  {
    q: 'What happens when AI systems change their rules?',
    a: 'The weighting changes, not the principle. No provider discloses why it recommends one company over another, and every system works differently. So we do not bet on a trick but on the factors that recur across all of them: readability, third-party evidence, and substance of your own worth citing. Whatever shifts, you see in the monthly monitoring — and we adjust the plan.',
  },
];

/* ── /en/pricing/: price, term, contract ─────────────────────────────────── */
export const faqPricingEn: FaqItem[] = [
  {
    q: 'How is my monthly price put together?',
    a: 'From three items: the number of articles multiplied by the unit price of your tier, the optional add-ons (translations, videos), and the fixed base fee of your tier. Example: 4 articles × €420 = €1,680, plus the €990 base fee of Tier 2 · Recommended = €2,670 per month. All net, all on one invoice.',
  },
  {
    q: 'Why does an article cost more in Tier 1 than in Tier 3?',
    a: 'Because the volume discount sits on the tier, not on the article count: €490 in Tier 1, €420 in Tier 2, €390 in Tier 3. Anyone who needs more content gets there more cheaply in a higher tier — and gets the stronger levers along with it. One price per tier instead of a discount table.',
  },
  {
    q: 'How does this compare with an agency?',
    a: 'A comparable agency retainer in the German-speaking market averages around €3,800 per month, with the mid-market band running from €1,500 to €5,000 (DACH market benchmark 2026). With us the base fee starts at €1,470 per month — and you can work it out in the calculator instead of requesting it. The difference comes from the division of labour: people decide and verify, AI handles what repeats.',
  },
  {
    q: 'What is the minimum term — and what happens afterwards?',
    a: 'Six months on monthly billing, because visibility needs that long to become measurable at all. Commit to twelve months and you pay 10% less. There is no automatic rollover: renewing is an active decision. When it ends you keep all content, audit results and reports — with no exit fee.',
  },
  {
    q: 'Can I change tier later?',
    a: 'Moving up is possible at any time from the following month, with the running minimum term continuing. Moving down takes effect at the end of the minimum term. The number of articles within your tier you can adjust at every renewal date.',
  },
  {
    q: 'What is the visibility commitment?',
    a: 'If after 120 days there is no measurable movement in your AI mentions, we keep working until the end of the term at no further cost. It is measured against your monthly monitoring — the same figures you receive from us anyway. It is a commitment on our work, not a promise of a placement: we carry the risk if nothing happens.',
  },
  {
    q: 'How do I get a binding quote?',
    a: 'Put your configuration together in the calculator and book the 30-minute call. You receive the quote in writing afterwards — ready to forward to management or procurement. We bill by invoice; you do not need a credit card.',
  },
];

/* ── /en/webinar/: the live webinar on 08.09.2026 ────────────────────────
   Note the first entry: the webinar is held in GERMAN. That has to be said
   plainly on the English page — on this page, in the hero and above the
   registration form. Anything else sets the reader up for a wasted hour. */
export const faqWebinarEn: FaqItem[] = [
  {
    q: 'What language is the webinar held in?',
    a: 'German. Both speakers present in German and the Q&A runs in German. The study behind it measures companies in the German market. If you do not follow German comfortably, the webinar will not serve you well — the Digital Visibility Audit and the 30-minute call are available in English at any time.',
  },
  {
    q: 'How do I get the access link?',
    a: 'After registering you receive a confirmation by email. We send the Zoom access link to the same address in good time before the session — there is no newsletter and no advertising.',
  },
  {
    q: 'Will my company be tested publicly during the webinar?',
    a: 'Only if you explicitly allow it when registering — and then anonymously, without your company name being named. Your personal visibility audit goes to you and nobody else.',
  },
  {
    q: 'What does attending cost — and where is the catch?',
    a: 'Attending is free — including your personal visibility audit if you want it. There is no project commitment and no sales block in the webinar. Anyone who wants to talk through their results can book a 30-minute call voluntarily. That is all.',
  },
  {
    q: 'We are only allowed to use Microsoft Copilot — is the webinar still useful to me?',
    a: 'Yes. Copilot runs on the same GPT models as ChatGPT, so everything we show for checking your own company works there in exactly the same way. Our study measurements cover ChatGPT and Google AI Overviews; the mechanism by which AI assistants recommend or omit a provider is the same in Copilot.',
  },
  {
    q: 'We rank well on Google — is it still worth it?',
    a: 'Especially then: 35% of the companies we examined with over 100 top-10 rankings on Google are completely invisible in ChatGPT. Classic SEO strength and AI visibility are two different disciplines — and it is exactly this SEO paradox we demonstrate live.',
  },
  {
    q: 'Is there a recording?',
    a: 'Yes. Everyone who registers receives the recording by email afterwards — including those who cannot make the live session.',
  },
];

/* Order and labelling of the collected page /en/faq/. */
export const faqGroupsEn: { id: string; title: string; intro: string; href: string; hrefLabel: string; items: FaqItem[] }[] = [
  {
    id: 'general',
    title: 'CodaAI and working together',
    intro: 'Who we are, how a project gets going, and how we sit alongside agencies and in-house teams.',
    href: '/en/',
    hrefLabel: 'To the homepage',
    items: faqGeneralEn,
  },
  {
    id: 'digital-visibility',
    title: 'Digital Visibility',
    intro: 'How AI visibility comes about, how we measure it, and why nobody can guarantee a placement.',
    href: '/en/digital-visibility/',
    hrefLabel: 'To the building blocks',
    items: faqVisibilityEn,
  },
  {
    id: 'pricing',
    title: 'Price, term and contract',
    intro: 'What makes up the monthly price, how long you commit for, and what happens afterwards.',
    href: '/en/pricing/',
    hrefLabel: 'To pricing',
    items: faqPricingEn,
  },
  {
    id: 'webinar',
    title: 'Live webinar',
    intro: 'Registration, agenda and recording of the webinar “Recommended or invisible?” — held in German.',
    href: '/en/webinar/',
    hrefLabel: 'To the webinar',
    items: faqWebinarEn,
  },
];
