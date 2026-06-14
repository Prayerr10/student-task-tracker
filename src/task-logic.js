(function academicTaskDomainModule(root, factory) {
  const academicTaskDomain = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = academicTaskDomain;
  } else {
    root.AcademicTaskDomain = academicTaskDomain;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function createAcademicTaskDomain() {
  "use strict";

  function createId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }

    return `academic-task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function createAcademicTask(academicTasks, input) {
    const academicTask = {
      id: createId(),
      title: input.title,
      course: input.course,
      dueDate: input.dueDate,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    return [...academicTasks, academicTask];
  }

  return {
    createAcademicTask
  };
}));
