// A named collection of tasks. Exactly one project is "current" at a time.
export class Project {
  constructor(title = "Untitled Project") {
    this.title = title;
    this.tasks = [];
    this.id = "g" + crypto.randomUUID();
    this.isCurrentProject = false;
  }

  // Used when restoring a project from storage so its id stays stable.
  setID(id) {
    this.id = id;
  }

  toggleCurrentProject() {
    this.isCurrentProject = !this.isCurrentProject;
  }
}
