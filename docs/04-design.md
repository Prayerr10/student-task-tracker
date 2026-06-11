# Student Task Tracker Design

## 1. Technology Stack Decision

The app uses:

* **HTML:** Semantic page structure and accessible form controls.
* **CSS:** Responsive layout and visual states for active, completed, and filtered tasks.
* **Vanilla JavaScript:** Task creation, rendering, completion, deletion, filtering, validation, and browser storage behavior.
* **`localStorage`:** Browser-based task persistence.
* **Jest:** Unit testing for pure task logic.
* **No frontend framework or build tool:** The source files run directly in a modern browser.

This stack fits a two-day project because it has minimal setup, no build configuration for the browser app, and no backend to deploy or maintain. The project can focus on the required user-facing behavior, tests, documentation, and browser verification. Static files also support offline use and simple local execution.

## 2. File and Module Structure

```text
src/
├── index.html
├── style.css
├── app.js
└── task-logic.js

tests/
└── task.test.js
```

### Source Files

* `src/index.html`: Defines the app's semantic UI structure and loads the CSS and JavaScript files.
* `src/style.css`: Styles the layout, form, filter controls, task cards, completion states, empty states, and responsive behavior.
* `src/app.js`: Initializes the app, handles DOM events, manages the selected filter, renders the user interface, and saves/loads tasks using `localStorage`.
* `src/task-logic.js`: Contains pure task logic for creating, deleting, completing, and filtering tasks. These functions can be imported by Jest tests without loading the browser DOM.

### Test Files

* `tests/task.test.js`: Uses Jest to test public task behaviors such as task creation, deletion, completion toggling, and filtering.

## 3. Data Model

Each task is represented by the following object:

```json
{
  "id": "task-1718000000000",
  "title": "Complete software engineering assignment",
  "subject": "Software Engineering",
  "dueDate": "2026-06-13",
  "completed": false,
  "createdAt": "2026-06-11T09:00:00.000Z"
}
```

| Field       | Type    | Purpose                                                            |
| ----------- | ------- | ------------------------------------------------------------------ |
| `id`        | String  | Uniquely identifies the task for update and deletion operations.   |
| `title`     | String  | Describes the academic work to complete.                           |
| `subject`   | String  | Identifies the related course or subject.                          |
| `dueDate`   | String  | Stores the optional due date in `YYYY-MM-DD` format when provided. |
| `completed` | Boolean | Indicates whether the task is active or completed.                 |
| `createdAt` | String  | Stores the creation time as an ISO timestamp.                      |

Tasks are stored in `localStorage` as a JSON array under the key:

```text
student-tasks
```

## 4. User Flow

### A. Add a Task

1. The student enters a title, subject, and optional due date in the Add Task Form.
2. The student submits the form.
3. The app validates the required title and subject fields.
4. If validation fails, the app shows a clear message and does not create a task.
5. If validation succeeds, the app creates an active Task object with a unique ID and creation timestamp.
6. The app saves the updated task collection to `localStorage`.
7. The app clears the form and renders the new task in the current filtered view.

### B. Mark a Task Complete

1. The student selects the completion checkbox on a Task Card.
2. The app finds the task by its ID and toggles the `completed` value.
3. The app saves the updated task collection to `localStorage`.
4. The app re-renders the list so the completed style and current filter are applied.

### C. Delete a Task

1. The student selects the delete button on a Task Card.
2. The app removes the task with the matching ID from the task collection.
3. The app saves the updated collection to `localStorage`.
4. The app re-renders the list and shows an Empty State if no tasks match the current filter.

### D. Filter Tasks

1. The student selects All, Active, or Completed from the Filter Bar.
2. The app updates the selected filter and its visible selected state.
3. The app filters the in-memory task collection by completion status.
4. The Task List renders only matching tasks or displays a filtered Empty State.

The filter UI uses three clearly labeled buttons. Buttons are simple to implement, remain visible on mobile, and make the selected state easy to communicate.

## 5. Component Breakdown

### Header

Displays the product name and a short description of the app's purpose.

### Add Task Form

Contains labeled fields for title, subject, and optional due date, a submit button, and an area for validation messages. It submits valid task data to the app logic.

### Filter Bar

Contains All, Active, and Completed buttons. It indicates the selected filter and requests a re-render when the selection changes.

### Task List

Contains the Task Cards that match the selected filter. It is responsible for showing either task results or the Empty State.

### Task Card

Displays one task's title, subject, due date, and status. It provides controls to mark a task complete and delete the task.

### Empty State

Displays a clear message when there are no tasks or when no tasks match the selected filter.

## 6. Key Trade-offs

1. **`localStorage` instead of a backend:** This enables offline use and fast static deployment, but data is limited to one browser and can be lost if browser storage is cleared.
2. **Vanilla JavaScript instead of React or another framework:** This reduces setup and implementation overhead for a small two-day app, but requires manual DOM rendering and state coordination.
3. **Pure task logic separated from UI code:** Moving task operations into `src/task-logic.js` improves testability and allows Jest to test the core behavior without a browser, while `src/app.js` remains responsible for rendering, events, and `localStorage`.
