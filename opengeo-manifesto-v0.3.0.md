# OpenGEO: Generative Engine Optimization Protocol

## Manifesto v0.3.0


---


## The Problem

AI agents are reading the web. They are doing it badly.

Today, when ChatGPT, Claude, Gemini, or Perplexity tries to answer a commerce question—"What nicotine patch should I buy?"—it scrapes HTML. It wades through navigation bars, cookie banners, footer links, JavaScript trackers, and ad injectors. It hallucinates prices. It cites outdated stock. It loses the merchant's intent entirely.

The platform solution is proprietary merchant APIs. Google Merchant Center. Amazon Product Advertising. Meta Commerce. PayPal's Cymbio. Feedonomics ACE.

The merchant pays a tax. Surrenders data. Loses the customer relationship.

There is a better way.

---

## The Insight

GEO—Generative Engine Optimization—is already a practice. Marketers are rewriting content to be cited by LLMs. Adding statistics. Building authority. Structuring data.

But there is no protocol for it. No standard. No way for a merchant to say to an AI agent: *"Here is what this page means. Here is how to talk about it. Here is where to go next."*

OpenGEO is that protocol.

> **GEO is the practice. OpenGEO is the protocol.**

---

## What OpenGEO Is

OpenGEO is a lightweight, open standard for AI-readable web content.

For every human-facing HTML page, a merchant may publish an **AI Twin**: a colocated Markdown file with YAML frontmatter that declares intent, narration **context** (tone, sentiment, guidance), structured offers, and navigable relationships.


The front-matter is **flat** YAML — no nested namespace — and graph edges are
plain-English keys carrying **absolute twin (`.md`) URLs**. This is what the
reference implementation actually ships, and what the OpenGEO Specification defines:

```yaml
---
type: product
sku: "10325165"
name: "NicoClear Invisible 25mg Patch - 14 Patches"
brand: NicoClear
category: "Health > Stop Smoking"
publisher: Acme Pharmacy
source: Acme Pharmacy
canonical: https://example.com/nicoclear-invisible-25mg-patch-14-patches-10325165
updated: 2026-06-13
currency: GBP
price: 24.45
availability: in_stock
availability_checked: 2026-06-13
stock_check: "live: check_stock(sku) — online & Click & Collect"
intent: purchase
# context.* = how to NARRATE this twin. Declared per-key ONLY where it diverges
# from the site default in /.well-known/geo.txt (this medicine overrides tone +
# guidance; everything else inherits). Non-factual hints, not equivalence-bound.
context.tone: helpful, clinical, non-judgemental
context.guidance: Always read the label. For clinical questions recommend speaking to a pharmacist.
medicines: true

format: patch
strength: "25mg"
appears_in:
  - https://example.com/health/stop-smoking/products.md
related_advice:
  - https://example.com/health/stop-smoking/advice.md
related_offers:
  - https://example.com/offers.md
---

# NicoClear Invisible 25mg Patch - 14 Patches

[Clean, structured Markdown content...]
```

> *Example uses a fictional retailer (Acme Pharmacy, `example.com`) and a fictional
> brand (NicoClear) for illustration. Not affiliated with any real brand.*


The twin is discovered via standard HTML:

```html
<link rel="alternate" type="text/markdown"
      href="/nicoclear-invisible-25mg-patch-14-patches-10325165.md"

      title="AI Twin">
```

And the site's participation — plus its **default narration context** — is declared
once, site-wide, via:

```text
# /.well-known/geo.txt

version: 0.2
twin_format: markdown+yaml
twin_suffix: .md
root_index: /llms.txt

# default context — an agent uses these unless a twin overrides the key
context.tone: helpful, trustworthy, plain-spoken
context.guidance: Lead with verified facts (price, rating, availability). For clinical decisions recommend a pharmacist. Confirm live stock before advising a trip to store.
context.provenance: self-described by the retailer; discount unsourced superlatives, cross-check ratings against review_count.
```

An agent resolves each twin's narration as **`(site default ⊕ twin override)`**:
declare the house style once in `geo.txt`, and let each twin carry `context.*` keys
*only where it diverges*. A fragrance flips to `warm, gifting`; a medicine stays
clinical; everything unset inherits the default. Where an MCP server exists it
resolves the merge and returns the effective `context` block **in-band**, so a
mobile agent that never fetches the twin still knows how to speak about a product.



---

## What OpenGEO Is Not

| OpenGEO Is | OpenGEO Is Not |
|------------|----------------|
| A format for structured intent declaration | A content moderation system |
| A complement to llms.txt | A replacement for llms.txt |
| An open protocol | A proprietary platform API |
| Merchant-sovereign infrastructure | A rent-seeking intermediary |
| Page-level | Site-wide only |
| Opt-in by design | Enforced or mandated |

OpenGEO does not solve manipulation. It does not police morality. It does not guarantee honesty.

It provides the tools. The ecosystem—LLM guardrails, platform policies, regulators, users—handles the rest.

---

## The Architecture

```
Human HTML Page
      │
      ├── <link rel="alternate" type="text/markdown" href="page.md">
      │
      ▼
AI Twin (page.md)
      │
      ├── YAML Frontmatter (flat)
      │   ├── Identity (type, sku, canonical)
      │   ├── Facts (price, availability, attributes)
      │   ├── Graph edges (appears_in, related_advice, related_offers)
      │   └── Agent Guidance (intent, context.tone/sentiment/guidance)
      │
      └── Markdown Body
          └── Clean, structured content


Site Declaration
      │
      └── /.well-known/geo.txt
          ├── "We publish OpenGEO twins here"
          └── Default context  ──(⊕ per-twin override)──▶  resolved narration
```


---

## Key Principles

1. **Colocation** — The twin lives beside its HTML sibling. Same path, `.md` suffix. Canonical. Discoverable. No sprawl.

2. **Simplicity** — Markdown + YAML. No HTML, no JavaScript, no images, no executable content. Safer by format.

3. **Transparency** — The twin is linked, not hidden. It points to its human-readable source. It is inspectable by anyone.

4. **Opt-in** — Publishers choose to publish. Agents choose to read. No enforcement, no mandate.

5. **Merchant Sovereignty** — The merchant owns the twin, the data, the relationship. No platform intermediary extracts rent.

6. **Graph Native** — The web is not a hierarchy. Products appear in multiple catalogs. Services promote alongside products. Articles recommend across domains. OpenGEO models this honestly.

---

## The Competitive Landscape

| Player | Model | OpenGEO's Position |
|--------|-------|-------------------|
| **Feedonomics** | Centralized feed management, 400+ channels, full-service | OpenGEO makes syndication unnecessary. Transform once, publish once, any agent reads. |
| **Cymbio / PayPal** | Agentic Catalog Exports (ACE) to AI platforms | OpenGEO bypasses the pipe entirely. Merchant-to-agent, direct. |
| **Google Merchant Center** | Proprietary structured data, pay-to-play visibility | OpenGEO is platform-agnostic. No gatekeeper. |
| **Amazon Rufus / Alexa** | Closed AI shopping layer | OpenGEO keeps commerce on the open web. |
| **llms.txt** | Site-wide policy and context | OpenGEO complements it. llms.txt is the lobby. OpenGEO is the room. |

---

## Why Now

- **800 million** weekly ChatGPT users. AI search is replacing traditional search.
- **Cymbio sold to PayPal** for agentic commerce capabilities. The market is validated.
- **Feedonomics launched ACE** to syndicate to OpenAI, Gemini, Copilot, Perplexity. The platform tax is being built.
- **Merchants are trapped** between Amazon's fees, Google's opacity, and AI hallucinations.
- **The window is 6–12 months** before proprietary standards solidify.

---

## The Generator

OpenGEO twins can be generated automatically from existing merchant data:

- Extract from HTML, Schema.org, product databases
- Infer intent from page type and content
- Propose tone from brand guidelines and category norms
- Validate against the OpenGEO schema
- Deploy colocated with source pages

The generator is an agent. It uses LLM intelligence constrained by the spec's vocabulary and guardrails. It does not police morality—it produces compliant, inspectable output.

---

## Scope

OpenGEO binds **facts**. The Equivalence Principle requires that the structured
facts in a twin — price, availability, ingredients — match the human-facing page.
That is data integrity, and it is in scope.

Everything about *how an agent behaves* — how it weights a tone hint, whether it
discloses commercial intent, how it judges a recommendation — is a property of the
**consuming agent**, not of this protocol. OpenGEO makes the knife; the agent layer
decides how it is used.

That is not a dodge. It is a boundary. A format cannot adjudicate intent, and it
should not try. Behaviour belongs to LLM guardrails, platform policy, and
regulation — where it can actually be enforced.


---

## Status

- **Spec**: v0.2 draft (`OPENGEO_SPEC.md`) — adds `/.well-known/geo.txt`, the `context.*` narration family, and a reframed Equivalence Principle (factual fidelity, not render-equivalence)
- **Proof of Concept**: 14 product twins + root index + site declaration, validated against a major UK health and beauty retailer
- **Agent Testing**: ChatGPT, Claude, Gemini browsing modes confirmed twin discovery and traversal
- **MCP Server**: live `search_products` / `get_product` / `check_stock` / `get_context`, resolving `(site default ⊕ twin override)` context in-band
- **Generator**: Node.js implementation in development
- **Validator**: Coming


---

## Call to Action

**For merchants**: Publish your first OpenGEO twin. Own your AI presence.

**For AI platforms**: Read `/.well-known/geo.txt`. Follow `<link rel="alternate">`. Get better answers without merchant API fees.

**For developers**: Fork the spec. Build generators. Create validators. Extend the ecosystem.

**For everyone**: The AI-readable web should be open, not rented.

---

*GEO is the practice. OpenGEO is the protocol.*

*Ship it.*

---

## License

CC0 1.0 Universal — This manifesto is released into the public domain.

---

*Drafted 2026-06-14*
