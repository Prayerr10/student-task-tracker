const {
  createAcademicTask,
  createValidationFeedback,
  deleteAcademicTask,
  filterAcademicTasks,
  formatDueDate,
  isAcademicTaskOverdue,
  orderAcademicTasks,
  toggleAcademicTaskStatus,
  validateAcademicTaskInput
} = require("../src/task-logic");
const {
  createSuccessfulCreationAnnouncement,
  createSuccessfulDeletionAnnouncement
} = require("../src/notification-logic");

describe("createAcademicTask", () => {
  it("creates one separate Pending Academic Task with the submitted values", () => {
    const result = createAcademicTask([], {
      title: "Write research outline",
      course: "Software Engineering",
      dueDate: "2026-06-20"
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(expect.objectContaining({
      title: "Write research outline",
      course: "Software Engineering",
      dueDate: "2026-06-20",
      status: "Pending"
    }));
    expect(result[0].id).toEqual(expect.any(String));
    expect(result[0].createdAt).toEqual(expect.any(String));
  });

  it("allows duplicate Academic Tasks as separate entities", () => {
    const input = {
      title: "Review lecture notes",
      course: "Algorithms",
      dueDate: "2026-06-21"
    };

    const firstResult = createAcademicTask([], input);
    const secondResult = createAcademicTask(firstResult, input);

    expect(secondResult).toHaveLength(2);
    expect(secondResult[0]).not.toBe(secondResult[1]);
    expect(secondResult[0].id).not.toBe(secondResult[1].id);
    expect(secondResult[0]).toEqual(expect.objectContaining(input));
    expect(secondResult[1]).toEqual(expect.objectContaining(input));
  });

  it("does not mutate the existing Academic Task collection", () => {
    const existingAcademicTasks = Object.freeze([]);

    const result = createAcademicTask(existingAcademicTasks, {
      title: "Prepare presentation",
      course: "Communication",
      dueDate: "2026-06-22"
    });

    expect(existingAcademicTasks).toHaveLength(0);
    expect(result).toHaveLength(1);
  });

  it("keeps submitted text as plain data", () => {
    const submittedTitle = "<img src=x onerror=alert('unsafe')>";

    const result = createAcademicTask([], {
      title: submittedTitle,
      course: "<script>unsafe</script>",
      dueDate: "2026-06-23"
    });

    expect(result[0].title).toBe(submittedTitle);
    expect(result[0].course).toBe("<script>unsafe</script>");
  });
});

describe("createSuccessfulCreationAnnouncement", () => {
  it("creates distinguishable accessible updates for repeated successful creation", () => {
    const first = createSuccessfulCreationAnnouncement();
    const second = createSuccessfulCreationAnnouncement(first.sequence);

    expect(first.visualMessage).toBe("Academic Task added successfully.");
    expect(second.visualMessage).toBe(first.visualMessage);
    expect(second.accessibleMessage).not.toBe(first.accessibleMessage);
    expect(first.accessibleMessage).toContain("Academic Task added successfully.");
    expect(second.accessibleMessage).toContain("Academic Task added successfully.");
  });
});

describe("validateAcademicTaskInput", () => {
  it("returns field-specific required problems for blank Academic Task input", () => {
    expect(validateAcademicTaskInput({
      title: "   ",
      course: "",
      dueDate: " "
    })).toEqual({
      title: "Task Title is required.",
      course: "Course is required.",
      dueDate: "Due Date is required."
    });
  });

  it("rejects a Task Title longer than 120 characters", () => {
    expect(validateAcademicTaskInput({
      title: "T".repeat(121),
      course: "Software Engineering",
      dueDate: "2026-06-15"
    })).toEqual({
      title: "Task Title must be 120 characters or fewer."
    });
  });

  it("rejects a Course longer than 80 characters", () => {
    expect(validateAcademicTaskInput({
      title: "Research outline",
      course: "C".repeat(81),
      dueDate: "2026-06-15"
    })).toEqual({
      course: "Course must be 80 characters or fewer."
    });
  });

  it("rejects an invalid Due Date", () => {
    expect(validateAcademicTaskInput({
      title: "Research outline",
      course: "Software Engineering",
      dueDate: "not-a-date"
    }, "2026-06-15")).toEqual({
      dueDate: "Enter a valid Due Date."
    });
  });

  it("rejects an impossible calendar Due Date", () => {
    expect(validateAcademicTaskInput({
      title: "Research outline",
      course: "Software Engineering",
      dueDate: "2026-02-31"
    }, "2026-02-01")).toEqual({
      dueDate: "Enter a valid Due Date."
    });
  });

  it("rejects a past Due Date", () => {
    expect(validateAcademicTaskInput({
      title: "Research outline",
      course: "Software Engineering",
      dueDate: "2026-06-14"
    }, "2026-06-15")).toEqual({
      dueDate: "Due Date cannot be in the past."
    });
  });

  it("accepts today's Due Date", () => {
    expect(validateAcademicTaskInput({
      title: "Research outline",
      course: "Software Engineering",
      dueDate: "2026-06-15"
    }, "2026-06-15")).toEqual({});
  });
});

describe("createValidationFeedback", () => {
  it("describes the first invalid field and an accessible validation summary", () => {
    expect(createValidationFeedback({
      title: "Task Title is required.",
      dueDate: "Due Date is required."
    })).toEqual({
      firstInvalidField: "title",
      summary: "Please correct 2 fields before adding the Academic Task."
    });
  });

  it("uses an understandable singular summary for one invalid field", () => {
    expect(createValidationFeedback({
      dueDate: "Due Date cannot be in the past."
    })).toEqual({
      firstInvalidField: "dueDate",
      summary: "Please correct 1 field before adding the Academic Task."
    });
  });
});

describe("Academic Task list behavior", () => {
  const laterTask = {
    id: "later",
    title: "Later task",
    course: "Course",
    dueDate: "2026-06-20",
    status: "Pending",
    createdAt: "2026-06-15T10:00:00.000Z"
  };
  const earlierCreatedTask = {
    ...laterTask,
    id: "earlier-created",
    title: "Earlier created",
    createdAt: "2026-06-15T09:00:00.000Z"
  };
  const earliestDueTask = {
    ...laterTask,
    id: "earliest-due",
    title: "Earliest due",
    dueDate: "2026-06-18"
  };

  it("orders Academic Tasks by Due Date then creation time", () => {
    expect(orderAcademicTasks([laterTask, earlierCreatedTask, earliestDueTask]).map((task) => task.id))
      .toEqual(["earliest-due", "earlier-created", "later"]);
  });

  it("derives Overdue only for Pending Academic Tasks before today", () => {
    expect(isAcademicTaskOverdue({ ...laterTask, dueDate: "2026-06-14" }, "2026-06-15")).toBe(true);
    expect(isAcademicTaskOverdue({ ...laterTask, dueDate: "2026-06-15" }, "2026-06-15")).toBe(false);
    expect(isAcademicTaskOverdue({
      ...laterTask,
      dueDate: "2026-06-14",
      status: "Completed"
    }, "2026-06-15")).toBe(false);
  });

  it("formats Due Date using an unambiguous English format", () => {
    expect(formatDueDate("2026-06-20")).toBe("Jun 20, 2026");
  });

  it("does not mutate the source collection while ordering", () => {
    const source = [laterTask, earliestDueTask];
    orderAcademicTasks(source);
    expect(source.map((task) => task.id)).toEqual(["later", "earliest-due"]);
  });
});

describe("toggleAcademicTaskStatus", () => {
  it("changes only the selected Pending Academic Task to Completed while preserving details", () => {
    const selected = {
      id: "selected",
      title: "Research outline",
      course: "Software Engineering",
      dueDate: "2026-06-20",
      status: "Pending",
      createdAt: "2026-06-15T09:00:00.000Z"
    };
    const other = { ...selected, id: "other", title: "Other task" };

    expect(toggleAcademicTaskStatus([selected, other], "selected")).toEqual([
      { ...selected, status: "Completed" },
      other
    ]);
  });

  it("changes a Completed Academic Task back to Pending", () => {
    const completed = {
      id: "selected",
      title: "Research outline",
      course: "Software Engineering",
      dueDate: "2026-06-14",
      status: "Completed",
      createdAt: "2026-06-15T09:00:00.000Z"
    };

    expect(toggleAcademicTaskStatus([completed], "selected")).toEqual([
      { ...completed, status: "Pending" }
    ]);
  });
});

describe("deleteAcademicTask", () => {
  it("removes only the selected Academic Task without mutating the collection", () => {
    const firstTask = {
      id: "first",
      title: "Research outline",
      course: "Software Engineering",
      dueDate: "2026-06-20",
      status: "Pending",
      createdAt: "2026-06-15T09:00:00.000Z"
    };
    const secondTask = {
      ...firstTask,
      id: "second",
      title: "Reading response"
    };
    const academicTasks = [firstTask, secondTask];

    expect(deleteAcademicTask(academicTasks, "first")).toEqual([secondTask]);
    expect(academicTasks).toEqual([firstTask, secondTask]);
  });
});

describe("filterAcademicTasks", () => {
  const pendingTask = {
    id: "pending",
    title: "Research outline",
    course: "Software Engineering",
    dueDate: "2026-06-20",
    status: "Pending",
    createdAt: "2026-06-15T09:00:00.000Z"
  };
  const completedTask = {
    ...pendingTask,
    id: "completed",
    title: "Completed reading",
    status: "Completed"
  };

  it("returns every Academic Task for the All filter without mutating the collection", () => {
    const academicTasks = [pendingTask, completedTask];

    expect(filterAcademicTasks(academicTasks, "All")).toEqual(academicTasks);
    expect(academicTasks).toEqual([pendingTask, completedTask]);
  });

  it("returns Pending Academic Tasks for the Pending filter", () => {
    expect(filterAcademicTasks([pendingTask, completedTask], "Pending")).toEqual([pendingTask]);
  });

  it("returns Completed Academic Tasks for the Completed filter", () => {
    expect(filterAcademicTasks([pendingTask, completedTask], "Completed")).toEqual([completedTask]);
  });
});

describe("createSuccessfulDeletionAnnouncement", () => {
  it("creates distinguishable accessible updates for repeated successful deletion", () => {
    const first = createSuccessfulDeletionAnnouncement();
    const second = createSuccessfulDeletionAnnouncement(first.sequence);

    expect(first.visualMessage).toBe("Academic Task deleted successfully.");
    expect(second.visualMessage).toBe(first.visualMessage);
    expect(second.accessibleMessage).not.toBe(first.accessibleMessage);
    expect(first.accessibleMessage).toContain("Academic Task deleted successfully.");
    expect(second.accessibleMessage).toContain("Academic Task deleted successfully.");
  });
});
