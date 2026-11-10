import { projectList } from ".";
import { Project } from "./project";
import { saveState } from "./storage";

// Creates a project, adds it to the project list, saves, and returns it.
export function addProject(title) {
  const newProject = new Project(title);
  projectList.push(newProject);
  saveState(projectList);
  return newProject;
}
