import * as React from 'react';

/**
 * Robust TypeScript declaration file for Ionicons in Next.js.
 * This handles global JSX, React namespace, and modern JSX runtimes.
 * 
 * Save this file exactly as `ionicons.d.ts` in your project root or `src/` directory.
 */

// 1. Global JSX definition (for standard environments)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          src?: string;
          size?: 'small' | 'large' | string;
          color?: string;
          icon?: string;
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}

// 2. React namespace definition (for traditional React imports)
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          src?: string;
          size?: 'small' | 'large' | string;
          color?: string;
          icon?: string;
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}

// 3. React JSX Runtime definition (Crucial for modern Next.js/Vite compilations)
declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          src?: string;
          size?: 'small' | 'large' | string;
          color?: string;
          icon?: string;
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}

// Crucial: Ensures this file is treated as a module augmentation rather than a global overwrite
export {};
