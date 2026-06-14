"use strict";

const storageLoad = TaskStorage.loadAcademicTasks(window.localStorage);

let academicTasks = storageLoad.academicTasks;
let activeFilter = "All";
let deletionSequence = 0;
let deleteDialogContext = null;
let pendingStorageWarning = storageLoad.warning;

const academicTaskForm = document.querySelector("#academic-task-form");
const titleInput = document.querySelector("#task-title");
const courseInput = document.querySelector("#task-course");
const dueDateInput = document.querySelector("#task-due-date");
const validationSummary = document.querySelector("#validation-summary");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const storageWarning = document.querySelector("#storage-warning");
const notification = document.querySelector("#notification");
const academicTasksHeading = document.querySelector("#academic-tasks-heading");
const deleteDialog = document.querySelector("#delete-dialog");
const deleteDialogTitle = document.querySelector("#delete-dialog-title");
const deleteDialogDescription = document.querySelector("#delete-dialog-description");
const deleteDialogCancelButton = document.querySelector("#delete-dialog-cancel");
const deleteDialogConfirmButton = document.querySelector("#delete-dialog-confirm");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
let notificationTimeout;
let storageWarningTimeout;
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

function showNotification(visualMessage, accessibleMessage, tone = "success") {
  window.clearTimeout(notificationTimeout);
  notification.classList.toggle("notification--warning", tone === "warning");
  notification.classList.toggle("notification--success", tone !== "warning");

  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  visual.textContent = visualMessage;

  const accessible = document.createElement("span");
  accessible.className = "visually-hidden";
  accessible.textContent = accessibleMessage;

  notification.replaceChildren(visual, accessible);
  notificationTimeout = window.setTimeout(() => {
    notification.replaceChildren();
    notification.classList.remove("notification--warning", "notification--success");
  }, 4000);
}

function clearStorageWarning() {
  window.clearTimeout(storageWarningTimeout);
  storageWarning.textContent = "";
  pendingStorageWarning = null;
}

function createTaskCard(academicTask) {
  const article = document.createElement("article");
  article.className = "task-card";
  article.dataset.taskId = academicTask.id;

  const status = document.createElement("p");
  status.className = "status-badge";
  status.textContent = academicTask.status;

  const overdue = AcademicTaskDomain.isAcademicTaskOverdue(academicTask, getLocalCalendarDate());
  if (overdue) {
    const overdueText = document.createElement("span");
    overdueText.className = "overdue-badge";
    overdueText.textContent = "Overdue";
    status.append(" · ", overdueText);
  }

  const title = document.createElement("h3");
  title.textContent = academicTask.title;

  const course = document.createElement("p");
  course.className = "task-course";
  course.textContent = academicTask.course;

  const dueDate = document.createElement("p");
  dueDate.className = "task-due-date";
  dueDate.textContent = `Due Date: ${AcademicTaskDomain.formatDueDate(academicTask.dueDate)}`;

  const statusButton = document.createElement("button");
  statusButton.className = "status-button";
  statusButton.type = "button";
  statusButton.textContent = academicTask.status === "Pending" ? "Mark Completed" : "Return to Pending";
  statusButton.addEventListener("click", () => {
    academicTasks = AcademicTaskDomain.toggleAcademicTaskStatus(academicTasks, academicTask.id);
    const updatedTask = academicTasks.find((task) => task.id === academicTask.id);
    renderAcademicTasks();
    const saveResult = persistAcademicTasks();
    if (saveResult.warning) {
      announceStorageWarning(saveResult.warning);
    } else if (updatedTask) {
      clearStorageWarning();
      announceStatusChange(updatedTask);
    }
    const updatedStatusButton = document.querySelector(`[data-task-id="${academicTask.id}"] .status-button`);
    (updatedStatusButton || document.querySelector(`[data-filter="${activeFilter}"]`))?.focus();
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    openDeleteDialog(academicTask, deleteButton);
  });

  article.append(status, title, course, dueDate, statusButton, deleteButton);
  return article;
}

function renderAcademicTasks() {
  taskList.replaceChildren();
  const filteredTasks = AcademicTaskDomain.filterAcademicTasks(academicTasks, activeFilter);
  taskCount.textContent = `${filteredTasks.length} Academic ${filteredTasks.length === 1 ? "Task" : "Tasks"}`;

  if (pendingStorageWarning) {
    storageWarning.textContent = pendingStorageWarning;
  }

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

  if (filteredTasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const heading = document.createElement("h3");
    heading.textContent = `No ${activeFilter} Academic Tasks`;

    const message = document.createElement("p");
    message.textContent = `No Academic Tasks match the ${activeFilter} filter.`;

    emptyState.append(heading, message);
    taskList.append(emptyState);
    return;
  }

  AcademicTaskDomain.orderAcademicTasks(filteredTasks).forEach((academicTask) => {
    taskList.append(createTaskCard(academicTask));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      filterButton.setAttribute("aria-pressed", String(filterButton === button));
    });
    renderAcademicTasks();
  });
});

function announceSuccessfulCreation() {
  const announcement = NotificationLogic.createSuccessfulCreationAnnouncement(notificationSequence);
  notificationSequence = announcement.sequence;
  showNotification(announcement.visualMessage, announcement.accessibleMessage);
}

function announceStatusChange(academicTask) {
  showNotification(
    `${academicTask.title} changed to ${academicTask.status}.`,
    `${academicTask.title} changed to ${academicTask.status}.`
  );
}

function announceDeletion(academicTask) {
  const announcement = NotificationLogic.createSuccessfulDeletionAnnouncement(deletionSequence);
  deletionSequence = announcement.sequence;
  showNotification(announcement.visualMessage, `${announcement.accessibleMessage} ${academicTask.title}.`);
}

function announceStorageWarning(message) {
  clearStorageWarning();
  pendingStorageWarning = message;
  storageWarning.textContent = message;
  showNotification(message, message, "warning");
  storageWarningTimeout = window.setTimeout(() => {
    storageWarning.textContent = "";
    if (pendingStorageWarning === message) {
      pendingStorageWarning = null;
    }
  }, 4000);
}

function persistAcademicTasks() {
  return TaskStorage.saveAcademicTasks(window.localStorage, academicTasks);
}

function openDeleteDialog(academicTask, triggerButton) {
  deleteDialogContext = {
    academicTaskId: academicTask.id,
    title: academicTask.title,
    triggerButton
  };

  deleteDialogTitle.textContent = `Delete ${academicTask.title}?`;
  deleteDialogDescription.textContent = `This will permanently delete Academic Task "${academicTask.title}".`;
  deleteDialog.showModal();
  deleteDialogCancelButton.focus();
}

function focusAfterDeletion(deletedIndex) {
  const filteredTasks = AcademicTaskDomain.filterAcademicTasks(academicTasks, activeFilter);
  const orderedTasks = AcademicTaskDomain.orderAcademicTasks(filteredTasks);
  const nextAcademicTask = orderedTasks[deletedIndex] || orderedTasks[deletedIndex - 1];

  if (nextAcademicTask) {
    window.requestAnimationFrame(() => {
      document.querySelector(`[data-task-id="${nextAcademicTask.id}"] .delete-button`)?.focus();
    });
    return;
  }

  window.requestAnimationFrame(() => {
    academicTasksHeading.focus();
  });
}

deleteDialog.addEventListener("close", () => {
  if (!deleteDialogContext) {
    return;
  }

  const { academicTaskId, triggerButton } = deleteDialogContext;

  if (deleteDialog.returnValue === "confirm") {
    const filteredTasksBeforeDelete = AcademicTaskDomain.orderAcademicTasks(
      AcademicTaskDomain.filterAcademicTasks(academicTasks, activeFilter)
    );
    const deletedIndex = filteredTasksBeforeDelete.findIndex((academicTask) => academicTask.id === academicTaskId);
    const deletedAcademicTask = academicTasks.find((academicTask) => academicTask.id === academicTaskId);
    academicTasks = AcademicTaskDomain.deleteAcademicTask(academicTasks, academicTaskId);
    renderAcademicTasks();
    const saveResult = persistAcademicTasks();
    if (saveResult.warning) {
      announceStorageWarning(saveResult.warning);
    } else if (deletedAcademicTask) {
      clearStorageWarning();
      announceDeletion(deletedAcademicTask);
    }
    focusAfterDeletion(deletedIndex);
  } else {
    triggerButton?.focus();
  }

  deleteDialogContext = null;
});

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
  const saveResult = persistAcademicTasks();
  academicTaskForm.reset();
  if (saveResult.warning) {
    announceStorageWarning(saveResult.warning);
  } else {
    clearStorageWarning();
    announceSuccessfulCreation();
  }
  titleInput.focus();
});

renderAcademicTasks();
