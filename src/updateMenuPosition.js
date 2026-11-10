import { contextMenu } from "./elements";

// Moves the context menu to (x, y), clamped so it never overflows the window.
export const updateMenuPosition = (x, y) => {
  const maxLeft = window.innerWidth - contextMenu.offsetWidth;
  const maxTop = window.innerHeight - contextMenu.offsetHeight;

  contextMenu.style.left = `${Math.min(maxLeft, x)}px`;
  contextMenu.style.top = `${Math.min(maxTop, y)}px`;
};
