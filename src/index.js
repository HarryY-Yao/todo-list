import "./styles.css";
import { Project } from "./project";
import { Todo } from "./todo";
import { addTaskButton, saveButton, discardButton } from "./addTaskModal";
import { addProjectButton, projectSaveButton, projectDiscardButton } from "./addProjectModal";
import { displayTasks } from "./displayTasks";
import { addTask } from "./addTask";
import { setProjectInteraction } from "./setProjectInteraction";
import { updateMenuPosition } from "./updateMenuPosition";
import { editTaskMenu } from "./editTask";
import { editTaskClosebtn } from "./editTask";
import { openEditMenu } from "./editTask";
import { currentTask } from "./displayTasks";
import { clearTasks } from "./clearTasks";
import { clearProjects } from "./clearProjects";
import { displayProjects } from "./displayProjects";
// import { setCheckBoxes } from "./completeTask";

export const projectTitleInput = document.querySelector("#proj-title-inp");
export const taskTitleInput = document.querySelector("#task-title-inp");
export const taskDescInput = document.querySelector("#task-desc-inp");
export const taskDateInput = document.querySelector("#task-date-inp");
export const taskPriorityInput = document.querySelector("#task-priority-inp");
export const taskList = document.querySelector(".tasks");
export const taskForm = document.querySelector("#add-task-form");
export const projectListDiv = document.querySelector(".projects-list");
export const projectHeader = document.querySelector("#project-header");
export const projectForm = document.querySelector("#add-project-form");
export const contextMenu = document.querySelector(".context");
export const deleteProject = document.querySelector("#del-prj");

import { loadState, saveState } from "./storage";
import { getCurrentProject } from "./getCurrentProject";

const loaded = loadState();
export const projectList = loaded.projectList;

// Optional: ensure storage exists even on first run
saveState(projectList);

// localStorage.clear();

if (projectList.length == 0) {
  const defaultProject = new Project("Today");
  // localStorage.setItem(defaultProject.id, "");
  // localStorage.setItem('z' + crypto.randomUUID() + defaultProject.title, defaultProject.id);
  defaultProject.toggleCurrentProject();
  projectList.push(defaultProject);
  defaultProject.setID("default-project");
}
export let currentProject = getCurrentProject();
projectHeader.innerText = currentProject.title;

const checkButtons = document.querySelectorAll(".complete-task");

checkButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("checked");
    const isChecked = button.classList.contains("checked");
    button.setAttribute("aria-pressed", isChecked);
    button.textContent = isChecked ? "✓" : "";
    
    currentProject.tasks.forEach(task => {
        if (task.getCheckboxID() == button.id) {
            const taskTitle = document.getElementById(task.id);
            taskTitle.classList.toggle("completed");
            task.completeTask();
            saveState(projectList);
            button.style.textDecoration = "none";
       }
    })
  });
});

clearProjects();
displayProjects("");
displayTasks(currentProject);
setProjectInteraction();
