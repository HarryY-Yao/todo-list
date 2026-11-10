import { getCurrentProject } from "./getCurrentProject";
import { setCurrentProject } from "./setCurrentProject";
import { contextMenu, projectHeader, deleteProject } from "./elements";
import { projectList } from ".";
import { clearTasks } from "./clearTasks";
import { displayTasks } from "./displayTasks";
import { updateMenuPosition } from "./updateMenuPosition";
import { closeEditMenu } from "./editTask";
import { saveState } from "./storage";

// The sidebar element that was right-clicked (target of the delete action).
let projectToDelete = null;

function hideContextMenu() {
  contextMenu.style.visibility = null;
  projectToDelete = null;
}

// Any click anywhere dismisses the context menu.
document.addEventListener("click", hideContextMenu);

// "Delete" entry in the context menu.
deleteProject.addEventListener("click", () => {
  // Never delete the last remaining project.
  if (projectList.length <= 1 || !projectToDelete) {
    hideContextMenu();
    return;
  }

  const index = projectList.findIndex((p) => p.id === projectToDelete.id);
  const deletingCurrent = getCurrentProject().id === projectToDelete.id;

  if (deletingCurrent) {
    // Select a neighbour: the next project if we're deleting the first one,
    // otherwise the previous one.
    const neighbour = index === 0 ? projectList[1] : projectList[index - 1];
    setCurrentProject(neighbour);
    document
      .getElementById(neighbour.id)
      .classList.toggle("selected-project");
    projectHeader.textContent = neighbour.title;
  }

  projectList.splice(index, 1);

  if (deletingCurrent) {
    clearTasks();
    displayTasks(getCurrentProject());
  }

  projectToDelete.remove();
  hideContextMenu();
  saveState(projectList);
});

// Attaches click (select) and right-click (context menu) handlers to every
// project in the sidebar. Call again after the sidebar is re-rendered.
export function setProjectInteraction() {
  const projectDivs = document.querySelectorAll(".project");

  projectDivs.forEach((div) => {
    // Left click: make this project the current one and show its tasks.
    div.addEventListener("click", () => {
      const currentProjectDiv = document.getElementById(
        getCurrentProject().id,
      );
      closeEditMenu();

      const project = projectList.find((p) => p.id === div.id);
      if (project) {
        currentProjectDiv.classList.toggle("selected-project");
        setCurrentProject(project);
        div.classList.toggle("selected-project");
        projectHeader.textContent = project.title;
        clearTasks();
        displayTasks(project);
      }
      saveState(projectList);
    });

    // Right click: open the context menu at the cursor.
    div.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();

      projectToDelete = div;
      updateMenuPosition(ev.clientX, ev.clientY);
      contextMenu.style.visibility = "visible";
    });
  });
}
