// Dynamic title updates based on current section
(function() {
  const originalTitle = 'Evandro Nascimento - Software Developer & Tech Lead';
  
  const sectionTitles = {
    'hero': 'Home - Evandro Nascimento',
    'sobre': 'Sobre Mim - Evandro Nascimento', 
    'experiencia': 'Experiência - Evandro Nascimento',
    'skills': 'Habilidades - Evandro Nascimento',
    'educacao': 'Educação - Evandro Nascimento',
    'contato': 'Contato - Evandro Nascimento',
    'projetos': 'Projetos - Evandro Nascimento'
  };

  let currentSection = '';
  
  // Observer for section changes
  const observer = new IntersectionObserver((entries) => {
    // Sort entries by intersection ratio to get the most visible section
    const visibleEntries = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    
    if (visibleEntries.length > 0) {
      const topEntry = visibleEntries[0];
      const sectionId = topEntry.target.id;
      
      if (sectionId && sectionTitles[sectionId] && currentSection !== sectionId) {
        currentSection = sectionId;
        document.title = sectionTitles[sectionId];
        console.log(`Title updated to: ${sectionTitles[sectionId]} for section: ${sectionId}`);
      }
    }
  }, {
    // Use multiple thresholds for more precise detection
    threshold: [0.1, 0.25, 0.5, 0.75],
    rootMargin: '-10% 0px -10% 0px'
  });

  // Observe all sections when DOM is ready
  function initSectionObserver() {
    console.log('Initializing section observer for dynamic title');
    const sections = document.querySelectorAll('section[id], main[id], div[id]');
    
    if (sections.length === 0) {
      console.warn('No sections found with IDs. Dynamic title will not work.');
    }
    
    let observedCount = 0;
    sections.forEach(section => {
      if (section.id) {
        if (sectionTitles[section.id]) {
          observer.observe(section);
          observedCount++;
          console.log(`Observing section with ID: ${section.id}`);
        } else {
          console.warn(`Section with ID: ${section.id} found but not defined in sectionTitles.`);
        }
      }
    });
    
    console.log(`Initialized observer for ${observedCount} section(s)`);
  }

  // Reset title when page loses focus
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = '💼 ' + originalTitle;
    } else {
      document.title = currentSection ? sectionTitles[currentSection] : originalTitle;
    }
  });

  // Initialize when DOM is ready
  function init() {
    console.log('Dynamic title script initializing');
    try {
      if (typeof window !== 'undefined' && window.document) {
        // For React/SPA applications, we need to handle delayed DOM updates
        // First initialization
        initSectionObserver();
        
        // Set up a second pass for React/SPA after a delay
        setTimeout(() => {
          console.log('Running delayed section observer initialization');
          initSectionObserver();
        }, 1000);
        
        // Set up a periodic check for new sections (e.g., ones that appear after navigation)
        const periodicCheck = setInterval(() => {
          initSectionObserver();
        }, 3000);
        
        // Clear interval after 30 seconds to avoid unnecessary processing
        setTimeout(() => {
          clearInterval(periodicCheck);
        }, 30000);
      }
    } catch (error) {
      console.error('Error initializing dynamic title:', error);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
