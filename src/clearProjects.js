import { projectListDiv } from ".";

export function clearProjects() {
    while (projectListDiv.firstChild) {
        projectListDiv.removeChild(projectListDiv.firstChild);
    }
}