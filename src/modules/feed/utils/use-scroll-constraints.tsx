import { useState, useEffect } from "react";

interface Constraints {
  top: number;
  bottom: number;
}

/**
 * Calculate the top/bottom scroll constraints of a full-screen element vs the viewport
 */
export function useScrollConstraints(
  ref: React.RefObject<HTMLDivElement>,
  measureConstraints: boolean
) {
  const [constraints, setConstraints] = useState<Constraints>({
    top: 0,
    bottom: 0
  });

  useEffect(() => {
    if (!measureConstraints) return;

    const element = ref.current;
    const viewportHeight = window.innerHeight;
    const contentTop =
      element !== null && element.offsetTop ? element.offsetTop : -1;
    const contentHeight =
      element !== null && element.offsetHeight ? element.offsetHeight : -1;
    const scrollableViewport = viewportHeight - contentTop * 2;
    const top = Math.min(scrollableViewport - contentHeight, 0);

    setConstraints({ top, bottom: 0 });
  }, [measureConstraints]);

  return constraints;
}
