import { taskList } from "./elements";
import calendarSVG from "../images/calendar.svg";
import { openEditMenu } from "./editTask";
import { projectList } from ".";
import { saveState } from "./storage";

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

  // Toggle completion, update the row, and persist the change.
  checkbox.addEventListener("click", () => {
    task.completeTask();
    setChecked(checkbox, task.isCompleted());
    taskTitle.classList.toggle("completed", task.isCompleted());
    saveState(projectList);
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
  return taskDiv;
}

// Renders all tasks of `project` into the task list.
// Call clearTasks() first when re-rendering.
export function displayTasks(project) {
  for (const task of project.tasks) {
    taskList.appendChild(createTaskElement(task));
  }
}
