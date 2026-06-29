# OpenGEO Specification v0.3




**Author:** Zahid Saleem  
**Date:** 2026-06-14  
**Status:** Draft  
**Licence:** Reference implementation code under **MIT**; this specification document under **CC BY 4.0** (attribution to Zahid Saleem required)

---

## Changelog

**v0.3 (2026-06-26)** — Conceptual-framing release. Elevates the dual-surface
("a site for humans, a site for LLMs") thesis and positions the AI Twin as the
umbrella concept of which OpenGEO is the *structured-facts profile*:

- Reframed the **Abstract** so the AI Twin is the broad idea and OpenGEO its
  structured-facts conformance profile; an AI Twin MAY exist with little OpenGEO
  structure (factual layer interoperable/auditable; operational layer largely
  unstructured). Adopting the Twin does not necessitate OpenGEO.
- Added **§2.0 The Dual-Surface Principle and the GEO Four-Layer Model** —
  *factual · editorial · operational · runtime* — naming **GEO (Generative Engine
  Optimization)** as the discipline of binding all four, and the
  "author for re-expression, not for rendering" / "author for the floor, trust the
  ceiling" design rules.
- Added **§2.6 The Operational Layer — Personas** (operational equivalence:
  rendering the store's *operating model*, roles, gates, escalation and duty of
  care; trust = fidelity of conduct, not equivalence of fact).
- Added **§2.7 The Runtime Layer** — the consuming engine / edge device as a layer
  the publisher *influences but does not control*; fail-safe requirement.
- Reframed the §3.7 scope boundary to distinguish **binding facts** (verifiable)
  from **declaring conduct** (authored/reputational) vs. the runtime (out of scope).
- Added **Compliance Level 4 — Conducted** (factual levels 0–3 + authored
  editorial/operational layers); the reference implementation now stated as Level 4.

**v0.2 (2026-06-14)** — Reconciliation release. Aligns the specification with the
OpenGEO reference implementation (the deployed generator, twins, and root
index are the normative reference) and absorbs the OpenGEO Manifesto v0.1.0:

- Added the optional site-participation declaration **`/.well-known/geo.txt`** (§4.2).
- Added the **`context.*` agent-guidance family** — `context.tone`, `context.sentiment`,
  and `context.guidance` — as universal optional declarations carrying *divergence-only*
  per-twin overrides of the site-wide defaults in `/.well-known/geo.txt` (§3.2, §3.7).
  `context.tone` supersedes the bare `tone` field introduced earlier in this draft;
  `tone` is retained as a deprecated alias.
- Promoted **`intent`** from an advice-only field to a **universal optional field** (§3.2).

- Scoped the protocol to **factual integrity only** (§2.3): behavioural use of
  `tone`/`intent` (including misuse) is explicitly **out of scope** and delegated
  to the consuming-agent layer — the spec does not moralise (§3.7).
- Reframed the **Equivalence Principle** (§2.3): the twin is an *openly declared*,
  inspectable surface, not a cloaking vector — and in practice the human HTML is
  often the *gated* (WAF-walled) surface while the twin is open. Equivalence is now
  defined as **factual fidelity to the shared source of truth** (the twin is *meant*
  to differ from the HTML in structure, never in fact), with trust resting on
  transparency/provenance rather than expensive — and frequently impossible —
  adversarial render-audits.


- Documented implementation fields previously emitted by the generator but absent
  from the spec: `source_url`, `html_twin`, `title`, `product_type`, `promo`,
  `saving`, `bundle`, `promo_code` (§3.2, §3.4).
- Clarified that the front-matter is **flat** (no nested `opengeo:` namespace) and
  that all graph edges are **absolute-URL lists** keyed by plain-English relation
  names — confirming these as normative over any earlier illustrative shorthand.
- Added **reproducible empirical evidence** (Appendix A): a live user-agent probe
  showing every major AI crawler is served an identical WAF block page on a real
  retailer's primary domain, grounding the "invisible website" claim of §1.1 in
  cited artifacts (`probe-out/`).
- **Neutralised the worked examples to a fictional retailer** (*Acme Pharmacy*,
  `example.com`) so the normative text depends on no third-party brand; the single
  real-world data point is isolated, clearly labelled, and disclaimed in Appendix A.



**v0.1 (2026-06-12)** — Initial public draft.

---


## Abstract

The OpenGEO Specification defines a lightweight, open protocol for making any website's content, products, and services fully discoverable and traversable by AI agents — without modifying the existing website, without requiring client-side JavaScript execution, and without dependence on any proprietary platform or gatekeeper.

At the centre of the protocol is the **AI Twin**: a structured, agent-legible mirror of a website's pages, expressed as Markdown files with typed, semantic graph edges in YAML front-matter, served alongside the human-facing site at predictable canonical addresses. Any AI agent can discover, traverse, and consume an AI Twin from any entry point on the site.

> **The AI Twin is the broader idea; OpenGEO is its structured-facts profile.**
> An "AI Twin" is, at its most general, a second rendering of a business *for
> machines* — a site for LLMs running beside the site for humans. That rendering
> can range from richly structured (typed facts and a traversable graph) to largely
> unstructured (freeform context, instructions, and personas). **OpenGEO specifies
> the structured end of that spectrum** — the canonical addressing, the typed
> front-matter, the graph, and the factual-equivalence rules a twin needs to be
> machine-traversable and trustworthy. A meaningful AI Twin can exist with little
> OpenGEO structure; OpenGEO is the conformance profile that makes the *factual*
> layer interoperable and auditable. **Adopting the AI Twin does not necessitate
> OpenGEO** — but OpenGEO is how its facts become a standard (see §2.0).

OpenGEO fills the **discovery and content layer** of the emerging agentic web protocol stack — the layer *below* verified transaction execution (UCP) and *beside* agent-to-agent coordination (ACP) that no existing specification addresses. It is the structured-facts foundation of the wider discipline of **GEO (Generative Engine Optimization)**: authoring a business's machine surface so the experience holds across the full spectrum of generative engines that consume it (§2.0).

---

## Conventions and Terminology

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as described in RFC 2119.

The `text/markdown` media type used throughout is the type registered in RFC 7763. The `/.well-known/` path prefix referenced in §4 follows RFC 8615; the specific name `mcp-server` used in examples is **proposed and not IANA-registered** at the time of writing.

---

## 1. Motivation


### 1.1 The Invisible Website Problem & The Headless Browser Tax
Modern e-commerce and content sites are built as JavaScript Single Page Applications (SPAs) or highly hydrated client-side frameworks. They are visually rich for human browsers but structurally opaque to AI agents. Prices, availability, clinical content, and product attributes are rendered client-side, making them invisible to lightweight agents unless those agents execute client-side JavaScript.

It is the *rendered HTML page* that is opaque here, not the twin. Worse, that page is increasingly **actively walled**: WAFs, bot-detection, and rate limits routinely block non-browser clients, so even a willing agent is often refused at the door. The twin inverts this — it is the openly served, JavaScript-free, bot-welcome surface (see §2.3). "Invisible" describes the gated human page; the twin is the deliberate cure for it.

> **Empirical evidence (reproducible).** This is not hypothetical. An independent
> June 2026 probe of a major UK retailer's live site found that **every AI crawler
> tested — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, and Googlebot — was
> served an identical WAF block page** while an unwalled sibling subdomain returned
> the full document to all agents. The retailer's primary domain is, in effect, **not
> directly readable by any major LLM** — agents can only describe it second-hand via
> stale third-party indexes. That is the "invisible website" in the literal sense:
> not hidden by accident, but walled by the site's own edge security, and the
> OpenGEO twin is the openly served surface that cures it. Full method, raw byte
> counts, and the block-page payload are recorded in **Appendix A**.





However, executing JavaScript in a headless browser (e.g., Puppeteer, Playwright) introduces a massive **Headless Browser Tax**—consuming up to 10x to 100x more compute power and memory per page fetch than raw text delivery. As AI agents become primary discovery surfaces (Claude, Gemini, OpenAI Agents), search engines and platforms require a lightweight, pre-rendered, token-optimized projection of a site's facts to crawl efficiently.

### 1.2 The Existing Protocol Gap
Three protocols address parts of the agentic web stack:

| Protocol | Purpose | Gap |
| :--- | :--- | :--- |
| **UCP** (Universal Commerce Protocol) | Verified product cards and checkout in AI chat | Requires platform enrolment; covers transaction surface only |
| **ACP** (Agent Communication Protocol) | Agent-to-agent coordination and delegation | Covers orchestration; says nothing about content discovery |
| **llms.txt** (Answer.AI, 2024) | Root index of documentation for LLMs | Designed for developer documentation; lacks structured metadata, graphs, or e-commerce vocabulary |

**No specification exists for the discovery and content layer**: how an agent finds, traverses, and understands a business's products, services, and advice before it transacts. OpenGEO fills this gap.

### 1.3 The AI Twin Insight
A website's human-facing pages and its agent-legible content can coexist as two projections of the same data — served from the same domain, at predictable addresses, without modifying the existing site. This agent-legible projection is the **AI Twin**.

The AI Twin is:
*   **Not customer-facing** — no design review, no deployment pipeline, no UX constraint. It moves at the speed of a text file.
*   **Self-describing** — every twin carries typed edges to its collections, its category advice, and its offers. An agent entering at any node can traverse the entire graph.
*   **Fully discoverable** — the address of every twin is derived mechanically from the address of the page it mirrors. No central registry. No lookup table.
*   **Domain-extensible** — the front-matter vocabulary is open. E-commerce, pharmacy, finance, legal — any domain can define its own typed fields.

### 1.4 The Conversational Accessibility Advantage (The Inclusive Web)
Traditional web design is visually biased. For visually impaired or motor-impaired individuals, navigating modern, JS-heavy e-commerce SPAs using legacy screen-readers is a high-friction experience. Screen-readers must parse complex, non-linear DOM structures, dynamic JS popups, cookie walls, and nested visual layouts, producing a noisy "cacophony of divs."

OpenGEO introduces a radical leap forward in digital accessibility by aligning directly with **LLM Voice Channels** (such as advanced, conversational voice assistants like GPT-4o Advanced Voice or Gemini Live):
1.  **Narrative-First Comprehension:** Rather than forcing an assistive device to reconstruct meaning from an unstructured, visual HTML canvas, OpenGEO serves a clean, linear, and semantic Markdown text representation of the page.
2.  **Conversation-Ready Data:** An LLM utilizing an OpenGEO Twin can instantly translate the structured YAML front-matter and narrative body into fluid, natural spoken dialogue, bypassing the "syntactic noise" of traditional screen-reading tools.
3.  **Regulatory Compliance (EAA & WCAG):** With global mandates like the European Accessibility Act (EAA, fully enforced as of June 2025) requiring digital services to be fully perceivable, understandable, and robust, the AI Twin serves as an immediate, low-cost accelerator for digital inclusion. It allows companies to provide a premium, accessible voice-commerce layer without undergoing risky and expensive core website refactoring.

---

## 2. Core Concepts

### 2.0 The Dual-Surface Principle and the GEO Four-Layer Model

OpenGEO begins from one idea: **a business should ship two co-equal renderings of
itself — one for humans, one for machines — from a single source of truth.** The
human rendering is the visual HTML site; the machine rendering is the AI Twin.
Neither is subordinate. They are *projections*, not original-and-copy: they share
the same facts and diverge, by design, in form (§2.3). In practice the machine
surface is often the *more* reachable of the two, because the human page is the one
behind the WAF (§1.1).

Binding those two surfaces into one coherent experience is the discipline this
specification calls **GEO — Generative Engine Optimization**. GEO recognises that
the lived experience a customer receives is not determined by what the publisher
ships alone, but by **what the publisher ships ⊗ the capability of the generative
engine that consumes it.** GEO is therefore the practice of authoring the machine
surface across **four layers**:

| # | Layer | Binds | Owned by | Trust model | OpenGEO scope |
| :-- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Factual** | price, stock, ingredients, identity | Publisher | **Verifiable** — equivalence to the source of truth | **Normative** (§2.3, §3) |
| 2 | **Editorial** | tone, sentiment, positioning | Publisher | Authored, declared | Optional declarations (§3.7, §4.2) |
| 3 | **Operational** | personas, service conduct, gates, escalation, duty of care | Publisher | Authored, **reputational** (fidelity of conduct, not fact) | Acknowledged; delegated to the consuming agent (§2.6, §3.7) |
| 4 | **Runtime** | translation, voice/TTS, modality, reasoning depth, plugins | **The consuming engine / edge device** | **Influenced, not controlled** — author for the floor, trust the ceiling | Out of scope; addressed as a design constraint (§2.7) |

**Layers 1–3 are authored and shipped by the publisher. Layer 4 is not** — it is
the LLM actually running the experience, frequently on the customer's own device.
A frontier cloud model (Gemini, Claude, GPT) will translate a persona into fluent
speech in another language, honour a clinical register, chain multi-hop traversal,
and invoke plugins — so layers 1–3 land at full fidelity. A small on-device or
low-reasoning-tier model may flatten the tone, miss an escalation gate, or stop
after one hop. The same twin yields different experiences depending on the engine.

This has a single overriding design consequence, stated here and applied
throughout: **author for re-expression, not for rendering.** Because the engine
*reformulates* rather than transcribes, a twin SHOULD ship clean, unambiguous,
well-grounded source material (facts, identity, declared register) and let the
engine re-express it — never pre-bake translations, audio, or modality the engine
supplies better. And because the weakest engines cannot be relied upon to honour
layers 2–3, the authored surface SHOULD **fail safe**: degrade to the conservative
behaviour (e.g. suppress products when intent is uncertain; reduce an escalation to
"speak to a human") rather than to a confident error.

The remainder of §2 and §3 specify layer 1 (and the declarative hooks for layers
2–3) normatively. Layers 3 and 4 are treated as *named, bounded* concepts (§2.6,
§2.7) so that the protocol is honest about where its authority ends.


### 2.1 The Twin File
Every significant page on a site has a corresponding **Twin File**: a Markdown document with structured YAML front-matter. The twin carries the machine-readable facts about the page — price, availability, facets, clinical attributes, graph edges — in a format any LLM can parse without executing JavaScript.

### 2.2 The Canonical Addressing Convention
The address of every Twin File is derived from the address of the page it mirrors by appending `.md` directly to the canonical URL path. For query parameters and trailing slashes, the `.md` is appended to the *path component*, with query parameters appended *after* the `.md` extension:


```
Human page:    https://example.com/some-product-name-12345
Twin file:     https://example.com/some-product-name-12345.md

Human page:    https://example.com/category/stop-smoking/products
Twin file:     https://example.com/category/stop-smoking/products.md

Human page:    https://example.com/shoes?color=blue&size=m
Twin file:     https://example.com/shoes.md?color=blue&size=m

Human page:    https://example.com/   (homepage)
Twin file:     https://example.com/llms.txt  (root index; see §4)
```

This rule is universal and requires no lookup table. Any agent that knows the canonical URL of a page can derive the address of its twin mechanically.

### 2.3 The Discovery Signal & The Equivalence Principle
Every human-facing page signals its twin via a standard HTML `<link>` element in the document `<head>`:

```html
<link rel="alternate" type="text/markdown" href="/some-product-name-12345.md" />
```

This tag uses the existing `rel="alternate"` HTML attribute — defined in the HTML Living Standard for alternate representations of a resource — with `type="text/markdown"` to identify the twin as a Markdown document.

> **Implementation note (static vs. runtime injection).** The discovery signal is
> only useful to a non-JS agent if it is present in the **server-delivered HTML**.
> A signal injected at runtime by a client-side framework (e.g. a React effect)
> is invisible to crawlers that do not execute JavaScript. Implementers SHOULD
> therefore emit the `rel="alternate"` tag statically. For SPAs, this can be done
> without adopting a full SSR framework via a **build-time prerender step** that
> stamps the correct static tag into each route's HTML from a route→twin manifest
> (the OpenGEO reference implementation does exactly this via a build-time
> prerender step). Fully dynamic deployments MAY instead inject the tag at a CDN edge.

**The twin is not a cloaking vector.** Classic SEO cloaking is a *concealment*
attack: a server sniffs the user-agent and secretly serves crawlers different
content than humans. The twin is the opposite — it is **openly declared** (the
`rel="alternate"` signal above), served at a mechanically derivable address, and
fetchable by anyone: human, crawler, or agent. There is no user-agent
discrimination and no hidden surface. In practice the situation is frequently
**inverted**: the human HTML page sits behind a WAF / bot-wall that blocks
crawlers, while the twin is the *open, inspectable* surface. Transparency, not
concealment, is the design — so an integrity model built on "render the human page
and compare" is both expensive (the Headless Browser Tax, §1.1) and often
impossible (the page is gated).

What a twin must preserve is therefore **factual fidelity to the source of truth**,
not byte- or render-equivalence to the HTML page. The human page and the twin are
two projections of the same underlying data (§1.3, §5); the twin is *meant* to
differ from the HTML in **structure and format** (it is zero-HTML, clean, concise)
and MUST NOT differ in **facts**. Equivalence is defined against the shared source,
not against one projection policing the other:

> #### *The Equivalence Principle*
> *The structured facts asserted in a twin's front-matter (e.g. `price`,
> `availability`, `ingredients`) MUST faithfully represent the same source of truth
> from which the human-facing page is rendered. A twin MAY — and by design does —
> differ from the HTML in structure and presentation; it MUST NOT contradict it in
> fact. Because the twin is openly declared and inspectable rather than hidden,
> trust rests on **transparency and provenance** (`source`, `source_url`, `updated`,
> and live MCP tools per §3.6 / §6.5), not on adversarial render-audits. Where the
> human page is independently reachable an agent MAY cross-check, but enforcement is
> reputational: a publisher that persistently asserts facts contradicting its own
> source of truth risks agents distrusting its twins.*


### 2.4 The Graph
Twin Files form a **directed graph**, not a tree. A product twin links upstream to its collections, its category advice, and its offers. A collection twin links downstream to its members. An agent entering at any node — including a deep-linked Product Detail Page (PDP) — can traverse the full graph in any direction without returning to the root.

### 2.5 The "Leap and Navigate" Execution Pattern
Rather than performing sequential, blind, crawler-style traversals to locate resources (which introduces high HTTP round-trip latency), OpenGEO-enabled agents utilize a hybrid execution pattern split into **Macro-Discovery (Searching)** and **Micro-Navigation (Context Reading)**.

```
       ┌────────────────────────┐
       │     User Objective     │
       └───────────┬────────────┘
                   │
                   ▼  [Macro-Discovery]
       ┌────────────────────────┐
       │  MCP Search / Tool API │  <-- "Leap" to the exact node
       └───────────┬────────────┘
                   │
                   ▼  [Micro-Navigation]
       ┌────────────────────────┐
       │    OpenGEO Twin (.md)  │  <-- "Navigate" the local context
       └───────────┬────────────┘
                   ├─> Read YAML Front-Matter (Facts)
                   └─> Follow Graph Edges (Advice, Listings)
```

1.  **Macro-Discovery (The "Leap"):** During live interactions, AI agents use live search tools advertised in the root index `/llms.txt` (via standard Search Engine APIs or local MCP servers) to "leap" directly to a specific target node (e.g., a Product Detail Twin).
2.  **Micro-Navigation (The "Navigate"):** Once the agent lands on the correct node, it requires immediate, localized context to guide the user's decision-making (such as looking up clinical warnings, sizing guides, or alternative offers). Rather than executing additional complex API database queries, the agent simply reads the OpenGEO Twin's YAML front-matter and follows the defined **Graph Edges** (e.g., `related_advice`, `appears_in`) to fetch adjacent assets. This localized, 1-fetch navigation is highly performant and contextually rich.

### 2.6 The Operational Layer — Personas (Operational Equivalence)

Factual equivalence (§2.3) ensures the twin tells the *truth* about the business.
It does not, on its own, make the twin *behave* like the business. A physical store
is not only a catalogue of facts; it is a set of **roles and service behaviours** —
a pharmacist who escalates a clinical question to a private consultation, a beauty
advisor who builds a routine, a customer-service desk that resolves a refund. The
operational layer renders that *operating model* for a generative engine.

OpenGEO names this **operational equivalence**: the twin should reproduce not just
*what* the store sells but *how the store conducts itself* — who handles which
query, the duty-of-care gates, the escalation paths, the register appropriate to a
sensitive moment. The natural vehicle is the **persona**: a declared mapping from a
real-world role (e.g. *Pharmacist*, *Macmillan Information Pharmacist*, *Beauty
Specialist*, *Customer Support*) to the tone, guidance, and behavioural
instructions an agent SHOULD adopt when acting in that role.

Two properties distinguish this layer from layers 1–2:

1.  **It is intrinsically less structured.** A pharmacist's judgement does not
    reduce to typed YAML fields. The operational layer is closer to agent
    *instruction* than to factual metadata, and OpenGEO does not attempt to fully
    formalise it. A site MAY express it through the declarative `context.*` family
    (§3.7, §4.2) — `context.persona`, `context.guidance`, `context.instructions` —
    but the authoritative expression is a **persona dictionary** maintained
    alongside the twins. (The OpenGEO reference implementation ships exactly such a
    dictionary as the reference for this layer.)
2.  **Its trust model is different.** Layer 1 trust is *equivalence of fact*,
    verifiable against the source of truth. Operational trust is **fidelity of
    conduct**: an authored, reputational commitment that the agent behaves as the
    business would. It is therefore **not** governed by the Equivalence Principle
    (§2.3) and is **delegated to the consuming agent** to honour — exactly as the
    behavioural hints in §3.7. OpenGEO binds facts; it *declares* conduct.

This is the layer that constitutes the durable competitive moat: factual mirroring
is commoditised, but reproducing *how an organisation cares for a customer in a
sensitive moment* is brand-specific and hard to copy.

### 2.7 The Runtime Layer — The Consuming Engine (Influence, Not Control)

Every preceding layer is authored and served by the publisher. The fourth — the
**runtime** — is not. It is the generative engine that actually consumes the twin
and produces the experience: a frontier cloud model, a search-grounded assistant,
or a small model running on the customer's own device. The engine supplies
capabilities the publisher neither owns nor should duplicate: translation, voice
and text-to-speech, modality, plugins, and a variable depth of reasoning.

The publisher's relationship to this layer is **influence, not control**:

*   **Influence.** Declarative tone, guidance, and instructions (§3.7) are
    *requests* the engine MAY honour. Capable engines largely will.
*   **Trust.** The publisher *relies* on the engine for what only it can do —
    re-expressing clean source material into the user's language, voice, and
    modality. A twin SHOULD NOT pre-translate to many languages or ship audio; it
    should ship groundable English the engine re-expresses (the **author for
    re-expression** rule of §2.0, and the accessibility advantage of §1.4 are the
    same property viewed twice).

Because engine capability varies, the authored surface MUST be designed to **fail
safe** when the runtime is weak: conservative defaults, escalation that degrades to
"speak to a human", and product surfacing that suppresses under uncertainty. A
mobile-first audience served by smaller engines makes the fail-safe floor matter
*more*, not less. OpenGEO does not specify engine behaviour — it specifies a
machine surface authored to survive the full capability spectrum of layer 4.


---

## 3. The Twin File Format

### 3.1 Structure
Every Twin File is a valid Markdown document with a YAML front-matter block:

```
---
[structured front-matter]
---

[human-readable Markdown body]
```

The front-matter carries machine-readable facts. The body carries prose, images, and navigational links for agents that read rather than parse.

### 3.2 Universal Front-Matter Fields

The front-matter is a **flat** YAML mapping. OpenGEO does **not** nest fields under
an `opengeo:` namespace, and graph edges are expressed as plain-English keys
carrying absolute-URL lists (§3.3) — not as `id`-based relation objects. This
flatness is deliberate (see §6.4): it minimises token overhead and matches the
left-to-right token-prediction flow of LLMs. These choices are normative; any
nested or shorthand form seen elsewhere is illustrative only and not conformant.

The following fields are defined for all Twin File types:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `type` | string | yes | Twin type: `product`, `product-listing`, `advice`, `offers`, `service` |
| `publisher` | string | yes | The brand or organisation that owns this content |
| `source` | string | recommended | Named provenance of the facts/content (e.g. the retailer, feed, or content hub), where distinct from `publisher` |
| `canonical` | URL | recommended | The absolute canonical URL of the human-facing page this twin mirrors |
| `source_url` | URL | no | The absolute URL of the upstream/real-world page the twin was derived from, where distinct from `canonical` (e.g. when a demo origin mirrors a production site) |
| `updated` | date (YYYY-MM-DD) | recommended | Date the twin was last regenerated |
| `region` | string | no | e.g., `UK`, `US` |
| `title` | string | no | Human-readable page title, where it differs from `name` (commonly used on `advice` twins) |
| `intent` | string | no | Reader/agent-intent hint, e.g. `informational`, `informational-commercial`, `transactional`, `purchase`. Signals whether the node is a candidate for onward traversal or a likely endpoint. Universal as of v0.2 (previously advice-only); see §3.7. |
| `context.tone` | string | no | The intended register an agent SHOULD adopt when speaking about *this* twin, e.g. `warm, gifting`. A per-twin **override** of the site-wide tone declared in `/.well-known/geo.txt`; omit unless it diverges. A declaration, not an enforcement; see §3.7. |
| `context.sentiment` | string | no | A plain-English editorial read of the item (e.g. `"a long-standing favourite, currently half price"`). Non-factual colour to frame the facts; see §3.7. |
| `context.guidance` | string | no | A plain-English instruction to the agent on *how* to position this twin (e.g. lead with the offer, surface mixed reviews honestly, recommend a pharmacist). Non-factual; see §3.7. |
| `tone` | string | no | **Deprecated alias** of `context.tone` (retained for back-compat). A declaration, not an enforcement; see §3.7. |


| `html_twin` | boolean | no | `false` indicates the twin has no rendered HTML sibling (it is an agent-only surface, e.g. a hand-authored advice/offers doorway). Absent or `true` means a human-facing HTML page exists at `canonical`. |


### 3.3 Graph Edge Fields
Graph edges are typed, plain-English keys carrying lists of absolute canonical URLs:

| Field | Direction | Cardinality | schema.org equivalent |
| :--- | :--- | :--- | :--- |
| `appears_in` | Product → Collection(s) | many | `ItemList` / `itemListElement` |
| `related_advice` | Product → Advice article | many | `subjectOf` (inverse: `about`) |
| `related_offers` | Product → Offers doorway | many | `OfferCatalog` |
| `related_listing` | Advice → Product listing | many | `about` (inverse: `subjectOf`) |

**Edges use absolute canonical URLs**, not site-relative paths. A twin is built to be consumed outside its serving context — in vector stores, agent caches, or cross-origin fetches — where a relative path no longer resolves.

```yaml
appears_in:
  - https://example.com/category/stop-smoking/products.md
related_advice:
  - https://example.com/category/stop-smoking/advice.md
related_offers:
  - https://example.com/offers.md
```

> **Note on examples and origins.** All edge and `canonical` examples in this
> document use the fictional production origin `https://example.com` (the retailer
> *Acme Pharmacy*). A generator MUST emit the deployed origin for all edges; twins
> generated against a local dev origin (e.g. `http://localhost:5173`) are not
> portable and MUST be re-origined before publication. The `canonical` field and
> all graph edges within a single twin MUST share the same origin.



### 3.4 Twin Types

#### 3.4.1 Product Twin (`type: product`)
Mirrors a single product detail page (PDP). Additional fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `sku` | string | Unique product identifier |
| `name` | string | Full product name |
| `brand` | string | Brand name |
| `category` | string | Taxonomy path, e.g., `"Health > Stop Smoking"` |
| `price` | number | Current price in `currency` |
| `was_price` | number | Previous price if on offer |
| `currency` | string | ISO 4217 code, e.g., `GBP` |
| `availability` | enum | `in_stock` / `out_of_stock` / `preorder` |
| `availability_checked` | date | Snapshot date; see §3.6 |
| `rating` | number | Aggregate rating (0–5) |
| `review_count` | integer | Number of reviews |
| `source` | string | Named provenance of the facts (e.g. the retailer/feed), where distinct from `publisher` |
| `stock_check` | string | Human-readable pointer to the live availability mechanism (e.g. `check_stock(sku)`); complements §3.6 |
| `product_type` | string | Coarse machine-friendly product grouping/slug used for faceting and cross-listing, e.g. `stop-smoking`. Complements the human-readable `category` taxonomy path. |
| `promo` | string | Machine-friendly promotion identifier/slug, e.g. `everyday-low-price`, `half-price`. Pairs with the human-readable `offer_label` (§3.5). |



#### 3.4.2 Product Listing Twin (`type: product-listing`)
Mirrors a category or product listing page (PLP). Additional fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `category` | string | Category taxonomy path |
| `product_count` | integer | Number of products in this listing |
| `facets` | string | Comma-separated list of available filter facets |
| `related_advice` | URL list | Advice article(s) for this category |
| `product_catalog` | URL list | The listing's members as absolute twin (`.md`) URLs (schema.org `ItemList` → `itemListElement`). This is the **agent traversal channel**: an agent walks listing → product twins for structured facts. The human-facing Compare table in the body instead links the live shoppable canonical page (two surfaces, one source). |
| `listing_crawl_intent` | string | Crawl directive (behavioural hint, not data) telling the agent *how* to treat `product_catalog`. `fetch on demand` = do not eagerly walk every member twin; use the Compare table for the overview and fetch an individual twin only when the user's goal needs its detail. Counters crawler bloat. |


The body of a Product Listing Twin MUST include:
*   A **compare table** with image, name (linked to PDP twin), price, rating, and at least one domain-specific facet column.
*   A **Help me choose** section where domain logic applies (e.g., medicine, finance).

#### 3.4.3 Advice Twin (`type: advice`)
Mirrors a content, guidance, or editorial page. Additional fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `source` | string | Named source of the content |
| `medicines` | boolean | `true` if page contains regulated medicines information |
| `related_listing` | URL | The product listing for this advice category |
| `intent` | string | Reader-intent hint for the agent, e.g. `informational`, `informational-commercial`, `transactional`. Signals that content carrying commercial intent (e.g. advice that leads to purchasable products) is a candidate for onward traversal, not a dead end. |
| `requires_listing_lookup` | boolean | `true` instructs the agent that fully answering a commercial query about this topic requires following `related_listing` to the product listing. A traversal hint that counteracts agents stopping at the advice node (avoiding "crawler bloat" by signalling *when* the extra fetch is warranted). |


#### 3.4.4 Offers Twin (`type: offers`)
A doorway listing current promotions. Regenerated frequently. No additional required fields beyond the universal set.

#### 3.4.5 Service Twin (`type: service`)
Mirrors a service page (e.g., pharmacy consultation, online doctor). Additional fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `service_type` | string | e.g., `nhs`, `paid`, `free` |
| `eligibility` | string | Plain-English eligibility note |
| `booking_required` | boolean | Whether booking is required |

### 3.5 Domain Vocabulary Extensions
The front-matter vocabulary is open. Domain maintainers may define additional fields for their vertical. Two reference extensions are defined here:

**E-commerce extension:**

| Field | Description |
| :--- | :--- |
| `offer_label` | Human-readable promotional label, e.g., `"1/2 price"` |
| `saving` | Numeric or human-readable saving versus `was_price`, e.g., `4.50` or `"£4.50"` |
| `promo_code` | Voucher/promotion code required to obtain the offer, where applicable |
| `bundle` | Human-readable multi-buy or bundle offer, e.g., `"4 Pack Bundle for £96.00, worth £97.80"` |
| `advantage_points` | Loyalty points awarded on purchase (numeric) |
| `unit_price` | Price per unit, e.g., `"£1.75 per patch"` |
| `volume` | Pack size or volume, e.g., `"14 patches"` |
| `age_restriction` | Minimum purchase age (numeric) |


**Pharmacy / medicine extension** (aligned to `schema.org/Drug`):

| Field | schema.org mapping | Description |
| :--- | :--- | :--- |
| `medicines` | — | Boolean flag; presence signals regulated content |
| `active_ingredient` | `activeIngredient` | Primary active ingredient, e.g., `nicotine` |
| `format` | `administrationRoute` | Delivery format: `patch`, `gum`, `spray`, `lozenge` |
| `strength` | `drugUnit` | Dose strength, e.g., `25mg` |
| `legal_status` | `legalStatus` | Regulatory classification, e.g., `P` (Pharmacy), `GSL` |
| `suitable_for` | `targetPopulation` | Plain-English suitability note |
| `warning` | `warning` | Key safety or age restriction warning |

### 3.6 Volatile Data (Availability)
Availability (`in_stock` / `out_of_stock`) changes frequently and must not be treated as live by consuming agents [3.6]. Every Product Twin carrying availability data MUST include:

1.  `availability_checked` — the date the snapshot was taken.
2.  A body note directing agents to a live check mechanism, e.g.:
    `Availability as of 2026-06-12 — confirm live stock before travelling.`

Where an MCP server exists, the `## For agents` block in the root index SHOULD advertise a `check_stock(sku)` tool for live availability [3.6, 6.5].

### 3.7 Intent and the Context Family (Agent Guidance)
Beyond facts and edges, a twin MAY carry optional **agent-guidance** declarations
that shape *how* an agent reasons about and speaks the content. These are hints, not
commands; a consuming agent MAY honour, weight, or ignore them.

*   **`intent`** — declares the publisher's read on why the page exists and what an
    agent should do next. Values are open; the reference vocabulary is
    `informational`, `informational-commercial`, `transactional`, and `purchase`.
    Its primary role is **traversal control**: an `informational-commercial` advice
    node paired with `requires_listing_lookup: true` (§3.4.3) tells the agent the
    node is *not* a dead end and that following `related_listing` is warranted. As
    of v0.2, `intent` is a universal optional field (§3.2), not advice-only.

*   **The `context.*` family** — a small set of per-twin, plain-English declarations
    that tell an agent how to *narrate and position* this specific item:

    *   **`context.tone`** — the intended register an agent SHOULD adopt, e.g.
        `helpful, clinical` for a regulated medicine or `warm, gifting` for a
        fragrance. A comma-separated list of adjectives. Especially valuable on the
        **LLM voice channel** (§1.4), where a twin becomes spoken dialogue: a
        clinical product and a lifestyle product should not sound the same.
        (`context.tone` replaces the earlier bare `tone` field, which is retained as
        a deprecated alias.)
    *   **`context.sentiment`** — a short editorial read of the item that frames the
        facts without restating them, e.g. `"a long-standing favourite, currently
        half price"` or `"polarising: effective for many, but a vocal minority
        dislike the strong flavour"`.
    *   **`context.guidance`** — an explicit instruction on how to position the item,
        e.g. *lead with the offer*, *surface mixed reviews honestly*, *recommend a
        pharmacist for clinical questions*, *don't imply a discount is permanent*.

**Divergence-only overrides.** The `context.*` family is designed to be **sparse**.
A site SHOULD declare its *default* register and positioning policy once, site-wide,
in `/.well-known/geo.txt` (§4.2) — for example a default tone, a standing
instruction to state prices honestly, or a blanket "for clinical questions,
recommend a pharmacist." An individual twin then carries `context.*` keys **only
where it diverges** from that default: a fragrance overrides the default clinical
tone with `context.tone: "warm, gifting"`; a half-price line adds
`context.guidance` about the offer. Twins that match the site default omit the
family entirely. This keeps per-twin token overhead minimal (§6.4) and concentrates
the agent's attention on what is genuinely item-specific.

> **Scope boundary.** `intent` and the `context.*` family are non-factual *hints*,
> not factual assertions, and are therefore **not** governed by the Equivalence
> Principle (§2.3). They are the declarative vehicle for the **editorial** and
> **operational** layers of the GEO model (§2.0, §2.6): the publisher *authors and
> declares* register and conduct here, but whether an agent honours them belongs to
> the **runtime** layer (§2.7), which OpenGEO influences but does not control. This
> is a deliberate division, not an omission: OpenGEO **binds facts** (verifiable
> equivalence) and **declares conduct** (authored, reputational fidelity); how a
> consuming engine weights, honours, overrides, or discloses these declarations —
> and any judgement about their use — is a property of that engine, out of scope
> for this protocol.


---


## 4. The Root Index


A site implementing OpenGEO SHOULD publish a root index at `/llms.txt`. This is a plain text file compatible with the llms.txt convention (Answer.AI, 2024) that provides an entry point for agents. Aligning with this standard supports native compatibility with 2026 search engines and agent crawlers (such as Google Lighthouse 13.3 "Agentic Browsing" audits).

OpenGEO extends the llms.txt format with a mandatory `## For agents` section linking to live tool bindings.

### 4.1 Sample Extended Root Index (Acme Pharmacy Example)
Below is an illustrative OpenGEO-compliant `/llms.txt` root index for the fictional
retailer *Acme Pharmacy* (`example.com`), containing absolute URLs and WebMCP
bindings. (For a *real* before/after comparison on a live site, see Appendix A.)

```markdown
# Acme Pharmacy

> Acme Pharmacy — a pharmacy-led health and beauty retailer. Products plus pharmacy
> and clinical services, available online and in-store with Click & Collect.
> Loyalty members earn points on purchases.

Acme Pharmacy covers health and pharmacy, prescriptions, beauty, skincare,
fragrance and gifting. Many health products are medicines — always read the label.
For clinical decisions, Acme recommends speaking to a pharmacist. Live availability
and Click & Collect should be confirmed via the stock check before travelling.

## Services
- [Pharmacy advice](https://example.com/services/pharmacy): speak to a pharmacist, in store or online, about medicines and conditions.
- [Stop Smoking Service](https://example.com/services/stop-smoking): one-to-one quit support at selected pharmacies. Eligibility criteria apply; charges may apply; subject to availability.
- [Online Doctor — Stop Smoking](https://example.com/online-doctor/stop-smoking): advice and treatment to help you quit. Subject to an online clinician consultation; charges apply.
- [Prescriptions](https://example.com/pharmacy/prescriptions): order repeat prescriptions online.

## Areas
- [Stop Smoking](https://example.com/health/stop-smoking/advice.md): why and how to quit, recovery timeline, managing cravings, FAQs, and NRT products.
- [Stop Smoking Aids](https://example.com/health/stop-smoking/products.md): patches, gums, lozenges and sprays — priced product listing with a "help me choose" guide.
- [Men's Fragrance Best Sellers](https://example.com/mens.md): top men's fragrance, including gift options.
- [Beauty & Skincare](https://example.com/beauty.md): skincare advice and in-store beauty services.

## Offers & Trending
- [Offers & Trending](https://example.com/offers.md): current promotions, seasonal campaigns and what's popular now. Regenerated regularly — not a fixed list.

## For agents
- MCP server: /.well-known/mcp-server — `search_products` (faceted), `get_product`, and `check_stock` (live online + Click & Collect availability; never assume static stock).
- All linked `.md` files are served openly — no JavaScript, no bot wall — the agent-legible layer.
- Product cards with verified images are also available to AI shopping surfaces via a Merchant Center / Shopping Graph feed.
- Twin address rule: any canonical URL + ".md" resolves to its AI Twin.

## Optional
- [Prescriptions & Pharmacy](https://example.com/pharmacy/prescriptions)
- [Find a store](https://example.com/store-finder)

<!-- ILLUSTRATIVE EXAMPLE — fictional retailer "Acme Pharmacy" (example.com). -->
```


### 4.2 The Site Participation Declaration (`/.well-known/geo.txt`)
In addition to the human-and-agent-readable root index at `/llms.txt` (§4.1), a
site MAY publish a minimal, machine-first **participation declaration** at
`/.well-known/geo.txt` (following the `/.well-known/` convention of RFC 8615). Where
`/llms.txt` is a rich, prose entry point ("the lobby"), `geo.txt` is a terse,
fixed-shape signal that lets an agent confirm OpenGEO participation and learn the
twin-addressing rule **without parsing prose**.

It is a plain-text, key-value file:

```text
# /.well-known/geo.txt

version: 0.3

twin_format: markdown+yaml
twin_suffix: .md
root_index: /llms.txt

# --- DEFAULT context (applies site-wide unless a twin overrides the field) ---
context.tone: helpful, trustworthy, plain-spoken
context.sentiment: well-reviewed across the range
context.audience: general shoppers and loyalty members
context.guidance: Lead with verified facts (price, rating, availability). For clinical or medicine decisions recommend speaking to a pharmacist. Always confirm live stock before advising a trip to store.
context.provenance: self-described by the retailer; discount unsourced superlatives and cross-check ratings against the verifiable review_count.
```

| Key | Required | Description |
| :--- | :--- | :--- |
| `version` | yes | The OpenGEO spec version the site targets, e.g. `0.3` |

| `twin_format` | yes | The twin serialisation; currently always `markdown+yaml` |
| `twin_suffix` | yes | The suffix appended to a canonical path to derive its twin (§2.2); currently always `.md` |
| `root_index` | recommended | Absolute or root-relative path to the root index (§4.1), typically `/llms.txt` |
| `context.*` | no | Site-wide **default** agent-guidance (§3.7): `context.tone`, `context.sentiment`, `context.audience`, `context.guidance`, `context.provenance`. The family is open. These are the values an agent SHOULD adopt for *every* twin unless that twin overrides the specific key. |

**Context resolution — `(site default ⊕ twin override)`.** The `context.*` keys here
are the site-wide defaults; a twin's `context.*` front-matter (§3.7) overrides them
**per key** (not wholesale — an unset key falls through to the default). This lets a
site state its register and positioning policy once and lets each twin carry only its
divergence. Where an MCP server exists, it SHOULD resolve this merge server-side and
return the effective `context` block **in-band** with each result, so an agent never
has to fetch the twin to know how to speak about a product. `context.*` values are
plain-English, self-explaining prose — never private codes — and remain non-factual
hints, not equivalence-bound facts (§2.3, §3.7).

`geo.txt` is **optional and complementary**. The primary discovery mechanism remains
the per-page `rel="alternate"` signal (§2.3); `geo.txt` declares site-wide
participation (and optional default context) and is convenient for crawlers
performing a cheap up-front capability check before fetching any page.


---

## 5. Architectural Implementation Patterns


OpenGEO accommodates different enterprise maturity levels and architecture types. Implementers may choose between two primary deployment patterns: **The Unified Source Pattern** (for modern, markdown-first sites) or **The Decoupled Projection Pattern** (for legacy modernization).

```
PATTERN A: UNIFIED SOURCE (Modern Web)
[OpenGEO Markdown (.md)] ──(SSOT)──> [JS Framework (Astro/Next.js)] ──> [HTML Output]
           │                                                                  │
           └──────────────(Served directly at /product.md) <──────────────────┘

PATTERN B: DECOUPLED PROJECTION (Legacy Modernization)
[PIM / CMS / DB] ──┬──> [Legacy Enterprise SPA] ──> [HTML Output (Frozen Codebase)]
                   │
                   └──> [OpenGEO Generator] ────────> [Agile AI Twin .md Assets (CDN)]
```

### 5.1 Pattern A: The Unified Source Pattern
In modern content architectures (e.g., Markdown/MDX-first static site generators), the `.md` Twin File is the **Single Source of Truth (SSOT)**.
*   The human-facing HTML page is a dynamic, compiled representation of the raw Markdown file.
*   There is zero data duplication. The server hosting the site simply serves the original `.md` file at the canonical `.md` path alongside the rendered HTML.

### 5.2 Pattern B: The Decoupled Projection Pattern (Enterprise Agility)
For legacy environments where the human-facing website is tied to a monolithic, slow-moving, or "frozen" production SPA, the AI Twin is served as a **decoupled projection**.
*   **Deployment Decoupling:** The OpenGEO Generator operates as an independent microservice or pipeline, reading from the core database/PIM and publishing static `.md` files directly to a lightweight origin (such as an AWS S3 bucket or CDN edge).
*   **AI Optimization (AIO) Velocity:** Because the twin layer is completely decoupled from the human-facing UX layer, content teams can adjust descriptions, inject semantic context, and update domain-specific YAML tags in real-time. This bypasses design reviews, accessibility audits, client-side JS regression testing, and heavy release management pipelines, allowing content curation to move at "AI speed."

---

## 6. Relationship to Existing Protocols

### 6.1 llms.txt (Answer.AI, 2024)
OpenGEO is fully backward-compatible with llms.txt. The root index format follows the llms.txt convention. OpenGEO extends it with structured front-matter, typed graph edges, and a defined twin file vocabulary that llms.txt does not specify. OpenGEO does not require llms.txt — `rel="alternate"` is the primary discovery mechanism.

### 6.2 UCP (Universal Commerce Protocol)
UCP governs verified product cards and transaction execution inside AI platforms. OpenGEO governs discovery and content — the layer before the transaction. They are complementary: an agent uses OpenGEO to find and understand a product, then UCP to purchase it.

### 6.3 ACP (Agent Communication Protocol)
ACP governs agent-to-agent communication and delegation. OpenGEO governs agent-to-content communication — how an agent reads a business's knowledge graph. They operate at different layers and do not conflict.

### 6.4 schema.org & The Rationale for YAML over JSON-LD
While JSON-LD (schema.org) remains the standard for traditional programmatic scrapers, OpenGEO explicitly mandates YAML front-matter for the AI Twin layer [6.4]. This design choice is optimized for the mechanics of Large Language Model (LLM) parsing:

1.  **Token Efficiency:** JSON-LD contains heavy syntactic ceremony (curly braces, double quotes, trailing commas, schemas) that inflates token counts. Benchmarks show YAML reduces structural token overhead by 20% to 30% compared to equivalent JSON structures, directly lowering inference costs and reducing latency for consuming agents.
2.  **State-Tracking Reduction:** LLMs process data as a continuous token stream. JSON forces the model's attention heads to track nested matching brackets and state boundaries across long distances. YAML’s flat, indentation-based key-value structure matches the left-to-right next-token prediction flow of transformer architectures.
3.  **Parsing Accuracy:** Empirical testing demonstrates that LLMs achieve higher accuracy rates when extracting attributes from YAML than from JSON or XML, as the absence of punctuation noise prevents attention distraction.

OpenGEO splits the presentation: the HTML channel carries JSON-LD for legacy programmatic parsers, while the `.md` Twin channel carries YAML for LLM-native consumption.

### 6.5 MCP (Model Context Protocol, Anthropic)
MCP governs agent-to-tools communication. An OpenGEO-compliant site MAY advertise an MCP server in its root index `## For agents` block [6.5]. The MCP server provides live data (availability, full-catalogue search) that static Twin Files cannot carry [3.6, 6.5]. OpenGEO and MCP are complementary: OpenGEO is the static discovery layer; MCP is the live data and execution layer [6.5].

---

## 7. Compliance Levels

| Level | Requirement |
| :--- | :--- |
| **Level 0 — Discoverable** | At least one `rel="alternate" type="text/markdown"` tag on the site's homepage pointing to a valid Twin File |
| **Level 1 — Twinned** | All significant pages carry `rel="alternate"`; twins follow the canonical addressing convention |
| **Level 2 — Graph** | Twins carry typed upstream graph edges (`appears_in`, `related_advice`, `related_offers`) |
| **Level 3 — Full** | Level 2 + root index + domain vocabulary extension + generator pattern (twins regenerated from source of truth) |
| **Level 4 — Conducted** | Level 3 + an authored **operational layer** (§2.6): site-wide default `context.*` in `/.well-known/geo.txt`, per-twin divergence overrides, and a published persona mapping for the site's service roles (factual equivalence extended with declared fidelity of conduct) |

Levels 0–3 govern the **factual** layer (verifiable equivalence); Level 4 adds the
**editorial** and **operational** layers (authored conduct) of the GEO model (§2.0).
The OpenGEO reference implementation achieves **Level 4**: it ships Level-3 structured
twins plus a persona dictionary and resolved `context.*` defaults.

---

## 8. Specification Origins and Open Alignment

The OpenGEO Specification is designed as a pragmatic synthesis of existing open-web standards and emerging agentic protocols. Rather than inventing proprietary schemas, OpenGEO codifies the integration of established web architecture into a coherent, business-centric "AI Twin" framework.

### 8.1 Synthesis of Existing Web Standards
The underlying mechanisms utilized by OpenGEO are built intentionally on open, non-proprietary patterns:
1.  **HTML Alternate Discovery:** The use of `rel="alternate"` is native to the HTML Living Standard. OpenGEO merely defines `type="text/markdown"` as a standard MIME-type signal for AI discovery.
2.  **Metadata Front-Matter:** Structured YAML front-matter on Markdown documents draws on decades of static-site-generator conventions (e.g., Jekyll, Hugo, Astro). OpenGEO extends this by standardizing specific commercial, transactional, and regulatory fields (e.g., SKU, active ingredients, graph edges).
3.  **The LLMs.txt Convention:** OpenGEO maintains absolute backward compatibility with the `llms.txt` root index proposal (Answer.AI, 2024).

### 8.2 The OpenGEO Extensions (The AI Twin Paradigm)
While the individual building blocks of OpenGEO are open standards, this specification introduces the standardized **synthesis** of these patterns to create a traversable, agent-legible "Digital Twin" of commercial web presences. The unique contributions of this specification include:

1.  **The Canonical `.md` Addressing Convention:** A strict, mathematical routing rule (canonical path + `.md`) that allows agents to traverse adjacent graph nodes with zero-lookups and single-fetch traversal, eliminating the "headless browser rendering tax." (Note: non-JS discovery is only achieved where the `rel="alternate"` signal is served statically; see §2.3.)

2.  **Faceted, Structured Graph-Edges:** Codifying upstream and downstream typed graph-edges (`appears_in`, `related_advice`) within YAML front-matter to convert flat markdown files into a fully queryable, decentralized knowledge graph.
3.  **Domain Vocabulary Extensions:** Extending lightweight markdown metadata into highly complex, regulated verticals (such as the Pharmacy/Medicine extension aligning to `schema.org/Drug`).
4.  **Static-to-Active Mapping (MCP Integration):** Extending the root index `/llms.txt` with actionable tool definitions (e.g., `check_stock`), bridging the discovery of static content with real-time transactional tool execution [3.6, 6.5].

### 8.3 Authorship and Community Trust
The OpenGEO specification was pioneered and compiled by **Zahid Saleem** (first draft published June 2026).

The specification is published as an open, community-led standard. No patent or proprietary restrictions apply. Implementing websites, CMS platforms, and AI crawlers are free to adopt, modify, and distribute implementations under the Creative Commons Attribution 4.0 International (CC BY 4.0) license, provided appropriate credit is given to the original OpenGEO Specification.

---

## 9. Versioning and Governance

This is version 0.3 of the OpenGEO Specification (see the Changelog at the top of this document for the delta from v0.2). It is published as a public record of the synthesis and as a working draft for community review.



The specification is intended to be governed as an open standard. Contributions, extensions, and implementations are welcome. The author retains the right to be credited as the originator of the OpenGEO Specification in any derivative work, implementation, or standardisation process.

---

## 10. Licence

This specification **document** is published under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** licence; the **reference implementation code** is published under the **MIT licence**. You are free to share, adapt, and implement for any purpose, including commercial use, provided you give appropriate credit to the original author.

> Zahid Saleem, *OpenGEO Specification v0.3*, June 2026.


---

*PROTOTYPE PROOF-OF-CONCEPT — the OpenGEO reference implementation demonstrates the Specification against a sample product catalogue. The worked examples in this document use a fictional retailer (*Acme Pharmacy*, `example.com`). The field evidence in Appendix A refers to an independent, publicly observable test of a real retailer's site and is reported as fact. This work is not affiliated with, endorsed by, or representing any referenced brand; all trademarks belong to their respective owners.*

---

## Appendix A — Field Evidence: The "Invisible Website" Is Real

> **Disclaimer.** This appendix reports the result of an **independent, publicly
> observable measurement** of a live website, conducted for research purposes. It
> is not affiliated with, endorsed by, or representing the named retailer or any
> brand. All trademarks belong to their respective owners. The probe issued only
> ordinary, unauthenticated HTTP `GET` requests to publicly served URLs under
> varying `User-Agent` strings — the same requests any browser or crawler makes —
> and records the responses verbatim. No site was modified, no authentication or
> access control was bypassed, and no rate limits were stressed.

### A.1 Method
In June 2026, the homepage of a major UK health-and-beauty retailer was requested
seven times with identical parameters, varying only the `User-Agent` header to
impersonate, in turn: a bare `curl` client, desktop Chrome, Googlebot, GPTBot,
ClaudeBot, OAI-SearchBot, and PerplexityBot. The same procedure was run against an
unwalled sibling subdomain of the same retailer as a control. Raw responses are
archived under `probe-out/`, and the probe is re-runnable via `utils/crawl.sh`.

### A.2 Result
Every automated client — including all four major AI crawlers and Googlebot — was
served an **identical 857-byte Imperva/Incapsula WAF block page**, not the
homepage. The block page carries `<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">`
and the body text *"Request unsuccessful. Incapsula incident ID: …"*. A real Chrome
`User-Agent` did not fare better, receiving a ~6 KB *"Pardon Our Interruption"*
interstitial rather than content.

| Client (`User-Agent`) | Bytes returned | Outcome |
| :--- | ---: | :--- |
| bare `curl` | 856 | WAF block stub |
| Chrome (desktop) | 6,160 | "Pardon Our Interruption" interstitial |
| Googlebot | 857 | WAF block page (`NOINDEX, NOFOLLOW`) |
| GPTBot | 857 | WAF block page (`NOINDEX, NOFOLLOW`) |
| ClaudeBot | 857 | WAF block page (`NOINDEX, NOFOLLOW`) |
| OAI-SearchBot | 857 | WAF block page (`NOINDEX, NOFOLLOW`) |
| PerplexityBot | 857 | WAF block page (`NOINDEX, NOFOLLOW`) |
| **Control:** unwalled sibling subdomain (all agents) | 73,788 | Full document served to every agent |

### A.3 Interpretation
The retailer's **primary domain is not directly readable by any major LLM**: agents
that try to read it on the user's behalf are turned away at the edge and must fall
back to describing the brand second-hand from stale third-party indexes. The
identical full-document response from the unwalled control subdomain confirms this
is a **deliberate edge-security policy**, not a network artefact. This is the
"invisible website" of §1.1 in the most literal sense — invisible not by accident
but by the site's own WAF — and it is precisely the condition the openly served
OpenGEO twin is designed to cure: the twin is the surface an agent *can* read, on
the publisher's own terms, without bypassing anything.


