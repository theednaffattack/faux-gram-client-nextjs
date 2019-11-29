import React from "react";

import {
  MeComponent,
  CreatePostComponent
} from "../../components/generated/apollo-graphql";
import { Flex, Heading, Text } from "../../components/styled-rebass";
import CreatePostMutation from "./create-post-mutation";
// import CreatePostMutation from "../../components/file-list-mutation";

interface IPostPageProps {
  cardImage: Blob | undefined;
}

const PostPage: React.FC<IPostPageProps> = ({ cardImage }) => (
  <MeComponent>
    {({ data: dataMe, loading: loadingMe, error: errorMe }) => {
      if (!dataMe || !dataMe.me) {
        return null;
      }
      if (errorMe) {
        return (
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>errorMe!!!</Heading>
            <Text>{errorMe.message}</Text>
          </Flex>
        );
      }
      if (loadingMe) {
        return (
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>loadingMe...</Heading>
          </Flex>
        );
      }

      return (
        <MeComponent>
          {({ data: dataMe }) => (
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
                if (dataMe && dataMe.me) {
                  return (
                    <CreatePostMutation
                      cardImage={cardImage ? cardImage : undefined}
                      me={dataMe.me.id}
                      createPost={createPost}
                      dataCreatePost={dataCreatePost}
                      errorCreatePost={errorCreatePost}
                      loadingCreatePost={loadingCreatePost}
                    />
                  );
                } else {
                  return <div>undisclosed error</div>;
                }
              }}
            </CreatePostComponent>
          )}
        </MeComponent>
      );
      // return <CreatePostMutation me={dataMe.me.id} />;
    }}
  </MeComponent>
);

export default PostPage;
