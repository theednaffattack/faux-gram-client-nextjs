import React from "react";
import { PossibleMediaStream, useUserMedia } from "./useUserMedia";

const Video = React.forwardRef((CAPTURE_OPTIONS, ref) => {
  let mediaStream: PossibleMediaStream = useUserMedia(CAPTURE_OPTIONS);

  useFunctionality(ref);
  return null;
});
