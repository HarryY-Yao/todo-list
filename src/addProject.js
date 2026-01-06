import { projectList } from ".";
import { Project } from "./project";
import { saveState } from "./storage";

export function addProject(title) {
    const newProject = new Project(title);
    projectList.push(newProject);
    saveState(projectList);
    return newProject;
}