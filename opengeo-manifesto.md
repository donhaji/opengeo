# The OpenGeO Manifesto: Publisher Sovereignty in the Agentic Era

## The Shift

AI is no longer merely indexing content; it is interpreting meaning. The web needs a way for organisations to publish that meaning directly.

For three decades, web publishing has centred on human-facing pages: layout, navigation, visual hierarchy, interaction, conversion, and brand expression through screens. That work remains essential. But intelligent systems do not primarily experience organisations through screens. They infer meaning from text, metadata, retrieval systems, APIs, search results, screenshots, scraped pages, and platform-specific feeds.

This creates a structural gap. The organisation may know exactly who it is, what it offers, how its services relate, and what context matters. But an AI system must often reconstruct that meaning indirectly.

OpenGeO exists to close that gap.

## Semantic Ownership

Every organisation has a practical need and a legitimate interest in owning its canonical machine-readable meaning.

Just as an organisation owns its domain, brand, and public statements, it should be able to publish a canonical semantic representation of itself for intelligent systems. This does not make the organisation the arbiter of objective truth. It establishes authorship, provenance, and declared meaning.

The core principle of OpenGeO is publisher sovereignty over machine-readable meaning.

GEO is the practice. OpenGeO is the open specification.

## What OpenGeO Provides

OpenGeO defines a way for publishers to declare organisational meaning at the resource level. A resource may be a product, service, article, location, policy, offer, collection, person, department, or any other meaningful entity the organisation chooses to expose.

The specification separates a canonical semantic model from its projections:

- HTML remains the human-facing projection.
- AI Twin documents provide a machine-facing reference projection.
- JSON, MCP, API, or other forms may be generated where useful.

Markdown with YAML front matter is the first reference representation because it is simple, inspectable, authorable, and easy for current language models to consume. It is not the whole idea. The durable idea is the canonical semantic contract.

## The AI Twin

An AI Twin is a machine-facing projection of a human-facing resource or organisational entity.

It may sit beside a web page, collection, service, location, policy, or brand-level resource. It gives intelligent systems a clean way to understand the publisher's declared facts, relationships, context, and intent without forcing those systems to infer everything from page layout.

An AI Twin should preserve semantic fidelity to the publisher's source of truth. It may differ from the human page in format and structure. It should not contradict the facts the publisher is declaring elsewhere.

## Boundaries

OpenGeO is intentionally modest. It provides a common semantic foundation; it does not replace downstream trust, ranking, verification, moderation, or safety systems.

| OpenGeO Is | OpenGeO Is Not |
| :--- | :--- |
| An open semantic specification | A proprietary platform API |
| Publisher-controlled declared meaning | A guarantee of objective truth |
| A resource-level semantic contract | An SEO ranking algorithm |
| A complement to `llms.txt` | A replacement for `llms.txt` |
| Opt-in by design | A moderation or enforcement system |

Trust, verification, ranking, and policy remain the responsibility of consuming systems, platforms, regulators, and users. OpenGeO makes the publisher's declared meaning easier to find, inspect, compare, and evaluate.

## The Path Forward

The internet is becoming an environment of active interpretation. Organisations need more than pages that look right to humans; they need semantic declarations that intelligent systems can understand faithfully.

OpenGeO is a step toward that future: an open, publisher-owned way to say what an organisation means.
