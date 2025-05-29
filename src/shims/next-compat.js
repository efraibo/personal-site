// A comprehensive browser compatibility layer for Next.js components
// This should be imported before any Next.js components
import { logNextIssue } from './next-debug';

// Process polyfill
if (typeof window !== 'undefined' && !window.process) {
  window.process = {
    env: {
      NODE_ENV: 'development',
      __NEXT_ROUTER_BASEPATH: '',
      __NEXT_SCROLL_RESTORATION: false,
      __NEXT_HAS_REWRITES: false,
      NEXT_PUBLIC_BASE_PATH: '',
    },
    browser: true,
    platform: 'browser',
    version: '',
    cwd: () => '/',
  };
}

// Router polyfill
if (typeof window !== 'undefined') {
  window.next = {
    version: '13.0.0 (compatibility shim)',
    router: {
      pathname: window.location.pathname,
      asPath: window.location.pathname + window.location.search,
      query: Object.fromEntries(new URLSearchParams(window.location.search)),
      events: {
        on: (event, callback) => {
          logNextIssue('Router', `Registered event listener for: ${event}`);
          // Add basic support for router events
          window.addEventListener('popstate', () => {
            if (event === 'routeChangeStart' || event === 'routeChangeComplete') {
              callback(window.location.pathname);
            }
          });
        },
        off: () => {},
        emit: () => {},
      },
      push: (url) => { 
        logNextIssue('Router', `Navigation: push to ${url}`);
        window.location.href = url; 
        return Promise.resolve(true); 
      },
      replace: (url) => { 
        logNextIssue('Router', `Navigation: replace with ${url}`);
        window.location.replace(url); 
        return Promise.resolve(true); 
      },
      reload: () => window.location.reload(),
      back: () => window.history.back(),
      prefetch: () => Promise.resolve(),
      beforePopState: () => {},
      isReady: true,
      isFallback: false,
      isPreview: false,
    },
  };

  // Add support for localStorage/sessionStorage fallbacks
  try {
    // Test localStorage access
    window.localStorage.getItem('test');
  } catch (e) {
    logNextIssue('Storage', 'Using memory storage fallback', e);
    const memoryStorage = {};
    window.localStorage = {
      getItem: (key) => memoryStorage[key] || null,
      setItem: (key, value) => { memoryStorage[key] = String(value); },
      removeItem: (key) => { delete memoryStorage[key]; },
      clear: () => { Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]); },
      key: (index) => Object.keys(memoryStorage)[index] || null,
      get length() { return Object.keys(memoryStorage).length; }
    };
  }
}

// Add other Next.js globals as needed

console.log('[Next.js Compat Layer] Initialized successfully');
