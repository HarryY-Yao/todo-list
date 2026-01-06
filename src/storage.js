import { Project } from "./project";
import { Todo } from "./todo";

const KEY = "todoAppState";
const VERSION = 1;

function defaultState() {
  return { version: VERSION, currentProjectId: null, projects: [] };
}

export function saveState(projectList) {
  const current = projectList.find(p => p.isCurrentProject);

  const state = {
    version: VERSION,
    currentProjectId: current ? current.id : null,
    projects: projectList.map(p => ({
      id: p.id,
      title: p.title,
      tasks: p.tasks.map(t => ({
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

export function loadState() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { projectList: [], currentProjectId: null };

  let state;
  try {
    state = JSON.parse(raw);
  } catch {
    localStorage.removeItem(KEY);
    return { projectList: [], currentProjectId: null };
  }

  if (!state || state.version !== VERSION) {
    return { projectList: [], currentProjectId: null };
  }

  const projectList = (state.projects || []).map(pObj => {
    const p = new Project(pObj.title);
    p.setID(pObj.id);

    p.tasks = (pObj.tasks || []).map(tObj => {
      const t = new Todo(tObj.title, tObj.description, tObj.dueDate, tObj.priority);
      t.id = tObj.id;
      t.completed = !!tObj.completed;
      if (tObj.checkboxID) t.linkCheckBox(tObj.checkboxID);
      return t;
    });

    return p;
  });

  const currentId = state.currentProjectId;
  if (currentId) {
    projectList.forEach(p => (p.isCurrentProject = p.id === currentId));
  } else if (projectList.length > 0) {
    projectList[0].isCurrentProject = true;
  }

  return { projectList, currentProjectId: currentId };
}

export function clearState() {
  localStorage.removeItem(KEY);
}
