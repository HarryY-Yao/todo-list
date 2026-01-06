import { projectList, projectListDiv } from ".";
import todoListIcon from "../images/todo-list-svgrepo-com.svg"
import { clearProjects } from "./clearProjects";
import { setProjectInteraction } from "./setProjectInteraction";
import { currentProject } from ".";
import { getCurrentProject } from "./getCurrentProject";

export const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    clearProjects();
    displayProjects(query)
    setProjectInteraction();
});

export function displayProjects(query) {
    const filteredProjects = projectList.filter(project =>
        project.title.toLowerCase().includes(query)
    );

    if (!filteredProjects.includes(getCurrentProject())) {
        filteredProjects.push(getCurrentProject());
    }
    
    for (const project of filteredProjects) {
        let projectDiv = document.createElement("div")
        projectDiv.classList.add("project");
        projectDiv.setAttribute("id", project.id);

        if (project.isCurrentProject) {
            projectDiv.classList.add("selected-project");
        }

        let iconDiv = document.createElement("div");
        iconDiv.classList.add("prj-img");

        let icon = document.createElement("img");
        icon.classList.add("prj-img");
        icon.src = todoListIcon;

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("prj-ttl");
        titleDiv.innerText = project.title;

        iconDiv.appendChild(icon);
        projectDiv.appendChild(iconDiv);
        projectDiv.appendChild(titleDiv);
        projectListDiv.appendChild(projectDiv);
    }

    
}