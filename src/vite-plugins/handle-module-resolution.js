// This plugin handles module resolution errors in Vite
// to prevent common Next.js imports from breaking the build

export default function handleModuleResolution() {
  return {
    name: 'handle-module-resolution',
    
    resolveId(id) {
      // Handle various Next.js imports that might be missing
      const nextJsModules = [
        'next/script',
        'next/navigation',
        'next/amp',
        'next/future',
        'next/dynamic'
      ];
      
      // Return a shim path for Next.js modules that we don't have explicit shims for
      if (nextJsModules.includes(id)) {
        const path = require('path');
        return { id: path.resolve(__dirname, '../../src/shims/empty-module.js'), external: false };
      }
      
      return null; // Let Vite handle other imports
    }
  };
}
