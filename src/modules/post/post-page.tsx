import React from "react";

import { MeComponent } from "../../components/generated/apollo-graphql";
import { Flex, Heading, Text } from "../../components/styled-rebass";
import CreatePostMutation from "../../components/file-list-mutation";

interface IPostPageProps {}

const PostPage: React.FC<IPostPageProps> = () => (
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

      return <CreatePostMutation me={dataMe.me.id} />;
    }}
  </MeComponent>
);

export default PostPage;
