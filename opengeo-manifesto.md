# The OpenGEO Manifesto: Publisher Sovereignty in the Agentic Era

## The Shift

AI is no longer merely indexing content; it is interpreting meaning.

OpenGEO is about Generative Engine Optimisation and AI interpretation. It is not a geolocation, mapping, or geographic-data standard.

For three decades, web publishing has centred on human-facing pages: layout, navigation, visual hierarchy, interaction, conversion, and brand expression through screens. That work remains essential. But intelligent systems do not primarily experience organisations through screens. They infer meaning from text, metadata, retrieval systems, APIs, search results, screenshots, scraped pages, platform-specific feeds, and generated summaries.

This creates a structural gap. An organisation may know exactly who it is, what it offers, how its services relate, what context matters, and where sensitive interpretation is required. But an AI system must often reconstruct that meaning indirectly.

OpenGEO exists to reduce that unnecessary inference.

## Semantic and Contextual Ownership

Every organisation has a practical need and legitimate interest in owning its canonical machine-readable meaning and context.

Just as an organisation owns its domain, brand, and public statements, it should be able to publish declared semantic and contextual representations for intelligent systems.

This does not make the organisation the arbiter of objective truth. It establishes authorship, provenance, declared meaning, and declared context.

The core principle of OpenGEO is publisher sovereignty over machine-readable meaning and interpretation context.

GEO is the practice. OpenGEO is the open specification.

## The Publisher-Execution Boundary

OpenGEO begins with a boundary.

Some things are best handled by execution surfaces: ranking, reasoning, retrieval, tool selection, safety enforcement, rendering, response generation, tool execution, agent coordination, and action.

Other things are known best by the publisher: identity, provenance, canonical resources, relationships, sensitivity, intended context, and the meaning of its own products, services, policies, and support journeys.

OpenGEO exists for the second category.

> OpenGEO defines what the publisher knows better than the execution surface.

This boundary matters because intelligent systems should not be forced to infer publisher-owned meaning from fragments when the publisher can declare it directly. The purpose of OpenGEO is not to control execution behaviour. It is to reduce unnecessary inference before execution begins.

## What OpenGEO Provides

OpenGEO defines a way for publishers to declare organisational meaning and interpretation context at the resource level.

A resource may be a product, service, article, location, policy, offer, collection, person, department, organisation, or any other meaningful entity the publisher chooses to expose.

OpenGEO separates four concerns through the DSCE model, pronounced "dice":

- **Discovery:** where the representation is and how an engine can find it through the mechanisms it supports.
- **Semantics:** what the resource is.
- **Context:** how the resource should be understood.
- **Execution:** what an AI system, assistant, agent, tool, or platform surface does with that information.

OpenGEO defines the semantic and context layers. Discovery mechanisms and execution systems remain free to evolve.

DSCE defines the AI interpretation chain. Assurance governs every checkpoint.

## Semantic Twins

A Semantic Twin is the reference implementation of OpenGEO.

It is a machine-facing projection of a resource, commonly represented as Markdown with YAML front matter. It can sit beside a web page, collection, service, location, policy, product, or brand-level resource.

The Semantic Twin is not the specification itself. It is a practical way to publish OpenGEO declarations today.

OpenGEO owns semantics and context, not syntax.

## Context Architecture

The primary innovation of OpenGEO is the Context Layer.

Publishers do not only need to declare facts. They also need to declare interpretation context: tone, intent, sensitivity, guidance, provenance, volatility, persona, and escalation context.

The `context.*` namespace provides a coherent way to publish these declarations. In the Markdown reference representation, context is expressed as a nested YAML mapping, while the semantic declarations it frames remain direct properties of the resource.

Context is not a prompt format or runtime policy override. It may include publisher-authored instructions that a consuming system maps into its own prompts, routing, tools, or agent configuration while preserving execution autonomy. This can let one execution surface adopt resource-appropriate interpretation modes without requiring a separately implemented agent for every resource or journey.

## Boundaries

OpenGEO is intentionally modest. It provides a common semantic and contextual foundation; it does not replace downstream trust, ranking, verification, moderation, safety, execution, or platform policy.

| OpenGEO Is | OpenGEO Is Not |
| :--- | :--- |
| An open semantic and contextual specification | A proprietary platform API |
| Publisher-controlled declared meaning | A guarantee of objective truth |
| Publisher-controlled interpretation context | A prompt format |
| A resource-level declaration model | An agent framework |
| A complement to discovery systems | A replacement for ARD, MCP, or `llms.txt` |
| Opt-in by design | A moderation or enforcement system |

OpenGEO sits within a broader open-agentic web movement. It acknowledges [Jeremy Howard and Answer.AI's `llms.txt` proposal](https://www.answer.ai/posts/2024-09-03-llmstxt), complements [ARD](https://agenticresourcediscovery.org/), an open working-group specification with participants including Google, and can be consumed through execution systems such as [Microsoft's NLWeb](https://github.com/microsoft/NLWeb). [Google Cloud's Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) reflects related convergence around producer-owned, portable Markdown and YAML knowledge, while retaining a distinct scope.

Trust, verification, ranking, and policy remain the responsibility of consuming systems, platforms, regulators, and users.

OpenGEO makes the publisher's declared meaning and context easier to find, inspect, compare, and evaluate.

## Assurance

OpenGEO declarations are governance-relevant artefacts.

They should be published under assurance controls for authority, provenance, freshness, ownership, review, security, auditability, and cross-surface material equivalence where a corresponding publisher-controlled surface exists.

These assurance vectors expose evidence around publisher-declared truth; they do not make OpenGEO an arbiter or certifier of objective truth. Semantic Twins may also represent authenticated, personalised, dynamically composed, or publisher-controlled resources with no corresponding human-facing projection.

Assurance is not a fifth layer after Discovery, Semantics, Context, and Execution. It is the oversight concern around the chain.

This does not mean OpenGEO provides AI governance. It means publisher-declared AI meaning creates a surface that must be governed.

## Accountability

DSCE gives organisations an accountability map as well as an interpretation model. Discovery failures belong with the teams responsible for channels and discoverability. Semantic failures belong with source owners and semantic publishing. Context failures belong with the people responsible for publisher intent and domain-appropriate interpretation. Execution failures belong with runtime and AI-system owners. Assurance belongs across risk, compliance, legal, audit, security, privacy, professional governance, brand assurance, and the CISO.

OpenGEO does not prescribe job titles. Context Architecture may be an individual role or a distributed function spanning brand, service, content, domain expertise, governance, and AI. Its responsibility is to translate publisher intent, sensitivity, and service expectations into governed context declarations. Semantic publishing bridges publisher-controlled sources of truth and the machine-facing declaration layer without reverse-engineering organisational meaning from rendered HTML.

## The Path Forward

The internet is becoming an environment of active interpretation.

Organisations need more than pages that look right to humans. They need publisher-owned semantic and contextual declarations that intelligent systems can understand without reverse-engineering the organisation from fragments.

OpenGEO is a step toward that future: an open, publisher-owned way to declare what a resource is and how it should be understood.
