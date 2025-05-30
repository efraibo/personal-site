// Dynamic title updates based on current section
(function() {
  const originalTitle = 'Evandro Nascimento - Software Developer & Tech Lead';
  
  const sectionTitles = {
    'hero': 'Home - Evandro Nascimento',
    'sobre': 'Sobre Mim - Evandro Nascimento', 
    'experiencia': 'Experiência - Evandro Nascimento',
    'skills': 'Habilidades - Evandro Nascimento',
    'educacao': 'Educação - Evandro Nascimento',
    'contato': 'Contato - Evandro Nascimento'
  };

  let currentSection = '';
  
  // Observer for section changes
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const sectionId = entry.target.id;
        if (sectionId && sectionTitles[sectionId] && currentSection !== sectionId) {
          currentSection = sectionId;
          document.title = sectionTitles[sectionId];
        }
      }
    });
  }, {
    threshold: [0.5],
    rootMargin: '-20% 0px -20% 0px'
  });

  // Observe all sections when DOM is ready
  function initSectionObserver() {
    const sections = document.querySelectorAll('section[id], main[id], div[id]');
    sections.forEach(section => {
      if (section.id && sectionTitles[section.id]) {
        observer.observe(section);
      }
    });
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionObserver);
  } else {
    initSectionObserver();
  }
})();
