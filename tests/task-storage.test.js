const { STORAGE_KEY, loadAcademicTasks, saveAcademicTasks } = require("../src/task-storage");

describe("loadAcademicTasks", () => {
  it("restores valid Academic Tasks without a warning", () => {
    const storage = {
      getItem: jest.fn(() => JSON.stringify({
        version: 1,
        academicTasks: [{
          id: "task-1",
          title: "Research outline",
          course: "Software Engineering",
          dueDate: "2026-06-20",
          status: "Pending",
          createdAt: "2026-06-15T09:00:00.000Z"
        }]
      }))
    };

    expect(loadAcademicTasks(storage)).toEqual({
      academicTasks: [{
        id: "task-1",
        title: "Research outline",
        course: "Software Engineering",
        dueDate: "2026-06-20",
        status: "Pending",
        createdAt: "2026-06-15T09:00:00.000Z"
      }],
      warning: null
    });
    expect(storage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it("ignores entirely invalid stored data with a warning", () => {
    const storage = {
      getItem: jest.fn(() => "{not valid json")
    };

    expect(loadAcademicTasks(storage)).toEqual({
      academicTasks: [],
      warning: "Stored Academic Tasks could not be read. Starting with an empty list."
    });
  });

  it("restores valid Academic Tasks from partially invalid stored data with a warning", () => {
    const storage = {
      getItem: jest.fn(() => JSON.stringify({
        version: 1,
        academicTasks: [
          {
            id: "task-1",
            title: "Research outline",
            course: "Software Engineering",
            dueDate: "2026-06-20",
            status: "Pending",
            createdAt: "2026-06-15T09:00:00.000Z"
          },
          {
            id: "task-2",
            title: "",
            course: "History",
            dueDate: "2026-06-21",
            status: "Pending",
            createdAt: "2026-06-15T10:00:00.000Z"
          }
        ]
      }))
    };

    expect(loadAcademicTasks(storage)).toEqual({
      academicTasks: [{
        id: "task-1",
        title: "Research outline",
        course: "Software Engineering",
        dueDate: "2026-06-20",
        status: "Pending",
        createdAt: "2026-06-15T09:00:00.000Z"
      }],
      warning: "Some stored Academic Tasks were ignored during recovery."
    });
  });
});

describe("saveAcademicTasks", () => {
  it("warns when saving fails and keeps the caller usable", () => {
    const storage = {
      setItem: jest.fn(() => {
        throw new Error("Quota exceeded");
      })
    };

    expect(saveAcademicTasks(storage, [])).toEqual({
      success: false,
      warning: "Could not save Academic Tasks. Changes may be lost."
    });
  });
});
