import { getCurrentProject } from "./getCurrentProject";


export function setCurrentProject(project) {
    let currProj = getCurrentProject();
    currProj.toggleCurrentProject();
    project.toggleCurrentProject();
}