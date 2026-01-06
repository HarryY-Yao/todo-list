import { taskList } from ".";

export function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    } 
}