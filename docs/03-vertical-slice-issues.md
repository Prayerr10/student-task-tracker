# Student Task Tracker Vertical-Slice Issues

---
## Issue 1: User can add a new task

### Type
AFK

### What to build
Allow a student to add a new academic task by entering a title, subject, and due date. The app validates the input and shows the newly created task as active in the task list.

### User stories covered
- As a student, I want to add a task with a title, subject, and due date, so that I can remember my academic work.

### Acceptance criteria
- [ ] The task form provides clearly labeled title, subject, and due date fields.
- [ ] Submitting valid input creates one new active task and displays it in the task list.
- [ ] Submitting an empty or invalid required field does not create a task and shows a clear validation message.
- [ ] The form is cleared after a task is successfully added.

### Blocked by
None

### Testing notes
Submit the form with valid values and confirm one active task appears with the correct details. Test each missing or invalid required field and confirm the task is rejected with a visible message.

### AI usage notes
AI may help draft form validation and task-creation tests. Manually verify field labels, validation messages, due-date handling, and that repeated submissions do not create unintended duplicate tasks.
---

---
## Issue 2: User can view the task list

### Type
AFK

### What to build
Display the student's tasks in a clear list so they can review each task's title, subject, due date, and current status. Show an informative empty state when no tasks exist.

### User stories covered
- As a student, I want to view all my tasks in one list, so that I can understand my current workload.

### Acceptance criteria
- [ ] Every task in the list displays its title, subject, due date, and status.
- [ ] Active and completed tasks have visually distinct statuses.
- [ ] A clear empty-state message appears when there are no tasks.
- [ ] The task list remains usable on desktop and mobile-sized viewports.

### Blocked by
Issue 1

### Testing notes
Verify the empty state first, then add multiple tasks and confirm every task and detail appears correctly. Check the list at desktop and mobile viewport sizes.

### AI usage notes
AI may help suggest accessible task-list markup and responsive layout checks. Manually verify readability, status distinction, displayed task values, and mobile usability.
---

---
## Issue 3: User can mark a task as completed

### Type
AFK

### What to build
Allow a student to mark an active task as completed directly from the task list and immediately see its completed status.

### User stories covered
- As a student, I want to mark a task as complete, so that I can track the work I have finished.

### Acceptance criteria
- [ ] Each active task provides a clear control for marking it as completed.
- [ ] Using the control immediately changes only the selected task to completed.
- [ ] The completed task is visually distinguishable from active tasks.
- [ ] Completing a task does not change its title, subject, or due date.

### Blocked by
Issue 2

### Testing notes
Create at least two tasks, complete one, and confirm only that task changes status and appearance while its details remain unchanged.

### AI usage notes
AI may help write status-update logic and tests that target user-visible behavior. Manually verify that the control is understandable and that only the selected task changes.
---

---
## Issue 4: User can delete a task

### Type
AFK

### What to build
Allow a student to permanently remove an individual task from the task list when it is no longer needed.

### User stories covered
- As a student, I want to delete a task, so that I can remove work I no longer need to track.

### Acceptance criteria
- [ ] Each task provides a clear delete control.
- [ ] Using the delete control immediately removes only the selected task from the list.
- [ ] Deleting the final task displays the empty-state message.
- [ ] Deleting one task does not change or remove any other task.

### Blocked by
Issue 2

### Testing notes
Create multiple tasks, delete one, and confirm the correct task disappears while the others remain unchanged. Delete the remaining tasks and confirm the empty state appears.

### AI usage notes
AI may help draft deletion logic and tests for removing the correct task. Manually verify the delete control is clear and that no unrelated tasks are affected.
---

---
## Issue 5: User can filter tasks by status

### Type
HITL

### What to build
Allow a student to switch between All, Active, and Completed views so they can focus on the tasks relevant to their current goal. Before implementation, a human must decide whether the filter UI uses buttons, tabs, or a select menu.

### User stories covered
- As a student, I want to filter tasks by status, so that I can focus on active or completed work.

### Acceptance criteria
- [ ] A human-selected filter pattern provides All, Active, and Completed options.
- [ ] All displays every task, Active displays only incomplete tasks, and Completed displays only completed tasks.
- [ ] The currently selected filter is clearly indicated.
- [ ] A clear empty-state message appears when no tasks match the selected filter.

### Blocked by
Issue 3

### Testing notes
After the human chooses the filter UI pattern, create active and completed tasks and verify the results for every filter. Confirm the selected state and filtered empty state are clear.

### AI usage notes
AI may compare accessible UI patterns and help implement the selected behavior. A human must choose the UI pattern and manually verify clarity, accessibility, and mobile usability.
---

---
## Issue 6: Task data persists after page refresh using localStorage

### Type
AFK

### What to build
Store task data in browser `localStorage` so added, completed, and deleted tasks retain their correct state after the page is refreshed or reopened.

### User stories covered
- As a student, I want my tasks to remain after refreshing the page, so that I do not lose my task list.

### Acceptance criteria
- [ ] Added tasks remain visible with the correct details after a page refresh.
- [ ] Completed tasks remain completed after a page refresh.
- [ ] Deleted tasks do not return after a page refresh.
- [ ] Missing or invalid stored data is handled without an unexpected app error.

### Blocked by
Issue 4

### Testing notes
Add multiple tasks, complete one, delete another, refresh the page, and confirm the remaining data and statuses are correct. Test with empty and malformed `localStorage` data and check the browser console.

### AI usage notes
AI may help draft serialization, restoration, and malformed-data tests. Manually inspect `localStorage`, refresh behavior, and the browser console to confirm data integrity and error handling.
---
