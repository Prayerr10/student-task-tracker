"use strict";

const STORAGE_KEY = "student-tasks";
const VALID_FILTERS = ["all", "active", "completed"];

let tasks = [];
let currentFilter = "all";
const {
  addTask: addTaskToList,
  deleteTask: deleteTaskFromList,
  toggleComplete: toggleTaskComplete,
  filterTasks: filterTaskList
} = TaskLogic;

const taskForm = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const subjectInput = document.querySelector("#task-subject");
const dueDateInput = document.querySelector("#task-due-date");
const formMessage = document.querySelector("#form-message");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const filterButtons = document.querySelectorAll("[data-filter]");

function addTask(title, subject, dueDate = "") {
  tasks = addTaskToList(tasks, title, subject, dueDate);
  saveTasks();
  renderTasks();
  return tasks[0];
}

function deleteTask(id) {
  tasks = deleteTaskFromList(tasks, id);
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  tasks = toggleTaskComplete(tasks, id);
  saveTasks();
  renderTasks();
}

function filterTasks(status) {
  return filterTaskList(tasks, status);
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Unable to save tasks to localStorage.", error);
  }
}

function isValidTask(task) {
  return Boolean(
    task
    && typeof task.id === "string"
    && typeof task.title === "string"
    && typeof task.subject === "string"
    && typeof task.dueDate === "string"
    && typeof task.completed === "boolean"
    && typeof task.createdAt === "string"
  );
}

function loadTasks() {
  try {
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    tasks = Array.isArray(storedTasks) ? storedTasks.filter(isValidTask) : [];
  } catch (error) {
    console.warn("Stored task data could not be read. Starting with an empty list.", error);
    tasks = [];
  }

  return tasks;
}

function formatDueDate(dueDate) {
  if (!dueDate) {
    return "No due date";
  }

  const [year, month, day] = dueDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return dueDate;
  }

  return `Due ${new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date)}`;
}

function createTaskCard(task) {
  const article = document.createElement("article");
  article.className = `task-card${task.completed ? " completed" : ""}`;
  article.dataset.taskId = task.id;

  const checkbox = document.createElement("input");
  checkbox.className = "complete-checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.completed ? "active" : "completed"}`);
  checkbox.addEventListener("change", () => toggleComplete(task.id));

  const details = document.createElement("div");
  details.className = "task-details";

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const meta = document.createElement("p");
  meta.className = "task-meta";

  const subject = document.createElement("span");
  subject.textContent = task.subject;

  const dueDate = document.createElement("span");
  dueDate.textContent = formatDueDate(task.dueDate);

  const status = document.createElement("span");
  status.className = "status";
  status.textContent = task.completed ? "Completed" : "Active";

  meta.append(subject, dueDate, status);
  details.append(title, meta);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  article.append(checkbox, details, deleteButton);
  return article;
}

function renderTasks() {
  const visibleTasks = filterTasks(currentFilter);
  taskList.replaceChildren();

  const countLabel = `${visibleTasks.length} ${visibleTasks.length === 1 ? "task" : "tasks"}`;
  taskCount.textContent = countLabel;

  if (visibleTasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const message = document.createElement("p");
    message.textContent = currentFilter === "all"
      ? "No tasks yet. Add your first task to get started."
      : `No ${currentFilter} tasks.`;

    emptyState.append(message);
    taskList.append(emptyState);
    return;
  }

  visibleTasks.forEach((task) => taskList.append(createTaskCard(task)));
}

function setFilter(status) {
  if (!VALID_FILTERS.includes(status)) {
    return;
  }

  currentFilter = status;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === status;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  try {
    addTask(titleInput.value, subjectInput.value, dueDateInput.value);
    taskForm.reset();
    titleInput.focus();
  } catch (error) {
    formMessage.textContent = error.message;
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

loadTasks();
renderTasks();
