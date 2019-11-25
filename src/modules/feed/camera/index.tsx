import React, { Fragment, useState } from "react";

import Camera from "./camera";
import Post from "../../post/post-page";
import { Root, Footer } from "./styles";
import { Button, Flex } from "../../../components/styled-rebass";
import { CreatePostForm } from "../../../modules/post/create-post-form";

interface CameraModuleProps {}

const CameraModule: React.FunctionComponent<CameraModuleProps> = () => {
  let initialCameraState = false;

  const [isCameraOpen, setIsCameraOpen] = useState(initialCameraState);
  const [cardImage, setCardImage] = useState<Blob>();

  // let initialCaptureState = null;
  // const [capture, setCapture] = useState(initialCaptureState);

  return (
    <Fragment>
      <Root>
        <Flex>
          <Post cardImage={cardImage ? cardImage : undefined} />

          <Button type="button" onClick={() => setIsCameraOpen(!isCameraOpen)}>
            {isCameraOpen ? "close camera" : "open camera"}
          </Button>
          <Button bg="orange" disabled={cardImage ? true : false}>
            upload image
          </Button>
        </Flex>
        {isCameraOpen && (
          <Camera
            onCapture={(blob: Blob) => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        )}
        <CreatePostForm
          onSubmit={() => console.log("on submit! text fields form")}
        />

        {/* {cardImage && (
          <div>
            <h2>Preview</h2>
            <Preview src={cardImage && URL.createObjectURL(cardImage)} />
          </div>
        )} */}

        <Footer>
          <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
          <button
            onClick={() => {
              setIsCameraOpen(false);
              setCardImage(undefined);
            }}
          >
            Close Camera
          </button>
        </Footer>
      </Root>
    </Fragment>
  );
};

export default CameraModule;
