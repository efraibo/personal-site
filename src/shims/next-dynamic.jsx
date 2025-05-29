// Shim for Next.js dynamic import
import React, { lazy, Suspense } from 'react';

function Dynamic(importFunc, options = {}) {
  const LazyComponent = lazy(importFunc);
  
  const LoadingComponent = options.loading || (() => <div>Loading...</div>);
  const ErrorComponent = options.error || (() => <div>Error loading component</div>);
  
  return function DynamicComponent(props) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Match the API of Next.js dynamic
Dynamic.preload = () => {};

export default Dynamic;
