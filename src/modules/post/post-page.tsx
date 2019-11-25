import React from "react";

import { MeComponent } from "../../components/generated/apollo-graphql";
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
        <CreatePostMutation
          cardImage={cardImage ? cardImage : undefined}
          me={dataMe.me.id}
        />
      );
      // return <CreatePostMutation me={dataMe.me.id} />;
    }}
  </MeComponent>
);

export default PostPage;
