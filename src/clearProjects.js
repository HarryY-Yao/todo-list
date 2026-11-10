import { projectListDiv } from "./elements";

// Removes every project from the sidebar (the data is untouched).
export function clearProjects() {
  projectListDiv.replaceChildren();
}
