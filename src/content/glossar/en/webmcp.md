---
title: "WebMCP"
lang: en
de: webmcp
seoTitle: "What is WebMCP? Explained"
seoDescription: "WebMCP explained: how websites offer AI agents tools via form attributes or JavaScript, who is developing the standard and how far it has got so far."
shortDefinition: "WebMCP is a proposed web standard that lets websites provide AI agents with structured tools — declaratively through annotated HTML forms or imperatively through JavaScript."
synonyms: ["Web MCP", "WebMCP API", "document.modelContext", "Agent tools for websites"]
category: technik
related: ["ai-agents", "accessibility-tree", "agentic-commerce", "llms-txt", "structured-data"]
pubDate: 2026-10-05
stufe: 1
faq:
  - q: "Is WebMCP the same as the Model Context Protocol (MCP)?"
    a: "No. Anthropic introduced MCP as an open standard in November 2024; an MCP server runs in a service's backend. WebMCP borrows terms such as tool and schema, but runs the tools in the browser as part of the open page — within that tab's security boundaries and state."
  - q: "Can I use WebMCP on a live website today?"
    a: "Yes, through the origin trial Chrome has offered since version 149 (Chrome for Developers, June 2026). An origin trial is time-limited, and Google describes WebMCP as experimental. Plan so that the page still works fully without the tools."
  - q: "Does WebMCP improve visibility in ChatGPT or AI Overviews?"
    a: "Not directly. WebMCP helps an agent act on a page it has already chosen. Whether a page is found and cited depends on ranking and content. Google said in June 2026 that none of the approaches for agents has yet become the standard."
---

WebMCP is a proposed web standard that lets a website offer [AI agents](/en/knowledge/geo-glossary/ai-agents/) structured tools. Such a tool describes an action — for example “request a quote” or “book a table” — with a name, a natural-language description and an input schema. The agent calls the tool directly instead of hunting for buttons in screenshots and simulating clicks.

## Who is developing WebMCP, and what is its status?

The specification is being written in the W3C's Web Machine Learning Community Group. The editors are Brandon Walderman (Microsoft) and Khushal Sagar and Dominic Farolino (Google). The document has the status of a draft (“Draft Community Group Report”) and, by its own account, is not on the W3C Standards Track ([WebMCP specification](https://webmachinelearning.github.io/webmcp/), as of October 2026).

Chrome has offered an origin trial since version 149 (Chrome for Developers, June 2026). An origin trial is a time-limited programme in which websites test an experimental feature with real users. According to the implementation overview in the WebMCP repository, Microsoft Edge is also running an origin trial from version 150. Mozilla and Apple (WebKit) are reviewing the proposal through their standards-position processes.

## How does WebMCP work?

WebMCP offers two ways to define a tool:

| Variant | Implementation | Typical use |
|---|---|---|
| Declarative | Extra attributes on an HTML form; the form fields become parameters | Enquiry, search, booking |
| Imperative | JavaScript: `document.modelContext.registerTool()` with name, description, JSON schema and an execute function | Configurator, basket, multi-step flows |

The declarative variant is the simplest starting point because it builds on an existing form:

```html
<form toolname="request-quote"
      tooldescription="Requests a quote for a catalogue item">
  <input name="sku" toolparamdescription="Item number as listed in the catalogue">
  <input name="quantity" type="number" toolparamdescription="Required quantity">
  <button type="submit">Request quote</button>
</form>
```

Without the `toolautosubmit` attribute, the agent only fills in the form. The browser then moves focus to the submit button, and the person checks and submits it. With the imperative variant, the function's return value goes back to the agent. This is how the page reports success, an error or the next step, as Kasper Kulikowski (Google) explained in July 2026.

## How does WebMCP differ from the Model Context Protocol?

Anthropic published the Model Context Protocol (MCP) as an open standard in November 2024 to connect AI assistants to the systems where data lives. An MCP server runs in the backend. The WebMCP specification describes pages that use WebMCP as MCP servers whose tools run in the browser rather than on the server.

The difference is practical: a WebMCP tool uses the login, the basket and the interface of the open page. Whatever the agent triggers, the user sees immediately in the same tab. A separate backend for agents is not required.

## Why does WebMCP matter for AI visibility?

WebMCP is not a ranking factor. Whether a page appears in an AI answer is decided by [grounding](/en/knowledge/geo-glossary/grounding/) and content. Google put it in context in June 2026: for agents on a website they have already chosen, [llms.txt](/en/knowledge/geo-glossary/llms-txt/), well-known files or WebMCP are candidates for later — none of them has caught on yet (Search Off the Record).

WebMCP becomes relevant where agents complete tasks rather than just write answers. An agent that compares three suppliers for a buyer and is meant to send an enquiry reaches its goal more reliably on a page with a clearly described tool. According to the Chrome team, the experimental Lighthouse category “Agentic Browsing” in Chrome 150 and later also checks whether WebMCP tools and their schemas are valid (Chrome for Developers, July 2026).

## What does this mean for your website?

The foundation remains a page that agents can operate without WebMCP: semantic HTML, labelled form fields and a clean [accessibility tree](/en/knowledge/geo-glossary/accessibility-tree/). WebMCP builds on this; it does not replace the work.

Then pick one to three actions that matter to your business — quote request, product configurator, dealer locator. Test them declaratively first in the origin trial. Write tool names and descriptions precisely: Kulikowski calls this a specialised form of prompt engineering, because the agent uses these texts to decide when to use a tool. For orders and other consequential actions, Google recommends a confirmation step by the user — especially in [agentic commerce](/en/knowledge/geo-glossary/agentic-commerce/).
