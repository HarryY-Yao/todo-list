import { addProject } from "./addProject";
import { displayProjects, searchInput } from "./displayProjects";
import { clearProjects } from "./clearProjects";
import { projectTitleInput, projectForm } from "./elements";
import { setProjectInteraction } from "./setProjectInteraction";

const dialog = document.querySelector("#add-project");
const addProjectButton = document.querySelector("#new-project");
const projectSaveButton = document.querySelector("#add-proj-save");
const projectDiscardButton = document.querySelector("#project-discard");

addProjectButton.addEventListener("click", () => {
  dialog.showModal();
});

projectSaveButton.addEventListener("click", (e) => {
  // Stop the form from submitting/reloading the page.
  e.preventDefault();

  addProject(projectTitleInput.value);

  // Re-render the sidebar (respecting the current search filter).
  clearProjects();
  displayProjects(searchInput.value.toLowerCase());
  setProjectInteraction();

  projectForm.reset();
  dialog.close();
});

projectDiscardButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
