import React, { Fragment, useState } from "react";

import Camera from "./camera";
// import Post from "../../post/post-page";
import { Root } from "./styles";
import { Button, Flex } from "../../../components/styled-rebass";
// import CreatePostMutation from "../../../modules/post/create-post-mutation";
import { User } from "../../../components/generated/apollo-graphql";
import PostPage from "../../../modules/post/post-page";

interface CameraModuleProps {
  me: User["id"] | undefined;
}

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
          {/* <Post cardImage={cardImage ? cardImage : undefined} /> */}

          <Button
            type="button"
            bg={isCameraOpen ? "crimson" : "blue"}
            onClick={() => {
              setIsCameraOpen(!isCameraOpen);

              if (isCameraOpen === true) {
                setCardImage(undefined);
              }
            }}
          >
            {isCameraOpen ? "close camera" : "open camera"}
          </Button>
        </Flex>
        {isCameraOpen && (
          <Camera
            onCapture={(blob: Blob) => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        )}

        {/* {cardImage && <CreatePostMutation cardImage={cardImage} me="" />} */}
        {cardImage && <PostPage cardImage={cardImage} />}

        {/* <Footer>
          <button onClick={() => setIsCameraOpen(true)}>Open Camera</button>
          <button
            onClick={() => {
              setIsCameraOpen(false);
              setCardImage(undefined);
            }}
          >
            Close Camera
          </button>
        </Footer> */}
      </Root>
    </Fragment>
  );
};

export default CameraModule;
