export class Project {
    constructor(title = "Untitled Project") {
        this.title = title;
        this.tasks = [];
        this.id = "g" + `${crypto.randomUUID()}`;
        this.isCurrentProject = false;
    }

    setID(id) {
        this.id = id;
    }

    toggleCurrentProject() {
        this.isCurrentProject = !(this.isCurrentProject);
    }



}