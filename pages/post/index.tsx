import React, { useState } from "react";

import {
  MeComponent,
  CreatePostComponent
} from "../../src/components/generated/apollo-graphql";
import { getLayout } from "../../src/modules/site-layout/layout";
import CameraModule from "../../src/modules/feed/camera";
// import PostPage from "../../src/modules/post/post-page";
import CreatePostMutation from "../../src/modules/post/create-post-mutation";
import CardSkeleton from "../../src/modules/post/card-skeleton";
// import { Card } from "../../src/components/styled-rebass";

interface IPost {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Post: IPost = () => {
  let initialCameraState = false;
  let initialPostCreatedState = false;

  const [isCameraOpen, setIsCameraOpen] = useState(initialCameraState);
  const [cardImage, setCardImage] = useState<Blob>();
  const [postCreated, setPostCreated] = useState(initialPostCreatedState);

  return (
    <MeComponent>
      {({ data, error, loading }) => {
        if (loading) return <div> loading me data!!!</div>;
        if (error) return <div>Error of Me DATA</div>;
        if (data && data.me) {
          return (
            <CreatePostComponent>
              {(
                createPost,
                // @ts-ignore
                {
                  data: dataCreatePost,
                  error: errorCreatePost,
                  loading: loadingCreatePost
                }
              ) => {
                console.log("IS LOADING TRUE?", {
                  createPost,
                  dataCreatePost,
                  errorCreatePost,
                  loadingCreatePost
                });
                if (loadingCreatePost) {
                  return <CardSkeleton cardImage={cardImage} />;
                }
                return dataCreatePost ? (
                  <div>some data</div>
                ) : (
                  // <Card bg="white" boxShadow="0 0 16px rgba(0, 0, 0, .25)">
                  <CameraModule
                    cardImage={cardImage}
                    setCardImage={setCardImage}
                    isCameraOpen={isCameraOpen}
                    setIsCameraOpen={setIsCameraOpen}
                    postCreated={postCreated}
                    setPostCreated={setPostCreated}
                    createPost={createPost}
                    dataCreatePost={dataCreatePost}
                    errorCreatePost={errorCreatePost}
                    loadingCreatePost={loadingCreatePost}
                    me={data && data.me && data.me.id ? data.me.id : undefined}
                  >
                    {cardImage && data.me ? (
                      <CreatePostMutation
                        createPost={createPost}
                        dataCreatePost={dataCreatePost}
                        errorCreatePost={errorCreatePost}
                        loadingCreatePost={loadingCreatePost}
                        cardImage={cardImage}
                        me={data.me.id}
                      />
                    ) : (
                      ""
                    )}
                  </CameraModule>
                  // {/* </Card> */}
                );
              }}
            </CreatePostComponent>
          );
        } else {
          return <div>Error, Me Component did not load?!</div>;
        }
      }}
    </MeComponent>
  );
};

Post.getLayout = getLayout;
Post.title = "Create post";

export default Post;
