// Enhanced shim for next/head
import React, { useEffect } from 'react';
import { logNextIssue } from './next-debug';

// Create a random ID for each Head element to manage references
const generateHeadId = () => `next-head-${Math.random().toString(36).slice(2, 9)}`;

// Helper to apply tags to the document head
const applyHeadTags = (headId, children) => {
  if (!document) return [];
  
  const addedElements = [];
  
  // Process the children to update document head
  React.Children.forEach(children, (child) => {
    if (!child) return;
    
    try {
      // Handle different tag types
      const type = child.type;
      const props = {...child.props};
      
      // Skip if no valid type
      if (typeof type !== 'string') {
        logNextIssue('Head', `Unsupported element type in Head: ${typeof type}`);
        return;
      }
      
      let element;
      
      // Create the appropriate element based on type
      switch (type) {
        case 'title':
          document.title = props.children || '';
          return; // Titles are handled specially
          
        case 'meta':
          // Check for existing meta with the same name/property to replace it
          if (props.name || props.property) {
            const selector = props.name 
              ? `meta[name="${props.name}"]` 
              : `meta[property="${props.property}"]`;
            const existing = document.querySelector(selector);
            if (existing) {
              existing.remove();
            }
          }
          element = document.createElement('meta');
          break;
          
        case 'link':
          // For link tags, check for existing to avoid duplicates
          if (props.rel && props.href) {
            const existing = document.querySelector(`link[rel="${props.rel}"][href="${props.href}"]`);
            if (existing) {
              existing.remove();
            }
          }
          element = document.createElement('link');
          break;
          
        case 'script':
          element = document.createElement('script');
          break;
          
        case 'style':
          element = document.createElement('style');
          if (props.children) {
            element.textContent = props.children;
            delete props.children;
          }
          break;
          
        default:
          element = document.createElement(type);
      }
      
      // Add data attribute to mark this element for cleanup
      element.setAttribute('data-next-head', headId);
      
      // Apply all props as attributes
      Object.keys(props).forEach(key => {
        if (key === 'children') return;
        
        // Handle special cases
        if (key === 'dangerouslySetInnerHTML' && props[key].__html) {
          element.innerHTML = props[key].__html;
        } else {
          try {
            element.setAttribute(key, props[key]);
          } catch (err) {
            logNextIssue('Head', `Error setting attribute ${key}`, err);
          }
        }
      });
      
      // Append to document head
      document.head.appendChild(element);
      addedElements.push(element);
      
    } catch (err) {
      logNextIssue('Head', 'Error processing head element', err);
    }
  });
  
  return addedElements;
};

// Component implementation
const Head = ({ children }) => {
  const headId = React.useMemo(generateHeadId, []);
  
  useEffect(() => {
    const elements = applyHeadTags(headId, children);
    
    // Cleanup when component unmounts
    return () => {
      elements.forEach(el => {
        try {
          if (document.head.contains(el)) {
            document.head.removeChild(el);
          }
        } catch (err) {
          logNextIssue('Head', 'Error removing head element', err);
        }
      });
      
      // Also remove any other elements with this headId that might have been missed
      document.querySelectorAll(`[data-next-head="${headId}"]`).forEach(el => {
        try {
          document.head.removeChild(el);
        } catch (err) {
          // Ignore errors here
        }
      });
    };
  }, [headId, children]);
  
  return null; // Head doesn't render anything
};

export default Head;
