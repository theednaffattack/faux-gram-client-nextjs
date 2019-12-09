import React from "react";

import { Flex, Heading } from "../../components/styled-rebass";
import { FollowUserComponent } from "../../components/generated/apollo-graphql";
import { GetGlobalPostsComponent } from "../../components/generated/apollo-graphql";
import { DisplayPosts } from "./display-posts";
import { GLOBAL_POSTS } from "../../graphql/user/subscriptions/GlobalPosts";

export const subscribeFunction = (subscribeGlobalPosts: any) => {
  try {
    return subscribeGlobalPosts({
      document: GLOBAL_POSTS,

      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.globalPosts;
        return Object.assign({}, prev, {
          getGlobalPosts: [newItem, ...prev.getGlobalPosts]
        });
      }
    });
  } catch (error) {
    return console.error("subscriptionFunction ERROR", error);
  }
};

const Feed = ({ me }: any) => (
  <GetGlobalPostsComponent variables={{ skip: 0, take: 15 }}>
    {({
      data: dataGlobalPosts,
      error: errorGlobalPosts,
      loading: loadingGlobalPosts,
      subscribeToMore: subscribeGlobalPosts
    }) => {
      if (errorGlobalPosts)
        return <div>{JSON.stringify(errorGlobalPosts)}</div>;
      if (loadingGlobalPosts) {
        return <div>LOADING...</div>;
      }
      return (
        <Flex pt={3} width={1} flexDirection="column">
          <Heading>Global Feed</Heading>
          <Heading as="h3">{me.name}</Heading>
          <Flex
            justifyContent="center"
            width={1}
            flexDirection="row"
            flexWrap="wrap"
          >
            <FollowUserComponent>
              {(
                followUser,
                {
                  data: dataFollowUser,
                  error: errorFollowUser,
                  loading: loadingFollowUser
                }
              ) => {
                return (
                  <DisplayPosts
                    me={me}
                    dataFollowUser={dataFollowUser}
                    errorFollowUser={errorFollowUser}
                    loadingFollowUser={loadingFollowUser}
                    followUser={followUser}
                    data={dataGlobalPosts}
                    errorGlobalPosts={errorGlobalPosts}
                    subscribeGlobalPosts={() =>
                      subscribeGlobalPosts({
                        document: GLOBAL_POSTS,
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) return prev;

                          // @ts-ignore
                          const newItem = subscriptionData.data.globalPosts!;
                          return Object.assign({}, prev, {
                            // @ts-ignore
                            getGlobalPosts: [newItem, ...prev.getGlobalPosts]
                          });
                        }
                      })
                    }
                  />
                );
              }}
            </FollowUserComponent>
          </Flex>
        </Flex>
      );
    }}
  </GetGlobalPostsComponent>
);

export default Feed;
