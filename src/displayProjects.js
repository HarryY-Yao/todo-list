import { projectListDiv } from "./elements";
import { projectList } from ".";
import todoListIcon from "../images/todo-list-svgrepo-com.svg";
import { clearProjects } from "./clearProjects";
import { setProjectInteraction } from "./setProjectInteraction";
import { getCurrentProject } from "./getCurrentProject";

// Search box above the project list: filters projects as you type.
export const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  clearProjects();
  displayProjects(query);
  setProjectInteraction();
});

// Small helper: create an element with a class and optional text.
function createEl(tag, className, text) {
  const el = document.createElement(tag);
  el.classList.add(className);
  if (text !== undefined) el.textContent = text;
  return el;
}

// Renders the sidebar projects whose title contains `query` (lowercase).
// The current project is always shown, even if it doesn't match the search.
export function displayProjects(query) {
  const filteredProjects = projectList.filter((project) =>
    project.title.toLowerCase().includes(query),
  );

  const current = getCurrentProject();
  if (!filteredProjects.includes(current)) {
    filteredProjects.push(current);
  }

  for (const project of filteredProjects) {
    const projectDiv = createEl("div", "project");
    projectDiv.id = project.id;
    if (project.isCurrentProject) {
      projectDiv.classList.add("selected-project");
    }

    const iconDiv = createEl("div", "prj-img");
    const icon = createEl("img", "prj-img");
    icon.src = todoListIcon;
    iconDiv.appendChild(icon);

    const titleDiv = createEl("div", "prj-ttl", project.title);

    projectDiv.append(iconDiv, titleDiv);
    projectListDiv.appendChild(projectDiv);
  }
}
