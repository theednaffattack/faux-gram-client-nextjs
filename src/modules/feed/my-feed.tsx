import React from "react";

import { Heading } from "../../components/styled-rebass";

import { MyFollowingPostsComponent } from "../../components/generated/apollo-graphql";
import { FOLLOWING_POSTS } from "../../graphql/user/subscriptions/FollowingPosts";
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
          subscribeToNewPosts={() => {
            console.log("SUB RUNNING");
            subscribeToMore({
              document: FOLLOWING_POSTS,
              variables: {
                data: {
                  sentBy: "init",
                  message: "init"
                }
              },
              updateQuery: (prev, { subscriptionData }) => {
                console.log("view prev", prev);
                return Object.assign({}, prev, {
                  // @ts-ignore
                  myFollowingPosts: [
                    // @ts-ignore
                    subscriptionData.data.followingPosts,
                    // @ts-ignore
                    ...prev.myFollowingPosts
                  ]
                });
              }
              // updateFunctionMyFollows(prev, { subscriptionData })
            });
          }}
        />
      )}
    </MyFollowingPostsComponent>
  </>
);

export default Feed;
