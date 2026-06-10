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

## 2. Test Coverage Table

| Function tested | What it checks | Expected result |
|---|---|---|
| `addTask` | Creates a task with the submitted title, subject, and due date | The returned list contains a task with the submitted values |
| `addTask` | Sets initial status and generated fields | `completed` is `false`; `id` and `createdAt` are strings |
| `addTask` | Generates an ID for each new task | Two separately created tasks have different IDs |
| `deleteTask` | Removes the task with the matching ID | The matching task is absent from the returned list |
| `deleteTask` | Preserves tasks with other IDs | Non-matching tasks remain unchanged |
| `toggleComplete` | Changes an incomplete task to completed | The matching task has `completed: true` |
| `toggleComplete` | Changes a completed task back to active | Toggling again sets `completed: false` |
| `filterTasks` with `"active"` | Selects only incomplete tasks | Only tasks with `completed: false` are returned |
| `filterTasks` with `"completed"` | Selects only completed tasks | Only tasks with `completed: true` are returned |
| `filterTasks` with `"all"` | Returns every task regardless of status | All input tasks are returned |

## 3. TDD Evidence

### RED Phase

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

Before the pure logic module existed, this test could not import `addTask`. Jest would fail before running the assertion with an error similar to:

```text
Cannot find module '../src/task-logic' from 'tests/task.test.js'
```

If the module existed but did not export `addTask`, the call would fail with:

```text
TypeError: addTask is not a function
```

This confirmed that task creation was still coupled to browser DOM code and was not independently testable.

### GREEN Phase

The minimum pure implementation creates a valid Task object and returns a new task list:

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

After implementing and exporting this function, the task-creation test passed. The same approach was then applied to `deleteTask`, `toggleComplete`, and `filterTasks`.

### REFACTOR

After the tests passed, task operations were moved into the shared `src/task-logic.js` module. The functions now accept a task array and return a new array instead of directly mutating browser state or rendering the DOM.

This refactor improved the project by:

- Separating business logic from UI and storage concerns.
- Making the same logic usable by both Jest and the browser app.
- Avoiding direct mutation of the original task array.
- Keeping `src/app.js` focused on event handling, rendering, and persistence.

All seven tests remained passing after the refactor.

## 4. Browser Verification Checklist

Complete these checks manually in Chrome using the running static app:

- [ ] Add a task and confirm it appears in the list.
- [ ] Refresh the page and confirm tasks are still there through `localStorage`.
- [ ] Mark a task complete and confirm its visual appearance changes.
- [ ] Delete a task and confirm it disappears.
- [ ] Filter by Active and confirm only incomplete tasks are shown.
- [ ] Filter by Completed and confirm only completed tasks are shown.
- [ ] Open Chrome DevTools Console and confirm there are no unexpected errors.
- [ ] Resize the window to 375px wide and confirm the layout remains usable.

## 5. Chrome DevTools Notes

Complete this section manually after browser testing.

### Test Environment

- Chrome version:
- Operating system:
- Test date:
- App URL or file path:

### Console Check

- Unexpected errors found:
- Warnings found:
- Notes:

### Local Storage Check

- `student-tasks` key present:
- Added tasks persisted after refresh:
- Completed status persisted after refresh:
- Deleted tasks remained deleted after refresh:
- Notes:

### Responsive Check at 375px

- Form usable:
- Filter buttons usable:
- Task cards readable:
- Horizontal overflow found:
- Notes:

### Final Browser Verification Result

- Result: Pass / Fail / Pass with known limitations
- Known limitations:
- Screenshot or evidence path:
