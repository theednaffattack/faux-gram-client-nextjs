import React, { useState, useRef } from "react";
import Measure, { ContentRect } from "react-measure";
// import { useCallbackRef } from "use-callback-ref";

import { Button, Flex } from "../../../components/styled-rebass";
import { useUserMedia } from "./hooks/use-user-media";
import { useCardRatio } from "./hooks/use-card-ratio";
import { useOffsets } from "./hooks/use-offsets";
import { Video, Canvas, Container, Flash, Overlay } from "./styles";
import CreatePostMutation from "../../../modules/post/create-post-mutation";
import {
  CreatePostMutationFn,
  CreatePostMutationResult,
  User
} from "../../../components/generated/apollo-graphql";

export interface SizeRect {
  readonly width: number;
  readonly height: number;
}

const CAPTURE_OPTIONS: MediaStreamConstraints = {
  audio: false,
  video: { facingMode: "environment" }
};

interface OtherProps {
  createPost: CreatePostMutationFn;
  dataCreatePost: CreatePostMutationResult["data"];
  errorCreatePost: CreatePostMutationResult["error"];
  loadingCreatePost: CreatePostMutationResult["loading"];
  isCameraOpen: boolean;
  onCapture: any;
  onClear: any;
  cardImage: Blob | undefined;
  me: User["id"];
}

const Camera: React.FunctionComponent<OtherProps> = ({
  cardImage,
  createPost,
  dataCreatePost,
  errorCreatePost,
  loadingCreatePost,
  // isCameraOpen,
  me,
  onCapture,
  onClear
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);

  let videoWidth: number;
  let videoHeight: number;

  if (videoRef.current && videoRef.current.videoWidth) {
    videoWidth = videoRef.current.videoWidth;
  } else {
    videoWidth = 500;
  }

  if (videoRef.current && videoRef.current.videoHeight) {
    videoHeight = videoRef.current.videoHeight;
  } else {
    videoHeight = 500;
  }

  let offsets = useOffsets(
    videoWidth,
    videoHeight,
    container.width,
    container.height
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleResize(contentRect: ContentRect) {
    if (contentRect && contentRect.bounds && typeof aspectRatio === "number") {
      setContainer({
        width: contentRect.bounds.width,
        height: Math.round(contentRect.bounds.width / aspectRatio)
      });
    } else {
      let contentRectError = "Error! contentRect is undefined";
      let boundsError = "Error! contentRect.bounds is undefined";
      let aspectRatioTypeError = "Error! aspectRatio is not a number";
      if (typeof aspectRatio !== "number") {
        throw Error(aspectRatioTypeError);
      }
      if (!contentRect) {
        throw Error(contentRectError);
      }

      if (contentRect && !contentRect.bounds) {
        throw Error(boundsError);
      }
    }
  }

  function handleCanPlay() {
    calculateRatio(videoHeight, videoWidth);
    setIsVideoPlaying(true);
    videoRef.current && videoRef.current.play();
  }

  /** See MDN REference:
   * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage */
  interface CanvasContextProp extends CanvasRenderingContext2D {}

  function handleCapture() {
    let get2dContext = canvasRef.current && canvasRef.current.getContext("2d");
    /** Canvas element context */
    let context: CanvasContextProp;
    console.log("HANDLE CAPTURE", { canvasRef, videoRef, get2dContext });

    if (canvasRef && canvasRef.current && get2dContext && videoRef.current) {
      console.log("IF STATEMENT");
      context = get2dContext;

      context.drawImage(
        videoRef.current,
        offsets.x,
        offsets.y,
        container.width,
        container.height,
        0,
        0,
        container.width,
        container.height
      );

      canvasRef.current.toBlob((blob: any) => onCapture(blob), "image/png", 1);
      setIsCanvasEmpty(false);
      setIsFlashing(true);
    }
  }

  function handleClear() {
    let get2dContext = canvasRef.current && canvasRef.current.getContext("2d");
    /** Canvas element context */
    let context: CanvasContextProp;
    if (canvasRef && canvasRef.current && get2dContext && videoRef.current) {
      context = get2dContext;

      context.clearRect(0, 0, videoWidth, videoHeight);
      setIsCanvasEmpty(true);
      onClear();
    } else {
      let errorObj = {
        canvasRefError:
          !canvasRef.current &&
          "No canvas ref is set (cannot access the canvas DOM node).",
        contextError: !get2dContext && "Cannot retrieve the canvas context",
        videoRefError:
          !videoRef.current &&
          "No video ref is set (cannot access the video DOM node)"
      };
      throw Error(`${JSON.stringify(errorObj)}`);
    }
  }

  if (!mediaStream) {
    return null;
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      // justifyContent="center"
      width={1}
      border="lime"
      flex="1 1 auto"
      style={{
        height: "100%",
        overflowY: "scroll"
      }}
    >
      {container.height}
      {container.width}
      <Flex
        alignItems="center"
        justifyContent="center"
        width={["640px"]}
        flexDirection="column"
        px={3}
        border="crimson"
        style={{ position: "relative" }}
      >
        <Measure bounds onResize={handleResize}>
          {({ measureRef }) => (
            <Container
              ref={measureRef}
              maxHeight={videoHeight}
              // maxWidth={videoWidth}
              width={1}
              style={{
                height: `${container.height}px`
              }}
            >
              <Video
                ref={videoRef}
                hidden={!isVideoPlaying}
                onCanPlay={handleCanPlay}
                autoPlay
                playsInline
                muted
                style={{
                  top: `-${offsets.y}px`,
                  left: `-${offsets.x}px`
                  // right: 0,
                  // bottom: 0
                }}
              />

              <Overlay hidden={!isVideoPlaying} />

              <Canvas
                ref={canvasRef}
                width={container.width}
                height={container.height}
              />

              <Flash
                flash={isFlashing}
                onAnimationEnd={() => setIsFlashing(false)}
              />
            </Container>
          )}
        </Measure>
      </Flex>
      <Flex flexDirection="column" px={3}>
        {isVideoPlaying && (
          <Button
            mt={3}
            type="button"
            onClick={isCanvasEmpty ? handleCapture : handleClear}
          >
            {isCanvasEmpty ? "Take a picture" : "Take another picture"}
          </Button>
        )}

        <Flex>
          {me ? (
            <CreatePostMutation
              createPost={createPost}
              dataCreatePost={dataCreatePost}
              errorCreatePost={errorCreatePost}
              loadingCreatePost={loadingCreatePost}
              cardImage={cardImage}
              me={me}
            />
          ) : (
            ""
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Camera;
