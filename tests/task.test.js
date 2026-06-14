const {
  createAcademicTask,
  createValidationFeedback,
  formatDueDate,
  isAcademicTaskOverdue,
  orderAcademicTasks,
  validateAcademicTaskInput
} = require("../src/task-logic");
const { createSuccessfulCreationAnnouncement } = require("../src/notification-logic");

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
