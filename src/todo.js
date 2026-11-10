// A single task.
export class Todo {
  constructor(title, description, dueDate = "yyyy-mm-dd", priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = crypto.randomUUID();
    // Id of the checkbox button in the DOM that belongs to this task.
    this.checkboxID = crypto.randomUUID();
    this.completed = false;
  }

  // Used when restoring a task from storage so its checkbox id stays stable.
  linkCheckBox(checkboxID) {
    this.checkboxID = checkboxID;
  }

  getID() {
    return this.id;
  }

  getCheckboxID() {
    return this.checkboxID;
  }

  // Flips the completed state (despite the name, it toggles).
  completeTask() {
    this.completed = !this.completed;
  }

  isCompleted() {
    return this.completed;
  }

  setTitle(title) {
    this.title = title;
  }

  setDesc(description) {
    this.description = description;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }
}
