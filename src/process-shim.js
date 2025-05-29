// Provide minimal process shim for Next.js components
window.process = window.process || {
  env: {
    NODE_ENV: 'development',
    __NEXT_ROUTER_BASEPATH: '',
    __NEXT_SCROLL_RESTORATION: false,
    __NEXT_HAS_REWRITES: false,
  },
  browser: true,
  platform: 'browser',
};
