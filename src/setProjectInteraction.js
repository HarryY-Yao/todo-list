import { getCurrentProject } from "./getCurrentProject";
import { setCurrentProject } from "./setCurrentProject";
import { contextMenu, projectList, projectListDiv, projectHeader, deleteProject } from ".";
import { clearTasks } from "./clearTasks";
import { displayTasks } from "./displayTasks";
import { updateMenuPosition } from "./updateMenuPosition";
import { closeEditMenu } from "./editTask";
import { saveState } from "./storage";


export function setProjectInteraction() {
    const projectDivs = document.querySelectorAll(".project");
    let projectToDelete = null; 
    projectDivs.forEach(div => {
        div.addEventListener("click", () => {
            const currentProject = getCurrentProject();
            const currentProjectDiv = document.getElementById(currentProject.id);
            closeEditMenu();
            for (const project of projectList) {
                if (project.id == div.id) {
                    currentProjectDiv.classList.toggle("selected-project");
                    setCurrentProject(project);
                    div.classList.toggle("selected-project");
                    projectHeader.innerText = project.title;
                    clearTasks()
                    displayTasks(project);
                    break
                }
            }
            saveState(projectList);
        })

        
        div.addEventListener("contextmenu", (ev) => {
            ev.preventDefault();

            projectToDelete = div;
            updateMenuPosition(ev.clientX, ev.clientY);
            contextMenu.style.visibility = "visible";
        });
        
    })
    
    document.addEventListener("click", () => {
        projectToDelete = null;
        contextMenu.style.visibility = null;
    })

    deleteProject.addEventListener("click", () => {
        if (projectList.length <= 1) {
            contextMenu.visibility = null;
            projectToDelete = null;
            return;
        }
        
        if (projectToDelete) {
            let index = -1
            for (let i = 0; i < projectList.length; i++) {
                if (projectList[i].id == projectToDelete.id) {
                    index = i;
                }
            }

            if (getCurrentProject().id == projectToDelete.id) {
                let newSelectedProject = null;
                if (index == 0) {
                    setCurrentProject(projectList[1]);
                    newSelectedProject = document.querySelector(`#${projectList[1].id}`);
                } else {
                    setCurrentProject(projectList[index - 1]);
                    newSelectedProject = document.querySelector(`#${projectList[index - 1].id}`);

                }
                projectList.splice(index, 1);
                newSelectedProject.classList.toggle("selected-project");
                projectHeader.innerText = getCurrentProject().title;
                clearTasks();
                displayTasks(getCurrentProject());
            
            } else {
                projectList.splice(index, 1);
            }

            projectToDelete.remove();
            projectToDelete = null;
            contextMenu.visibility = null;
            saveState(projectList);

        }
    }) 
    
}
