import { addProject } from "./addProject";
import { displayProjects } from "./displayProjects";
import { clearProjects } from "./clearProjects";
import { projectTitleInput, projectForm } from ".";
import { setProjectInteraction } from "./setProjectInteraction";
import { searchInput } from "./displayProjects";

const dialog = document.querySelector("#add-project")
export const addProjectButton = document.querySelector("#new-project");
export const projectSaveButton = document.querySelector("#add-proj-save");
export const projectDiscardButton = document.querySelector("#project-discard");

addProjectButton.addEventListener("click", () => {
    dialog.showModal();
});

projectSaveButton.addEventListener("click", () => {
    addProject(projectTitleInput.value);
    clearProjects();
    displayProjects(searchInput.value.toLowerCase());
    setProjectInteraction();
    projectForm.reset();
    dialog.close();
    event.preventDefault();
});

projectDiscardButton.addEventListener("click", () => {
    dialog.close();
    event.preventDefault();
});