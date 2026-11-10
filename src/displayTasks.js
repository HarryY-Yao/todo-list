import { taskList } from "./elements";
import calendarSVG from "../images/calendar.svg";
import { openEditMenu } from "./editTask";
import { projectList } from ".";
import { saveState } from "./storage";
import { getCurrentProject } from "./getCurrentProject";
import { clearTasks } from "./clearTasks";

// The task whose edit menu is currently open (null if none).
// Exported as a live binding so editTask.js always sees the latest value.
export let currentTask = null;

export function clearCurrentTask() {
  currentTask = null;
}

// Text shown next to the priority dot, keyed by priority value.
const PRIORITY_LABELS = { high: "High", medium: "Medium", low: "Low" };

// Small helper: create an element with a class and optional text.
function createEl(tag, className, text) {
  const el = document.createElement(tag);
  el.classList.add(className);
  if (text !== undefined) el.textContent = text;
  return el;
}

// Sets the checkbox button's look and accessibility state.
function setChecked(button, isChecked) {
  button.classList.toggle("checked", isChecked);
  button.setAttribute("aria-pressed", isChecked);
  button.textContent = isChecked ? "✓" : "";
}

// Builds the DOM for a single task row.
function createTaskElement(task) {
  const taskDiv = createEl("div", "task");

  // Left side: completion checkbox + title
  const taskStart = createEl("div", "start");

  const checkbox = createEl("button", "complete-task");
  checkbox.id = String(task.getCheckboxID());

  const taskTitle = createEl("div", "task-title", task.title);
  taskTitle.id = String(task.id);

  // Reflect saved completion state when the row is first drawn.
  if (task.isCompleted()) {
    setChecked(checkbox, true);
    taskTitle.classList.add("completed");
  }

  // Toggle completion and persist. A task that becomes completed sinks to
  // the bottom of the list; un-checking leaves it where it is.
  checkbox.addEventListener("click", () => {
    task.completeTask();
    if (task.isCompleted()) {
      const project = getCurrentProject();
      project.tasks = project.tasks.filter((t) => t.id !== task.id);
      project.tasks.push(task);
    }
    saveState(projectList);
    refreshTasks();
  });

  taskStart.append(checkbox, taskTitle);

  // Due date (falls back to a placeholder when empty)
  const dueDateDiv = createEl("div", "due-date");
  const dueDateImg = createEl("img", "due-date-img");
  dueDateImg.src = calendarSVG;
  const dueDateVal = createEl(
    "div",
    "due-date-value",
    task.dueDate === "" ? "yyyy-mm-dd" : task.dueDate,
  );
  dueDateDiv.append(dueDateImg, dueDateVal);

  // Priority dot + label (only for known priority values)
  const priorityDiv = createEl("div", "priority");
  const priorityDisplay = document.createElement("div");
  const priorityLevel = document.createElement("div");
  if (task.priority in PRIORITY_LABELS) {
    priorityDisplay.classList.add(`priority-${task.priority}`);
    priorityLevel.textContent = PRIORITY_LABELS[task.priority];
  }
  priorityDiv.append(priorityDisplay, priorityLevel);

  // Right side: button that opens the edit menu
  const taskEnd = createEl("div", "end");
  const showMore = createEl("button", "show-more", ">");
  showMore.addEventListener("click", () => {
    openEditMenu(task);
    currentTask = task;
  });
  taskEnd.appendChild(showMore);

  taskDiv.append(taskStart, dueDateDiv, priorityDiv, taskEnd);

  // Drag-and-drop reordering
  taskDiv.draggable = true;
  taskDiv.dataset.taskId = task.id;
  taskDiv.addEventListener("dragstart", (e) => {
    draggedTaskId = task.id;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id); // required by Firefox
    // Defer so the browser snapshots the row before it gets dimmed.
    requestAnimationFrame(() => taskDiv.classList.add("dragging"));
  });
  taskDiv.addEventListener("dragend", () => {
    draggedTaskId = null;
    clearDropIndicators();
    taskDiv.classList.remove("dragging");
  });

  return taskDiv;
}

// ---- Drag-and-drop reordering ----------------------------------------

// Id of the task currently being dragged (null when not dragging).
let draggedTaskId = null;

function clearDropIndicators() {
  taskList
    .querySelectorAll(".drop-before, .drop-after")
    .forEach((el) => el.classList.remove("drop-before", "drop-after"));
}

// True if the pointer is in the top half of the row.
function isUpperHalf(e, row) {
  const rect = row.getBoundingClientRect();
  return e.clientY < rect.top + rect.height / 2;
}

// These listeners go on the list itself (once), so they cover every row,
// including rows created later.
taskList.addEventListener("dragover", (e) => {
  const row = e.target.closest(".task");
  if (draggedTaskId === null || !row) return;

  e.preventDefault(); // allow dropping here
  clearDropIndicators();
  if (row.dataset.taskId !== draggedTaskId) {
    row.classList.add(isUpperHalf(e, row) ? "drop-before" : "drop-after");
  }
});

taskList.addEventListener("drop", (e) => {
  const row = e.target.closest(".task");
  if (draggedTaskId === null || !row) return;
  e.preventDefault();

  const targetId = row.dataset.taskId;
  const placeBefore = isUpperHalf(e, row);
  const movedId = draggedTaskId;
  draggedTaskId = null;
  if (targetId === movedId) {
    clearDropIndicators();
    return;
  }

  // Take the dragged task out, then insert it next to the target.
  const project = getCurrentProject();
  const moved = project.tasks.find((t) => t.id === movedId);
  const rest = project.tasks.filter((t) => t.id !== movedId);
  const targetIndex = rest.findIndex((t) => t.id === targetId);
  rest.splice(placeBefore ? targetIndex : targetIndex + 1, 0, moved);
  project.tasks = rest;

  saveState(projectList);
  refreshTasks();
});

// Re-draws the current project's task list from its data.
function refreshTasks() {
  clearTasks();
  displayTasks(getCurrentProject());
}

// Renders all tasks of `project` into the task list.
// Call clearTasks() first when re-rendering.
export function displayTasks(project) {
  for (const task of project.tasks) {
    taskList.appendChild(createTaskElement(task));
  }
}
