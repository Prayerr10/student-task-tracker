# Domain Documentation

This repository uses a single-context domain documentation layout.

## Locations

- The domain glossary lives in `CONTEXT.md` at the repository root.
- Architectural decision records live in `docs/adr/`.

These files and directories may not exist yet. Proceed silently when they are absent. Create them lazily only when `grill-with-docs` resolves the first domain term or an architectural decision genuinely requires an ADR.

## Before Exploring or Implementing

- Read `CONTEXT.md` when it exists.
- Read relevant ADRs in `docs/adr/` when the directory exists.
- Use glossary terms consistently in requirements, PRDs, issues, designs, tests, implementation, and documentation.
- Surface conflicts with the glossary or an ADR instead of silently overriding them.

## Glossary Rules

- `CONTEXT.md` contains domain terminology and definitions only.
- Do not use `CONTEXT.md` as a specification, implementation plan, or decision log.
- When a required term is missing or ambiguous, resolve it through `grill-with-docs` before adding it.

## ADR Rules

Create an ADR only when a decision is:

1. Hard to reverse.
2. Surprising without context.
3. The result of a genuine trade-off.

Do not create `CONTEXT-MAP.md` or context-specific documentation unless the repository is explicitly changed to a multi-context layout.
