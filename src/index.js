// App entry point: loads saved state, then renders the initial UI.
import "./styles.css";
import { Project } from "./project";
import { loadState, saveState } from "./storage";
import { getCurrentProject } from "./getCurrentProject";
import { projectHeader } from "./elements";
import { clearProjects } from "./clearProjects";
import { displayProjects } from "./displayProjects";
import { displayTasks } from "./displayTasks";
import { setProjectInteraction } from "./setProjectInteraction";

// Modules imported only for their side effects (they register event listeners).
import "./addTaskModal";
import "./addProjectModal";
import "./editTask";

// The single source of truth for all projects (and their tasks) at runtime.
export const projectList = loadState().projectList;

// First run: create a default project so there is always one to select.
if (projectList.length === 0) {
  const defaultProject = new Project("Today");
  defaultProject.toggleCurrentProject();
  defaultProject.setID("default-project");
  projectList.push(defaultProject);
}

// Make sure something is saved even on first run.
saveState(projectList);

// Initial render.
const currentProject = getCurrentProject();
projectHeader.textContent = currentProject.title;

clearProjects();
displayProjects("");
displayTasks(currentProject);
setProjectInteraction();
