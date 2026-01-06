import { contextMenu } from ".";

export const updateMenuPosition = (x, y) => {
    const maxLeftValue = window.innerWidth - contextMenu.offsetWidth;
    const maxTopValue = window.innerHeight - contextMenu.offsetHeight;
    
    contextMenu.style.left = `${Math.min(maxLeftValue, x)}px`;
    contextMenu.style.top = `${Math.min(maxTopValue, y)}px`;
};