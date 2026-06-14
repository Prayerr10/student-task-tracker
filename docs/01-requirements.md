# Student Task Tracker Requirements

## 1. Product Idea

Student Task Tracker is a static browser-based application that allows an
individual Student to record and manage personal Academic Tasks from multiple
Courses in one place.

The application works without an account or backend, supports offline use after
its files are available, and stores Academic Tasks in the browser.

## 2. Problem Statement

A Student often receives Academic Task information from multiple sources,
including Course platforms, messages, notes, and classroom discussions.

Because this information is scattered, a Student may struggle to identify which
Academic Tasks still need to be completed and when they are due.

## 3. Target Users

The primary target user is an individual university or college Student managing
personal Academic Tasks across multiple Courses.

The initial product does not support instructors, groups, or multiple users.

## 4. User Goals

A Student should be able to:

- Record personal Academic Tasks in one place.
- See which Academic Tasks are Pending and when they are due.
- Recognize Overdue Academic Tasks.
- Mark Academic Tasks as Completed or return them to Pending.
- Remove Academic Tasks that no longer need to be tracked.
- Focus on All, Pending, or Completed Academic Tasks.
- Return after a refresh and find saved Academic Tasks unchanged.

## 5. Core User-Facing Features

1. Add an Academic Task.
2. View the Academic Task list.
3. Change an Academic Task between Pending and Completed.
4. Delete an Academic Task after confirmation.
5. Filter Academic Tasks by status.

Validation, persistence, responsive behavior, accessibility, and feedback are
cross-cutting requirements rather than separate core features.

## 6. Academic Task Fields

Every Academic Task must contain:

- Task Title.
- Course.
- Due Date.
- Status: Pending or Completed.
- Creation time used for deterministic ordering.
- A unique internal identifier.

Task Title, Course, and Due Date are required inputs. The initial product has no
optional task fields.

## 7. Functional Requirements

### 7.1 Add an Academic Task

- The Student can create an Academic Task using Task Title, Course, and Due Date.
- A newly created Academic Task has Pending status.
- Duplicate Academic Tasks with identical input values are allowed and remain
  separate entities.
- A successfully created Academic Task is saved and displayed immediately.
- The Student receives brief accessible feedback after successful creation.

### 7.2 Validate Academic Task Input

- Task Title and Course are trimmed before validation.
- Task Title and Course must not be empty or contain only whitespace.
- Task Title must not exceed 120 characters.
- Course must not exceed 80 characters.
- Due Date is required.
- Due Date before the Student's current local calendar date must be rejected.
- Due Date equal to the current local calendar date is valid.
- Validation occurs when the form is submitted.
- A specific message appears near each invalid field.
- Existing input values remain available after failed validation.
- Focus moves to the first invalid field.
- Validation messages clear after correction and successful submission.
- Task Title and Course are treated as plain text. Entered HTML or scripts must
  never execute.

### 7.3 View Academic Tasks

- Each Academic Task displays its Task Title, Course, Due Date, and status.
- Due Date uses an unambiguous English display format such as `Jun 20, 2026`.
- Internal identifiers and creation time are not displayed.
- Academic Tasks are ordered by earliest Due Date.
- Academic Tasks with the same Due Date are ordered by earliest creation time.
- The list remains responsive with at least 100 stored Academic Tasks.

### 7.4 Status and Overdue Behavior

- An Academic Task has exactly one status: Pending or Completed.
- The Student can change Pending to Completed.
- The Student can change Completed back to Pending.
- A Pending Academic Task becomes Overdue after its Due Date passes according to
  the Student's local device calendar.
- An Academic Task due today is not Overdue.
- Overdue must be communicated using visible text and styling that does not rely
  only on color.
- Completed Academic Tasks never display Overdue.
- A Completed Academic Task returned to Pending immediately displays Overdue if
  its Due Date has passed.
- Completed Academic Tasks remain stored until deleted manually.

### 7.5 Delete an Academic Task

- The Student can request deletion of an individual Academic Task.
- Deletion requires confirmation before data is permanently removed.
- The confirmation dialog identifies the Academic Task using its Task Title.
- The dialog provides clear Cancel and Delete actions.
- Pressing `Escape` cancels deletion.
- Keyboard focus moves into the dialog and returns to the original delete
  control after cancellation.
- Confirmed deletion removes only the selected Academic Task.
- The Student receives brief accessible feedback after successful deletion.

### 7.6 Filter Academic Tasks

- The application provides All, Pending, and Completed filters.
- All is the default filter whenever the application opens or refreshes.
- All shows every Academic Task.
- Pending shows Pending Academic Tasks, including Overdue Academic Tasks.
- Completed shows Completed Academic Tasks.
- There is no separate Overdue filter.
- When a status change causes an Academic Task to stop matching the active
  filter, it disappears from the filtered result immediately.
- Status changes provide accessible feedback even when the affected Academic
  Task disappears from the current result.

### 7.7 Empty States

- When no Academic Tasks exist, the application prompts the Student to add the
  first Academic Task.
- When an active filter has no matching Academic Tasks, the application explains
  that no results match that filter.

### 7.8 Persistence

- Academic Tasks are stored in browser `localStorage`.
- Added, updated, and deleted Academic Tasks retain their correct state after
  refresh or reopening.
- Only Academic Task data is persisted; the selected filter is not persisted.
- If stored data is entirely invalid, the application remains usable, ignores
  the invalid data, and shows a clear warning.
- If stored data is partially invalid, valid Academic Tasks are restored,
  invalid entries are ignored, and a partial-recovery warning is shown.
- If saving fails, the application remains usable for the current session and
  warns the Student that changes may be lost after refresh or closing.

## 8. Main User Flow

1. The Student opens the application and sees the empty state.
2. The Student submits a valid Academic Task.
3. The Academic Task appears according to Due Date ordering.
4. The Student marks the Academic Task as Completed.
5. The Student filters the list by status.
6. The Student refreshes the page and confirms the Academic Task remains saved.
7. The Student deletes the Academic Task after confirming deletion.

## 9. Non-Functional Requirements

### 9.1 Offline Behavior

- All five core features must work without an internet connection after the
  application files are available.
- The application must not require external services for core behavior.

### 9.2 Responsive Behavior

- The application must remain usable from a 320px-wide viewport through desktop
  viewports.
- The application must not introduce horizontal page scrolling at 320px.
- On mobile, the form and Academic Task list are arranged vertically.
- All fields, filters, statuses, dialogs, and actions remain usable on mobile.

### 9.3 Accessibility

- All core behavior is operable using a keyboard.
- Every input has a visible label.
- Keyboard focus indicators are clearly visible.
- Important validation messages, warnings, and successful actions are announced
  to assistive technology.
- Status and Overdue conditions are not communicated using color alone.
- Controls have clear accessible names and purposes.
- Text and interactive controls meet WCAG AA contrast expectations.

### 9.4 Reliability and Security

- Valid Student actions must not cause unexpected errors.
- Invalid or corrupted stored data must not prevent the application from opening.
- Student-provided text must never execute as HTML or script.
- No unexpected console errors should occur during the main user flow.

### 9.5 Browser Support

- Acceptance verification targets the latest Google Chrome.
- Other modern browsers are supported on a best-effort basis.

### 9.6 Performance

- Common actions should update without noticeable delay during normal personal
  use.
- The application should remain responsive with at least 100 Academic Tasks.

## 10. Assumptions

- One Student uses the application on one browser and device.
- The Student uses a modern browser with JavaScript and `localStorage` enabled.
- The device's local calendar date is sufficiently accurate.
- A Student understands that clearing browser storage removes saved data.
- Typical personal use remains within browser `localStorage` capacity.
- Course names may vary because Course is entered as free text.

## 11. Constraints

- The project must remain achievable within the two-day assignment scope.
- The product must contain exactly five core user-facing features.
- The application must be a static browser-side web application.
- The application must run from a simple static web server.
- The application must not require a backend, account, or external database.
- Academic Task data must use browser `localStorage`.
- The UI language is English only.
- Course is entered as free text without a separately managed Course list.

## 12. Success Criteria

The rebuild is successful when:

- The Student completes the main user flow without unexpected errors.
- Empty, whitespace-only, over-limit, missing, and past-date inputs are rejected
  with clear messages.
- Academic Task data and status remain correct after refresh.
- Ordering, filtering, status changes, Overdue behavior, confirmation deletion,
  feedback, and empty states behave according to these requirements.
- All core behavior works offline.
- The application is keyboard-usable.
- The application remains usable at 320px without horizontal scrolling.
- Chrome DevTools shows no unexpected console errors during the main flow.
- New automated tests and browser evidence demonstrate important acceptance
  criteria.

## 13. Out of Scope

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

## 14. Open Questions

There are no unresolved product-requirements questions. Visual design, module
structure, technology details, test seams, and UI copy were finalized during
their approved workflow stages.
