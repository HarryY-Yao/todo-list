import {
  currentTask,
  clearCurrentTask,
  displayTasks,
} from "./displayTasks";
import { getCurrentProject } from "./getCurrentProject";
import { clearTasks } from "./clearTasks";
import { projectList } from ".";
import { saveState } from "./storage";

// Edit-task side panel and its controls
const editTaskClosebtn = document.querySelector("#close-edit");
const editTaskMenu = document.querySelector(".edit-task");
const editTaskName = document.querySelector("#edit-task-name");
const editTaskDesc = document.querySelector("#edit-task-desc");
const editTaskPriority = document.querySelector("#edit-task-priority");
const editTaskDate = document.querySelector("#task-edit-date");
const editSaveChanges = document.querySelector("#edit-save-btn");
const editDeleteTask = document.querySelector("#edit-delete-btn");

// Re-draws the task list for the current project and saves to storage.
function refreshAndSave() {
  clearTasks();
  displayTasks(getCurrentProject());
  saveState(projectList);
}

editTaskClosebtn.addEventListener("click", () => {
  closeEditMenu();
});

editSaveChanges.addEventListener("click", () => {
  if (!currentTask) return;
  saveChanges(currentTask);
  refreshAndSave();
});

editDeleteTask.addEventListener("click", () => {
  if (!currentTask) return;
  deleteTask(currentTask);
  refreshAndSave();
});

// Shows the edit panel pre-filled with the task's current values.
// Name and description show as placeholders so leaving them blank keeps them.
export function openEditMenu(task) {
  editTaskName.setAttribute("placeholder", String(task.title));
  editTaskDesc.setAttribute("placeholder", String(task.description));
  editTaskDate.value = task.dueDate;
  editTaskPriority.value = task.priority;

  editTaskMenu.classList.remove("hidden");
}

export function closeEditMenu() {
  editTaskMenu.classList.add("hidden");
}

// Applies the panel's values to `task`. Blank name/description are ignored.
export function saveChanges(task) {
  if (editTaskName.value !== "") {
    task.title = editTaskName.value;
    editTaskName.value = "";
  }

  if (editTaskDesc.value !== "") {
    task.description = editTaskDesc.value;
    editTaskDesc.value = "";
  }

  task.priority = editTaskPriority.value;
  task.dueDate = editTaskDate.value;

  closeEditMenu();
}

// Removes `task` from the current project and closes the edit panel.
export function deleteTask(task) {
  const project = getCurrentProject();
  project.tasks = project.tasks.filter((t) => t.id !== task.id);
  clearCurrentTask();
  closeEditMenu();
}
