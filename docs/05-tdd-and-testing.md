# TDD and Testing Report

## 1. TDD Summary

The project used a vertical-slice red-green-refactor workflow for task behavior that could be exercised through public interfaces. Pure task logic was kept in `src/task-logic.js`, and the browser app in `src/app.js` reused that logic for rendering, events, `localStorage`, and accessibility state.

The final automated test result is:

```text
31/31 passed
```

## 2. TDD and Regression Table

| Issue | Purpose | Public interface(s) | RED | GREEN | REFACTOR | Evidence |
|---|---|---|---|---|---|---|
| #11 - Student receives actionable validation feedback | Validate required, invalid, and summary behavior | `validateAcademicTaskInput`, `createValidationFeedback` | Added Jest checks for required fields, invalid dates, and singular/plural summaries before the helpers were complete | Implemented field validation and summary generation in `src/task-logic.js` | Kept the logic pure so browser rendering could stay separate | `assets/screenshots/rebuild-issue-11-red-required-fields.txt`, `assets/screenshots/rebuild-issue-11-red-invalid-date.txt`, `assets/screenshots/rebuild-issue-11-green-required-fields.txt`, `assets/screenshots/rebuild-issue-11-green-invalid-date.txt` |
| #13 - Student can change Academic Task status | Toggle Pending and Completed correctly | `toggleAcademicTaskStatus`, browser status buttons in `src/app.js` | Added tests for toggling the selected task while preserving the rest of the collection | Implemented immutable status toggling and browser re-render wiring | Kept the task array immutable and reused the same logic in the UI | `assets/screenshots/rebuild-issue-13-red-pending-completed.txt`, `assets/screenshots/rebuild-issue-13-red-completed-pending.txt`, `assets/screenshots/rebuild-issue-13-green-pending-completed.txt`, `assets/screenshots/rebuild-issue-13-green-completed-pending.txt` |
| #21 - Reject impossible calendar Due Dates | Prevent impossible calendar dates from being accepted | `validateAcademicTaskInput` | Added failing tests for invalid calendar dates before the date guard existed | Added calendar validation that rejects impossible dates | Kept validation in the pure logic layer | `assets/screenshots/rebuild-issue-21-red-impossible-date.txt`, `assets/screenshots/rebuild-issue-21-green-impossible-date.txt` |
| #27 - Show initial empty state after deleting the final Academic Task | Return to the initial empty state when the last task is deleted, even if a filter was active | `deleteAcademicTask`, `resolveFilterAfterDeletion`, `filterAcademicTasks`, delete dialog flow in `src/app.js` | Added a regression test for final-task deletion from a filtered view before the state-normalization helper existed | Implemented minimal state normalization so the app returns to `All` only when the list becomes empty | Kept the filter stable when tasks still remain, and limited the new helper to the delete flow | `assets/screenshots/issue-27-filtered-empty-state-320.png`, `assets/screenshots/issue-27-final-empty-state-320.png` |

## 3. Public Interfaces Tested

- `validateAcademicTaskInput(input, today)`
- `createValidationFeedback(problems)`
- `createAcademicTask(academicTasks, input)`
- `toggleAcademicTaskStatus(academicTasks, selectedId)`
- `deleteAcademicTask(academicTasks, selectedId)`
- `filterAcademicTasks(academicTasks, filter)`
- `resolveFilterAfterDeletion(academicTasks, activeFilter)`
- Browser delete dialog, filter buttons, and task cards through `src/app.js`

## 4. Evidence Paths

Completed rebuild TDD evidence:

- `assets/screenshots/rebuild-issue-11-red-required-fields.txt`
- `assets/screenshots/rebuild-issue-11-red-invalid-date.txt`
- `assets/screenshots/rebuild-issue-11-green-required-fields.txt`
- `assets/screenshots/rebuild-issue-11-green-invalid-date.txt`
- `assets/screenshots/rebuild-issue-13-red-pending-completed.txt`
- `assets/screenshots/rebuild-issue-13-red-completed-pending.txt`
- `assets/screenshots/rebuild-issue-13-green-pending-completed.txt`
- `assets/screenshots/rebuild-issue-13-green-completed-pending.txt`

Completed rebuild regression evidence:

- `assets/screenshots/rebuild-issue-21-red-impossible-date.txt`
- `assets/screenshots/rebuild-issue-21-green-impossible-date.txt`

Current final delivery evidence:

- [assets/screenshots/issue-27-filtered-empty-state-320.png](../assets/screenshots/issue-27-filtered-empty-state-320.png)
- [assets/screenshots/issue-27-final-empty-state-320.png](../assets/screenshots/issue-27-final-empty-state-320.png)

## 5. Final Automated Result

```text
31/31 passed
```

Syntax checks: PASS  
`git diff --check`: PASS

## 6. Final Chrome DevTools MCP Matrix

| Scenario | Result |
|---|---|
| Initial empty state | PASS |
| Required and invalid input | PASS |
| Valid Academic Task creation | PASS |
| Duplicate Academic Tasks | PASS |
| Ordering by Due Date | PASS |
| Overdue condition | PASS |
| Pending to Completed and back | PASS |
| Filter All, Pending, Completed | PASS |
| Safe deletion cancel | PASS |
| Safe deletion confirm | PASS |
| Persistence after refresh | PASS |
| Invalid localStorage recovery | PASS |
| Partially invalid localStorage recovery | PASS |
| Save failure behavior | PASS |
| Offline behavior | PASS |
| Keyboard and focus behavior | PASS |
| Accessible announcements | PASS |
| Desktop viewport | PASS |
| 320px viewport | PASS |
| No horizontal overflow | PASS |
| No unexpected console errors | PASS |

## 7. Chrome DevTools MCP Tools Used

- `select_page`
- `navigate_page`
- `take_snapshot`
- `fill_form`
- `click`
- `press_key`
- `wait_for`
- `evaluate_script`
- `list_console_messages`
- `resize_page`
- `take_screenshot`

## 8. Final Result and Known Limitations

Final result: PASS.

Known limitations:

- No backend or cloud synchronization.
- No user accounts or authentication.
- Data remains browser-local in `localStorage`.
- Clearing browser storage removes saved Academic Tasks.
- Offline support is limited to the browser session and local persistence model already verified in Issue #16.
