# OpenGEO Specification v0.1

**Author:** Zahid Saleem  
**Date:** 2026-07-05  
**Status:** Working Draft  
**Licence:** Specification text under CC BY 4.0; reference implementation code under MIT

---

## Changelog

**v0.1 (2026-07-05)** - Rescoped working draft. Defines OpenGEO as an open semantic specification for publishing canonical organisational meaning to intelligent systems. Introduces the Semantic Twin as the reference equivalence engine, positions `geo.txt` as the OpenGEO participation and context declaration, aligns with Agentic Resource Discovery (ARD) for discovery, and treats MCP/API tools as optional live execution layers.

---

## Abstract

OpenGEO is an open semantic specification for publishing canonical organisational meaning to intelligent systems.

OpenGEO allows a publisher to declare, at the resource level, how an organisation, brand, product, service, location, policy, offer, article, collection, or other entity should be understood by AI systems.

The specification is based on one architectural principle:

> One canonical semantic model. Multiple projections.

The primary reference projection is the **Semantic Twin**: a machine-facing representation that preserves equivalence between a publisher's source of truth, human-facing pages, canonical media, graph relationships, contextual conduct, and optional live tools.

GEO is the practice. OpenGEO is the specification.

OpenGEO does not optimise websites for AI. It defines a publisher-controlled semantic layer for AI-mediated understanding and experience.

---

## 1. Motivation

AI systems are no longer merely indexing content; they are interpreting meaning. When a user asks an AI system about an organisation, product, service, policy, location, or support need, the model may draw from web pages, snippets, platform feeds, scraped layout, reviews, stale indexes, generated summaries, and third-party databases.

That indirect reconstruction creates interpretive drift:

- organisational identity may be flattened or misdescribed;
- product and service facts may become detached from their intended context;
- sensitive-support contexts may be treated like ordinary commercial contexts;
- canonical media may be omitted, substituted, or hallucinated;
- graph relationships between products, services, advice, policies, and offers may be lost;
- volatile facts such as availability may be treated as static;
- downstream AI surfaces may recommend or render a publisher inaccurately.

OpenGEO gives publishers a direct way to declare canonical semantic meaning in a form intelligent systems can discover, traverse, inspect, compare, and evaluate.

---

## 2. Scope

### 2.1 OpenGEO Is

OpenGEO is:

- an open semantic specification;
- a publisher-controlled canonical representation;
- a resource-level semantic declaration model;
- a Semantic Twin reference profile;
- a complement to ARD, `llms.txt`, MCP, APIs, and existing structured-data ecosystems;
- opt-in by design.

### 2.2 OpenGEO Is Not

OpenGEO is not:

- an SEO ranking algorithm;
- a moderation system;
- a proprietary merchant API;
- a replacement for ARD;
- a replacement for `llms.txt`;
- a requirement to use JSON-LD;
- a guarantee of objective truth.

OpenGEO establishes authorship, declared meaning, context, provenance, and equivalence expectations. It does not force consuming systems to believe, rank, recommend, render, transact, or enforce the publisher's declarations.

---

## 3. Core Concepts

### 3.1 Semantic Contract

The OpenGEO semantic contract is the publisher's declared machine-readable meaning for an organisation or resource.

The contract may include:

- identity;
- type;
- canonical URLs;
- concise descriptions;
- canonical media references;
- graph relationships to other resources;
- contextual conduct parameters;
- provenance and update metadata;
- pointers to optional live tools.

The contract SHOULD be derived from the publisher's source of truth and SHOULD NOT contradict the human-facing resource or other publisher-controlled projections.

### 3.2 Semantic Twin

A **Semantic Twin** is a publisher-controlled, machine-facing projection of a resource that preserves equivalence across:

- factual attributes;
- canonical media;
- human-facing handoff URLs;
- graph relationships;
- contextual conduct;
- provenance;
- optional live execution tools.

The Semantic Twin is the reference implementation for OpenGEO v0.1. A Semantic Twin MAY be represented as a Markdown document with YAML front matter.

The term **AI Twin** MAY be used informally for a Semantic Twin intended primarily for LLM consumption. In this specification, Semantic Twin is preferred because the concept is broader than any one AI platform or representation format.

### 3.3 Equivalence Engine

OpenGEO treats the Semantic Twin as an **equivalence engine**.

Equivalence does not mean byte-level sameness with the human-facing website. A Semantic Twin may differ from HTML in structure, ordering, wording, and format. It SHOULD preserve the same publisher-declared meaning.

For a product, this may mean that the twin binds:

- name;
- SKU or identifier;
- price;
- description;
- availability status and freshness metadata;
- canonical product URL;
- canonical product image;
- related listing, advice, offer, or policy links;
- provenance and update metadata.

For a service or support page, this may mean that the twin binds:

- service name;
- eligibility;
- geography;
- terms and qualifiers;
- escalation path;
- tone and sensitivity context;
- related policies or human-support channels.

The purpose is to reduce the need for an AI system to reconstruct meaning from page layout, navigation, screenshots, or unrelated web evidence.

### 3.4 Synchronisation and Source of Truth

Semantic Twins are not designed to be scraped or reverse-engineered from rendered HTML.

They SHOULD be generated dynamically or built statically by the publisher's CMS, product information system, content platform, or CI/CD pipeline from the same source of truth as the human-facing HTML.

This ensures that the human projection and the semantic projection remain transactionally equivalent, fresh, and auditable. The human-facing page and the Semantic Twin may differ in structure and presentation, but they SHOULD be produced from shared publisher-controlled data wherever possible.

HTML extraction MAY be used as a transitional migration technique where no structured source is available, but it SHOULD NOT be treated as the preferred architecture for OpenGEO adoption.

### 3.5 Resource-Level Declaration

OpenGEO is resource-level rather than page-only. A declared resource MAY correspond to:

- a web page;
- a product;
- a product listing;
- a service;
- a location;
- an article;
- an advice page;
- a collection;
- an offer;
- a policy;
- a brand;
- an organisation;
- another publisher-defined entity.

Where a resource has a human-facing URL, the OpenGEO representation SHOULD reference that URL. Where a resource has no single human-facing page, the publisher MAY still declare it as a semantic resource.

### 3.6 Context Architecture

**Context Architecture** is the practice of defining the semantic, tonal, risk, intent, and escalation attributes that govern how AI systems should interpret and present a publisher's resources.

OpenGEO reserves the `context.*` namespace for these attributes.

Context fields SHOULD be sparse, declarative, and resource-specific. They SHOULD describe the intended mode of interpretation rather than instruct an agent to persuade, rank, or recommend.

Examples:

```yaml
context.audience: gift_shopper
context.intent: commercial_discovery
context.tone: warm, helpful, concise
context.sensitivity: low
context.product_surfacing: allowed_when_relevant
context.escalation: none
```

```yaml
context.audience: patient_or_carer
context.intent: support
context.tone: calm, compassionate, non-commercial
context.sensitivity: high
context.product_surfacing: suppress_by_default
context.escalation: human_support
```

This distinction is important where the same organisation spans materially different contexts, such as a commercial gift-shopping journey and a sensitive health-support journey.

OpenGEO declares context. It does not guarantee that third-party systems will follow it. First-party assistant runtimes MAY enforce these declarations more strongly because the publisher controls the runtime, tools, and rendering surface.

### 3.7 Canonical Media

A Semantic Twin MAY declare canonical publisher-controlled media for a resource.

For product and catalogue use cases, the reference profile SHOULD provide a single canonical primary image URL with descriptive alt text. Additional images MAY be listed separately.

Example:

```markdown
![Example Product 50ml front pack](https://cdn.example.com/products/example-product-50ml-front.jpg)
```

Canonical media serves two purposes:

- it reinforces resource identity for AI interpretation;
- it provides a clean media reference for AI-mediated rendering.

The twin SHOULD carry media URLs and descriptive intent. It SHOULD NOT embed image bytes. Where an AI host requires image content blocks rather than URLs, an optional MCP/API rendering tool MAY fetch the canonical URL and return the media in the host's required content format.

### 3.8 Volatile Data and Freshness

Static Semantic Twins SHOULD NOT be treated as timeless authority for volatile facts such as stock, appointment availability, location-specific service availability, account eligibility, or price at checkout.

A twin MAY include a timestamped snapshot and SHOULD expose enough freshness metadata for a consuming system to decide whether the value is usable, stale, or needs confirmation.

Example:

```yaml
availability: in_stock
availability_updated: 2026-07-05T09:30:00Z
availability_fresh_for: PT6H
```

The static twin declares the semantic resource and the freshness of its volatile fields. Optional MCP/API tools MAY be advertised separately for implementations that need live resolution, but OpenGEO v0.1 does not require inline execution bindings from static fields to tools.

---

## 4. Reference Representation: Markdown + YAML

OpenGEO v0.1 uses Markdown with YAML front matter as its reference Semantic Twin representation.

This representation is recommended because it is:

- readable by humans;
- easy to generate;
- easy to serve statically;
- friendly to current LLM consumption;
- compatible with ordinary web hosting and CDN infrastructure;
- able to bind structured facts, prose, links, and canonical media in one resource.

Markdown + YAML is not the entire specification. The same semantic model MAY be projected into ARD catalogs, MCP tool descriptions, APIs, databases, JSON, or other future formats.

### 4.1 Product Detail Twin

The following neutral example illustrates a product detail Semantic Twin:

```markdown
---
opengeo: 0.1
type: product
id: https://example.com/products/example-product-50ml
canonical_url: https://example.com/products/example-product-50ml
source_url: https://example.com/products/example-product-50ml
publisher: Example Retailer
name: Example Product 50ml
sku: "EX-50"
description: A publisher-declared product description.
brand: Example Brand
category: "Beauty > Skincare > Moisturiser"
currency: GBP
price: 12.99
availability: in_stock
availability_updated: 2026-07-05T09:30:00Z
availability_fresh_for: PT6H
primary_image: https://cdn.example.com/products/example-product-50ml-front.jpg
image_alt: Example Product 50ml front pack
updated: 2026-07-05
appears_in:
  - https://example.com/skincare/moisturisers.md
related_advice:
  - https://example.com/advice/choosing-a-moisturiser.md
related_offers:
  - https://example.com/offers.md
context.intent: commercial_discovery
context.tone: clear, helpful, factual
context.product_surfacing: allowed_when_relevant
---

# Example Product 50ml

![Example Product 50ml front pack](https://cdn.example.com/products/example-product-50ml-front.jpg)

Example Product 50ml is described by the publisher as a daily moisturiser for normal skin.

## Key facts
- Price: GBP 12.99.
- Size: 50ml.
- Availability: in stock as of 2026-07-05 09:30 UTC; freshness window PT6H.

## Provenance
Source: Example Retailer.
```

### 4.2 Product Listing Twin

A product listing twin SHOULD be treated as a decision surface, not only as a list of products.

It MAY include:

- collection identity;
- product count;
- facet vocabulary;
- comparison table;
- decision aids;
- links to product detail twins;
- related advice, services, offers, or policies;
- a scale signal pointing to faceted search where a full catalogue is too large for static Markdown.

Example:

```yaml
opengeo: 0.1
type: product-listing
id: https://example.com/skincare/moisturisers
canonical_url: https://example.com/skincare/moisturisers
publisher: Example Retailer
name: Moisturisers
description: A publisher-declared listing of moisturiser products.
product_count: 1200
listing_mode: curated_head
long_tail_search: live: search_products(query, facets)
facets:
  brand: [Example Brand, Another Brand]
  skin_type: [normal, dry, sensitive]
  price: [5.00, 50.00]
product_catalog:
  - https://example.com/products/example-product-50ml.md
related_advice:
  - https://example.com/advice/choosing-a-moisturiser.md
updated: 2026-07-05
```

For small listings, the static twin MAY carry the full comparison set. For large commercial catalogues, the twin SHOULD declare a curated head plus a structured search or faceted retrieval tool.

### 4.3 Required Fields

The following fields are REQUIRED for an OpenGEO Semantic Twin:

| Field | Description |
| :--- | :--- |
| `opengeo` | OpenGEO version used by the representation. |
| `type` | Resource type, such as `organisation`, `brand`, `product`, `product-listing`, `service`, `location`, `article`, `collection`, `offer`, or `policy`. |
| `id` | Stable absolute URL identifying the semantic resource. |
| `name` | Human-readable resource name. |
| `description` | Concise resource description. |
| `updated` | Date or timestamp of last semantic update. |

### 4.4 Recommended Fields

The following fields are RECOMMENDED where applicable:

| Field | Description |
| :--- | :--- |
| `canonical_url` | Human-facing canonical URL, if one exists. |
| `source_url` | URL of the publisher source from which the declaration was generated. |
| `publisher` | Organisation responsible for the declaration. |
| `language` | Language tag, such as `en-GB`. |
| `sku` | Product identifier where applicable. |
| `brand` | Brand name where applicable. |
| `category` | Taxonomy or category path. |
| `primary_image` | Canonical primary media URL. |
| `image_alt` | Descriptive alt text tying media to resource identity. |
| `same_as` | Absolute URLs for equivalent public identifiers or profiles. |
| `context.*` | Context Architecture declarations. |

---

## 5. Graph Edges and Traversal

OpenGEO resources form a traversable graph, not a page tree.

A resource MAY belong to many collections, relate to multiple advice pages, connect to policies, carry offers, or point to live tools. A Semantic Twin should make those relationships explicit using absolute URLs.

### 5.1 Reference Edge Vocabulary

The Markdown/YAML reference profile uses plain-English edge names optimised for LLM legibility.

| Field | Direction | Description |
| :--- | :--- | :--- |
| `appears_in` | resource to collection | Parent listing, collection, campaign, or category twin. |
| `product_catalog` | listing to products | Product twins included in a listing or curated head. |
| `related_to` | any to any | General related resource. |
| `related_advice` | product/listing to advice | Advice or guidance relevant to the resource. |
| `related_offers` | resource to offers | Relevant offer, promotion, or commercial grouping. |
| `related_services` | resource to services | Relevant service or support path. |
| `has_policy` | resource to policy | Terms, returns, eligibility, privacy, safety, or regulatory policy. |
| `available_at` | product/service to location | Location where the resource is available. |
| `same_as` | resource to equivalent identifier | Public equivalent profile, identifier, or canonical record. |

Edges SHOULD be absolute URLs. Absolute URLs make twins self-locating when fetched cross-origin, cached, embedded, or ingested into agent memory.

### 5.2 Two Vocabularies

OpenGEO may use different vocabulary surfaces for different consumers:

- Semantic Twins SHOULD use plain-English keys that are easy for LLMs to interpret.
- Optional JSON-LD projections MAY use schema.org terms where required by conventional structured-data consumers.

JSON-LD is therefore an optional compatibility projection, not the normative core of OpenGEO v0.1.

---

## 6. Discovery and Integration

OpenGEO resources MAY be discovered through one or more mechanisms.

### 6.1 HTML Alternate Links

The primary resource-level discovery mechanism is the standard HTML alternate link.

Where a human-facing page has a colocated Semantic Twin, the page SHOULD link to it from the document `<head>`:

```html
<link rel="alternate" type="text/markdown" href="https://example.com/products/example-product-50ml.md">
```

This establishes an explicit equivalence relationship between the human-facing projection and the machine-facing Semantic Twin. It allows an agent, crawler, browser extension, assistant, or audit tool that reaches the HTML page to discover the twin without guessing URL patterns or scraping page structure.

For JavaScript-heavy sites, the alternate link SHOULD be present in server-delivered or prerendered HTML where possible. Where the front-end estate is difficult to change, it MAY be added through prerendering, edge injection, build-time route manifests, sitemap-style indexes, `llms.txt`, ARD, or `geo.txt` discovery. OpenGEO is intended to support minimal-change semantic projection during longer website modernisation programmes.

### 6.2 `geo.txt`

A participating site SHOULD publish:

```text
/.well-known/geo.txt
```

`geo.txt` declares OpenGEO participation, site-wide defaults, supported representations, and optional discovery pointers.

Example:

```yaml
opengeo: 0.1
participates: true
publisher: Example Retailer
canonical_url: https://example.com
default_language: en-GB
default_context.tone: clear, helpful, factual
default_context.product_surfacing: intent_gated
semantic_twin_root: https://example.com/opengeo/
ard_catalog: https://example.com/ai-catalog.json
mcp_discovery: https://example.com/.well-known/mcp-server
representations:
  - semantic-twin+markdown
```

### 6.3 ARD

OpenGEO is designed to complement Agentic Resource Discovery (ARD).

ARD provides discovery and trust handshaking for AI-facing resources. OpenGEO provides the canonical semantic experience those resources expose.

In this division of responsibility:

- ARD answers: what AI-facing resources, tools, or agents exist here, and how can they be discovered?
- OpenGEO answers: what canonical organisational meaning do those resources declare?
- MCP/API tools answer: what live operations, refreshed data, or rendered content can be invoked where an implementation chooses to expose tools?

An ARD `ai-catalog.json` MAY point to:

- `/.well-known/geo.txt`;
- Semantic Twin roots or bundles;
- MCP servers;
- first-party assistant endpoints;
- service-specific capability endpoints.

### 6.4 MCP and API Tools

MCP and API integrations are optional live execution layers.

They are appropriate for:

- refreshed stock or availability;
- faceted catalogue search;
- appointment or service availability;
- account-specific eligibility;
- rendering canonical cards or media blocks;
- reading large collections beyond static Markdown limits.

OpenGEO can describe stable semantic meaning without MCP. MCP becomes useful when a static twin should point to live state or controlled rendering.

### 6.5 `llms.txt`

OpenGEO complements `llms.txt`.

`llms.txt` can act as an orientation or root index for language models. It may link to `geo.txt`, Semantic Twins, advice pages, collections, services, and optional tool discovery.

OpenGEO does not require `llms.txt`, and `llms.txt` does not replace OpenGEO's resource-level semantic declarations.

### 6.6 JSON-LD

OpenGEO does not require JSON-LD.

JSON-LD and schema.org MAY be generated as optional compatibility projections for search engines or existing structured-data ecosystems. They are not the normative representation for OpenGEO v0.1.

The recommended Phase 1 reference architecture is:

```text
OpenGEO semantic contract
        |
        v
Semantic Twin projections
        |
        +-- geo.txt participation and defaults
        +-- ARD ai-catalog.json discovery
        +-- optional MCP/API live tools
        +-- optional llms.txt orientation
```

---

## 7. Internal and External Agent Use

The same OpenGEO semantic contract SHOULD serve both external AI systems and first-party assistant agents.

External systems may discover and consume the declarations through ARD, `geo.txt`, `llms.txt`, alternate links, search, or direct fetch. Their behaviour remains advisory and platform-mediated.

First-party assistants can consume the same Semantic Twins and context declarations while also enforcing runtime policies, invoking tools, rendering canonical cards, and completing workflows such as booking or checkout.

No separate ontology is required for internal assistants. The difference is runtime control, not semantic architecture.

---

## 8. Passive Intent and Context Modes

OpenGEO v0.1 focuses on explicit resource declarations. Later phases may support passive or ambient intent modes, where an AI system infers context from signals rather than from a direct user question.

Potential signals include:

- current resource or page;
- category or collection context;
- search query;
- referrer;
- basket or session state;
- location or store context;
- loyalty or account context where permitted;
- sensitivity of the current resource;
- prior conversational turn.

Passive intent modes SHOULD still resolve to declared Context Architecture fields. For example, an inferred gift-shopping journey and a sensitive-support journey may share the same organisation but require different tone, product-surfacing policy, and escalation path.

The semantic rules remain the same. The difference is whether intent is explicit or inferred.

---

## 9. Trust Model

OpenGEO is a declaration layer.

A publisher declares its own meaning. Consuming systems remain responsible for verification, ranking, safety, policy enforcement, and user trust.

OpenGEO improves the information environment by making the publisher's declared meaning explicit, inspectable, timestamped, traversable, and comparable.

AI systems MAY use the following as confidence signals:

- domain-of-origin;
- provenance fields;
- freshness;
- consistency across projections;
- canonical media references;
- graph reciprocity;
- absence of contradictory declarations;
- successful live-tool resolution;
- observed user satisfaction or downstream evaluation.

If a publisher makes false, misleading, stale, or contradictory declarations, downstream systems MAY discount or ignore those declarations.

---

## 10. Conformance Levels

OpenGEO v0.1 defines lightweight conformance levels for early adoption.

| Level | Name | Requirement |
| :--- | :--- | :--- |
| 0 | Declared | Site publishes `/.well-known/geo.txt`. |
| 1 | Twinned | At least one resource has a Semantic Twin representation. |
| 2 | Discoverable | Semantic Twins are discoverable through ARD, `geo.txt`, `llms.txt`, or alternate links. |
| 3 | Graph | Semantic Twins declare relationships to other resources using absolute URLs. |
| 4 | Contextual | Twins include sparse Context Architecture declarations where tone, sensitivity, intent, or escalation materially differ. |
| 5 | Fresh | Twins declare freshness metadata for volatile fields and may point to optional MCP/API tools for refreshed data or controlled rendering. |
| 6 | Tested | Publisher evaluates interpretive drift across one or more AI systems. |

Higher levels indicate maturity, not moral superiority or ranking entitlement.

---

## 11. Roadmap

OpenGEO is organised around implementation circles.

### Circle 1: Explicit Semantic Projection

Circle 1 focuses on a minimal-change semantic layer:

- AI visibility assessment reports;
- Semantic Twin generation;
- OpenGEO v0.1 compatibility;
- `geo.txt` participation and default context;
- ARD `ai-catalog.json` discovery;
- optional MCP/API discovery for live tools;
- canonical media references;
- graph traversal;
- interpretive drift testing.

This circle is designed to answer:

> Is the organisation understood accurately by AI?

### Circle 2: Passive Intent and Context Architecture

Circle 2 extends OpenGEO from explicit resources to passive and inferred context modes:

- intent inference from resource, journey, query, or session signals;
- context-mode switching across commercial, advice, support, and sensitive journeys;
- product-surfacing policies such as `suppress_by_default` or `allowed_when_relevant`;
- escalation and human-handoff declarations;
- first-party assistant consumption of the same semantic layer.

This circle is designed to answer:

> Is the AI-mediated experience appropriate to the user's context?

### Circle 3: Controlled Agentic Execution

Circle 3 connects Semantic Twins to controlled first-party or trusted-agent runtimes:

- freshness-aware availability;
- faceted search;
- rendered product/service cards;
- appointment or checkout handoff;
- policy enforcement in first-party assistants;
- richer evaluation harnesses.

This circle is designed to answer:

> Can the semantic layer safely support action, not only understanding?

---

## 12. Acknowledgements

OpenGEO builds in alignment with the open-agentic web movement, including Jeremy Howard and Answer.AI's `llms.txt` proposal.

OpenGEO treats `llms.txt` as a complementary orientation and root-index convention, while OpenGEO defines resource-level semantic declarations, Semantic Twin projections, equivalence, context, and graph traversal.

---

## 13. Versioning and Governance

This document is a working draft of OpenGEO v0.1.

The specification is intended to evolve as an open, community-reviewable standard. The author retains the right to be credited as the originator of the OpenGEO specification in derivative specifications, implementations, or standardisation processes.

---

## 14. Licence

This specification document is published under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence, with attribution to Zahid Saleem.

Reference implementation code is published under the MIT licence.
