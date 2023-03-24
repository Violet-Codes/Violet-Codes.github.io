import { CSSProperties, ReactNode, useEffect, useState } from "react";

export type SemiRegular = {
    style?: CSSProperties;
    className?: string;
};

export type Regular = SemiRegular & {
    children?: ReactNode | ReactNode[];
};

export const normChildren = (children: undefined | ReactNode | ReactNode[]): ReactNode[] =>
    (children !== undefined) ? [children].flat() : [];

export const normStyle = (style: undefined | CSSProperties): CSSProperties =>
    (style !== undefined) ? style : {} as CSSProperties;

export const normClassName = (className: undefined | string): string =>
    (className !== undefined) ? className : "";


// Taken from /https://usehooks.com/useWindowSize/ with minor edits
// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<{width?: number, height?: number}>({});
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
  
      // Add event listener
      window.addEventListener("resize", handleResize);
  
      // Call handler right away so state gets updated with initial window size
      handleResize();
  
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
  
    return windowSize;
  }