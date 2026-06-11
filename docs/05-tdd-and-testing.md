# TDD and Testing Report

## 1. TDD Cycle Summary

The project used a red-green-refactor workflow for the core task behaviors:

1. **RED:** Write a Jest test that describes one expected user-facing behavior before that behavior is available as testable pure logic. Run the test and confirm it fails for the expected reason.
2. **GREEN:** Add the smallest implementation needed to satisfy the test, then run the suite until the test passes.
3. **REFACTOR:** Improve the structure without changing behavior, then rerun all tests to confirm they remain green.

The task operations were extracted from DOM-dependent code into `src/task-logic.js`. This allows Jest to test task creation, deletion, completion toggling, and filtering without loading a browser. The browser-facing `src/app.js` uses the same tested functions and remains responsible for rendering, events, `localStorage`, and UI state.

Current automated test command:

```bash
npm test
```

Current result:

```text
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
```

Evidence:

* `assets/screenshots/red-failing-test.png`
* `assets/screenshots/green-passing-test.png`

---

## 2. Test Coverage Table

| Function tested                  | What it checks                                                 | Expected result                                             |
| -------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------- |
| `addTask`                        | Creates a task with the submitted title, subject, and due date | The returned list contains a task with the submitted values |
| `addTask`                        | Sets initial status and generated fields                       | `completed` is `false`; `id` and `createdAt` are strings    |
| `addTask`                        | Generates an ID for each new task                              | Two separately created tasks have different IDs             |
| `deleteTask`                     | Removes the task with the matching ID                          | The matching task is absent from the returned list          |
| `deleteTask`                     | Preserves tasks with other IDs                                 | Non-matching tasks remain unchanged                         |
| `toggleComplete`                 | Changes an incomplete task to completed                        | The matching task has `completed: true`                     |
| `toggleComplete`                 | Changes a completed task back to active                        | Toggling again sets `completed: false`                      |
| `filterTasks` with `"active"`    | Selects only incomplete tasks                                  | Only tasks with `completed: false` are returned             |
| `filterTasks` with `"completed"` | Selects only completed tasks                                   | Only tasks with `completed: true` are returned              |
| `filterTasks` with `"all"`       | Returns every task regardless of status                        | All input tasks are returned                                |

---

## 3. TDD Evidence

### TDD Issue 1: User can add a new task

#### Issue tested

Issue 1 — User can add a new task

#### Behavior under test

A student can create a task with a title, subject, optional due date, generated ID, `createdAt` value, and default completed status.

#### Public interface

```js
addTask(tasks, title, subject, dueDate)
```

#### RED

The first task-creation test described the required Task fields before `addTask` existed as an importable pure function:

```js
describe("addTask", () => {
  it("creates a task with the correct fields and completed set to false", () => {
    const result = addTask([], "Write essay", "English", "2026-06-20");
    const task = result[0];

    expect(task).toEqual(expect.objectContaining({
      title: "Write essay",
      subject: "English",
      dueDate: "2026-06-20",
      completed: false
    }));

    expect(task.id).toEqual(expect.any(String));
    expect(task.createdAt).toEqual(expect.any(String));
  });
});
```

Before the pure logic module was available, the test failed because Jest could not use `addTask` as an importable function. This confirmed that the task creation behavior was not yet independently testable outside the browser DOM.

Possible failing result during the RED phase:

```text
TypeError: addTask is not a function
```

RED evidence screenshot:

```text
assets/screenshots/red-failing-test.png
```

#### GREEN

The minimum pure implementation created a valid Task object and returned a new task list:

```js
function addTask(tasks, title, subject, dueDate = "") {
  const cleanTitle = String(title).trim();
  const cleanSubject = String(subject).trim();
  const cleanDueDate = String(dueDate).trim();

  if (!cleanTitle || !cleanSubject) {
    throw new Error("Task title and subject are required.");
  }

  const task = {
    id: createTaskId(),
    title: cleanTitle,
    subject: cleanSubject,
    dueDate: cleanDueDate,
    completed: false,
    createdAt: new Date().toISOString()
  };

  return [task, ...tasks];
}
```

After implementing and exporting this function, the task creation test passed.

GREEN evidence screenshot:

```text
assets/screenshots/green-passing-test.png
```

#### REFACTOR

The task creation logic was moved into `src/task-logic.js` so it could be tested separately from DOM rendering and browser storage. This made the logic reusable by both Jest tests and the browser app.

#### Final result

Pass.

---

### TDD Issue 2: User can mark a task as completed

#### Issue tested

Issue 3 — User can mark a task as completed

#### Behavior under test

A student can toggle a task from active to completed and then toggle it back to active.

#### Public interface

```js
toggleComplete(tasks, id)
```

#### RED

The test expected the matching task's `completed` value to change when `toggleComplete` was called. Before the pure logic function was available, this behavior could not be tested without depending on the browser UI.

```js
describe("toggleComplete", () => {
  it("flips completed from false to true and back", () => {
    const tasks = addTask([], "Read chapter", "Software Engineering", "2026-06-25");
    const taskId = tasks[0].id;

    const completedTasks = toggleComplete(tasks, taskId);
    expect(completedTasks[0].completed).toBe(true);

    const activeTasks = toggleComplete(completedTasks, taskId);
    expect(activeTasks[0].completed).toBe(false);
  });
});
```

Possible failing result during the RED phase:

```text
TypeError: toggleComplete is not a function
```

RED evidence screenshot:

```text
assets/screenshots/red-failing-test.png
```

#### GREEN

The minimum implementation returned a new task list and changed only the matching task:

```js
function toggleComplete(tasks, id) {
  return tasks.map((task) => {
    if (task.id !== id) {
      return task;
    }

    return {
      ...task,
      completed: !task.completed
    };
  });
}
```

After implementing this function, the completion toggle test passed together with the other task logic tests.

GREEN evidence screenshot:

```text
assets/screenshots/green-passing-test.png
```

#### REFACTOR

The function was written without mutating the original task array. This made the behavior safer, easier to test, and easier to reuse in the browser app.

#### Final result

Pass.

---

## 4. Browser Verification Checklist

Manual checks completed in Chrome using the running static app:

* [x] Add a task and confirm it appears in the list.
* [x] Refresh the page and confirm tasks are still there through `localStorage`.
* [x] Mark a task complete and confirm its visual appearance changes.
* [x] Delete a task and confirm it disappears.
* [x] Filter by Active and confirm only incomplete tasks are shown.
* [x] Filter by Completed and confirm only completed tasks are shown.
* [x] Open Chrome DevTools Console and confirm there are no unexpected errors.
* [x] Resize the window to 375px wide and confirm the layout remains usable.

Evidence:

* `assets/screenshots/app-working-browser.png`
* `assets/screenshots/devtools-localstorage.png`
* `assets/screenshots/devtools-console.png`
* `assets/screenshots/mobile-375px.png`

---

## 5. Chrome DevTools Notes

### Test Environment

* Browser: Chrome
* Operating system: Windows
* Test date: June 11, 2026
* App URL: `http://127.0.0.1:5500/`

### Console Check

* Unexpected errors found: No
* Warnings found: No blocking warnings found
* Notes: The Console was checked after adding a task, marking a task complete, using the Active and Completed filters, and deleting a task.

Evidence:

```text
assets/screenshots/devtools-console.png
```

### Local Storage Check

* `student-tasks` key present: Yes
* Added tasks persisted after refresh: Yes
* Completed status persisted after refresh: Yes
* Deleted tasks remained deleted after refresh: Yes
* Notes: Task data was stored in browser `localStorage` using the `student-tasks` key.

Evidence:

```text
assets/screenshots/devtools-localstorage.png
```

### Responsive Check at 375px

* Form usable: Yes
* Filter buttons usable: Yes
* Task cards readable: Yes
* Horizontal overflow found: No
* Notes: The layout was tested at 375px width and remained usable on a mobile-sized viewport.

Evidence:

```text
assets/screenshots/mobile-375px.png
```

### Final Browser Verification Result

* Result: Pass
* Known limitations: Data is stored only in the current browser. It can be removed if the user clears browser storage.
* Screenshot or evidence path:

  * `assets/screenshots/red-failing-test.png`
  * `assets/screenshots/green-passing-test.png`
  * `assets/screenshots/app-working-browser.png`
  * `assets/screenshots/devtools-localstorage.png`
  * `assets/screenshots/devtools-console.png`
  * `assets/screenshots/mobile-375px.png`

---

## 6. Final Testing Result

The automated Jest tests passed, and the browser verification was completed manually in Chrome. The application successfully supports adding tasks, viewing tasks, marking tasks as completed, deleting tasks, filtering by status, and persisting data through `localStorage`.

Final result: Pass.
