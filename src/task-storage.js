(function taskStorageModule(root, factory) {
  const taskStorage = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = taskStorage;
  } else {
    root.TaskStorage = taskStorage;
  }
}(typeof globalThis !== "undefined" ? globalThis : this, function createTaskStorage() {
  "use strict";

  const STORAGE_KEY = "student-task-tracker:v1";

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

  function isValidStoredTask(value) {
    return Boolean(value)
      && typeof value === "object"
      && !Array.isArray(value)
      && typeof value.id === "string"
      && typeof value.title === "string"
      && value.title.trim().length > 0
      && typeof value.course === "string"
      && value.course.trim().length > 0
      && typeof value.dueDate === "string"
      && isValidCalendarDate(value.dueDate)
      && (value.status === "Pending" || value.status === "Completed")
      && typeof value.createdAt === "string"
      && value.createdAt.trim().length > 0;
  }

  function loadAcademicTasks(storage) {
    try {
      const serialized = storage.getItem(STORAGE_KEY);

      if (!serialized) {
        return { academicTasks: [], warning: null };
      }

      const parsed = JSON.parse(serialized);

      if (!parsed || typeof parsed !== "object" || parsed.version !== 1 || !Array.isArray(parsed.academicTasks)) {
        return {
          academicTasks: [],
          warning: "Stored Academic Tasks could not be read. Starting with an empty list."
        };
      }

      const academicTasks = parsed.academicTasks.filter(isValidStoredTask);
      const invalidCount = parsed.academicTasks.length - academicTasks.length;

      return {
        academicTasks,
        warning: invalidCount > 0
          ? "Some stored Academic Tasks were ignored during recovery."
          : null
      };
    } catch (error) {
      void error;
      return {
        academicTasks: [],
        warning: "Stored Academic Tasks could not be read. Starting with an empty list."
      };
    }
  }

  function saveAcademicTasks(storage, academicTasks) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify({
        version: 1,
        academicTasks
      }));

      return { success: true, warning: null };
    } catch (error) {
      void error;
      return {
        success: false,
        warning: "Could not save Academic Tasks. Changes may be lost."
      };
    }
  }

  return {
    STORAGE_KEY,
    loadAcademicTasks,
    saveAcademicTasks
  };
}));
