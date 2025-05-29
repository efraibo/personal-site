// Extend Window interface for our Next.js compatibility layer
interface NextRouter {
  pathname: string;
  asPath: string;
  query: Record<string, any>;
  events: {
    on: (event: string, callback: (...args: any[]) => void) => void;
    off: (event: string, callback: (...args: any[]) => void) => void;
    emit: (event: string, ...args: any[]) => void;
  };
  push: (url: string) => Promise<boolean>;
  replace: (url: string) => Promise<boolean>;
  reload: () => void;
  back: () => void;
  prefetch: (url: string) => Promise<void>;
  beforePopState: (cb: (state: any) => boolean) => void;
  isReady: boolean;
}

interface NextCompatibility {
  router: NextRouter;
}

declare global {
  interface Window {
    Next?: NextCompatibility;
    process?: {
      env: Record<string, string | boolean>;
      browser: boolean;
      platform: string;
    };
  }
}

export {};
