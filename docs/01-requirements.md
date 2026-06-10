# Student Task Tracker Requirements

## 1. Product Idea

Student Task Tracker is a simple browser-based web application that helps university and college students manage academic assignments, deadlines, and study tasks. Students can record tasks by subject and due date, review their pending work, mark completed tasks, and remove tasks they no longer need.

The application works entirely in the browser, requires no account, and stores task data locally on the student's device.

## 2. Problem Statement

Students often manage work across multiple subjects and may forget deadlines or lose track of pending tasks. Information may be scattered across course platforms, notes, messages, and calendars, making it difficult to see all outstanding academic work in one place.

Student Task Tracker provides a single, simple task list that allows students to record and manage their academic responsibilities without requiring an internet connection or account.

## 3. Target Users

The primary users are university and college students who:

- Need to track assignments, deadlines, and study tasks.
- Study multiple subjects at the same time.
- Want a simple task-management tool without account registration.
- Need access to their task list while offline.

## 4. User Goals

Users should be able to:

- Quickly record a new academic task.
- Associate each task with a subject and due date.
- View all recorded tasks in one place.
- Identify which tasks are pending and which are completed.
- Mark tasks as completed after finishing them.
- Delete tasks that are no longer relevant.
- Return to the app after a page refresh and find their task data unchanged.

## 5. Functional Requirements

1. **Add a task:** The app must allow a user to create a task by entering a title, subject, and due date.
2. **Validate task input:** The app must prevent a task from being added when any required field is empty or invalid and must show a clear validation message.
3. **View all tasks:** The app must display all saved tasks, including each task's title, subject, due date, and completion status.
4. **Mark a task as completed:** The app must allow a user to change a pending task to completed.
5. **Show completion status:** The app must visually distinguish completed tasks from pending tasks.
6. **Delete a task:** The app must allow a user to permanently remove a task they no longer need.
7. **Persist task data:** The app must save task changes to `localStorage` after tasks are added, completed, or deleted.
8. **Restore task data:** The app must load and display previously saved tasks from `localStorage` when the page is opened or refreshed.
9. **Show an empty state:** The app must display a clear message when no tasks have been added.

## 6. Non-Functional Requirements

1. **Offline availability:** All core features must work without an internet connection after the application files are available on the device.
2. **Usability:** The interface must be simple and understandable without instructions, with clearly labeled inputs and actions.
3. **Performance:** Task creation, completion, deletion, and display updates should occur immediately under normal use.
4. **Responsive layout:** The app must remain usable on both desktop and mobile-sized browser viewports.
5. **Reliability:** Valid user actions must not cause unexpected errors or loss of previously saved task data.
6. **Browser compatibility:** The app must work in a modern browser that supports HTML5, CSS, JavaScript, and `localStorage`.

## 7. Assumptions

- Each student uses the app on one browser and device.
- Users have a modern browser with JavaScript and `localStorage` enabled.
- Task titles, subjects, and due dates are sufficient for the initial version.
- Each task belongs to one subject and has one due date.
- Completed tasks remain visible until the user deletes them.
- The number of tasks stored by a typical student will remain within browser `localStorage` limits.
- Users understand that clearing browser storage may remove their task data.

## 8. Constraints

- The app must work offline.
- The app must not require user registration or login.
- All task data must be stored in browser `localStorage`.
- The app must be deployable as static HTML, CSS, and JavaScript files.
- The app must not depend on a backend server, external database, or cloud synchronization service.
- The initial scope must remain small enough to design, implement, test, and document within two days.

## 9. Open Questions

- Should completed tasks be shown together with pending tasks or in a separate section?
- Should tasks be sorted automatically by due date, creation time, or completion status?
- Should users be able to edit an existing task after creating it?
- Should overdue tasks receive a distinct visual indicator?
- Should the app ask for confirmation before permanently deleting a task?
- What should happen when a user selects a due date in the past?
- Should subject names use free-text input or a reusable list of subjects?
- Should users be able to mark completed tasks as pending again?
