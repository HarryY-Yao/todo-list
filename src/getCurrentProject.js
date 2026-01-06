import { projectList } from ".";

export function getCurrentProject() {
    for (const project of projectList) {
        if (project.isCurrentProject) {
            return project;
        }
    }
}