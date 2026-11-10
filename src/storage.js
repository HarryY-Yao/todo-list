import { Project } from "./project";
import { Todo } from "./todo";

// localStorage key and schema version. Bump VERSION if the saved shape changes;
// state saved with a different version is ignored on load.
const KEY = "todoAppState";
const VERSION = 1;

// Serializes all projects (and their tasks) to localStorage.
export function saveState(projectList) {
  const current = projectList.find((p) => p.isCurrentProject);

  const state = {
    version: VERSION,
    currentProjectId: current ? current.id : null,
    projects: projectList.map((p) => ({
      id: p.id,
      title: p.title,
      tasks: p.tasks.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        dueDate: t.dueDate,
        priority: t.priority,
        completed: !!t.completed,
        checkboxID: t.checkboxID ?? null,
      })),
    })),
  };

  localStorage.setItem(KEY, JSON.stringify(state));
}

// Rebuilds Project/Todo objects from localStorage.
// Returns an empty list if nothing is saved or the saved data is unusable.
export function loadState() {
  const empty = { projectList: [], currentProjectId: null };

  const raw = localStorage.getItem(KEY);
  if (!raw) return empty;

  let state;
  try {
    state = JSON.parse(raw);
  } catch {
    // Corrupt data: discard it and start fresh.
    localStorage.removeItem(KEY);
    return empty;
  }

  if (!state || state.version !== VERSION) return empty;

  const projectList = (state.projects || []).map((pObj) => {
    const project = new Project(pObj.title);
    project.setID(pObj.id);

    project.tasks = (pObj.tasks || []).map((tObj) => {
      const task = new Todo(
        tObj.title,
        tObj.description,
        tObj.dueDate,
        tObj.priority,
      );
      task.id = tObj.id;
      task.completed = !!tObj.completed;
      if (tObj.checkboxID) task.linkCheckBox(tObj.checkboxID);
      return task;
    });

    return project;
  });

  // Restore which project was selected (default to the first one).
  const currentId = state.currentProjectId;
  if (currentId) {
    projectList.forEach((p) => (p.isCurrentProject = p.id === currentId));
  } else if (projectList.length > 0) {
    projectList[0].isCurrentProject = true;
  }

  return { projectList, currentProjectId: currentId };
}

// Wipes saved data (handy for debugging from the console).
export function clearState() {
  localStorage.removeItem(KEY);
}
