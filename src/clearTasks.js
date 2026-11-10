import { taskList } from "./elements";

// Removes every task from the task list (the data is untouched).
export function clearTasks() {
  taskList.replaceChildren();
}
