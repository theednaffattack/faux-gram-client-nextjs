import { useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

const useAutoresize = (elementRef: React.RefObject<HTMLElement>) => {
  const [{ width, height }, setMeasurements] = useState({
    width: 0,
    height: 0
  });
  const observer = new ResizeObserver(([{ contentRect }]) => {
    setMeasurements({ width: contentRect.width, height: contentRect.height });
  });
  useEffect(() => {
    if (elementRef && elementRef.current) {
      observer.observe(elementRef.current);
    }
    if (elementRef && !elementRef.current) {
      return;
    }
    return () => observer.disconnect();
  }, [elementRef]);
  return { width, height };
};

export default useAutoresize;
