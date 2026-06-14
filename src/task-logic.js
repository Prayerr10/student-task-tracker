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

  function isValidCalendarDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    return date.getUTCFullYear() === year
      && date.getUTCMonth() === month - 1
      && date.getUTCDate() === day;
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

  function validateAcademicTaskInput(input, today) {
    const problems = {};

    if (!String(input.title).trim()) {
      problems.title = "Task Title is required.";
    } else if (String(input.title).length > 120) {
      problems.title = "Task Title must be 120 characters or fewer.";
    }

    if (!String(input.course).trim()) {
      problems.course = "Course is required.";
    } else if (String(input.course).length > 80) {
      problems.course = "Course must be 80 characters or fewer.";
    }

    if (!String(input.dueDate).trim()) {
      problems.dueDate = "Due Date is required.";
    } else if (!isValidCalendarDate(String(input.dueDate))) {
      problems.dueDate = "Enter a valid Due Date.";
    } else if (today && input.dueDate < today) {
      problems.dueDate = "Due Date cannot be in the past.";
    }

    return problems;
  }

  function createValidationFeedback(problems) {
    const invalidFields = Object.keys(problems);

    return {
      firstInvalidField: invalidFields[0],
      summary: `Please correct ${invalidFields.length} ${invalidFields.length === 1 ? "field" : "fields"} before adding the Academic Task.`
    };
  }

  function orderAcademicTasks(academicTasks) {
    return [...academicTasks].sort((first, second) => (
      first.dueDate.localeCompare(second.dueDate)
      || first.createdAt.localeCompare(second.createdAt)
    ));
  }

  function isAcademicTaskOverdue(academicTask, today) {
    return academicTask.status === "Pending" && academicTask.dueDate < today;
  }

  function formatDueDate(dueDate) {
    const [year, month, day] = dueDate.split("-").map(Number);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(new Date(year, month - 1, day));
  }

  return {
    createAcademicTask,
    createValidationFeedback,
    formatDueDate,
    isAcademicTaskOverdue,
    orderAcademicTasks,
    validateAcademicTaskInput
  };
}));
