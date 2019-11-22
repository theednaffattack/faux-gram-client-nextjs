import React from "react";
import { useRef, useState } from "react";
import Measure from "react-measure";

import { useCardAspectRatio } from "./useCardRatio";
import { useUserMedia, PossibleMediaStream } from "./useUserMedia";
import { useOffsets } from "./useOffsets";

interface ICameraProps {
  videoStopped: boolean;
}

const Camera: React.FunctionComponent<ICameraProps> = ({ videoStopped }) => {
  let initialValue: any = null;

  let videoRef = useRef(initialValue);
  let canvasRef = useRef(initialValue);

  let CAPTURE_OPTIONS: MediaStreamConstraints = {
    audio: false,
    video: { facingMode: "environment" }
  };

  let mediaStream: PossibleMediaStream = useUserMedia(CAPTURE_OPTIONS);
  let [container, setContainer] = useState({ height: 0, width: 0 });
  let [cardAspectRatio, calculateRatio] = useCardAspectRatio(1.586);

  // @ts-ignore
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  // function isNumber(arg: any): arg is number {
  //   return typeof arg !== "number";
  // }

  // function isNotNumber(arg: any): arg is () => void {
  //   return typeof arg === "function";
  // }

  function handleResize(contentRect: any) {
    console.log("handleResize firing");
    // if (isNumber(cardAspectRatio)) {
    setContainer({
      height: Math.round(contentRect.bounds.width / cardAspectRatio),
      width: contentRect.bounds.width
    });
    // } else {
    //   throw Error("`cardAspectRatio` expected to be of type 'number'");
    // }
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    videoRef.current.play();
  }

  if (videoStopped && videoRef.current && videoRef.current.srcObject) {
    videoRef.current.pause();
    videoRef.current.src = "";
    mediaStream &&
      mediaStream.getTracks().forEach(function(track: any) {
        track.stop();
      });
  }

  // const onStopButtonClick = async () => {
  //   if (videoRef.current && videoRef.current.srcObject) {
  //     videoRef.current.pause();
  //     videoRef.current.src = "";
  //     mediaStream &&
  //       mediaStream.getTracks().forEach(function(track: any) {
  //         track.stop();
  //       });
  //   }
  // };

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => {
        return (
          <main
            ref={measureRef}
            style={{
              overflowY: "auto",
              height: `${container.height}px`,
              border: "2px limegreen solid"
            }}
          >
            <section id="camera">
              <video
                ref={videoRef}
                onCanPlay={handleCanPlay}
                autoPlay
                playsInline
                muted
                id="myVideo"
                // style={{
                //   top: `${offsets.y}px`,
                //   left: `${offsets.x}px`
                // }}
                width="100%"
                height="300px"
              />
            </section>
            {videoRef.current && videoRef.current.srcObject ? (
              <section id="capture">
                <canvas
                  ref={canvasRef}
                  width="100%"
                  height="300px"
                  style={{ border: "2px pink solid" }}
                >
                  yo
                </canvas>
              </section>
            ) : (
              ""
            )}
          </main>
        );
      }}
    </Measure>
  );
};

export default Camera;
