import { taskTitleInput, taskDescInput, taskDateInput, taskPriorityInput, taskForm } from ".";
import { addTask } from "./addTask";
import { displayTasks } from "./displayTasks";
import { clearTasks } from "./clearTasks";
import { getCurrentProject } from "./getCurrentProject";

const dialog = document.querySelector("#add-task")
export const addTaskButton = document.querySelector(".add-task");
export const saveButton = document.querySelector("#add-task-save");
export const discardButton = document.querySelector("#task-discard");


addTaskButton.addEventListener("click", () => {
    dialog.showModal();
});

saveButton.addEventListener("click", () => {
    addTask(taskTitleInput.value, taskDescInput.value, taskDateInput.value, taskPriorityInput.value);
    clearTasks();
    displayTasks(getCurrentProject());
    taskForm.reset()
    dialog.close();
    event.preventDefault();
});

discardButton.addEventListener("click", () => {
    dialog.close();
    event.preventDefault();
});

