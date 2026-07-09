# OpenGEO

> An open specification for publisher-owned semantic and contextual declarations for intelligent systems.

OpenGEO allows publishers to declare, at the resource level, what an organisation, product, service, policy, location, article, offer, collection, or other entity is, and how it should be understood by intelligent systems.

GEO is the practice. OpenGEO is the specification.

OpenGEO is not primarily an AI Twin specification. A Semantic Twin is the reference implementation of OpenGEO, commonly expressed as Markdown with YAML front matter. The specification owns semantics and context, not syntax.

## Core Principle

> **OpenGEO defines what the publisher knows better than the execution surface.**

Discovery mechanisms may find OpenGEO resources. Execution surfaces may interpret, rank, reason, retrieve, render, or act on them. OpenGEO defines the publisher-owned semantic and contextual declarations that sit between discovery and execution.

## Four-Layer Architecture

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
