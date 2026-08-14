import * as React from 'react';

/**
 * Robust TypeScript declaration file for Ionicons in Next.js.
 * This handles global JSX, React namespace, and modern JSX runtimes.
 * 
 */
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

// 2. React namespace definition
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

// 3. React JSX Runtime definition
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
export {};
