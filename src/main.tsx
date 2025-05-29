// Import Next.js compatibility layer first to ensure it's available before any Next.js imports
import './shims/next-compat.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/page';
import './app/globals.css';
import ErrorBoundary from './components/ErrorBoundary';

// Next.js compatibility is now handled by the imported next-compat.js

// Log startup information to help with debugging
console.log('[Vite App] Starting application with Next.js compatibility layer');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
