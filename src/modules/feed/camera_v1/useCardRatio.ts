import { useState, useCallback } from "react";

// interface InitialRationProps {
//   height: number;
//   width: number;
// }

// type InitialRationProps = (height: number, width: number) => number;

export function useCardAspectRatio(initialRatio: any) {
  const [aspectRatio, setAspectRatio] = useState(initialRatio);

  const calculateRatio = useCallback((height, width) => {
    if (height && width) {
      // if height is less than or equal to width it's landscape
      let isLandscape = height <= width;

      let ratio = isLandscape ? width / height : height;

      setAspectRatio(ratio);
    }
  }, []);

  return [aspectRatio, calculateRatio];
}
