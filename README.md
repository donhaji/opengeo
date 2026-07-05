# OpenGeO

> Making organisational meaning understandable to AI.

OpenGeO is an open semantic specification for publishing canonical organisational meaning to intelligent systems.

GEO is the practice. OpenGeO is the specification.

OpenGeO does not optimise websites for AI. It improves the fidelity with which AI systems understand organisations.

## Premise

AI is no longer merely indexing content; it is interpreting meaning. The web needs a way for organisations to publish that meaning directly.

Today, intelligent systems often infer organisational meaning indirectly from human-facing websites, search snippets, third-party indexes, platform feeds, reviews, and scraped page structure. That creates interpretive drift: facts become stale, brand context is flattened, and the organisation is reconstructed by systems the publisher does not control.

OpenGeO gives publishers a canonical semantic layer that can sit beside the human web and declare, in a machine-readable form, who the organisation is, what it offers, how its resources relate, and how its brand should be understood.

## Circle 1 Plan

The first implementation circle is deliberately narrow. It turns the premise into an implementation sequence:

1. Assess how AI systems currently understand an organisation.
2. Identify gaps, drift, omissions, and contradictions.
3. Generate a canonical OpenGeO semantic model.
4. Project that model into AI Twin documents.
5. Publish `geo.txt` for discovery and site-wide default context.
6. Test whether AI answers improve across models.

Circle 1 deliverables:

- AI visibility assessment reports
- AI Twin generation
- OpenGeO specification v0.1
- `geo.txt` discovery and site-wide default context
- Brand and organisation semantic clarity
- Optional MCP integrations where live tools or data are useful
- AI test harnesses for interpretive drift

## Core Architecture

OpenGeO separates the semantic model from its projections:

- **OpenGeO** is the semantic contract.
- **AI Twin** is a machine-facing projection and reference implementation.
- **`geo.txt`** is a site-wide participation declaration and default context file.
- **Markdown + YAML** is the initial reference representation, not the whole idea.
- **MCP** is an optional transport and tooling layer for live integrations.
- **AI test harnesses** evaluate interpretive drift across LLMs.

One canonical semantic model may produce multiple projections:

- HTML for humans
- AI Twin documents for machines
- JSON, MCP, API, or other forms where useful

## OpenGeO Is

- An open semantic specification
- A publisher-controlled canonical representation
- A resource-level semantic declaration model
- A complement to `llms.txt`
- Opt-in by design

## OpenGeO Is Not

- An SEO ranking algorithm
- A moderation system
- A proprietary merchant API
- A replacement for `llms.txt`
- A guarantee of objective truth

## Current Focus

This repository is focused on the OpenGeO v0.1 specification and its reference AI Twin pattern. It intentionally avoids leading with protocol mechanics, Markdown syntax, or AI theory. The public summary is:

> Making organisational meaning understandable to AI.

## Document Index

- [OPENGEO_SPEC.md](OPENGEO_SPEC.md): The working v0.1 technical specification.
- [opengeo-manifesto.md](opengeo-manifesto.md): The strategic rationale for publisher-owned semantic meaning.
- [docs/index.html](docs/index.html): GitHub Pages landing page with the architecture diagram.
- [LICENSE](LICENSE): MIT license for reference implementation code.

## Acknowledgements

OpenGeO builds in alignment with the open-agentic web movement, including Jeremy Howard and Answer.AI's `llms.txt` proposal. OpenGeO treats `llms.txt` as a complementary discovery and orientation layer, while OpenGeO provides resource-level semantic declarations and AI Twin projections.

## Licence

The specification and manifesto text are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0), with attribution to Zahid Saleem.

Reference implementation code is licensed under the MIT License.
