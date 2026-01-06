export class Todo {
    constructor(title, description, dueDate = "yyyy-mm-dd", priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
        this.checkboxID = crypto.randomUUID();
        this.completed = false;
    }

    linkCheckBox(checkboxID) {
        this.checkboxID = checkboxID;
    }

    getID() {
        return this.id;
    }

    getCheckboxID() {
        return this.checkboxID;
    }

    completeTask() {
        this.completed = !(this.completed);
    }

    isCompleted() {
        return this.completed;
    }
}