import { Todo } from "./todo";
import { getCurrentProject } from "./getCurrentProject";
import { projectList } from ".";
import { saveState } from "./storage";


export function addTask(title, description, dueDate, priority) {
    const newTask = new Todo(title, description, dueDate, priority);
    getCurrentProject().tasks.push(newTask);
    localStorage.setItem(newTask.id, `${title},${description},${dueDate},${priority}`);
    saveState(projectList);
}