import { useState, useEffect } from "react";

export type PossibleMediaStream = null | MediaStream;

export function useUserMedia(requestedMedia: MediaStreamConstraints) {
  let initialMediaState = null;

  const [mediaStream, setMediaStream] = useState<PossibleMediaStream>(
    initialMediaState
  );

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        let setMediaStreamError = `Error setting MediaStream!\n${err}`;
        console.error(setMediaStreamError);
      }
    }

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
}
