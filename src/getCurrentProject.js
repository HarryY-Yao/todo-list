import { projectList } from ".";

// Returns the project flagged as currently selected (undefined if none).
export function getCurrentProject() {
  return projectList.find((project) => project.isCurrentProject);
}
