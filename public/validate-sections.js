// Validate section IDs
// Run this script to verify that section IDs match the dynamic-title.js configuration

function checkSectionIDs() {
  console.log('Checking section IDs...');
  
  // Get expected section IDs from dynamic-title.js
  const dynamicTitleScript = document.querySelector('script[src*="dynamic-title.js"]');
  if (!dynamicTitleScript) {
    console.error('dynamic-title.js script not found in the page');
    return;
  }
  
  // Expected section IDs (hardcoded for validation)
  const expectedIDs = ['hero', 'sobre', 'experiencia', 'skills', 'educacao', 'contato', 'projetos'];
  
  // Find all sections in the document
  const sections = document.querySelectorAll('section');
  console.log(`Found ${sections.length} sections in the document`);
  
  // Check each section
  const foundIDs = [];
  sections.forEach(section => {
    const id = section.id;
    foundIDs.push(id);
    
    if (!id) {
      console.warn(`MISSING ID: Section without ID found: ${section.textContent.substring(0, 50)}...`);
    } else if (!expectedIDs.includes(id)) {
      console.warn(`UNEXPECTED ID: Section with ID "${id}" is not in expected list: ${expectedIDs.join(', ')}`);
    } else {
      console.log(`✓ Valid section ID: ${id}`);
    }
  });
  
  // Check for missing sections
  expectedIDs.forEach(id => {
    if (!foundIDs.includes(id)) {
      console.warn(`MISSING SECTION: Expected section with ID "${id}" not found in the document`);
    }
  });
  
  console.log('Section ID check complete');
}

// Run on page load
window.addEventListener('load', function() {
  // Wait for React to render components
  setTimeout(checkSectionIDs, 1000);
});

// Export for manual execution
window.validateSectionIDs = checkSectionIDs;
