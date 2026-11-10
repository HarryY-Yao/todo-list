// DOM references shared across modules.
// This file deliberately has no imports: other modules import from here (not
// from index.js) so there are no circular-import / uninitialized-binding errors.

// Project sidebar
export const projectListDiv = document.querySelector(".projects-list");
export const projectHeader = document.querySelector("#project-header");
export const projectForm = document.querySelector("#add-project-form");
export const projectTitleInput = document.querySelector("#proj-title-inp");

// Right-click context menu (used to delete projects)
export const contextMenu = document.querySelector(".context");
export const deleteProject = document.querySelector("#del-prj");

// Task list and the "add task" form
export const taskList = document.querySelector(".tasks");
export const taskForm = document.querySelector("#add-task-form");
export const taskTitleInput = document.querySelector("#task-title-inp");
export const taskDescInput = document.querySelector("#task-desc-inp");
export const taskDateInput = document.querySelector("#task-date-inp");
export const taskPriorityInput = document.querySelector("#task-priority-inp");
