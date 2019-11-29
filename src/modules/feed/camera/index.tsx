import React, { Fragment } from "react";

import Camera from "./camera";
import FauxCamera from "./faux-camera";
import { Root } from "./styles";
import { Button, Flex } from "../../../components/styled-rebass";
import {
  User,
  CreatePostMutationFn,
  CreatePostMutationResult
} from "../../../components/generated/apollo-graphql";
// import CardSkeleton from "../../../modules/post/card-skeleton";
// import PostPage from "../../../modules/post/post-page";

interface CameraModuleProps {
  me: User["id"] | undefined;
  cardImage: Blob | undefined;
  setCardImage: React.Dispatch<React.SetStateAction<Blob | undefined>>;
  isCameraOpen: boolean;
  setIsCameraOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postCreated: boolean;
  setPostCreated: React.Dispatch<React.SetStateAction<boolean>>;

  createPost: CreatePostMutationFn;
  dataCreatePost: CreatePostMutationResult["data"];
  errorCreatePost: CreatePostMutationResult["error"];
  loadingCreatePost: CreatePostMutationResult["loading"];
  onCapture?: any | undefined;
  onClear?: any | undefined;
}

const CameraModule: React.FunctionComponent<CameraModuleProps> = ({
  // children,
  cardImage,
  setCardImage,
  isCameraOpen,
  setIsCameraOpen,
  createPost,
  dataCreatePost,
  errorCreatePost,
  loadingCreatePost,
  me
}) => {
  return (
    <Fragment>
      <Root>
        <Flex>
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
        {/* {!isCameraOpen ? <CardSkeleton /> : ""} */}
        {isCameraOpen ? (
          <Camera
            onCapture={(blob: Blob) => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
            cardImage={cardImage}
            createPost={createPost}
            dataCreatePost={dataCreatePost}
            errorCreatePost={errorCreatePost}
            loadingCreatePost={loadingCreatePost}
            isCameraOpen={isCameraOpen}
            me={me || ""}
          />
        ) : (
          <FauxCamera
            onCapture={(blob: Blob) => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
            cardImage={cardImage}
            createPost={createPost}
            dataCreatePost={dataCreatePost}
            errorCreatePost={errorCreatePost}
            loadingCreatePost={loadingCreatePost}
            isCameraOpen={isCameraOpen}
            me={me || ""}
          />
        )}
      </Root>
    </Fragment>
  );
};

export default CameraModule;
