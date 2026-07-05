# OpenGeO Specification v0.1

**Author:** Zahid Saleem  
**Date:** 2026-07-05  
**Status:** Working Draft  
**Licence:** Specification text under CC BY 4.0; reference implementation code under MIT

---

## Changelog

**v0.1 (2026-07-05)** - Rescoped working draft. Defines OpenGeO as an open semantic specification for publishing canonical organisational meaning to intelligent systems. Positions the AI Twin as a reference projection, `geo.txt` as the participation/default-context declaration, Markdown + YAML as the initial representation, and MCP integrations as optional implementation layers.

---

## Abstract

OpenGeO is an open semantic specification for publishing canonical organisational meaning to intelligent systems.

OpenGeO allows a publisher to declare, at the resource level, how an organisation, brand, product, service, location, policy, article, collection, or other entity should be understood by AI systems.

The specification is based on one principle:

> One canonical semantic model. Multiple projections.

Those projections may include:

- HTML for humans
- AI Twin documents for machines
- JSON, MCP, API, or other representations where useful

GEO is the practice. OpenGeO is the specification.

OpenGeO does not optimise websites for AI. It improves the fidelity with which AI systems understand organisations.

---

## 1. Motivation

AI systems are no longer merely indexing content; they are interpreting meaning. When a user asks an AI system about an organisation, the model may draw from web pages, search results, platform feeds, snippets, reviews, scraped page structure, stale indexes, and third-party databases.

That indirect reconstruction creates interpretive drift:

- organisational identity may be flattened or misdescribed;
- products and services may be disconnected from their intended context;
- policies, offers, locations, and eligibility rules may be misread;
- brand language may be replaced by generic summaries;
- important relationships between resources may be lost.

OpenGeO gives publishers a direct way to declare canonical semantic meaning in a form intelligent systems can inspect, cite, compare, and consume.

---

## 2. Scope

### 2.1 OpenGeO Is

OpenGeO is:

- an open semantic specification;
- a publisher-controlled canonical representation;
- a resource-level semantic declaration model;
- a complement to `llms.txt`;
- opt-in by design.

### 2.2 OpenGeO Is Not

OpenGeO is not:

- an SEO ranking algorithm;
- a moderation system;
- a proprietary merchant API;
- a replacement for `llms.txt`;
- a guarantee of objective truth.

OpenGeO establishes authorship and declared meaning. It does not force consuming systems to believe, rank, recommend, or enforce the publisher's declarations.

---

## 3. Core Concepts

### 3.1 Semantic Contract

The OpenGeO semantic contract is the publisher's declared machine-readable meaning for an organisation or resource.

The contract may include:

- identity;
- type;
- canonical URLs;
- descriptions;
- relationships to other resources;
- default context;
- intended interpretation;
- provenance and update metadata.

The contract SHOULD be derived from the publisher's source of truth and SHOULD NOT contradict the human-facing resource it represents.

### 3.2 Resource-Level Declaration

OpenGeO is resource-level rather than page-only. A declared resource MAY correspond to:

- a web page;
- a product;
- a service;
- a location;
- an article;
- a collection;
- an offer;
- a policy;
- a brand;
- an organisation;
- another publisher-defined entity.

Where a resource has a human-facing URL, the OpenGeO representation SHOULD reference that URL. Where a resource has no single human-facing page, the publisher MAY still declare it as a semantic resource.

### 3.3 AI Twin

An AI Twin is a machine-facing projection of a human-facing resource or organisational entity.

An AI Twin is the reference implementation for OpenGeO v0.1. It MAY be represented as a Markdown document with YAML front matter.

An AI Twin SHOULD:

- identify the resource;
- link to the human-facing canonical URL where one exists;
- provide concise machine-readable facts;
- provide human-readable explanatory body text where useful;
- declare relationships using absolute URLs;
- inherit site-wide defaults from `geo.txt` unless explicitly overridden.

The AI Twin is a projection of the semantic model, not the semantic model itself.

### 3.4 `geo.txt`

`geo.txt` is the site-wide OpenGeO participation declaration and default context file.

It SHOULD be served from:

```text
/.well-known/geo.txt
```

It MAY declare:

- whether the site participates in OpenGeO;
- the publisher identity;
- the default language;
- the default context for AI interpretation;
- the root index or related discovery files;
- supported representations;
- optional integration endpoints.

### 3.5 `llms.txt`

OpenGeO complements `llms.txt`.

`llms.txt` is useful as a root-level guide or index for language models. OpenGeO does not replace it. A publisher MAY link from `llms.txt` to OpenGeO resources, AI Twins, or `geo.txt`.

OpenGeO adds resource-level semantic declarations and relationship structure that may sit below or beside a general `llms.txt` index.

### 3.6 MCP

Model Context Protocol (MCP) integrations are optional implementation layers.

OpenGeO can describe stable semantic meaning without MCP. Where live data or actions are required, such as availability checks, appointment booking, account-specific eligibility, or transactional tools, a publisher MAY expose MCP tools and reference them from `geo.txt`, `llms.txt`, or another discovery surface.

MCP is a transport and tool integration layer. It is not required for OpenGeO conformance.

### 3.7 AI Test Harness

An AI test harness evaluates whether intelligent systems understand the publisher's declared meaning accurately.

A test harness MAY compare AI answers across models against OpenGeO declarations to detect interpretive drift, omissions, contradictions, or stale understanding.

This is an implementation and evaluation layer, not a normative requirement of the OpenGeO semantic contract.

---

## 4. Reference Representation: Markdown + YAML

OpenGeO v0.1 uses Markdown with YAML front matter as its reference representation.

This representation is recommended because it is:

- readable by humans;
- easy to generate;
- easy to serve statically;
- friendly to current LLM consumption;
- compatible with ordinary web hosting and CDN infrastructure.

Markdown + YAML is not the whole specification. The same canonical semantic model MAY be projected into JSON, MCP schemas, APIs, databases, or future formats.

### 4.1 AI Twin Structure

An AI Twin document SHOULD use this structure:

```markdown
---
opengeo: 0.1
type: service
id: https://example.com/services/private-consultation
canonical_url: https://example.com/services/private-consultation
name: Private Consultation
description: A confidential consultation service offered by Example Health.
publisher: Example Health
updated: 2026-07-05
context.tone: clear, calm, reassuring
related:
  - https://example.com/locations/high-street
  - https://example.com/policies/privacy
---

# Private Consultation

Example Health offers private consultations for customers who need confidential support.
```

### 4.2 Required Fields

The following fields are REQUIRED for an OpenGeO AI Twin:

| Field | Description |
| :--- | :--- |
| `opengeo` | OpenGeO version used by the representation. |
| `type` | Resource type, such as `organisation`, `brand`, `product`, `service`, `location`, `article`, `collection`, `offer`, or `policy`. |
| `id` | Stable absolute URL identifying the semantic resource. |
| `name` | Human-readable resource name. |
| `description` | Concise resource description. |
| `updated` | Date or timestamp of last semantic update. |

### 4.3 Recommended Fields

The following fields are RECOMMENDED where applicable:

| Field | Description |
| :--- | :--- |
| `canonical_url` | Human-facing canonical URL, if one exists. |
| `publisher` | Organisation responsible for the declaration. |
| `language` | Language tag, such as `en-GB`. |
| `same_as` | Absolute URLs for equivalent public identifiers or profiles. |
| `parent` | Absolute URL of a parent semantic resource. |
| `related` | Absolute URLs of related semantic resources. |
| `context.tone` | Intended tone for AI interpretation. |
| `context.guidance` | Concise guidance for AI systems using this resource. |
| `source_url` | URL of the publisher source from which the declaration was generated. |

### 4.4 Context Fields

OpenGeO v0.1 reserves the `context.*` namespace for interpretation guidance.

Examples:

```yaml
context.tone: clear, calm, reassuring
context.guidance: Emphasise eligibility and advise users to confirm current availability.
context.audience: UK customers seeking private healthcare services
```

Context fields are declarations, not enforcement. Consuming systems MAY use them to improve interpretation, but OpenGeO does not require downstream systems to follow them.

### 4.5 Relationship URLs

Relationship fields SHOULD use absolute URLs.

Absolute URLs make declarations easier to inspect, crawl, test, and project into other systems.

---

## 5. Discovery

OpenGeO resources MAY be discovered through one or more mechanisms.

### 5.1 `geo.txt`

A participating site SHOULD publish:

```text
/.well-known/geo.txt
```

Example:

```yaml
opengeo: 0.1
participates: true
publisher: Example Health
canonical_url: https://example.com
default_language: en-GB
default_context.tone: clear, calm, reassuring
root_index: https://example.com/llms.txt
representations:
  - markdown+yaml
```

### 5.2 HTML Alternate Links

Where a human-facing page has a colocated AI Twin, the page SHOULD link to it using an alternate link:

```html
<link rel="alternate" type="text/markdown" href="https://example.com/services/private-consultation.md">
```

### 5.3 `llms.txt`

A publisher MAY expose OpenGeO resources from `llms.txt`:

```markdown
# Example Health

## OpenGeO

- Participation declaration: https://example.com/.well-known/geo.txt
- Organisation twin: https://example.com/opengeo/organisation.md
- Services: https://example.com/opengeo/services.md
```

---

## 6. Conformance Levels

OpenGeO v0.1 defines lightweight conformance levels for early adoption.

| Level | Name | Requirement |
| :--- | :--- | :--- |
| 0 | Declared | Site publishes `/.well-known/geo.txt`. |
| 1 | Twinned | At least one resource has an AI Twin representation. |
| 2 | Linked | Human-facing resources link to AI Twins, or `llms.txt` links to OpenGeO resources. |
| 3 | Graph | AI Twins declare relationships to other resources using absolute URLs. |
| 4 | Tested | Publisher evaluates interpretive drift across one or more AI systems. |

Level 4 is an evaluation maturity level, not a requirement for basic OpenGeO participation.

---

## 7. Trust Model

OpenGeO is a declaration layer.

A publisher declares its own meaning. Consuming systems remain responsible for verification, ranking, safety, policy enforcement, and user trust.

OpenGeO improves the information environment by making the publisher's declared meaning explicit, inspectable, timestamped, and comparable.

If a publisher makes false, misleading, stale, or contradictory declarations, downstream systems MAY discount or ignore those declarations.

---

## 8. Circle 1 MVP

The Circle 1 implementation of OpenGeO is focused on:

- AI visibility assessment reports;
- AI Twin generation;
- OpenGeO v0.1 compatibility;
- `geo.txt` generation;
- brand and organisation semantic clarity;
- optional MCP integrations;
- interpretive drift testing across LLMs.

This MVP is designed to answer one practical question for an organisation:

> Is the organisation understood accurately by AI?

---

## 9. Versioning and Governance

This document is a working draft of OpenGeO v0.1.

The specification is intended to evolve as an open, community-reviewable standard. The author retains the right to be credited as the originator of the OpenGeO specification in derivative specifications, implementations, or standardisation processes.

---

## 10. Licence

This specification document is published under the Creative Commons Attribution 4.0 International (CC BY 4.0) licence, with attribution to Zahid Saleem.

Reference implementation code is published under the MIT licence.
