import { getCurrentProject } from "./getCurrentProject";

// Switches the selected project: un-flags the old one, flags the new one.
export function setCurrentProject(project) {
  getCurrentProject().toggleCurrentProject();
  project.toggleCurrentProject();
}
