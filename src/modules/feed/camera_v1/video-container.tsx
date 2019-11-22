import React from "react";
import { useState } from "react";

import Camera from "./camera";

interface VideoContainerProps {}

const VideoContainer: React.FunctionComponent<VideoContainerProps> = () => {
  let initialMountedState = false;
  const [Mounted, setMounted] = useState(initialMountedState);
  const [videoStopped, setVideoStopped] = useState(initialMountedState);

  // const [state, dispatch] = useReducer(reducer, initialState, init)

  let onStartButtonClick = () => {
    setMounted(true);
  };

  let onStopButtonClick = () => {
    // setMounted(false);
    setVideoStopped(true);
  };

  return (
    <main style={{ overflowY: "auto" }}>
      Mounted? {Mounted.toString()}
      <section id="camera">
        <button type="button" onClick={onStartButtonClick}>
          start stream
        </button>
        <button type="button" onClick={onStopButtonClick}>
          stop stream
        </button>
        {Mounted ? <Camera videoStopped={videoStopped} /> : ""}
      </section>
    </main>
  );
};

export default VideoContainer;
