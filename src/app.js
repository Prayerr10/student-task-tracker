"use strict";

let academicTasks = [];

const academicTaskForm = document.querySelector("#academic-task-form");
const titleInput = document.querySelector("#task-title");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const notification = document.querySelector("#notification");
let notificationTimeout;
let notificationSequence = 0;

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
  academicTasks = AcademicTaskDomain.createAcademicTask(academicTasks, {
    title: formData.get("title"),
    course: formData.get("course"),
    dueDate: formData.get("dueDate")
  });

  renderAcademicTasks();
  academicTaskForm.reset();
  announceSuccessfulCreation();
  titleInput.focus();
});

renderAcademicTasks();
