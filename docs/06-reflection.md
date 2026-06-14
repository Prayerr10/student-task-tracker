# Reflection on AI-Assisted Development

## 1. How was AI used during requirements clarification?

AI helped turn the project idea into a sharper set of requirements by surfacing the behaviors that needed explicit treatment: empty states, filters, deletion flow, duplicate tasks, overdue logic, persistence, and responsive layout. It was useful for enumerating edge cases, but human approval was still needed to decide what should remain in scope and what should be deferred.

## 2. How was AI used during PRD creation?

AI helped translate clarified requirements into a PRD with concrete acceptance criteria and vertical slices. It was effective at turning vague goals into testable behavior, but the final scope still had to be checked by a human so the project stayed realistic and did not drift into accounts, cloud sync, or editing features.

## 3. How was AI used during issue breakdown?

AI broke the PRD into independently grabbable issues that matched user-visible slices instead of internal modules. That made the work easier to sequence and review. The project followed the repository workflow around issue tracking and approval gates, and the resulting issue titles are reflected in the GitHub issue history.

## 4. How was AI used during design and coding?

AI implemented the browser app in plain HTML, CSS, and JavaScript and separated the core task behavior into `src/task-logic.js`. That kept the app small and testable. I accepted the design direction of native controls, including the segmented filter buttons and accessible confirmation dialog, because they fit the problem and kept the implementation simple.

## 5. How was AI used during TDD and browser testing?

The `$tdd` skill supported the completed RED-GREEN-REFACTOR cycles for Issues #11
and #13 and the regression workflow for Issue #27. The cycles were driven by
public-interface tests, not implementation details. AI also operated Chrome
DevTools MCP for browser testing, which verified final-task deletion, empty
states, filters, focus handling, console cleanliness, localStorage behavior,
refresh behavior, and 320px layout.

## 6. Where did AI make mistakes or give weak suggestions?

One weak suggestion was to preserve the active filter after deleting the final task. That would have kept the app on a filtered empty state, which conflicted with the approved behavior. The fix introduced a small state-normalization helper so the app returns to `All` only when the task list becomes empty.

Earlier in the project, browser-facing code also needed human review to make sure the UI language stayed consistent and that accessible states were not inferred from color alone. The final app is better because those assumptions were checked instead of accepted blindly.

## 7. What did a human verify manually?

A human approved the HITL design for the segmented filter buttons and the accessible native delete dialog. A human also approved the defect reported for Issue #27 and the decision to treat it as a regression that required a GitHub issue before fixing it.

I am not claiming the browser actions were performed manually by a human. The browser verification in this delivery was executed by AI through Chrome DevTools MCP.

## 8. What software engineering decision am I most confident about?

The strongest decision was to keep task behavior in a small pure module and let the browser code handle rendering and interaction. That separation made the tests stable, kept the app easy to reason about, and made later regressions like Issue #27 easier to isolate and fix.

## 9. What would I improve with more time?

With more time, I would add automated browser coverage for the full end-to-end user flows so more of the UI behavior is checked without manual browser work. I would also expand the documentation around storage recovery and add more explicit patterns for future regressions.

## 10. Skills and workflow actually used

- `grill-with-docs` / `grill-me` clarified and challenged the product idea.
- `to-prd` converted approved requirements into the PRD.
- `to-issues` produced the seven approved vertical-slice issues.
- `$tdd` supported Issues #11, #13, and regression Issue #27.
- Chrome DevTools MCP was used by AI for browser verification.
- The repository issue/branch/commit/PR workflow was used for delivery.
- I did not use sub-agents in this delivery.

## 11. Defects discovered through review/testing

- Issue #18: Ensure repeated Academic Task creation announcements are accessible.
- Issue #21: Reject impossible calendar Due Dates.
- Issue #27: Show initial empty state after deleting the final Academic Task.

These defects were not hypothetical; they came from review or testing and were recorded as GitHub issues and regression evidence.
