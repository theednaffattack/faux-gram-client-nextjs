import React from "react";
import { MeComponent } from "../src/components/generated/apollo-graphql";

import { Flex, Heading, Text } from "../src/components/styled-rebass";
import CreatePostMutation from "../src/components/file-list-mutation";

const Post = () => (
  <MeComponent>
    {({ data, loading, error }) => {
      if (!data || !data.me) {
        return null;
      }
      if (error) {
        return (
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>error!!!</Heading>
            <Text>{error.message}</Text>
          </Flex>
        );
      }
      if (loading) {
        return (
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading>loading...</Heading>
          </Flex>
        );
      }

      return <CreatePostMutation me={data.me.id} />;
    }}
  </MeComponent>
);

export default Post;
