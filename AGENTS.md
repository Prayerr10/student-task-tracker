# Repository Instructions

## Workflow

- Use `development` as the integration branch.
- Create feature and fix branches from `development`.
- Do not merge into `development` or `main` without human review and approval.
- Propose or create a GitHub Issue before fixing a bug, requirement gap, or acceptance-criteria failure.
- Use Chrome DevTools MCP for browser testing and avoid running multiple Chrome DevTools MCP instances concurrently.

## Required Assignment Workflow

1. Use `$grill-with-docs` or `$grill-me` for requirements clarification.
2. Use `$to-prd` after the requirements are approved.
3. Use `$to-issues` after the PRD is approved.
4. Create and obtain approval for a practical design before coding.
5. Use `$tdd` for at least two approved vertical-slice issues.
6. Use `$diagnose` for bugs and reproducible failures.
7. AI must use Chrome DevTools MCP for browser testing.
8. Complete the README, testing report, evidence, and reflection during delivery.

## Approval Gates

- Do not proceed to the next stage until a human approves the previous stage's artifact.
- Do not run dependent workflow stages in parallel.
- Do not make HITL decisions without human approval.

## Evidence Policy

- Do not use old screenshots, logs, or TDD evidence as evidence for the new rebuild.
- Do not create or falsify evidence.
- Generate genuine RED, GREEN, browser testing, console, storage, and mobile viewport evidence during the new rebuild.
- Document AI usage, skills, tools, and human verification honestly.

## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues with human approval required before write actions. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default Matt Pocock triage label vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This repository uses a single-context domain documentation layout. See `docs/agents/domain.md`.
