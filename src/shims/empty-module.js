// Empty module shim for Next.js modules we don't explicitly handle
export default {};

export const useRouter = () => ({
  pathname: window.location.pathname,
  query: {},
});

export const useSearchParams = () => new URLSearchParams();
export const usePathname = () => window.location.pathname;
export const useParams = () => ({});

// Add any other exports that might be needed
