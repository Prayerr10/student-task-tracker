(function taskLogicModule(root, factory) {
  const taskLogic = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = taskLogic;
  } else {
    root.TaskLogic = taskLogic;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function createTaskLogic() {
  "use strict";

  function createTaskId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }

    return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

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

  function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
  }

  function toggleComplete(tasks, id) {
    return tasks.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function filterTasks(tasks, status) {
    if (status === "active") {
      return tasks.filter((task) => !task.completed);
    }

    if (status === "completed") {
      return tasks.filter((task) => task.completed);
    }

    return [...tasks];
  }

  return {
    addTask,
    deleteTask,
    toggleComplete,
    filterTasks
  };
}));
