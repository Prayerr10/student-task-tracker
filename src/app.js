"use strict";

let academicTasks = [];

const academicTaskForm = document.querySelector("#academic-task-form");
const titleInput = document.querySelector("#task-title");
const courseInput = document.querySelector("#task-course");
const dueDateInput = document.querySelector("#task-due-date");
const validationSummary = document.querySelector("#validation-summary");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const notification = document.querySelector("#notification");
let notificationTimeout;
let notificationSequence = 0;
const fieldControls = {
  title: titleInput,
  course: courseInput,
  dueDate: dueDateInput
};
const fieldErrors = {
  title: document.querySelector("#task-title-error"),
  course: document.querySelector("#task-course-error"),
  dueDate: document.querySelector("#task-due-date-error")
};

function getLocalCalendarDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function clearValidationFeedback() {
  validationSummary.textContent = "";

  Object.keys(fieldControls).forEach((field) => {
    fieldControls[field].removeAttribute("aria-invalid");
    fieldErrors[field].textContent = "";
  });
}

function showValidationFeedback(problems) {
  clearValidationFeedback();

  Object.entries(problems).forEach(([field, message]) => {
    fieldControls[field].setAttribute("aria-invalid", "true");
    fieldErrors[field].textContent = message;
  });

  const feedback = AcademicTaskDomain.createValidationFeedback(problems);
  validationSummary.textContent = feedback.summary;
  fieldControls[feedback.firstInvalidField].focus();
}

function createTaskCard(academicTask) {
  const article = document.createElement("article");
  article.className = "task-card";

  const status = document.createElement("p");
  status.className = "status-badge";
  status.textContent = academicTask.status;

  const title = document.createElement("h3");
  title.textContent = academicTask.title;

  const course = document.createElement("p");
  course.className = "task-course";
  course.textContent = academicTask.course;

  const dueDate = document.createElement("p");
  dueDate.className = "task-due-date";
  dueDate.textContent = `Due Date: ${academicTask.dueDate}`;

  article.append(status, title, course, dueDate);
  return article;
}

function renderAcademicTasks() {
  taskList.replaceChildren();
  taskCount.textContent = `${academicTasks.length} Academic ${academicTasks.length === 1 ? "Task" : "Tasks"}`;

  if (academicTasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const heading = document.createElement("h3");
    heading.textContent = "No Academic Tasks yet";

    const message = document.createElement("p");
    message.textContent = "Add your first Academic Task to start organizing your workload.";

    emptyState.append(heading, message);
    taskList.append(emptyState);
    return;
  }

  academicTasks.forEach((academicTask) => {
    taskList.append(createTaskCard(academicTask));
  });
}

function announceSuccessfulCreation() {
  window.clearTimeout(notificationTimeout);
  const announcement = NotificationLogic.createSuccessfulCreationAnnouncement(notificationSequence);
  notificationSequence = announcement.sequence;

  const visualMessage = document.createElement("span");
  visualMessage.setAttribute("aria-hidden", "true");
  visualMessage.textContent = announcement.visualMessage;

  const accessibleMessage = document.createElement("span");
  accessibleMessage.className = "visually-hidden";
  accessibleMessage.textContent = announcement.accessibleMessage;

  notification.replaceChildren(visualMessage, accessibleMessage);
  notificationTimeout = window.setTimeout(() => {
    notification.replaceChildren();
  }, 4000);
}

academicTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(academicTaskForm);
  const input = {
    title: formData.get("title"),
    course: formData.get("course"),
    dueDate: formData.get("dueDate")
  };
  const problems = AcademicTaskDomain.validateAcademicTaskInput(input, getLocalCalendarDate());

  if (Object.keys(problems).length > 0) {
    showValidationFeedback(problems);
    return;
  }

  clearValidationFeedback();
  academicTasks = AcademicTaskDomain.createAcademicTask(academicTasks, input);
  renderAcademicTasks();
  academicTaskForm.reset();
  announceSuccessfulCreation();
  titleInput.focus();
});

renderAcademicTasks();
