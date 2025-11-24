"use client";

import { useCallback, useEffect, useState } from "react";

interface IScrollPosition {
  x: number;
  y: number;
}

interface IUseScrollReturn {
  position: IScrollPosition;
  isScrolled: boolean;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  scrollTo: (position: IScrollPosition) => void;
  scrollToTop: () => void;
}

/**
 * Hook to track scroll position and direction
 */
export function useScroll(threshold = 10): IUseScrollReturn {
  const [position, setPosition] = useState<IScrollPosition>({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState<IScrollPosition>({
    x: 0,
    y: 0,
  });
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentPosition: IScrollPosition = {
        x: window.scrollX,
        y: window.scrollY,
      };

      setPosition(currentPosition);

      const delta = currentPosition.y - lastPosition.y;

      if (Math.abs(delta) > threshold) {
        setIsScrollingUp(delta < 0);
        setIsScrollingDown(delta > 0);
        setLastPosition(currentPosition);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastPosition.y, threshold]);

  const scrollTo = useCallback((pos: IScrollPosition): void => {
    window.scrollTo({
      left: pos.x,
      top: pos.y,
      behavior: "smooth",
    });
  }, []);

  const scrollToTop = useCallback((): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return {
    position,
    isScrolled: position.y > 0,
    isScrollingUp,
    isScrollingDown,
    scrollTo,
    scrollToTop,
  };
}

export type { IScrollPosition, IUseScrollReturn };
