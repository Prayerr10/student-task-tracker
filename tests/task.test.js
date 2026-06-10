const {
  addTask,
  deleteTask,
  toggleComplete,
  filterTasks
} = require("../src/task-logic");

const activeTask = {
  id: "task-active",
  title: "Write report",
  subject: "Software Engineering",
  dueDate: "2026-06-20",
  completed: false,
  createdAt: "2026-06-11T09:00:00.000Z"
};

const completedTask = {
  id: "task-completed",
  title: "Review notes",
  subject: "Algorithms",
  dueDate: "",
  completed: true,
  createdAt: "2026-06-10T09:00:00.000Z"
};

// RED: task creation did not exist outside DOM code.
// GREEN: addTask returns a new list containing a complete Task object.
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

  it("generates a unique id for each new task", () => {
    const firstTask = addTask([], "First task", "Math")[0];
    const secondTask = addTask([], "Second task", "Science")[0];

    expect(firstTask.id).not.toBe(secondTask.id);
  });
});

// RED: deletion depended on shared browser state.
// GREEN: deleteTask returns a new list without only the matching task.
describe("deleteTask", () => {
  it("removes the task with the matching id without removing others", () => {
    const result = deleteTask([activeTask, completedTask], activeTask.id);

    expect(result).toEqual([completedTask]);
  });
});

// RED: completion toggling depended on shared browser state.
// GREEN: toggleComplete returns a new list with the matching status flipped.
describe("toggleComplete", () => {
  it("flips completed from false to true and back", () => {
    const completed = toggleComplete([activeTask], activeTask.id);
    const activeAgain = toggleComplete(completed, activeTask.id);

    expect(completed[0].completed).toBe(true);
    expect(activeAgain[0].completed).toBe(false);
  });
});

// RED: filtering could not be called without loading the DOM application.
// GREEN: filterTasks returns tasks matching the requested status.
describe("filterTasks", () => {
  const tasks = [activeTask, completedTask];

  it('returns only incomplete tasks for "active"', () => {
    expect(filterTasks(tasks, "active")).toEqual([activeTask]);
  });

  it('returns only completed tasks for "completed"', () => {
    expect(filterTasks(tasks, "completed")).toEqual([completedTask]);
  });

  it('returns all tasks for "all"', () => {
    expect(filterTasks(tasks, "all")).toEqual(tasks);
  });
});
