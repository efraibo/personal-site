// Debug utility for Next.js compatibility issues
const debugElement = document.createElement('div');
debugElement.id = 'next-debug';
debugElement.style.position = 'fixed';
debugElement.style.bottom = '10px';
debugElement.style.right = '10px';
debugElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
debugElement.style.color = 'white';
debugElement.style.padding = '10px';
debugElement.style.borderRadius = '5px';
debugElement.style.fontSize = '12px';
debugElement.style.fontFamily = 'monospace';
debugElement.style.zIndex = '9999';
debugElement.style.maxWidth = '400px';
debugElement.style.maxHeight = '200px';
debugElement.style.overflow = 'auto';
debugElement.style.display = 'none';

// Track Next.js compatibility issues
const issues = [];

// Add debug element to the document when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(debugElement);

  // Add keyboard shortcut to toggle debug panel (Alt+D)
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'd') {
      debugElement.style.display = debugElement.style.display === 'none' ? 'block' : 'none';
    }
  });
});

// Add a debug log entry
export function logNextIssue(component, message, error = null) {
  const timestamp = new Date().toLocaleTimeString();
  const entry = {
    timestamp,
    component,
    message,
    error: error ? error.toString() : null
  };
  
  issues.push(entry);
  
  // Update debug panel
  debugElement.innerHTML = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
      <strong>Next.js Compat Debug</strong>
      <small>Press Alt+D to toggle</small>
    </div>
    <div style="border-top: 1px solid #444; margin-bottom: 5px;"></div>
    ${issues.map(i => `
      <div style="margin-bottom: 5px; border-bottom: 1px dotted #444; padding-bottom: 2px;">
        <div><strong>${i.component}</strong> <small>(${i.timestamp})</small></div>
        <div>${i.message}</div>
        ${i.error ? `<div style="color: #ff6b6b;">${i.error}</div>` : ''}
      </div>
    `).join('')}
  `;
  
  // Also log to console
  console.warn(`[Next.js Compat] ${component}: ${message}`, error);
}
