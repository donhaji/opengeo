# OpenGEO

> An open specification for publishing canonical organisational meaning and context to intelligent systems.

OpenGEO is about **Generative Engine Optimisation and AI interpretation**, not geolocation, maps, or geographic data.

OpenGEO can describe a physical location as a resource, but it is not a geospatial or mapping standard.

AI systems increasingly answer questions about organisations before a user reaches the organisation's own website. Those answers may describe products, services, policies, advice, offers, locations, media, and brand intent.

OpenGEO gives publishers a way to declare the meaning they know best: who they are, what their resources are, how those resources relate, what context matters, and what should be treated as current, sensitive, canonical, or authoritative.

GEO is the practice. OpenGEO is the specification.

For example, a publisher can declare that:

- a page is an official support journey, not a commercial product page;
- a product image is the canonical image for a specific SKU;
- a policy page is the current source for eligibility rules;
- an advice page should be interpreted with a calm, non-commercial tone;
- a category page represents a curated collection, not the full catalogue.

## Problem Statement

AI systems are no longer only indexing pages. They are interpreting organisations.

When a user asks an AI system about a company, product, service, policy, advice journey, or offer, the answer may be reconstructed from search results, snippets, product feeds, third-party summaries, reviews, cached pages, screenshots, and platform-specific data.

That indirect reconstruction can create drift:

- organisational identity may be flattened or misdescribed;
- product and service facts may lose their intended context;
- sensitive journeys may be handled like ordinary commercial journeys;
- canonical media may be omitted, substituted, or hallucinated;
- stale or third-party information may be treated as current;
- relationships between products, services, advice, policies, and locations may be lost.

OpenGEO addresses that drift by giving publishers a direct declaration layer for machine-readable meaning and interpretation context.

## Core Principle

> **OpenGEO defines what the publisher knows better than the execution surface.**

Discovery mechanisms may find OpenGEO resources. Execution surfaces may interpret, rank, reason, retrieve, render, or act on them. OpenGEO defines the publisher-owned semantic and contextual declarations that sit between discovery and execution.

## DSCE with Assurance Oversight

OpenGEO is organised around the **DSCE** interpretation chain:

- **Discovery**
- **Semantic**
- **Context**
- **Execution**

**DSCE defines the AI interpretation chain. Assurance governs every checkpoint.**

Discovery, Semantic, Context, and Execution describe how intelligent systems locate, understand, contextualise, and act upon publisher-controlled information.

Assurance is not a fifth layer. It is the oversight concern around the chain: provenance, authorship, freshness, security, auditability, ownership, governance, equivalence, and operational control.

```text
                 ASSURANCE / OVERSIGHT
 provenance | authorship | freshness | security | auditability | ownership

 +--------------------------------------------------------------------+
 |                                                                    |
 |   Discovery  ->  Semantic  ->  Context  ->  Execution              |
 |                                                                    |
 +--------------------------------------------------------------------+
```

OpenGEO primarily standardises publisher-declared resources across Discovery, Semantic, and Context. Execution remains the responsibility of AI engines, platforms, tools, agents, and consuming systems.

| Layer | Purpose | Question answered | OpenGEO role |
| :--- | :--- | :--- | :--- |
| Discovery | Locating participation and resources | Where is the representation? | Declarative and mechanism-compatible. |
| Semantic | Declared facts and relationships | What is this resource? | Normative. |
| Context | Declared interpretation envelope | How should this resource be understood? | Normative. |
| Execution | Reasoning, retrieval, ranking, tool use, rendering, safety, policy, action | What happens now? | Out of scope; informed by OpenGEO. |

Assessment asks the same questions engine by engine: can this engine find it, understand the declared facts, preserve the declared intent/tone/guidance, and what does it actually do with the representation?

## OpenGEO Is

- An open specification for semantic and contextual declarations
- Publisher-owned
- Resource-level
- Implementation-agnostic
- Execution-independent
- Compatible with ARD, `llms.txt`, MCP discovery, APIs, and other discovery or execution systems
- Opt-in by design

## OpenGEO Is Not

- A prompt format
- An agent framework
- An MCP replacement
- An execution API
- An SEO ranking algorithm
- A moderation system
- A proprietary merchant API
- A requirement to use JSON-LD
- A guarantee of objective truth

## Context Architecture

The `context.*` namespace is a first-class part of OpenGEO.

Context declarations define the publisher's interpretation envelope around a resource. They can describe tone, intent, sensitivity, guidance, provenance, volatility, persona, profile, or domain-specific context.

Context is declarative. It informs intelligent systems while preserving execution autonomy.

Example:

```yaml
context.intent: support
context.tone: calm, compassionate, non-commercial
context.sensitivity: high
context.guidance: Prioritise service information, eligibility, human handoff, and safety qualifiers.
```

## Semantic Twin Reference Implementation

A Semantic Twin is the reference implementation of OpenGEO.

It is one practical way to publish OpenGEO declarations today. OpenGEO owns semantics and context, not syntax.

For a human-facing resource, a publisher may expose a colocated machine-readable twin:

```text
https://example.com/products/example-product
https://example.com/products/example-product.md
```

A Semantic Twin may use:

- YAML front matter for semantic and context declarations
- Markdown body content for LLM-readable explanatory context
- absolute URLs for graph traversal
- canonical media references
- freshness metadata for volatile fields

Other representations may be generated from the same semantic model, including JSON, API responses, MCP responses, graph stores, or future serialisations.

## Discovery

OpenGEO is compatible with multiple discovery mechanisms.

In the specification, discovery is declarative and mechanism-compatible. In assessment, discovery is engine-relative and observable: can a given engine find the right semantic and contextual representation through the mechanisms it supports?

### HTML Alternate Links

The primary page-level discovery mechanism is the standard HTML alternate link:

```html
<link rel="alternate" type="text/markdown" href="https://example.com/products/example-product.md">
```

### `geo.txt`

`/.well-known/geo.txt` is the site-wide OpenGEO participation declaration and default-context file.

### `llms.txt`

OpenGEO complements `llms.txt`, which can act as an orientation or root index for language models.

### ARD and MCP Discovery

Agentic Resource Discovery, MCP discovery, `.well-known` resources, registries, and other mechanisms may point to OpenGEO resources.

These systems own discovery and capability handshaking. OpenGEO owns semantic and contextual declarations.

## Assurance

Assurance is a cross-cutting concern around the DSCE model, not a fifth layer.

OpenGEO declarations are governance-relevant artefacts. They should be published with appropriate controls for provenance, freshness, authorship, review, security, and equivalence with human-facing resources.

OpenGEO does not provide AI governance, compliance, or authentication by itself. It provides declarations and metadata that can support auditability and external verification.

## Document Index

- [OPENGEO_SPEC.md](OPENGEO_SPEC.md): The working v0.1 technical specification.
- [opengeo-manifesto.md](opengeo-manifesto.md): The strategic rationale for publisher-owned semantic and contextual declarations.
- [docs/index.html](docs/index.html): GitHub Pages landing page with an architecture diagram.
- [LICENSE](LICENSE): MIT license for reference implementation code.

## Acknowledgements

OpenGEO builds in alignment with the open-agentic web movement, including Jeremy Howard and Answer.AI's `llms.txt` proposal.

## Licence

The specification and manifesto text are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0), with attribution to Zahid Saleem.

Reference implementation code is licensed under the MIT License.
