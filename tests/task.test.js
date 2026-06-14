const { createAcademicTask } = require("../src/task-logic");
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
