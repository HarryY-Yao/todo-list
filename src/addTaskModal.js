import {
  taskTitleInput,
  taskDescInput,
  taskDateInput,
  taskPriorityInput,
  taskForm,
} from "./elements";
import { addTask } from "./addTask";
import { displayTasks } from "./displayTasks";
import { clearTasks } from "./clearTasks";
import { getCurrentProject } from "./getCurrentProject";

const dialog = document.querySelector("#add-task");
const addTaskButton = document.querySelector(".add-task");
const saveButton = document.querySelector("#add-task-save");
const discardButton = document.querySelector("#task-discard");

addTaskButton.addEventListener("click", () => {
  dialog.showModal();
});

saveButton.addEventListener("click", (e) => {
  // Stop the form from submitting/reloading the page.
  e.preventDefault();

  addTask(
    taskTitleInput.value,
    taskDescInput.value,
    taskDateInput.value,
    taskPriorityInput.value,
  );

  // Re-render the task list for the current project.
  clearTasks();
  displayTasks(getCurrentProject());

  taskForm.reset();
  dialog.close();
});

discardButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
