import React from "react";
import { useRef } from "react";
import { isBrowser } from "../../../src/lib/isBrowser";

interface ICameraProps {}

const Camera: React.FunctionComponent<ICameraProps> = () => {
  let initialValue: any = null;
  let videoRef = useRef(initialValue);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    videoRef.current.focus();

    console.log(isBrowser && window.navigator);
    console.log(isBrowser && window.navigator.mediaDevices.getUserMedia);

    if (
      isBrowser &&
      window.navigator.mediaDevices &&
      window.navigator.mediaDevices.getUserMedia
    ) {
      console.log("running video capture");
      window.navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
    }
  };

  return (
    <div>
      Camera
      <button onClick={onButtonClick}>ref button</button>
      <video ref={videoRef} id="myVideo" width="100%" height="300px" autoPlay />
    </div>
  );
};

export default Camera;
