# Student Task Tracker Design

## 1. Technology Stack Decision

The app will use:

- **HTML:** Semantic page structure and accessible form controls.
- **CSS:** Responsive layout and visual states for active, completed, and filtered tasks.
- **Vanilla JavaScript:** Task creation, rendering, completion, deletion, filtering, validation, and storage behavior.
- **`localStorage`:** Browser-based task persistence.
- **No frameworks or build tools:** The source files run directly in a modern browser.

This stack fits a two-day project because it has minimal setup, no build configuration, and no backend to deploy or maintain. The team can focus on the required user-facing behavior, tests, and browser verification. Static files also support offline use and simple deployment.

## 2. File and Module Structure

```text
src/
├── index.html
├── styles.css
├── app.js
├── tasks.js
└── storage.js
tests/
├── test-runner.html
├── tasks.test.js
└── storage.test.js
```

### Source Files

- `src/index.html`: Defines the app's semantic UI structure and loads the CSS and JavaScript modules.
- `src/styles.css`: Styles the layout, form, filter controls, task cards, completion states, empty states, and responsive behavior.
- `src/app.js`: Initializes the app, handles DOM events, tracks the selected filter, and renders the user interface.
- `src/tasks.js`: Contains task creation, validation, completion, deletion, and filtering logic.
- `src/storage.js`: Reads and writes the task collection using `localStorage` and handles invalid stored data.

### Test Files

- `tests/test-runner.html`: Loads the browser-based test files and displays test results without a build tool.
- `tests/tasks.test.js`: Tests public task behaviors such as validation, creation, completion, deletion, and filtering.
- `tests/storage.test.js`: Tests saving, loading, and handling invalid `localStorage` data.

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

| Field | Type | Purpose |
|---|---|---|
| `id` | String | Uniquely identifies the task for update and deletion operations. |
| `title` | String | Describes the academic work to complete. |
| `subject` | String | Identifies the related course or subject. |
| `dueDate` | String | Stores the due date in `YYYY-MM-DD` format. |
| `completed` | Boolean | Indicates whether the task is active or completed. |
| `createdAt` | String | Stores the creation time as an ISO timestamp. |

Tasks are stored in `localStorage` as a JSON array under a single key such as `student-task-tracker.tasks`.

## 4. User Flow

### A. Add a Task

1. The student enters a title, subject, and due date in the Add Task Form.
2. The student submits the form.
3. The app validates all required values.
4. If validation fails, the app shows a clear message and does not create a task.
5. If validation succeeds, the app creates an active Task object with a unique ID and creation timestamp.
6. The app saves the updated task collection to `localStorage`.
7. The app clears the form and renders the new task in the current filtered view.

### B. Mark a Task Complete

1. The student selects the completion control on an active Task Card.
2. The app finds the task by its ID and changes `completed` to `true`.
3. The app saves the updated task collection to `localStorage`.
4. The app re-renders the list so the completed style and current filter are applied.

### C. Delete a Task

1. The student selects the delete control on a Task Card.
2. The app removes the task with the matching ID from the task collection.
3. The app saves the updated collection to `localStorage`.
4. The app re-renders the list and shows an Empty State if no tasks match the current filter.

### D. Filter Tasks

1. The student selects All, Active, or Completed from the Filter Bar.
2. The app updates the selected filter and its visible selected state.
3. The app filters the in-memory task collection by completion status.
4. The Task List renders only matching tasks or displays a filtered Empty State.

The filter UI will use three clearly labeled buttons. Buttons are simple to implement, remain visible on mobile, and make the selected state easy to communicate.

## 5. Component Breakdown

### Header

Displays the product name and a short description of the app's purpose.

### Add Task Form

Contains labeled fields for title, subject, and due date, a submit button, and an area for validation messages. It submits valid task data to the app logic.

### Filter Bar

Contains All, Active, and Completed buttons. It indicates the selected filter and requests a re-render when the selection changes.

### Task List

Contains the Task Cards that match the selected filter. It is responsible for showing either task results or the Empty State.

### Task Card

Displays one task's title, subject, due date, and status. It provides controls to mark an active task complete and delete the task.

### Empty State

Displays a clear message when there are no tasks or when no tasks match the selected filter.

## 6. Key Trade-offs

1. **`localStorage` instead of a backend:** This enables offline use and fast static deployment, but data is limited to one browser and can be lost if browser storage is cleared.
2. **Vanilla JavaScript instead of React or another framework:** This reduces setup and implementation overhead for a small two-day app, but requires manual DOM rendering and state coordination.
3. **Small separate modules instead of one JavaScript file:** Separating task logic, storage, and UI behavior improves testability and clarity, but introduces slightly more file and import management.
