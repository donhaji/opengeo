# OpenGEO Specification (v0.3)

> **The open-source AI Twin specification for the Agentic Web.**  
> Optimize your business for machine comprehension, preserve your brand sovereignty, and eliminate the "headless browser tax" through a native, traversable knowledge graph.

---

## 💡 The Problem: The Invisible Website & The Headless Browser Tax

Modern e-commerce and content sites are built as visually rich JavaScript SPAs. While beautiful for human eyes, they are structurally opaque and highly gated to AI agents. 
1. **The Bot Wall:** Web Application Firewalls (WAFs) and bot-protection tools increasingly block non-browser clients, turning the primary human-facing web into an **"Invisible Website"** for AI crawlers.
2. **The Headless Browser Tax:** Executing client-side JavaScript in a headless browser (Puppeteer, Playwright) to scrape information consumes **10x to 100x more compute power and memory** per page fetch than raw text. 

As AI agents (ChatGPT, Claude, Gemini, Perplexity) become the primary discovery surfaces for consumers, the web requires a lightweight, pre-rendered, and token-optimized machine layer.

---

## 🚀 The Solution: The OpenGEO AI Twin

**OpenGEO** is a platform-agnostic, decentralized specification for creating an **AI Twin**—a structured, agent-legible mirror of a website's pages, expressed as Markdown documents with flat, typed YAML front-matter, served natively alongside the human-facing site.

By publishing an AI Twin, your organization moves from passive web hosting to active **Generative Experience Optimisation (GEO)**, ensuring that AI models read, reason over, and speak about your products and services with maximum factual fidelity, eliminating source-data ambiguity
```
       The Human Web (HTML) <───[ Content Negotiation ]───> The AI Web (Markdown)
       ┌────────────────────┐          (Middleware)          ┌────────────────────┐
       │                    │                                │  type: product     │
       │  Messy DOM, Ads,   │                                │  price: 45.00      │
       │  Hydrated JS, WAF  │                                │  appears_in: [...] │
       │                    │                                │                    │
       │  (For Human Eyes)  │                                │  (For LLM Brains)  │
       └────────────────────┘                                └────────────────────┘
```

---

## 🛠️ Key Architectural Features

* **The Dual-Surface Principle:** Publish two co-equal renderings of your business from a Single Source of Truth: HTML for humans, and zero-HTML, token-optimized Markdown for machines.
* **Flat YAML Metadata:** Engineered specifically for Transformer attention mechanics, flat YAML front-matter reduces structural token overhead by **20% to 30%** compared to JSON-LD, lowering inference costs and raising parsing accuracy.
* **"Leap and Navigate" Traversal:** Bypasses blind, recursive crawling. Agents use live search APIs or WebMCP to "Leap" directly to a target node, then "Navigate" adjacent nodes via explicit, author-declared graph edges (`appears_in`, `related_advice`).
* **Active Tool Integration (Google ARD & MCP):** OpenGEO (the static content/discovery layer) is fully compatible with Google's **Agentic Resource Discovery (ARD)** specification. Your cryptographically signed `ai-catalog.json` acts as the security gate, directing agents to your OpenGEO twins and active **Model Context Protocol (MCP)** endpoints (e.g., live stock checks).
* **Decoupled CDN Projection:** Can be generated dynamically via lightweight server templates (like **Jinja**) or compiled statically to a CDN edge, fully bypassing complex, slow-moving monolithic website codebases.

---

## 📊 Compliance Levels

| Level | Name | Description |
| :---: | :--- | :--- |
| **Level 0** | **Discoverable** | HTML homepage carries an alternate tag pointing to a valid twin file. |
| **Level 1** | **Twinned** | All significant site pages carry alternate tags; twins follow mathematical canonical addressing. |
| **Level 2** | **Graph** | Twins carry flat, typed upstream and downstream graph edges. |
| **Level 3** | **Full** | Level 2 + Extended Root Index (`/llms.txt`) + Site Declaration (`geo.txt`). |
| **Level 4** | **Conducted** | Level 3 + Published service **personas** and sparse, per-twin `context.*` overrides. |

---

## 📝 Document Index

* **[OPENGEO_SPEC.md](OPENGEO_SPEC.md):** The core normative technical specification, outlining routing, metadata schemas, and graph topology.
* **[opengeo-manifesto-v0.3.0.md](opengeo-manifesto-v0.3.0.md):** The philosophical and strategic rationale behind the AI Twin paradigm, including the conversational accessibility advantages.

## 🤝 Acknowledgements & Inspiration

OpenGEO stands on the shoulders of existing standards in the open-agentic movement:
* **Jeremy Howard & Answer.AI:** For pioneering the landmark `/llms.txt` proposal in 2024. OpenGEO treats `/llms.txt` as its primary macro-discovery entry point ("the lobby" of your site's AI Twin), extending it with structured, traversable metadata graphs.

---

## ⚖️ Dual-License Structure

This project uses a dual-license structure to support open adoption while protecting the integrity of the specification:

* **The Technical Specification & Manifesto text** are licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license. You are free to share, adapt, and build upon these documents for any purpose, including commercial use, provided appropriate credit is given to the original author (**Zahid Saleem**).
* **The Reference Implementation Code** is licensed under the permissive [MIT License](LICENSE).
