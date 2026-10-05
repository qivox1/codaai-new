---
title: "IndexNow"
lang: en
de: indexnow
seoTitle: "IndexNow: Protocol Explained"
seoDescription: "IndexNow explained: how the open protocol notifies search engines of new, changed and deleted URLs instantly, which engines take part and how to set it up."
shortDefinition: "IndexNow is an open protocol that lets a website notify search engines instantly of new, changed or deleted URLs. One submission reaches all participating search engines, including Bing — Google is not among them."
synonyms: ["Index Now", "IndexNow protocol", "IndexNow API", "IndexNow ping"]
category: technik
related: ["url-discovery", "crawl-budget", "index-management", "freshness", "llm-crawlers", "log-files"]
pubDate: 2026-10-05
stufe: 1
faq:
  - q: "Does Google support IndexNow?"
    a: "No. Google is not on the list of participating search engines on indexnow.org (as of October 2026). For Google, the XML sitemap, internal linking and Search Console remain the ways to make new URLs known."
  - q: "Does IndexNow guarantee that a page will be indexed?"
    a: "No. The FAQ on indexnow.org states explicitly that a submission does not guarantee immediate indexing. The search engine decides, based on crawl quota, quality signals and its own scheduling, whether and when to fetch the URL."
  - q: "How many URLs can I submit with IndexNow at once?"
    a: "Up to 10,000 URLs per POST request, according to the documentation on indexnow.org. Single URLs can also be submitted with a simple GET request. Only resubmit the same URL after a genuine change."
---

IndexNow is an open protocol that lets website owners tell search engines actively that a URL has changed. Instead of waiting for a crawler to discover the change, the website sends a short notification to an IndexNow endpoint. New, changed and deleted content can all be submitted. Microsoft Bing introduced the protocol in October 2021 (Bing Webmaster Blog).

## How does IndexNow work?

The process has two parts: a key that proves you control the domain, and the notification itself.

1. **Generate a key.** The key is 8 to 128 characters long and consists of letters, digits and hyphens (indexnow.org).
2. **Host the key file.** A text file named after the key and containing it sits in the root directory, at `https://your-domain.com/{key}.txt`. It must be reachable without a login.
3. **Submit URLs.** A single URL goes to an endpoint via a GET request, several URLs via POST as JSON.

According to the documentation, a bulk submission looks like this:

```json
{
  "host": "www.example.com",
  "key": "fa8c0a469da44e9b8f6a769f291829f5",
  "urlList": [
    "https://www.example.com/new-page/",
    "https://www.example.com/updated-page/"
  ]
}
```

Each POST request may contain up to 10,000 URLs. The response code shows the outcome: 200 means accepted, 202 means received with key validation pending, 403 means the key is invalid, 429 means too many requests (indexnow.org).

## Which search engines take part in IndexNow?

According to indexnow.org, Amazon, Bing, Naver, Seznam.cz, Yandex and Yep take part (as of October 2026). A submission to one endpoint is shared with all participating search engines, so you do not need to notify each one separately.

Google does not take part. For Google, the XML sitemap and clean internal linking remain the main routes to [URL discovery](/en/knowledge/geo-glossary/url-discovery/). IndexNow does not replace the sitemap for Bing either: the FAQ on indexnow.org explicitly recommends using both.

## Why does IndexNow matter for AI visibility?

Microsoft Copilot and the AI answers in Bing rely on the Bing index. What Bing does not know cannot be cited there. In March 2026, Krishna Mohan (Microsoft) named IndexNow alongside Q&A sections and schema as part of the SEO fundamentals for AI systems, because, like search, they rely on fresh, highly ranked and trustworthy content (quoted by Glenn Gabe, GSQi).

The benefit lies in timeliness. When you change prices, product data or specialist content, the AI answer should show the new version, not the old one. Kai Spriestersbach (AFAIK) recommends IndexNow together with genuine content updates and correct dates (August 2026). He calls a rewritten date without new content a trick. More on this under [freshness](/en/knowledge/geo-glossary/freshness/).

IndexNow also reports what has gone. According to indexnow.org, you should submit redirected URLs and pages returning status 404 or 410, so that outdated links disappear from the index.

## What does this mean for your website?

Automate the submission. A manual ping gets forgotten. Platforms such as Shopify and Wix already support IndexNow (Microsoft Bing). For custom systems, the submission belongs in the deployment process. That is how codaai.ai does it: after every deployment, the website automatically submits all changed URLs via IndexNow.

Submit genuine changes only. The FAQ on indexnow.org advises against sending the same URL several times a day and recommends at least five minutes between two submissions of the same URL. The endpoint answers too many requests with status 429.

Check the result. The response code shows whether the submission was accepted. Whether Bing then fetches the pages shows up in your [log files](/en/knowledge/geo-glossary/log-files/). IndexNow speeds up discovery, but it does not replace sound [index management](/en/knowledge/geo-glossary/index-management/).
