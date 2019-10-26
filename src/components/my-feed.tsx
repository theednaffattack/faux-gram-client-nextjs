import React from "react";

import { Heading } from "./styled-rebass";
import { MyFollowingPostsComponent } from "./generated/apollo-graphql";
import FollowingPosts from "./following-posts";

const Feed = ({ me }: any) => (
  <>
    <Heading as="h1">My Feed</Heading>
    <Heading as="h3">{me.name}</Heading>

    <MyFollowingPostsComponent>
      {({ data, error, loading, subscribeToMore }) => (
        <FollowingPosts
          data={data ? data : null}
          loading={loading}
          error={error}
          subscribeToMore={subscribeToMore}
        />
      )}
    </MyFollowingPostsComponent>
  </>
);

export default Feed;
