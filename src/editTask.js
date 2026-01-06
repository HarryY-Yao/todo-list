import { currentTask } from "./displayTasks";
import { displayTasks } from "./displayTasks";
import { currentProject } from ".";
import { clearTasks } from "./clearTasks";
import { projectList } from ".";
import { saveState } from "./storage";

export const editTaskClosebtn = document.querySelector("#close-edit");
export const editTaskMenu = document.querySelector(".edit-task");
export const editTaskName = document.querySelector("#edit-task-name");
export const editTaskDesc = document.querySelector("#edit-task-desc");
export const editTaskPriority = document.querySelector("#edit-task-priority");
export const editTaskDate = document.querySelector("#task-edit-date");
export const editSaveChanges = document.querySelector("#edit-save-btn");
export const editDeleteTask = document.querySelector("#edit-delete-btn");


editTaskClosebtn.addEventListener("click", () => {
    closeEditMenu();
});

editSaveChanges.addEventListener("click", () => {
    saveChanges(currentTask);
    clearTasks();
    displayTasks(currentProject);
    saveState(projectList);
});

editDeleteTask.addEventListener("click", () => {
    deleteTask(currentTask);
    clearTasks();
    displayTasks(currentProject);
    saveState(projectList);
});

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

export function saveChanges(task) {
    const newTaskName = editTaskName.value;
    const newTaskDesc = editTaskDesc.value;
    const newTaskPriority = editTaskPriority.value;
    const newTaskDate = editTaskDate.value;

    if (newTaskName != "") {
        task.title = newTaskName;
        editTaskName = "";
    }

    if (newTaskDesc != "") {
        task.description = newTaskDesc;
        editTaskDesc.value = "";
    }

    task.priority = newTaskPriority;
    task.dueDate = newTaskDate;

    closeEditMenu();
}

export function deleteTask(currTask) {
    const newTasks = currentProject.tasks.filter(task => task != currTask);
    currentProject.tasks = newTasks;
    closeEditMenu();
}



