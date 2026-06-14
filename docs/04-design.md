# Student Task Tracker - Design

## 1. Design Status

- Status: Approved by the human reviewer
- Integration branch: `development`
- Approved requirements: `docs/01-requirements.md`
- Approved PRD: `docs/02-prd.md`
- Approved vertical slices: GitHub Issues #10-#16
- Canonical terminology: `CONTEXT.md`

This design does not add product features beyond the approved requirements,
PRD, and vertical-slice issues.

## 2. Design Goals

Student Task Tracker will be a focused academic productivity dashboard that
helps a Student quickly understand:

- Which Academic Tasks still require action.
- Which Academic Tasks are Completed.
- Which Pending Academic Tasks are Overdue.
- When each Academic Task is due.

The design prioritizes:

1. Clear task status and Due Date visibility.
2. Fast keyboard and pointer interaction.
3. Accessible validation, confirmation, and feedback.
4. Deterministic, testable domain behavior.
5. Reliable browser-side persistence and recovery.
6. Polished desktop and 320px mobile presentation.
7. Scope realistic for a two-day assignment.

## 3. Technology Stack Decision

### Recommended Stack

| Concern | Decision | Reason |
|---|---|---|
| Application | Static HTML, CSS, and modular JavaScript | Small scope, fast implementation, no framework overhead |
| Domain behavior | Pure JavaScript modules | Deterministic tests through a public interface |
| Browser UI | Native HTML elements with minimal DOM utilities | Strong accessibility baseline and low complexity |
| Persistence | Browser `localStorage` | Matches approved offline and persistence requirements |
| Automated tests | Existing JavaScript test runner configured in repository | Avoid unnecessary tooling changes |
| Acceptance verification | Chrome DevTools MCP | Required by assignment |
| Styling | Plain CSS using custom-property design tokens | Fast, maintainable, responsive, and offline |

### Rejected Alternatives

- A frontend framework would add setup, abstraction, and dependency overhead
  without providing enough benefit for the approved scope.
- External font services would weaken offline presentation and introduce an
  internet dependency.
- A backend or account system is outside scope.

## 4. Visual Direction

Use a modern academic productivity dashboard visual language.

The interface will use:

- Strong content hierarchy and generous whitespace.
- Restrained cards, borders, shadows, colors, and border radii.
- A distinctive dark academic-blue application header.
- A calm neutral canvas with high-contrast task content.
- Status badges that combine text, shape, and an icon or marker.
- Clear selected, hover, focus, error, and disabled states.

The interface must avoid:

- Generic unstyled browser-form appearance.
- Excessive gradients or decorative effects.
- Visual elements without a usability purpose.
- Status communication that depends only on color.
- Horizontal scrolling at 320px.

## 5. Typography System

### Font Recommendation

Use an offline-safe system font stack:

`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Reasons:

- No internet dependency.
- Good readability across supported operating systems.
- Fast rendering with no font-loading layout shift.
- Suitable for a polished productivity interface.
- Realistic within the two-day assignment scope.

A bundled local font is not recommended because it adds repository weight,
licensing checks, and font-loading work without improving core behavior.

### Typography Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|---|---:|---:|---:|---:|
| Product title | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` | 700 | 1.2 | `-0.02em` |
| Page heading | `clamp(1.5rem, 1.2rem + 1.3vw, 2.25rem)` | 750 | 1.15 | `-0.025em` |
| Section heading | `1.125rem` | 700 | 1.3 | `-0.01em` |
| Card title | `1rem` | 700 | 1.35 | `-0.005em` |
| Body text | `1rem` | 400 | 1.6 | normal |
| Labels | `0.9375rem` | 650 | 1.4 | `0.005em` |
| Metadata | `0.875rem` | 500 | 1.45 | `0.01em` |
| Validation/helper text | `0.875rem` | 550 | 1.45 | normal |

Typography hierarchy will also use weight, spacing, placement, and semantic
markup rather than relying only on font size.

Body copy should use a maximum readable line length of approximately `65ch`.
Text smaller than `0.875rem` will not be used for meaningful content.

## 6. Design Tokens

### Color Palette

| Token | Value | Semantic Role |
|---|---|---|
| `--color-canvas` | `#F5F7FB` | Page background |
| `--color-surface` | `#FFFFFF` | Cards and controls |
| `--color-surface-subtle` | `#EEF2F8` | Secondary surfaces |
| `--color-text` | `#172033` | Primary text |
| `--color-text-muted` | `#526077` | Secondary text |
| `--color-border` | `#CBD4E1` | Standard border |
| `--color-border-strong` | `#8795AA` | Strong divider |
| `--color-primary` | `#3157D5` | Primary action and selected filter |
| `--color-primary-dark` | `#243F9B` | Primary hover/active |
| `--color-focus` | `#0B6EF3` | Focus ring |
| `--color-pending` | `#854D0E` | Pending status text |
| `--color-pending-bg` | `#FEF3C7` | Pending status background |
| `--color-completed` | `#166534` | Completed status text |
| `--color-completed-bg` | `#DCFCE7` | Completed status background |
| `--color-overdue` | `#B42318` | Overdue/error text |
| `--color-overdue-bg` | `#FEE4E2` | Overdue/error background |
| `--color-danger` | `#B42318` | Destructive action |
| `--color-danger-dark` | `#7A271A` | Destructive hover/active |

Final implementation must verify text and interactive-state contrast against
WCAG AA.

### Spacing Scale

| Token | Value |
|---|---:|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.25rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-10` | `2.5rem` |
| `--space-12` | `3rem` |

### Shape, Shadow, Focus, Motion, and Layout Tokens

| Token | Value |
|---|---|
| `--radius-sm` | `0.375rem` |
| `--radius-md` | `0.625rem` |
| `--radius-lg` | `0.875rem` |
| `--shadow-card` | `0 1px 2px rgb(23 32 51 / 8%), 0 8px 24px rgb(23 32 51 / 6%)` |
| `--shadow-dialog` | `0 20px 60px rgb(23 32 51 / 24%)` |
| `--border-standard` | `1px solid var(--color-border)` |
| `--focus-ring` | `0 0 0 3px rgb(11 110 243 / 35%)` |
| `--motion-fast` | `120ms` |
| `--motion-standard` | `180ms` |
| `--content-width` | `72rem` |
| `--breakpoint-compact` | `45rem` |
| `--breakpoint-minimum` | `20rem` |

Motion will be limited to functional state transitions. Under
`prefers-reduced-motion: reduce`, non-essential transitions will be disabled.

## 7. Primary User Flows

### Add an Academic Task - Issue #10

1. Student enters Task Title, Course, and Due Date.
2. Student submits the form.
3. The application validates all fields.
4. A valid Academic Task is created as Pending.
5. The task appears in the ordered task list.
6. Accessible success feedback confirms creation.
7. The form resets and focus returns to Task Title.

### Receive Validation Feedback - Issue #11

1. Student submits missing or invalid values.
2. Submission is rejected without creating a task.
3. Field-specific messages explain how to resolve each problem.
4. An accessible summary is announced.
5. Focus moves to the first invalid field.
6. Errors clear when corrected and successfully resubmitted.

### View Ordered and Overdue Tasks - Issue #12

1. Student views Academic Tasks ordered by earliest Due Date.
2. Tasks with equal Due Dates retain creation order.
3. Pending tasks past their Due Date display an explicit `Overdue` marker.
4. Completed tasks never display as Overdue.

### Change Status - Issue #13

1. Student activates the status control on a task.
2. Pending becomes Completed, or Completed becomes Pending.
3. The visible status, available action, ordering, and Overdue condition update.
4. Accessible feedback announces the change.

### Filter Tasks - Issue #14

Human decision: use a segmented native button group containing `All`,
`Pending`, and `Completed`.

1. Student chooses `All`, `Pending`, or `Completed`.
2. The selected native button receives `aria-pressed="true"`.
3. The task list immediately displays matching tasks.
4. The selected state is visible without depending only on color.
5. `All` is restored after page refresh.

### Delete an Academic Task - Issue #15

1. Student activates Delete for an Academic Task.
2. An accessible confirmation dialog identifies the Task Title.
3. Initial focus moves to Cancel.
4. Cancel or Escape closes the dialog without deleting.
5. Confirming Delete removes the task and announces success.
6. Focus returns to a predictable nearby control.

### Restore Tasks Across Sessions - Issue #16

1. Valid task changes are saved to `localStorage`.
2. Tasks are restored on page load.
3. Invalid stored records are ignored while valid records are recovered.
4. A user-visible warning explains partial recovery.
5. If saving fails, the current session remains usable and a warning is shown.

## 8. UI Layout

### Desktop Wireframe

```text
+--------------------------------------------------------------------+
| Student Task Tracker                         Academic task dashboard |
+--------------------------------------------------------------------+

+-----------------------------+  +-----------------------------------+
| Add Academic Task           |  | Your Academic Tasks               |
|                             |  |                                   |
| Task Title                  |  | [All selected][Pending][Completed] |
| [_________________________] |  |                                   |
|                             |  | +-------------------------------+ |
| Course                      |  | | Pending            Due Jun 20 | |
| [_________________________] |  | | Research outline             | |
|                             |  | | Software Engineering         | |
| Due Date                    |  | | [Mark Completed]     [Delete]| |
| [_________________________] |  | +-------------------------------+ |
|                             |  |                                   |
| [ Add Academic Task ]       |  | +-------------------------------+ |
|                             |  | | Overdue            Due Jun 10 | |
| Validation/helper region    |  | | Reading response             | |
+-----------------------------+  | | Academic Writing             | |
                                 | | [Mark Completed]     [Delete]| |
                                 | +-------------------------------+ |
                                 +-----------------------------------+
```

Desktop uses a stable two-column layout:

- Form panel: approximately one-third of available width.
- Task panel: remaining width.
- Both panels align at the top.
- Main content is constrained by `--content-width`.

### Mobile 320px Wireframe

```text
+------------------------------+
| Student Task Tracker         |
| Academic task dashboard      |
+------------------------------+

+------------------------------+
| Add Academic Task            |
| Task Title                   |
| [__________________________] |
| Course                       |
| [__________________________] |
| Due Date                     |
| [__________________________] |
| [ Add Academic Task        ] |
+------------------------------+

+------------------------------+
| Your Academic Tasks          |
| [All selected][Pending]      |
| [Completed]                  |
|                              |
| +--------------------------+ |
| | Overdue - Due Jun 10     | |
| | Reading response         | |
| | Academic Writing         | |
| | [ Mark Completed       ] | |
| | [ Delete               ] | |
| +--------------------------+ |
+------------------------------+
```

At 320px:

- Panels stack vertically.
- Inputs and primary actions use full available width.
- Filter buttons remain usable with compact padding and equal flexible widths.
- Filter controls can wrap while retaining the canonical labels.
- Task actions stack when necessary.
- Content wraps without horizontal scrolling.
- Minimum interactive target size is approximately `44px`.

## 9. Accessible Interaction Design

### Keyboard Navigation

- Use native form controls and buttons.
- Tab order follows visible reading order.
- Enter submits the add form.
- Enter or Space activates status, filter, delete, Cancel, and confirmation
  buttons.
- Escape closes the delete confirmation dialog.
- No pointer-only behavior is permitted.

### Focus Behavior

- Visible focus ring appears on every interactive element.
- Invalid submission moves focus to the first invalid field.
- Successful task creation returns focus to Task Title.
- Opening delete confirmation moves focus to Cancel.
- Dialog focus remains contained while open.
- Closing the dialog restores focus to the originating Delete button when it
  still exists.
- After confirmed deletion, focus moves to the next task action, previous task
  action, or task-list heading.

### Validation Announcements

- Each invalid field has an associated visible error message.
- Invalid controls expose `aria-invalid="true"`.
- Error text is associated through `aria-describedby`.
- A live region announces a concise validation summary.
- Messages explain the corrective action rather than only stating that input is
  invalid.

### Delete Confirmation

- Use an accessible modal dialog.
- Dialog heading clearly states the destructive action.
- Body includes the Academic Task's Task Title.
- Cancel is the initial focused action.
- Delete uses explicit destructive styling and wording.
- Background content cannot receive focus while the dialog is open.

### Filter Selected-State Semantics

Issue #14 uses the human-approved labeled segmented button group:

- Native buttons: `All`, `Pending`, and `Completed`.
- Exactly one button has `aria-pressed="true"`.
- Selected state uses text weight, border, shape, and an indicator in addition
  to color.
- All three controls remain keyboard accessible.
- `All` is selected by default and after refresh.

### Status Communication

Each task displays a textual status badge:

- `Pending`
- `Completed`
- `Overdue`

Badges combine text with a distinct border, background treatment, and marker.
Status is never communicated through color alone.

## 10. Component Breakdown

| Component | Responsibility |
|---|---|
| Application Shell | Overall page layout, heading, and global feedback |
| Academic Task Form | Collect Task Title, Course, and Due Date |
| Validation Summary | Announce submission problems |
| Filter Control | Select All, Pending, or Completed |
| Academic Task List | Render ordered and filtered tasks |
| Academic Task Card | Present task details, status, and actions |
| Status Badge | Present Pending, Completed, or Overdue condition |
| Delete Confirmation Dialog | Confirm or cancel deletion accessibly |
| Notification Region | Announce success, recovery, and storage warnings |
| Storage Adapter | Read and write validated browser-storage records |
| Domain Behavior Module | Perform deterministic task operations |

These components describe responsibilities, not framework components.

## 11. Domain and Data Model

### Academic Task Record

| Field | Purpose |
|---|---|
| `id` | Stable internal identifier |
| `title` | Required Task Title |
| `course` | Required Course |
| `dueDate` | Required local-calendar Due Date |
| `status` | `Pending` or `Completed` |
| `createdAt` | Stable creation order |

`Overdue` is derived behavior, not a stored status:

- An Academic Task is Overdue only when it is Pending and its Due Date is before
  the current local calendar date.

### Stored Collection

The browser stores:

- A schema version.
- An ordered collection of Academic Task records.

The active filter is not persisted. It resets to `All` on refresh.

## 12. Public Domain-Behavior Interface

The deterministic public interface should support these behaviors:

| Operation | Observable Result |
|---|---|
| Create Academic Task | Returns a valid Pending task or validation result |
| Validate Academic Task input | Returns field-specific validation problems |
| Determine Overdue condition | Returns whether a Pending task is Overdue |
| Order Academic Tasks | Returns earliest Due Date, then creation order |
| Change task status | Returns task with reversible Pending/Completed status |
| Filter Academic Tasks | Returns tasks matching All, Pending, or Completed |
| Delete Academic Task | Returns collection without selected task |
| Validate stored records | Returns valid records and recovery problems |

The interface must accept the current date as explicit input where required.
Tests must not depend on the machine clock or private implementation details.

## 13. Browser Storage and Recovery Design

### Save Behavior

- Save after successful create, status change, and delete operations.
- Store only validated Academic Task records and schema version.
- A failed write must not discard the current in-memory session.
- Show an accessible warning when changes could not be persisted.

### Load Behavior

- Missing storage produces an empty task list without warning.
- Valid records are restored and ordered.
- Invalid individual records are ignored.
- Valid records remain available when partial corruption exists.
- Partial recovery produces an accessible warning.
- Completely unreadable storage produces an empty usable application and a
  warning.

### Storage Boundaries

- Storage parsing and validation remain separate from UI rendering.
- Domain behavior does not directly call `localStorage`.
- Tests can provide controlled stored values and failures.

## 14. File and Module Structure

```text
src/
  index.html
  styles/
    tokens.css
    base.css
    components.css
    responsive.css
  scripts/
    app.js
    domain/
      academic-task.js
      validation.js
      task-collection.js
    storage/
      task-storage.js
    ui/
      task-form.js
      task-list.js
      filter-control.js
      delete-dialog.js
      notifications.js

tests/
  domain/
    academic-task.test.js
    validation.test.js
    task-collection.test.js
  storage/
    task-storage.test.js
```

The final structure may be consolidated if the modules become too small.
Responsibility boundaries should remain clear even if fewer files are used.

## 15. Architecture Diagram

```text
+----------------------------------------------------------+
|                     Browser UI                           |
| Form - Filters - Task List - Dialog - Notifications     |
+---------------------------+------------------------------+
                            | public behavior calls
                            v
+----------------------------------------------------------+
|                 Domain Behavior Layer                    |
| Validation - Create - Order - Status - Filter - Delete  |
| Overdue derivation                                      |
+---------------------------+------------------------------+
                            | validated records
                            v
+----------------------------------------------------------+
|                    Storage Adapter                       |
| Schema validation - Save - Load - Partial recovery      |
+---------------------------+------------------------------+
                            v
                       localStorage
```

The Browser UI depends on domain behavior and the storage adapter. Domain
behavior remains independent from the DOM and browser storage.

## 16. Planned TDD Behaviors

### Issue #11 - Student Receives Actionable Validation Feedback

Planned RED, GREEN, REFACTOR behavior:

1. **RED:** Submitting blank Task Title, Course, and Due Date returns
   field-specific validation problems.
2. **GREEN:** Implement the minimum validation behavior required to return all
   required-field problems.
3. **REFACTOR:** Consolidate validation result formatting without changing the
   public behavior.
4. **RED:** A past Due Date is rejected while today's local Due Date is valid.
5. **GREEN:** Implement deterministic local-calendar Due Date validation.
6. **REFACTOR:** Isolate date comparison from input parsing.

Browser verification will confirm visible messages, announcement behavior,
`aria-invalid`, associations, and focus on the first invalid field.

### Issue #13 - Student Can Change Academic Task Status

Planned RED, GREEN, REFACTOR behavior:

1. **RED:** Changing a Pending Academic Task returns a Completed Academic Task.
2. **GREEN:** Implement the minimum reversible status transition.
3. **REFACTOR:** Centralize permitted status values.
4. **RED:** Changing a Completed Academic Task returns a Pending Academic Task.
5. **GREEN:** Implement reverse transition.
6. **REFACTOR:** Keep transition behavior pure and explicit.
7. **RED:** A Completed Academic Task is never Overdue.
8. **GREEN:** Update derived Overdue behavior.
9. **REFACTOR:** Consolidate status and Overdue rules.

Browser verification will confirm the visible status, available action,
announcement, persistence, and ordering after status changes.

## 17. Issue-to-Design Mapping

| Issue | Components | Modules | Primary Test Seams | Browser Verification |
|---|---|---|---|---|
| #10 Add Academic Task | Form, List, Notification | validation, academic-task, app | Create public behavior | Valid task creation, reset, focus, success feedback |
| #11 Validation feedback | Form, Validation Summary | validation, task-form | Validation public behavior | Errors, announcement, focus, today/past Due Date |
| #12 Ordered and Overdue tasks | List, Card, Status Badge | task-collection, task-list | Order and Overdue behavior | Order, labels, non-color status |
| #13 Change status | Card, Status Badge, Notification | academic-task, task-collection | Status transition behavior | Reversible status, announcement, Overdue update |
| #14 Filter tasks | Filter Control, List | filter-control, task-collection | Filter public behavior | `aria-pressed`, keyboard use, 320px layout |
| #15 Delete task | Card, Delete Dialog, Notification | delete-dialog, task-collection | Delete public behavior | Dialog focus, Escape, Cancel, confirmed delete |
| #16 Persist tasks | Notification Region | task-storage, app | Storage adapter boundary | Refresh restore, recovery warning, save failure |

## 18. Chrome DevTools MCP Verification Strategy

Chrome DevTools MCP will be used directly by AI after implementation.

### Required Verification

- Open the working application in Chrome.
- Capture a desktop snapshot and screenshot.
- Verify task creation and ordered display.
- Inspect console messages and confirm no unexpected errors.
- Inspect `localStorage` after create, status change, and delete.
- Refresh and verify restored tasks.
- Inject or reproduce invalid storage and verify recovery warning.
- Verify filter button `aria-pressed` state.
- Verify keyboard focus sequence and delete-dialog behavior.
- Set viewport width to 320px.
- Confirm no horizontal scrolling.
- Capture mobile screenshot.
- Verify status is understandable without relying only on color.

New screenshots and logs must be generated during the rebuild. Historical
evidence cannot be used as proof of the rebuilt application.

## 19. Visual Usability and Accessibility Rationale

- Strong headings and whitespace allow quick visual scanning.
- Cards separate Academic Tasks without excessive decoration.
- Due Date and status appear near the top of each task card.
- Semantic status badges communicate state using text and visual treatment.
- Restrained shadows and borders establish hierarchy without clutter.
- Native controls preserve familiar keyboard and accessibility behavior.
- Consistent spacing and typography reduce cognitive load.
- Full-width mobile controls improve touch usability.
- Offline-safe typography prevents visual degradation without internet access.

## 20. Important Trade-offs

### Aesthetics vs Offline Support

A system-font stack is less visually unique than an external display font, but
it preserves offline operation, performance, and reliability. Visual identity
will instead come from hierarchy, spacing, color, and component treatment.

### Polish vs Two-Day Scope

The design uses a limited token system and a small component vocabulary.
Decorative animations, themes, charts, and advanced visual customization are
excluded.

### Static Stack vs Framework

A static modular JavaScript implementation requires deliberate DOM and state
coordination, but avoids framework setup and keeps the application easy to
audit.

### Accessibility vs Minimal Interaction Steps

The three-button filter group creates three Tab stops, but keeps every filter
visible and understandable. This is preferred over hiding options in a select.

### Persistence vs Recovery Complexity

Partial recovery adds some implementation and testing work, but it prevents one
invalid stored record from making the entire application unusable.

## 21. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Visual polish consumes too much implementation time | Build tokens and core components first; avoid decorative work |
| Local-calendar Due Date logic becomes inconsistent | Centralize deterministic date behavior and test with explicit dates |
| Dialog focus management is incorrect | Use native dialog behavior where suitable and verify with keyboard |
| Storage corruption breaks startup | Validate each stored record and recover valid records |
| Storage failure is only visible in console | Provide accessible user-facing warning |
| Status relies too heavily on color | Always show explicit text and additional visual indicators |
| 320px layout overflows | Use wrapping, flexible widths, and Chrome viewport verification |
| Modules become unnecessarily fragmented | Consolidate small modules while preserving responsibility boundaries |

## 22. Out of Scope

The design does not include:

- Editing an existing Academic Task.
- Authentication or user accounts.
- Backend synchronization.
- Multiple devices or collaboration.
- Notifications or reminders.
- Course management.
- Search.
- Overdue as a selectable filter.
- Custom themes.
- Persistent filter selection.
- Additional task fields.

## 23. Approval Gate

This design was approved by the human reviewer before implementation.

After approval:

1. Implement one approved vertical-slice issue at a time.
2. Create feature or fix branches from `development`.
3. Apply genuine TDD to Issues #11 and #13.
4. Use Chrome DevTools MCP for browser verification.
