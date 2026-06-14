# Student Task Tracker Product Requirements Document

## 1. Product Overview

Student Task Tracker is a static browser-based application for an individual
Student who needs to manage personal Academic Tasks across multiple Courses.

The product gives the Student one place to add, view, complete, reopen, delete,
and filter Academic Tasks. It works without an account or backend, supports
offline use after its files are available, and persists Academic Tasks in the
Student's browser.

## 2. Problem Statement

A Student often receives Academic Task information from multiple sources,
including Course platforms, messages, notes, and classroom discussions.

Because this information is scattered, the Student may struggle to identify
which Academic Tasks remain Pending and when their Due Dates occur.

## 3. Solution

Provide a small, accessible task-tracking application that allows a Student to:

- Record Academic Tasks using a Task Title, Course, and Due Date.
- See Pending, Completed, and Overdue conditions clearly.
- Change an Academic Task between Pending and Completed.
- Delete an Academic Task after confirmation.
- Filter Academic Tasks by status.
- Retain Academic Tasks after refreshing or reopening the application.

## 4. Goals

- Give the Student one reliable view of personal Academic Tasks.
- Make Pending Academic Tasks and their Due Dates easy to identify.
- Make Overdue Academic Tasks clearly recognizable.
- Support the complete main user flow without unexpected errors.
- Preserve Academic Tasks in the same browser and device.
- Keep the product achievable within the two-day assignment scope.
- Produce observable, testable behavior suitable for automated and browser
  verification.

## 5. Non-Goals

- Replace a calendar, Course platform, or learning management system.
- Support accounts, authentication, instructors, groups, or multiple users.
- Synchronize Academic Tasks across browsers or devices.
- Edit an existing Academic Task.
- Provide notifications, reminders, collaboration, or advanced planning.
- Provide localization or a native mobile application.

## 6. Target Users

The primary target user is an individual university or college Student managing
personal Academic Tasks across multiple Courses.

The product assumes one Student uses it on one browser and device.

## 7. User Stories

1. As a Student, I want to add an Academic Task with a Task Title, Course, and
   Due Date, so that I can record work I need to complete.
2. As a Student, I want required fields to be clearly labeled, so that I
   understand what information must be provided.
3. As a Student, I want invalid input to be rejected with specific messages, so
   that I can correct it.
4. As a Student, I want my entered values preserved after failed validation, so
   that I do not need to enter them again.
5. As a Student, I want duplicate Academic Tasks to be allowed, so that valid
   work with identical details can still be tracked separately.
6. As a Student, I want to see all Academic Tasks ordered by Due Date, so that I
   can identify the work due soonest.
7. As a Student, I want each Academic Task to show its Task Title, Course, Due
   Date, and status, so that I can understand it quickly.
8. As a Student, I want Pending Academic Tasks with passed Due Dates to show
   Overdue, so that I can recognize late work.
9. As a Student, I want to mark a Pending Academic Task as Completed, so that I
   can track finished work.
10. As a Student, I want to return a Completed Academic Task to Pending, so that
    I can correct an accidental status change.
11. As a Student, I want Completed Academic Tasks to remain available, so that I
    can review or reopen them.
12. As a Student, I want to filter Academic Tasks by All, Pending, or Completed,
    so that I can focus on relevant work.
13. As a Student, I want clear empty-state messages, so that I understand whether
    no Academic Tasks exist or no results match the selected filter.
14. As a Student, I want deletion to require confirmation, so that I do not
    accidentally remove an Academic Task.
15. As a keyboard user, I want the deletion confirmation and all core actions to
    be keyboard-operable, so that I can use the application without a pointer.
16. As a Student, I want brief accessible feedback after successful actions, so
    that I know the application accepted them.
17. As a Student, I want Academic Tasks to remain after refresh or reopening, so
    that I do not lose my task list.
18. As a Student, I want clear warnings when stored data cannot be restored or
    saved, so that I understand the risk of data loss.
19. As a mobile Student, I want the application usable at a 320px viewport
    without horizontal scrolling, so that I can manage Academic Tasks on a small
    screen.
20. As a Student without internet access, I want all core features to remain
    available, so that I can manage Academic Tasks offline.

## 8. Core Features

### 8.1 Add and Validate an Academic Task

The Student can create an Academic Task using required Task Title, Course, and
Due Date inputs. Validation rejects missing, whitespace-only, over-limit, and
past-date values while preserving entered data and guiding the Student to the
first invalid field.

### 8.2 View the Ordered Academic Task List

The Student can view Academic Tasks with their important details and statuses.
Academic Tasks are ordered by earliest Due Date, then earliest creation time.

### 8.3 Change Academic Task Status

The Student can change an Academic Task between Pending and Completed.
Applicable Pending Academic Tasks display Overdue when their Due Date has
passed.

### 8.4 Delete an Academic Task After Confirmation

The Student can permanently delete one Academic Task only after using an
accessible confirmation dialog.

### 8.5 Filter Academic Tasks by Status

The Student can select All, Pending, or Completed. All is the default whenever
the application opens or refreshes.

## 9. Acceptance Criteria

### 9.1 Add and Validate an Academic Task

- Task Title, Course, and Due Date are visibly labeled and required.
- Valid input creates one separate Pending Academic Task.
- Duplicate valid Academic Tasks are allowed.
- Task Title is trimmed and limited to 120 characters.
- Course is trimmed and limited to 80 characters.
- Empty and whitespace-only Task Title or Course values are rejected.
- A missing Due Date is rejected.
- A Due Date before the Student's current local calendar date is rejected.
- A Due Date equal to the current local calendar date is accepted.
- Invalid submission displays specific messages near affected fields.
- Invalid submission preserves entered values and focuses the first invalid
  field.
- Task Title and Course input is displayed as plain text and never executed as
  HTML or script.
- Successful creation displays brief accessible feedback.

### 9.2 View the Ordered Academic Task List

- Each Academic Task displays Task Title, Course, Due Date, and status.
- Due Date uses an unambiguous English format such as `Jun 20, 2026`.
- Internal identifiers and creation time are not shown.
- Academic Tasks with earlier Due Dates appear first.
- Academic Tasks with equal Due Dates appear in earliest-creation order.
- When no Academic Tasks exist, the Student is prompted to add the first one.
- The list remains responsive with at least 100 Academic Tasks.

### 9.3 Change Academic Task Status

- A Pending Academic Task can be changed to Completed.
- A Completed Academic Task can be changed to Pending.
- A status change affects only the selected Academic Task.
- Completed Academic Tasks do not display Overdue.
- A Pending Academic Task displays Overdue after its Due Date passes.
- An Academic Task due today does not display Overdue.
- Reopening a Completed Academic Task displays Overdue immediately when its Due
  Date has passed.
- Status and Overdue conditions are not communicated using color alone.
- Successful status changes provide brief accessible feedback.

### 9.4 Delete an Academic Task After Confirmation

- Requesting deletion opens a confirmation dialog identifying the Academic Task
  by Task Title.
- The dialog provides clear Cancel and Delete actions.
- Cancelling or pressing `Escape` preserves the Academic Task.
- Focus moves into the dialog and returns to the original delete control after
  cancellation.
- Confirming deletion removes only the selected Academic Task.
- A deleted Academic Task does not return after refresh.
- Successful deletion provides brief accessible feedback.

### 9.5 Filter Academic Tasks by Status

- All displays every Academic Task.
- Pending displays Pending Academic Tasks, including Overdue Academic Tasks.
- Completed displays Completed Academic Tasks.
- There is no separate Overdue filter.
- All is selected whenever the application opens or refreshes.
- When no Academic Tasks match a filter, a filtered empty state is displayed.
- An Academic Task immediately disappears when a status change means it no
  longer matches the active filter.
- The status change remains clearly communicated when the Academic Task
  disappears from the filtered result.

### 9.6 Persistence, Reliability, and Cross-Cutting Behavior

- Added, updated, and deleted Academic Tasks retain their correct state after
  refresh or reopening.
- The selected filter is not persisted.
- Entirely invalid stored data does not prevent the application from opening and
  produces a clear warning.
- Partially invalid stored data restores valid Academic Tasks, ignores invalid
  entries, and produces a partial-recovery warning.
- A storage write failure leaves the application usable for the current session
  and warns that changes may be lost.
- All core features work offline after application files are available.
- All core features are keyboard-operable.
- Inputs have visible labels and controls have clear accessible names.
- Important messages and actions are announced to assistive technology.
- Focus indicators are clearly visible.
- Text and controls meet WCAG AA contrast expectations.
- The application is usable at 320px without horizontal page scrolling.
- The main user flow produces no unexpected console errors in the latest Google
  Chrome.

## 10. Success Criteria

- The Student completes the complete main user flow without unexpected errors.
- Validation behavior rejects all defined invalid input cases.
- Academic Task data and status remain correct after refresh.
- Ordering, filtering, status transitions, Overdue behavior, deletion
  confirmation, feedback, and empty states satisfy their acceptance criteria.
- All core behavior works offline.
- The application is keyboard-usable and remains usable at 320px.
- The application remains responsive with at least 100 Academic Tasks.
- Chrome DevTools verification shows correct browser storage and no unexpected
  console errors.
- New automated tests and browser evidence demonstrate important acceptance
  criteria.

## 11. Implementation Decisions

The following decisions come directly from approved requirements:

- The product is a static browser-side application without a backend.
- Academic Task data is persisted using browser `localStorage`.
- Each Academic Task contains Task Title, Course, Due Date, Pending or Completed
  status, creation time for ordering, and a unique internal identifier.
- Task Title, Course, and Due Date are required; there are no optional fields.
- Course is entered as free text.
- Academic Tasks are ordered by earliest Due Date and then earliest creation
  time.
- Overdue is a condition of a Pending Academic Task, not a separate status.
- The only filters are All, Pending, and Completed.
- Filter selection resets to All when the application opens or refreshes.
- Completed Academic Tasks remain stored until manually deleted.
- Deletion requires an accessible confirmation dialog.
- Student-provided text is handled as plain text.
- UI language is English only.
- Exact visual design, module boundaries, technology libraries, and internal
  representation remain design-stage decisions requiring human approval.

## 12. Testing Decisions

Good tests verify observable behavior through public interfaces and remain valid
when private implementation changes.

Approved test seams:

- Use the browser UI as the highest acceptance-test seam for the main user flow,
  validation, filtering, status changes, deletion confirmation, feedback,
  keyboard operation, and empty states.
- Use the browser UI with reload and controlled browser storage for persistence,
  filter reset, invalid stored data, partial recovery, and write-failure
  behavior.
- Use Chrome DevTools MCP to verify console behavior, `localStorage`, offline
  behavior, and the 320px responsive viewport.
- Use a public domain-behavior interface for fast deterministic verification of
  validation, ordering, status transitions, filtering, and Overdue calculation.
- Do not test private functions, private state, internal DOM structure, or
  implementation-specific call sequences.
- Apply genuine RED, GREEN, and REFACTOR cycles to at least two approved
  vertical-slice issues.
- Existing historical tests and evidence may inform planning but do not count as
  rebuild evidence.

Final test tooling and the exact public domain-behavior interface require human
approval during design.

## 13. Risks

- Clearing browser storage removes saved Academic Tasks.
- Academic Tasks do not synchronize across browsers or devices.
- Incorrect device dates can affect Due Date validation and Overdue behavior.
- Browser storage may be unavailable, full, or contain invalid data.
- Free-text Course values may become inconsistent.
- Accessible dialog focus management and announcements require careful
  implementation and verification.
- Date-dependent tests may become unreliable unless the local calendar date is
  controlled.
- Scope creep could make the two-day assignment unrealistic.
- Browser behavior outside the latest Google Chrome is only best effort.

## 14. Out-of-Scope Items

- Accounts, authentication, profiles, and multiple users.
- Backend services, cloud synchronization, and cross-device access.
- Editing an existing Academic Task.
- Notifications, reminders, and calendar integration.
- Recurring tasks, subtasks, priorities, notes, attachments, and tags.
- Search and advanced sorting.
- Filters based on Course, Due Date, or Overdue.
- Collaboration and task sharing.
- Import, export, backup, and restore.
- Automatic deletion or archiving of Completed Academic Tasks.
- Localization and multiple UI languages.
- Native mobile applications.
- Historical tracking of whether an Academic Task was completed late.
- Full compatibility certification for browsers other than the latest Google
  Chrome.
- Full accessibility certification across every assistive-technology and browser
  combination.

## 15. Further Notes

- The approved requirements in `docs/01-requirements.md` are authoritative.
- `CONTEXT.md` defines the canonical domain terminology.
- Existing implementation, tests, PRD, design, screenshots, and evidence are
  historical references only.
- The approved PRD must be stored in `docs/02-prd.md`.
- Publishing the PRD as a GitHub Issue requires separate human approval.
- No unresolved product-requirements questions remain.
