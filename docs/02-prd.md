# Student Task Tracker Product Requirements Document

## 1. Product Overview

Student Task Tracker is a simple browser-based web app for university and college students to manage assignments, deadlines, and study tasks across multiple subjects. It provides one place to add, view, complete, delete, and filter tasks.

The app requires no login, works offline, stores data in browser `localStorage`, and can be deployed as static HTML, CSS, and JavaScript.

## 2. Goals

- Help students avoid forgetting academic deadlines.
- Give students a clear view of pending and completed tasks.
- Make common task-management actions quick and easy.
- Preserve task data after page refreshes.
- Deliver a usable, responsive product within two days.

## 3. Non-Goals

- Supporting accounts, authentication, or multiple users.
- Synchronizing tasks between devices or browsers.
- Replacing a full calendar or learning management system.
- Supporting collaboration, task sharing, or notifications.
- Providing advanced task planning or analytics.

## 4. Target Users

University and college students who manage assignments, deadlines, and study tasks across multiple subjects and want a simple tool that works without an account or internet connection.

## 5. User Stories

- As a student, I want to add a task with a title, subject, and due date, so that I can remember my academic work.
- As a student, I want to view all my tasks in one list, so that I can understand my current workload.
- As a student, I want to mark a task as complete, so that I can track the work I have finished.
- As a student, I want to delete a task, so that I can remove work I no longer need to track.
- As a student, I want to filter tasks by status, so that I can focus on pending or completed work.
- As a student, I want my tasks to remain after refreshing the page, so that I do not lose my task list.

## 6. Core Features

1. **Add Task:** Create a task with a title, subject, and due date.
2. **View Task List:** Display all saved tasks and their important details.
3. **Mark Complete:** Change a pending task to completed and show its completed state.
4. **Delete Task:** Permanently remove an unwanted task.
5. **Filter by Status:** Show all, pending, or completed tasks.

## 7. Acceptance Criteria

### Feature 1: Add Task

- A user can submit a task containing a title, subject, and valid due date.
- A newly added task appears in the task list as pending.
- Required fields are clearly labeled.
- Submission is prevented and a clear message is shown when a required field is empty or invalid.
- The new task is saved to `localStorage`.

### Feature 2: View Task List

- Each task displays its title, subject, due date, and completion status.
- Saved tasks load from `localStorage` when the app opens or refreshes.
- Completed tasks are visually distinguishable from pending tasks.
- A clear empty-state message appears when there are no tasks.

### Feature 3: Mark Complete

- A user can mark a pending task as completed.
- The task's visual status updates immediately.
- The completed status persists after a page refresh.
- Completing one task does not change other tasks.

### Feature 4: Delete Task

- A user can delete an individual task.
- The deleted task disappears from the task list immediately.
- The deleted task does not return after a page refresh.
- Deleting one task does not remove other tasks.

### Feature 5: Filter by Status

- A user can select All, Pending, or Completed filters.
- All shows every saved task.
- Pending shows only tasks that are not completed.
- Completed shows only completed tasks.
- The app shows a clear empty-state message when no tasks match the selected filter.

## 8. Success Criteria

- Users can add, view, complete, delete, and filter tasks without unexpected errors.
- Task data and completion status persist after a page refresh.
- Invalid task input is rejected with a clear message.
- All core features work offline in a modern browser.
- The main workflow is usable on desktop and mobile-sized viewports.
- Browser testing confirms no unexpected console errors during the main workflow.

## 9. Risks

- Users may lose data if they clear browser storage or use a different browser or device.
- Invalid or corrupted `localStorage` data could prevent tasks from loading correctly.
- Browser-specific behavior may affect date input or storage.
- Additional feature requests could make the project too large for the two-day schedule.
- Users may expect notifications or cross-device synchronization that the app does not provide.

## 10. Out-of-Scope Items

- User registration, login, and profiles.
- Backend services, databases, and cloud synchronization.
- Editing existing tasks.
- Task reminders, notifications, and calendar integration.
- Recurring tasks, subtasks, priorities, tags, notes, and attachments.
- Sharing tasks or collaborating with other users.
- Advanced sorting, search, analytics, and reporting.
- Native mobile applications.
