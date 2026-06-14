# Issue Tracker: GitHub

Issues and PRDs for this repository live in GitHub Issues for `Prayerr10/student-task-tracker`.

## Tooling

- Prefer the connected GitHub app for reading and writing GitHub Issues and pull requests.
- Use the `gh` CLI only when it is installed, explicitly approved, and the connected GitHub app cannot perform the required operation.
- Require human approval before creating, editing, labeling, commenting on, closing, or otherwise modifying a GitHub Issue or pull request.
- If the connected GitHub app or another approved GitHub tool fails during a write action, stop and report the failure. Do not claim that an issue or pull request was created or modified successfully.

## Issue Conventions

- Propose or create a GitHub Issue before fixing a bug, requirement gap, or acceptance-criteria failure.
- Every implementation issue must describe user-visible behavior, acceptance criteria, dependencies, testing notes, and AI usage notes.
- Use the triage labels defined in `docs/agents/triage-labels.md`.
- When a skill says to publish to the issue tracker, draft the issue first and wait for human approval before publishing.
- When a skill says to fetch the relevant ticket, read the complete issue body and comments before acting.
- The approved PRD must also exist in the repository as `docs/02-prd.md`, even when `$to-prd` publishes it as a GitHub Issue.

## Branch and Pull Request Conventions

- `development` is the integration branch.
- Create feature and fix branches from `development`.
- Pull requests for completed issues target `development`.
- Link pull requests to their issue using `Closes #...` when appropriate.
- Merge only after human review and approval.
- Propose the final pull request from `development` to `main`; do not merge it without explicit approval.
