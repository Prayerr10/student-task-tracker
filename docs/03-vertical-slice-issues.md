# Student Task Tracker Vertical-Slice Issues

These seven approved vertical-slice issues were published to GitHub in dependency
order. GitHub Issues are the authoritative implementation tracker.

## Dependency Order

```text
#10 Student can add an Academic Task
|-- #11 Student receives actionable validation feedback [Planned TDD]
|-- #12 Student can view ordered and Overdue Academic Tasks
|   |-- #13 Student can change Academic Task status [Planned TDD]
|   |   |-- #14 Student can filter Academic Tasks by status [HITL]
|   |   `-- #16 Student retains Academic Tasks across browser sessions
|   `-- #15 Student can safely delete an Academic Task
|       `-- #16 Student retains Academic Tasks across browser sessions
`-- #16 Student retains Academic Tasks across browser sessions
```

## Issue #10: Student can add an Academic Task

**GitHub:** https://github.com/Prayerr10/student-task-tracker/issues/10
**Label:** `ready-for-agent`

### Type

AFK

### What to build

Allow a Student to submit required Task Title, Course, and Due Date values and
immediately see one separate Pending Academic Task with accessible success
feedback.

### User stories covered

- User story 1: Add an Academic Task with required details.
- User story 5: Allow duplicate Academic Tasks as separate entities.
- User story 16: Receive brief accessible feedback after successful actions.

### Acceptance criteria

- [ ] Required Task Title, Course, and Due Date controls have visible labels.
- [ ] Valid submission creates one Pending Academic Task displaying the submitted values.
- [ ] Duplicate valid submissions create separate Academic Tasks.
- [ ] Submitted text is displayed as plain text and never executes as HTML or script.
- [ ] Successful creation provides brief accessible feedback.
- [ ] Initial empty state prompts the Student to add the first Academic Task.

### Blocked by

None - can start immediately after approved design.

### Testing notes

Verify through the public domain-behavior interface where appropriate, then
through the browser UI.

Browser verification: valid creation, duplicate creation, empty state,
accessible feedback, plain-text rendering, and console check.

### AI usage notes

AI may implement approved behavior and tests. A human must verify labels,
displayed values, feedback clarity, and security behavior.

## Issue #11: Student receives actionable validation feedback

**GitHub:** https://github.com/Prayerr10/student-task-tracker/issues/11
**Label:** `ready-for-agent`
**Planned TDD:** Yes

### Type

AFK

### What to build

Reject invalid Academic Task submissions while preserving entered values,
showing field-specific messages, and focusing the first invalid field.

### User stories covered

- User story 2: Understand required fields.
- User story 3: Correct invalid input using specific messages.
- User story 4: Preserve entered values after failed validation.

### Acceptance criteria

- [ ] Empty and whitespace-only Task Title or Course values are rejected.
- [ ] Task Title over 120 characters and Course over 80 characters are rejected.
- [ ] Missing and past Due Dates are rejected; today's Due Date is accepted.
- [ ] Invalid values are preserved and specific messages appear near affected fields.
- [ ] Focus moves to the first invalid field.
- [ ] Corrected valid submission clears validation messages and creates the Academic Task.

### Blocked by

- #10

### Testing notes

Use genuine RED-GREEN-REFACTOR cycles for deterministic validation behavior.
Verify messages, preserved values, and focus through the browser UI with a
controlled local date.

Browser verification: every invalid case, today and past dates, keyboard focus,
and console check.

### Planned TDD

This issue is selected for a genuine RED-GREEN-REFACTOR cycle using approved
public test seams.

### AI usage notes

AI may generate deterministic validation cases. A human must verify message
clarity, focus behavior, and local-date expectations.

## Issue #12: Student can view ordered and Overdue Academic Tasks

**GitHub:** https://github.com/Prayerr10/student-task-tracker/issues/12
**Label:** `ready-for-agent`

### Type

AFK

### What to build

Display Academic Tasks with canonical details, Due Date ordering, status,
Overdue indication, and appropriate empty states.

### User stories covered

- User story 6: View Academic Tasks ordered by Due Date.
- User story 7: See each Academic Task's important details.
- User story 8: Recognize Overdue Academic Tasks.
- User story 13: Understand empty states.

### Acceptance criteria

- [ ] Each Academic Task displays Task Title, Course, formatted Due Date, and status.
- [ ] Earlier Due Dates appear first; equal Due Dates use earliest creation order.
- [ ] Pending Academic Tasks past their Due Date display visible-text Overdue.
- [ ] Academic Tasks due today and Completed Academic Tasks do not display Overdue.
- [ ] Status and Overdue are not communicated using color alone.
- [ ] The list remains usable with 100 Academic Tasks and at a 320px viewport.

### Blocked by

- #10

### Testing notes

Verify deterministic ordering and Overdue behavior through the public
domain-behavior interface.

Browser verification: rendered details, empty states, 100-task responsiveness,
Overdue text, 320px viewport, no horizontal scrolling, and console check.

### AI usage notes

AI may implement and test approved ordering and date behavior. A human must
verify readability, Overdue clarity, and responsive usability.

## Issue #13: Student can change Academic Task status

**GitHub:** https://github.com/Prayerr10/student-task-tracker/issues/13
**Label:** `ready-for-agent`
**Planned TDD:** Yes

### Type

AFK

### What to build

Allow a Student to change one Academic Task between Pending and Completed while
preserving its details and communicating the result accessibly.

### User stories covered

- User story 9: Mark a Pending Academic Task as Completed.
- User story 10: Return a Completed Academic Task to Pending.
- User story 11: Keep Completed Academic Tasks available.
- User story 16: Receive accessible action feedback.

### Acceptance criteria

- [ ] A Pending Academic Task can become Completed.
- [ ] A Completed Academic Task can return to Pending.
- [ ] Only the selected Academic Task changes.
- [ ] Completed Academic Tasks do not display Overdue.
- [ ] Reopened Pending Academic Tasks display Overdue when their Due Date has passed.
- [ ] Status changes provide brief accessible feedback.

### Blocked by

- #12

### Testing notes

Use genuine RED-GREEN-REFACTOR cycles through the public domain-behavior
interface for deterministic status and Overdue transitions.

Browser verification: both transitions, only selected task changes, reopened
Overdue task, accessible feedback, and console check.

### Planned TDD

This issue is selected for a genuine RED-GREEN-REFACTOR cycle using approved
public test seams.

### AI usage notes

AI may implement status transitions and automated tests. A human must verify
control clarity and accessible feedback.

## Issue #14: Student can filter Academic Tasks by status

**GitHub:** https://github.com/Prayerr10/student-task-tracker/issues/14
**Label:** `ready-for-human`

### Type

HITL

### What to build

After human approval of the filter interaction design, allow a Student to view
All, Pending, or Completed Academic Tasks and understand the selected filter and
empty results.

### User stories covered

- User story 12: Filter Academic Tasks by status.
- User story 13: Understand filtered empty states.
- User story 16: Receive accessible action feedback.

### Acceptance criteria

- [ ] A human approves the accessible filter interaction pattern before coding.
- [ ] All displays every Academic Task.
- [ ] Pending includes Pending and Overdue Academic Tasks.
- [ ] Completed displays only Completed Academic Tasks.
- [ ] All is selected after opening or refreshing the application.
- [ ] Filtered empty states explain that no Academic Tasks match.
- [ ] A status-changed Academic Task immediately disappears when it no longer matches, with accessible feedback.

### Blocked by

- #12
- #13

### Testing notes

Verify every filter through the browser UI.

Browser verification: selected state, keyboard use, filtered results, status
changes while a filter is active, filtered empty states, 320px viewport, and
console check.

### AI usage notes

AI may compare accessible interaction patterns. Human approval is required for
the pattern and mobile presentation before implementation.

## Issue #15: Student can safely delete an Academic Task

**GitHub:** https://github.com/Prayerr10/student-task-tracker/issues/15
**Label:** `ready-for-agent`

### Type

AFK

### What to build

Allow a Student to request deletion, review an accessible confirmation dialog,
cancel safely, or permanently delete only the selected Academic Task.

### User stories covered

- User story 14: Require confirmation before deletion.
- User story 15: Use deletion and core actions with a keyboard.
- User story 16: Receive accessible action feedback.

### Acceptance criteria

- [ ] Deletion opens a dialog identifying the Academic Task by Task Title.
- [ ] Cancel and Escape preserve the Academic Task.
- [ ] Focus moves into the dialog and returns to the originating control after cancellation.
- [ ] Confirmation deletes only the selected Academic Task.
- [ ] Successful deletion provides brief accessible feedback.
- [ ] Deleting the final Academic Task displays the initial empty state.

### Blocked by

- #12

### Testing notes

Verify the complete dialog workflow through the browser UI.

Browser verification: Cancel, Escape, focus movement, confirmed deletion, final
empty state, keyboard operation, and console check.

### AI usage notes

AI may implement the approved dialog behavior. A human must verify focus
management, dialog wording, and accidental-deletion protection.

## Issue #16: Student retains Academic Tasks across browser sessions

**GitHub:** https://github.com/Prayerr10/student-task-tracker/issues/16
**Label:** `ready-for-agent`

### Type

AFK

### What to build

Persist Student-visible Academic Task changes, restore valid data after refresh,
warn about recovery or save failures, and keep core behavior available offline.

### User stories covered

- User story 17: Retain Academic Tasks after refresh or reopening.
- User story 18: Receive warnings when data cannot be restored or saved.
- User story 20: Use core features without internet access.

### Acceptance criteria

- [ ] Added, status-changed, and deleted Academic Tasks retain the correct state after refresh.
- [ ] The selected filter resets to All after refresh.
- [ ] Entirely invalid stored data is ignored and produces a clear warning.
- [ ] Partially invalid stored data restores valid Academic Tasks and produces a partial-recovery warning.
- [ ] Save failure leaves the current session usable and warns that changes may be lost.
- [ ] Core features remain usable offline after application files are available.

### Blocked by

- #10
- #13
- #15

### Testing notes

Verify persistence and recovery through the browser UI with controlled storage.

Use Chrome DevTools MCP for browser verification of `localStorage` contents,
refresh behavior, invalid and partial data recovery, save failure, offline use,
and console messages.

### AI usage notes

AI may implement storage and recovery behavior and control browser storage
during tests. A human must verify warning clarity and data integrity.
