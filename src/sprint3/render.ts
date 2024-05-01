import Block from "../core/Block.ts";

export const render = (query: string, block: Block): HTMLElement | null => {
    // Directly retrieve the root element without caching
    const root = document.querySelector(query) as HTMLElement;
  
    if (root === null) {
      console.error(`Root not found by selector "${query}"`); // Log the error instead of throwing
      return null; // Handle gracefully by returning null
    }
  
    // Clear the root more efficiently
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  
    // Get the content of the block and append it if it's not null
    const content = block.getContent();
    if (content) {
      root.append(content);
    } else {
      console.error('Block content is null');
    }
  
    return root;
  };  
