import { Todo } from "./todo";
import { getCurrentProject } from "./getCurrentProject";
import { projectList } from ".";
import { saveState } from "./storage";

// Creates a task, adds it to the currently selected project, and saves.
export function addTask(title, description, dueDate, priority) {
  const newTask = new Todo(title, description, dueDate, priority);
  getCurrentProject().tasks.push(newTask);
  saveState(projectList);
}
