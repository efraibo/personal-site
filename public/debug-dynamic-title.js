// Debug helper for dynamic title functionality
console.log('Dynamic title debugger loaded');

const debugDynamicTitle = {
  // Get current title state
  getTitle: () => document.title,
  
  // Get all sections with IDs
  getSections: () => {
    const sections = document.querySelectorAll('section[id]');
    return Array.from(sections).map(section => ({
      id: section.id,
      position: section.getBoundingClientRect(),
      visible: isElementInViewport(section)
    }));
  },
  
  // Manually update title for a section
  setTitleForSection: (sectionId) => {
    const titleMap = {
      'hero': 'Home - Evandro Nascimento',
      'sobre': 'Sobre Mim - Evandro Nascimento', 
      'experiencia': 'Experiência - Evandro Nascimento',
      'skills': 'Habilidades - Evandro Nascimento',
      'educacao': 'Educação - Evandro Nascimento',
      'contato': 'Contato - Evandro Nascimento',
      'projetos': 'Projetos - Evandro Nascimento'
    };
    
    if (titleMap[sectionId]) {
      document.title = titleMap[sectionId];
      console.log(`Title manually set to: ${titleMap[sectionId]}`);
      return true;
    } else {
      console.warn(`No title mapping for section ID: ${sectionId}`);
      return false;
    }
  },
  
  // Scroll to a section by ID
  scrollToSection: (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log(`Scrolled to section: ${sectionId}`);
      return true;
    } else {
      console.warn(`Section with ID ${sectionId} not found`);
      return false;
    }
  },
  
  // Reinitialize observers
  reinitObservers: () => {
    // Assuming the dynamic title script uses a global function or we can trigger a reload
    console.log('Attempting to reinitialize observers');
    if (typeof window.validateSectionIDs === 'function') {
      window.validateSectionIDs();
    }
    
    // Reload the script to force reinitialization
    const script = document.createElement('script');
    script.src = './dynamic-title.js';
    script.onload = () => console.log('Dynamic title script reloaded');
    document.head.appendChild(script);
  }
};

// Helper function to check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add to window for console access
window.debugDynamicTitle = debugDynamicTitle;

console.log('Dynamic title debugger ready. Use window.debugDynamicTitle to access functions.');
