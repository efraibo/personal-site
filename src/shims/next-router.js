// Enhanced shim for next/router
import { useEffect, useState } from 'react';

// Use the window.next object initialized in next-compat.js
const getRouter = () => {
  if (typeof window === 'undefined') {
    // Server-side rendering fallback
    return {
      pathname: '/',
      query: {},
      asPath: '/',
      isFallback: false,
      basePath: '',
      events: {
        on: () => {},
        off: () => {},
        emit: () => {}
      },
      push: () => Promise.resolve(true),
      replace: () => Promise.resolve(true),
      reload: () => {},
      back: () => {},
      prefetch: () => Promise.resolve(),
      beforePopState: () => {},
      isReady: true,
      isPreview: false,
    };
  }

  return window.next?.router || {
    pathname: window.location.pathname,
    query: Object.fromEntries(new URLSearchParams(window.location.search)),
    asPath: window.location.pathname + window.location.search,
    isFallback: false,
    basePath: '',
    events: {
      on: () => {},
      off: () => {},
      emit: () => {}
    },
    push: (url) => {
      window.location.href = url;
      return Promise.resolve(true);
    },
    replace: (url) => {
      window.location.replace(url);
      return Promise.resolve(true);
    },
    reload: () => window.location.reload(),
    back: () => window.history.back(),
    prefetch: () => Promise.resolve(),
    beforePopState: () => {},
    isReady: true,
    isPreview: false,
  };
};

export const useRouter = () => {
  const [router] = useState(getRouter());
  
  useEffect(() => {
    // Add any router update logic here if needed
  }, []);
  
  return router;
};

// For default import support
export default {
  useRouter
};
