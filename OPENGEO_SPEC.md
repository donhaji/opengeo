# OpenGEO Specification v0.1

**Author:** Zahid Saleem  
**Date:** 2026-07-05  
**Status:** Working Draft  
**Licence:** Specification text under CC BY 4.0; reference implementation code under MIT

---

## Changelog

**v0.1 (2026-07-05)** - Rescoped working draft. Defines OpenGEO as an open specification for publisher-owned semantic and contextual declarations for intelligent systems. Separates the architecture into discovery, semantic, context, and execution layers. Positions the Semantic Twin as the reference implementation, not the specification itself.

---

## Abstract

OpenGEO is an open specification for publisher-owned semantic and contextual declarations for intelligent systems.

It allows a publisher to declare, at the resource level, what an organisation, product, service, policy, location, article, offer, collection, or other entity is, and how it should be understood.

OpenGEO is not primarily an AI Twin specification. A Semantic Twin is the reference implementation of OpenGEO, commonly expressed as Markdown with YAML front matter. Other representations may be generated from the same semantic model.

The specification is based on one architectural principle:

> **OpenGEO defines what the publisher knows better than the execution surface.**

Discovery mechanisms may find OpenGEO resources. Execution surfaces may interpret, rank, reason, retrieve, render, or act on them. OpenGEO itself defines the publisher-owned semantic and contextual declarations that sit between discovery and execution.

---

## 1. Motivation

AI systems are no longer merely indexing content; they are interpreting meaning. When a user asks an AI system about an organisation, the model may draw from web pages, snippets, product feeds, third-party summaries, screenshots, stale indexes, search results, reviews, and platform-specific data.

That indirect reconstruction creates interpretive drift:

- organisational identity may be flattened or misdescribed;
- product and service facts may become detached from their intended context;
- sensitive-support journeys may be treated like ordinary commercial journeys;
- canonical media may be omitted, substituted, or hallucinated;
- important relationships between resources may be lost;
- stale facts may be treated as current;
- downstream AI surfaces may answer, recommend, or render in ways the publisher did not intend.

OpenGEO gives publishers a way to declare semantic meaning and interpretation context directly, without relying solely on inference from human-facing pages or third-party platforms.

---

## 2. Conceptual Model: DSCE with Assurance Oversight

OpenGEO is organised around the DSCE interpretation chain:

- Discovery;
- Semantic;
- Context;
- Execution.

DSCE defines the AI interpretation chain. Assurance governs every checkpoint.

Discovery, Semantic, Context, and Execution describe how intelligent systems locate, understand, contextualise, and act upon publisher-controlled information.

Assurance is not a separate layer in the chain. It is a cross-cutting oversight concern that applies across Discovery, Semantic, Context, and Execution.

OpenGEO primarily standardises publisher-declared resources across Discovery, Semantic, and Context. Execution remains the responsibility of AI engines, platforms, tools, agents, and consuming systems.

OpenGEO resources should be designed so that assurance can be evaluated at every stage of the interpretation chain.

The architectural model is **DSCE 🎲: Discovery, Semantic, Context, Execution**.

| Layer | Purpose | Question answered | OpenGEO role |
| :--- | :--- | :--- | :--- |
| Discovery | Locating participation and resources | Where is the representation? | Declarative and mechanism-compatible. |
| Semantic | Declared facts and relationships | What is this resource? | Normative. |
| Context | Declared interpretation envelope | How should this resource be understood? | Normative. |
| Execution | Reasoning, retrieval, ranking, tool use, rendering, safety, policy, action | What happens now? | Out of scope; informed by OpenGEO. |

The same layers can be read from a practical assessment perspective:

| Layer | Core question | Practical assessment question |
| :--- | :--- | :--- |
| Discovery | Where is the representation? | Can this engine find it? |
| Semantic | What is this resource? | Does this engine understand the declared facts? |
| Context | How should this resource be understood? | Does this engine preserve the declared intent, tone, and guidance? |
| Execution | What happens now? | What does this engine actually do with it? |

### 2.1 Discovery Layer

The discovery layer helps intelligent systems find the appropriate semantic and contextual representation for a resource.

Examples include:

- HTML alternate links;
- `/.well-known/geo.txt`;
- `llms.txt`;
- ARD `ai-catalog.json`;
- MCP discovery;
- future `.well-known`, registry, or platform discovery mechanisms.

Discovery is independent from the semantic model. Discovery mechanisms point to OpenGEO declarations; they do not define the meaning of those declarations.

There are two useful views of discovery:

- **Spec view:** discovery is declarative and mechanism-compatible. OpenGEO can be reached through HTML alternate links, `geo.txt`, `llms.txt`, ARD, MCP discovery, `.well-known` resources, registries, APIs, or future mechanisms.
- **Assessment view:** discovery is engine-relative and observable. The practical question is whether a given engine can discover the right semantic and contextual representation through the mechanisms it supports.

In assessment, discovery is therefore not only "does a `geo.txt`, ARD, or `llms.txt` file exist?" The assessment asks: **which engines can see which layer?**

### 2.2 Semantic Layer

The semantic layer contains publisher-declared facts and relationships.

Examples include:

- resource identity;
- resource type;
- canonical URLs;
- provenance;
- publisher identity;
- structured facts;
- graph relationships;
- canonical media references;
- freshness metadata.

This layer answers: **what is this resource?**

### 2.3 Context Layer

The context layer contains publisher-declared interpretation context.

This is the primary innovation of OpenGEO. The `context.*` namespace provides a coherent place for publishers to declare the interpretation envelope around a resource.

Examples include:

- `context.profile`;
- `context.persona`;
- `context.instructions`;
- `context.intent`;
- `context.tone`;
- `context.guidance`;
- `context.sensitivity`;
- `context.volatility`;
- `context.provenance`;
- future domain-specific context fields.

This layer answers: **how should this resource be understood?**

Context declarations reduce unnecessary inference while preserving execution autonomy. They are not prompts, commands, or enforcement rules. They are publisher-authored context that intelligent systems may use when interpreting a resource.

### 2.4 Execution Layer

The execution layer is everything performed by AI systems, agent frameworks, tools, assistants, and platform surfaces after discovery, semantics, and context are available.

Examples include:

- reasoning;
- ranking;
- retrieval;
- summarisation;
- tool selection;
- agent construction;
- MCP execution;
- A2A coordination;
- safety enforcement;
- platform policy;
- rendering;
- transaction flow.

This layer answers: **what happens now?**

The execution layer is deliberately outside OpenGEO. OpenGEO informs execution surfaces. It does not control them.

---

## 3. Scope

### 3.1 OpenGEO Is

OpenGEO is:

- an open specification for semantic and contextual declarations;
- publisher-owned;
- resource-level;
- implementation-agnostic;
- execution-independent;
- compatible with ARD, `llms.txt`, MCP discovery, APIs, and other discovery or execution systems;
- opt-in by design.

### 3.2 OpenGEO Is Not

OpenGEO is not:

- a prompt format;
- an agent framework;
- an MCP replacement;
- an execution API;
- an SEO ranking algorithm;
- a moderation system;
- a proprietary merchant API;
- a requirement to use JSON-LD;
- a guarantee of objective truth.

OpenGEO establishes authorship, declared meaning, context, provenance, and equivalence expectations. Consuming systems remain responsible for ranking, reasoning, verification, safety, policy, rendering, and action.

### 3.3 Field Placement Principle

For every proposed field, ask:

> Is this something the publisher knows better than the execution surface?

If yes, it probably belongs in OpenGEO.

If no, it probably belongs to the execution layer.

This principle keeps OpenGEO small. It prevents the specification from becoming an agent framework, execution framework, or collection of behavioural instructions.

---

## 4. Semantic Declarations

The semantic layer defines publisher-owned meaning.

### 4.1 Resource-Level Declaration

OpenGEO is resource-level rather than page-only. A declared resource may correspond to:

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

Where a resource has a human-facing URL, the OpenGEO representation should reference that URL. Where a resource has no single human-facing page, the publisher may still declare it as a semantic resource.

### 4.2 Core Semantic Fields

The reference representation uses the following core fields:

| Field | Requirement | Description |
| :--- | :--- | :--- |
| `opengeo` | required | OpenGEO version used by the representation. |
| `type` | required | Resource type, such as `organisation`, `brand`, `product`, `product-listing`, `service`, `location`, `article`, `collection`, `offer`, or `policy`. |
| `id` | required | Stable absolute URL identifying the semantic resource. |
| `name` | required | Human-readable resource name. |
| `description` | required | Concise resource description. |
| `updated` | required | Date or timestamp of last semantic update. |
| `canonical_url` | recommended | Human-facing canonical URL, if one exists. |
| `source_url` | recommended | Publisher source from which the declaration was generated. |
| `publisher` | recommended | Organisation responsible for the declaration. |
| `language` | recommended | Language tag, such as `en-GB`. |
| `primary_image` | optional | Canonical primary media URL. |
| `image_alt` | optional | Descriptive alt text tying media to resource identity. |
| `same_as` | optional | Equivalent public identifiers or profiles. |

### 4.3 Graph Relationships

OpenGEO resources form a graph, not a page tree. Relationships should be declared with absolute URLs so resources remain self-locating when fetched, cached, embedded, or ingested by agents.

Reference edge fields include:

| Field | Description |
| :--- | :--- |
| `appears_in` | Parent listing, collection, campaign, or category twin. |
| `product_catalog` | Product twins included in a listing or curated head. |
| `related_to` | General related resource. |
| `related_advice` | Advice or guidance relevant to the resource. |
| `related_offers` | Relevant offer, promotion, or commercial grouping. |
| `related_services` | Relevant service or support path. |
| `has_policy` | Terms, returns, eligibility, privacy, safety, or regulatory policy. |
| `available_at` | Location where the resource is available. |
| `same_as` | Equivalent identifier, public profile, or canonical record. |

### 4.4 Canonical Media

A publisher may declare canonical media for a resource.

For product, place, and object use cases, a single canonical primary image can reduce visual ambiguity and help preserve equivalence between the human-facing resource and AI-mediated rendering.

Example:

```yaml
primary_image: https://cdn.example.com/products/example-product-front.jpg
image_alt: Example Product front pack
```

The semantic layer carries media URLs and descriptions. It should not embed image bytes. Rendering, fetching, transformation, or host-specific image blocks belong to the execution layer.

### 4.5 Freshness

Static declarations should not be treated as timeless authority for volatile facts such as stock, appointment availability, location-specific service availability, account eligibility, or price at checkout.

OpenGEO may declare timestamped values and freshness metadata:

```yaml
availability: in_stock
availability_updated: 2026-07-05T09:30:00Z
availability_basis: last_published_snapshot
```

This lets an execution surface decide whether the value is usable, stale, or needs confirmation. OpenGEO v0.1 does not require inline bindings from static fields to live tools.

---

## 5. Context Declarations

The context layer defines publisher-owned interpretation context.

Context is not merely narrative. It is the publisher-declared envelope that helps intelligent systems understand the intended interpretation mode of a resource.

OpenGEO reserves the coherent `context.*` namespace for this purpose.

### 5.1 Core Context Fields

Reference context fields include:

| Field | Description |
| :--- | :--- |
| `context.profile` | Resource or organisation profile relevant to interpretation. |
| `context.persona` | Declared role or service persona associated with the resource. |
| `context.instructions` | Publisher-authored interpretive instructions that an execution surface may map to agent/system instructions when constructing an agent from OpenGEO context. |
| `context.intent` | Intended or likely user intent for the resource. |
| `context.tone` | Desired tone or register. |
| `context.guidance` | Concise interpretive guidance. |
| `context.sensitivity` | Sensitivity level or risk context. |
| `context.volatility` | Volatility class for facts likely to change. |
| `context.provenance` | Contextual provenance or authority statement. |

These fields may be extended by domain profiles.

`context.instructions` is the field most closely aligned with agent construction. It is intended to make it straightforward for an execution surface to derive an agent profile, system-instruction block, or equivalent configuration from `context.*` declarations alone.

This does not make OpenGEO a prompt format. OpenGEO declares the publisher's intended interpretation envelope. The execution surface remains responsible for deciding whether and how those declarations become prompts, policies, tools, or agent configuration.

### 5.2 Examples

Commercial discovery:

```yaml
context.intent: commercial_discovery
context.tone: warm, helpful, concise
context.sensitivity: low
context.guidance: Compare attributes and preserve current offer qualifiers.
```

Sensitive support:

```yaml
context.intent: support
context.tone: calm, compassionate, non-commercial
context.sensitivity: high
context.guidance: Prioritise service information, eligibility, human handoff, and safety qualifiers.
```

### 5.3 Execution Autonomy

Context declarations inform execution surfaces. They do not prescribe behaviour.

An external LLM, first-party assistant, NLWeb-style endpoint, MCP server, A2A agent, browser agent, or future execution surface may consume the same context declarations. Each surface remains responsible for reasoning, policy, safety, rendering, tool use, and final output.

The distinction is:

- semantic layer defines meaning;
- context layer defines interpretation;
- execution layer defines behaviour.

---

## 6. Semantic Twin Reference Implementation

A Semantic Twin is the reference implementation of OpenGEO.

It is a machine-facing projection of a resource that combines semantic and contextual declarations with optional human-readable body content.

OpenGEO owns semantics and context, not syntax. Markdown with YAML front matter is the v0.1 reference representation because it is inspectable, easy to serve, easy to generate, and legible to current LLMs.

Other serialisations may include:

- JSON;
- MCP responses;
- API responses;
- databases or graph stores;
- future formats.

### 6.1 Product Detail Example

```markdown
---
opengeo: 0.1
type: product
id: https://example.com/products/example-product
canonical_url: https://example.com/products/example-product
source_url: https://example.com/products/example-product
publisher: Example Retailer
name: Example Product
sku: "EX-001"
description: A publisher-declared product description.
currency: GBP
price: 12.99
availability: in_stock
availability_updated: 2026-07-05T09:30:00Z
availability_basis: last_published_snapshot
primary_image: https://cdn.example.com/products/example-product-front.jpg
image_alt: Example Product front pack
appears_in:
  - https://example.com/categories/example-category.md
related_advice:
  - https://example.com/advice/example-guide.md
context.intent: commercial_discovery
context.tone: clear, helpful, factual
context.sensitivity: low
updated: 2026-07-05
---

# Example Product

![Example Product front pack](https://cdn.example.com/products/example-product-front.jpg)

Example Product is described by the publisher as a daily product for a specific customer need.
```

### 6.2 Product Listing Example

```yaml
opengeo: 0.1
type: product-listing
id: https://example.com/categories/example-category
canonical_url: https://example.com/categories/example-category
publisher: Example Retailer
name: Example Category
description: A publisher-declared product listing.
listing_mode: curated_head
product_count: 1200
product_catalog:
  - https://example.com/products/example-product.md
related_advice:
  - https://example.com/advice/example-guide.md
context.intent: commercial_discovery
context.guidance: This listing presents a curated head. Use structured search where full-catalogue precision is required.
updated: 2026-07-05
```

### 6.3 Synchronisation and Source of Truth

Semantic Twins are not designed to be scraped or reverse-engineered from rendered HTML.

They should be generated dynamically or built statically by the publisher's CMS, product information system, content platform, or CI/CD pipeline from the same source of truth as the human-facing HTML.

HTML extraction may be used as a transitional migration technique where no structured source is available, but it should not be treated as the preferred architecture for OpenGEO adoption.

---

## 7. Discovery

Discovery answers: **where is the representation?**

OpenGEO is compatible with multiple discovery mechanisms. In the specification, discovery is declarative and mechanism-compatible. In assessment, discovery is engine-relative and observable: can a given engine find the right semantic and contextual representation through the mechanisms it supports?

### 7.1 HTML Alternate Links

The primary page-level discovery mechanism is the standard HTML alternate link:

```html
<link rel="alternate" type="text/markdown" href="https://example.com/products/example-product.md">
```

This establishes an explicit relationship between the human-facing projection and the machine-facing Semantic Twin.

### 7.2 `geo.txt`

A participating site should publish:

```text
/.well-known/geo.txt
```

Example:

```yaml
opengeo: 0.1
participates: true
publisher: Example Retailer
canonical_url: https://example.com
default_language: en-GB
default_context.tone: clear, helpful, factual
semantic_twin_root: https://example.com/opengeo/
ard_catalog: https://example.com/ai-catalog.json
representations:
  - semantic-twin+markdown
```

`geo.txt` is a site-wide participation declaration and default-context file. It is not an execution API.

### 7.3 `llms.txt`

OpenGEO complements `llms.txt`.

`llms.txt` can act as an orientation or root index for language models. It may link to `geo.txt`, Semantic Twins, advice pages, collections, services, and optional tool discovery.

### 7.4 ARD, MCP Discovery, and Future Discovery

Agentic Resource Discovery, MCP discovery, `.well-known` resources, registries, and other mechanisms may point to OpenGEO resources.

These systems own discovery and capability handshaking. OpenGEO owns semantic and contextual declarations.

---

## 8. Execution Independence

OpenGEO must not become:

- a prompt format;
- an agent framework;
- an MCP replacement;
- an execution API.

OpenGEO declarations may inform:

- external LLMs;
- first-party assistants;
- NLWeb-style endpoints;
- MCP servers;
- browser agents;
- A2A agents;
- future execution systems.

Those execution surfaces remain responsible for reasoning, retrieval, ranking, tool selection, safety, policy, rendering, and action.

---

## 9. Trust Model

OpenGEO is a declaration layer.

A publisher declares its own meaning and context. Consuming systems remain responsible for verification, trust scoring, ranking, safety, policy enforcement, and user trust.

OpenGEO improves the information environment by making the publisher's declared meaning and context explicit, inspectable, timestamped, traversable, and comparable.

If a publisher makes false, misleading, stale, or contradictory declarations, downstream systems may discount or ignore those declarations.

---

## 10. Assurance, Governance, and Security Considerations

As introduced in the conceptual model, Assurance is a cross-cutting concern of OpenGEO.

It is not a fifth layer in the DSCE model. OpenGEO does not define a complete governance, compliance, or security framework. However, OpenGEO declarations are governance-relevant artefacts and SHOULD be published under controls for provenance, freshness, authorship, review, security, and equivalence with human-facing resources.

### 10.1 Provenance and Publisher Authority

Declarations SHOULD identify the publisher, canonical source, source URL, update timestamp, and generation process where appropriate.

Where a declaration is generated from a CMS, product information system, knowledge base, data pipeline, or CI/CD process, implementations SHOULD preserve enough metadata to identify the source of truth and generation path.

OpenGEO can declare publisher identity and provenance. Consuming systems remain responsible for verifying whether that identity and provenance are trustworthy.

### 10.2 Freshness and Volatility

Declarations SHOULD include freshness metadata for facts likely to change, especially prices, offers, stock, availability, eligibility, location-specific service access, policy status, or safety-relevant information.

Resources SHOULD declare review cadence, volatility, or freshness basis where stale interpretation could matter.

### 10.3 Human/Machine Equivalence

Machine-facing projections SHOULD preserve the same material meaning as the human-facing resource.

This is especially important for transactional, policy, advisory, regulated, medical, financial, or safety-relevant content. A Semantic Twin should not quietly add, remove, or materially change claims that affect user understanding, eligibility, risk, price, service access, or product identity.

### 10.4 Review and Ownership

Publishers SHOULD define ownership for creating, reviewing, approving, updating, and retiring OpenGEO declarations.

For higher-risk domains, review SHOULD include the same organisational functions that govern the equivalent human-facing material, such as product, content, legal, clinical, compliance, brand, security, or engineering teams.

### 10.5 Security Considerations

OpenGEO declarations MUST NOT expose secrets, credentials, private keys, private access tokens, internal prompts, unpublished offers, private business rules, sensitive personal data, unsafe operational details, or internal-only system instructions.

Implementations SHOULD treat machine-facing declarations as public web artefacts unless access controls explicitly state otherwise.

### 10.6 Spoofing and Trust

Consumers SHOULD NOT assume that a discovered declaration is trustworthy merely because it exists.

Discovery can reveal a declaration. It does not by itself prove authority, accuracy, safety, or freshness. Verification, trust scoring, ranking, policy enforcement, and user-facing confidence remain the responsibility of consuming systems and execution surfaces.

OpenGEO should remain compatible with external trust mechanisms, including domain control, `.well-known` proofs, signed manifests, provenance records, ARD trust manifests, platform verification, and future identity or attestation systems.

### 10.7 Auditability

Implementations SHOULD preserve enough evidence to reconstruct which declaration version was available at a given time.

Useful audit evidence may include version identifiers, timestamps, source hashes, generation logs, approval records, canonical source references, and change history.

---

## 11. Acknowledgements

OpenGEO builds in alignment with the open-agentic web movement, including Jeremy Howard and Answer.AI's `llms.txt` proposal.

OpenGEO treats `llms.txt` as a complementary orientation and root-index convention, while OpenGEO defines resource-level semantic and contextual declarations.

---

## 12. Versioning and Governance

This document is a working draft of OpenGEO v0.1.

The specification is intended to evolve as an open, community-reviewable standard. The author retains the right to be credited as the originator of the OpenGEO specification in derivative specifications, implementations, or standardisation processes.

---

## 13. Licence

This specification document is published under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence, with attribution to Zahid Saleem.

Reference implementation code is published under the MIT licence.
