# OpenGEO

> An open semantic specification for publishing canonical organisational meaning to intelligent systems.

OpenGEO defines a publisher-controlled semantic layer for the agentic web. It allows organisations to expose canonical meaning about their identity, resources, products, services, policies, offers, and relationships in a form that AI systems can discover, traverse, compare, and evaluate.

GEO is the practice. OpenGEO is the specification.

OpenGEO does not replace the human web. It defines an AI-legible semantic projection beside it.

## Core Thesis

AI systems are no longer merely indexing content; they are interpreting meaning. The web therefore needs a way for organisations to publish that meaning directly, under their own domain, with clear provenance and stable resource-level structure.

OpenGEO provides that semantic contract.

The central architectural principle is:

> One canonical semantic model. Multiple projections.

Those projections may include:

- HTML for humans
- AI Twin Markdown files for LLM-native consumption
- JSON-LD or schema.org-aligned forms for structured-data ecosystems
- `geo.txt` for participation, discovery, and default context
- ARD `ai-catalog.json` entries for agentic resource discovery
- MCP or API endpoints for live tools and volatile data

## OpenGEO Is

- An open semantic specification
- A publisher-controlled canonical representation
- A resource-level semantic declaration model
- A complement to `llms.txt`, ARD, JSON-LD, and MCP
- Opt-in by design

## OpenGEO Is Not

- An SEO ranking algorithm
- A moderation system
- A proprietary merchant API
- A replacement for `llms.txt`
- A replacement for ARD
- A replacement for JSON-LD or schema.org
- A guarantee of objective truth

OpenGEO establishes declared meaning, provenance, and equivalence expectations. Ranking, recommendation, verification, moderation, and trust scoring remain the responsibility of consuming systems.

## AI Twin Reference Profile

The AI Twin is the first reference projection of an OpenGEO semantic model.

For a human-facing resource, a publisher may expose a colocated machine-readable twin, commonly as:

```text
https://example.com/products/example-product
https://example.com/products/example-product.md
```

An AI Twin uses:

- YAML front matter for typed facts and graph relationships
- Markdown body content for clean LLM-readable explanatory context
- flat `context.*` keys for interpretation guidance
- absolute URLs for graph traversal
- provenance fields such as `source_url` and `updated`

The Markdown + YAML profile is a reference implementation, not the full scope of OpenGEO. The same semantic model may be projected into JSON-LD, ARD catalogs, MCP tool descriptions, APIs, or future formats.

## Resource Graph

OpenGEO resources form a traversable graph, not a page tree.

Typical graph edges include:

- `catalogued_in`
- `contains`
- `related_to`
- `related_advice`
- `available_at`
- `offered_by`
- `has_policy`
- `same_as`

Edges should use absolute URLs so agents can move from a product detail twin to a listing twin, advice page, offer, policy, location, or live tool without scraping navigation menus or executing client-side JavaScript.

Example:

```yaml
opengeo: 0.1
type: product
id: https://example.com/products/example-product
canonical_url: https://example.com/products/example-product
name: Example Product
description: A publisher-declared product description.
catalogued_in:
  - https://example.com/categories/example-category.md
related_to:
  - https://example.com/advice/example-guide.md
has_policy:
  - https://example.com/policies/returns.md
updated: 2026-07-05
```

## Discovery

OpenGEO supports multiple discovery paths.

### HTML alternate links

Where a human-facing page has a colocated Semantic Twin, the page should advertise it with a standard alternate link:

```html
<link rel="alternate" type="text/markdown" href="https://example.com/products/example-product.md">
```

This is the direct resource-level equivalence signal between the human page and its machine-facing twin.

### `geo.txt`

`/.well-known/geo.txt` declares OpenGEO participation, site-wide defaults, supported representations, and optional integration endpoints.

### `llms.txt`

OpenGEO complements `llms.txt`. `llms.txt` can act as an orientation or root index, while OpenGEO provides resource-level semantic declarations and graph traversal.

### ARD

OpenGEO is compatible with Agentic Resource Discovery (ARD). ARD defines a discovery layer for AI-facing capabilities using domain-hosted catalogs such as `ai-catalog.json` and federated registries. An ARD catalog can point agents to OpenGEO resources, AI Twin bundles, `geo.txt`, MCP servers, APIs, or other machine-facing assets.

In this division of responsibility:

- ARD answers: where are the available AI-facing resources and how can they be verified?
- OpenGEO answers: what canonical organisational meaning do those resources declare?
- MCP answers: which live tools or contextual operations can an agent invoke?

## JSON-LD and Schema.org

OpenGEO is complementary to JSON-LD and schema.org.

JSON-LD remains useful for conventional structured-data consumers, search engines, and schema.org-aligned ecosystems. OpenGEO focuses on LLM-legible semantic declarations, resource graph traversal, contextual guidance, and publisher-owned AI Twin projections.

An implementation may generate both:

- JSON-LD embedded in HTML for conventional structured-data systems
- OpenGEO AI Twins for LLM-native interpretation and traversal

The goal is semantic equivalence across projections, not format exclusivity.

## Equivalence and Trust

OpenGEO declarations should preserve factual equivalence with the publisher's source of truth.

The AI Twin may differ from the human-facing page in structure, wording, and format. It should not contradict the facts that the publisher declares elsewhere. This matters because AI systems can use semantic consistency, provenance, freshness, and cross-projection equivalence as signals when deciding how much confidence to place in a publisher's machine-readable representation.

OpenGEO does not guarantee truth. It makes declared meaning explicit, inspectable, timestamped, traversable, and easier for consuming systems to evaluate.

## Circle 1 Scope

The first implementation circle focuses on:

- AI visibility assessment reports
- AI Twin generation
- OpenGEO specification v0.1
- `geo.txt` discovery and site-wide default context
- brand and organisation semantic clarity
- optional MCP integrations
- AI test harnesses for interpretive drift

## Document Index

- [OPENGEO_SPEC.md](OPENGEO_SPEC.md): The working v0.1 technical specification.
- [opengeo-manifesto.md](opengeo-manifesto.md): The strategic rationale for publisher-owned semantic meaning.
- [docs/index.html](docs/index.html): GitHub Pages landing page with an architecture diagram.
- [LICENSE](LICENSE): MIT license for reference implementation code.

## Acknowledgements

OpenGEO builds in alignment with the open-agentic web movement, including Jeremy Howard and Answer.AI's `llms.txt` proposal.

OpenGEO also aligns with emerging agentic discovery work such as Google's Agentic Resource Discovery specification, while remaining a distinct semantic layer focused on canonical organisational meaning rather than capability discovery.

## Licence

The specification and manifesto text are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0), with attribution to Zahid Saleem.

Reference implementation code is licensed under the MIT License.
