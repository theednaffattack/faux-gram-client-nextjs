import React from "react";

import { Flex, Heading } from "./styled-rebass";
import { FollowUserComponent, MeQueryResult } from "./generated/apollo-graphql";
import { GetGlobalPostsComponent } from "./generated/apollo-graphql";
import { DisplayPosts } from "./display-posts";
import { GLOBAL_POSTS } from "../graphql/user/subscriptions/GlobalPosts";

export const subscribeFunction = (subscribeGlblPosts: any) => {
  try {
    return subscribeGlblPosts({
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

type FeedProps = {
  me: MeQueryResult["data"];
};

const Feed: React.FunctionComponent<FeedProps> = ({ me }) => (
  <GetGlobalPostsComponent>
    {({
      data: dataGlblPosts,
      error: errorGlblPosts,
      loading: loadingGlblPosts,
      subscribeToMore: subscribeGlblPosts
    }) => {
      if (errorGlblPosts) return <div>{JSON.stringify(errorGlblPosts)}</div>;
      if (loadingGlblPosts) {
        return <div>LOADING...</div>;
      }
      return (
        <Flex pt={3} width={1} flexDirection="column">
          <Heading>Global Feed</Heading>
          <Heading as="h3">{me && me.me && me.me.name}</Heading>
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
                    me={me && me.me}
                    dataFollowUser={dataFollowUser}
                    errorFollowUser={errorFollowUser}
                    loadingFollowUser={loadingFollowUser}
                    followUser={followUser}
                    data={dataGlblPosts}
                    errorGlblPosts={errorGlblPosts}
                    subscribeGlblPosts={() =>
                      subscribeGlblPosts({
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
