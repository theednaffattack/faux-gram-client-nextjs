import React, { useRef, useEffect } from "react";

import { Flex, AbFlex } from "./styled-rebass";
import { FollowUserComponent, MeQueryResult } from "./generated/apollo-graphql";
import { GetGlobalPostsComponent } from "./generated/apollo-graphql";
import { DisplayPosts } from "./display-posts";
import { GLOBAL_POSTS } from "../graphql/user/subscriptions/GlobalPosts";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

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
  // apolloClient: ApolloClient<NormalizedCacheObject>;
};

const Feed: React.FunctionComponent<FeedProps> = ({ me }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef && scrollContainerRef.current) {
      console.log("DISABLLING SCROLL");
      disableBodyScroll(scrollContainerRef.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <GetGlobalPostsComponent variables={{ skip: 0, take: 15 }}>
      {({
        data: dataGlblPosts,
        error: errorGlblPosts,
        loading: loadingGlblPosts,
        refetch: refetchGetGlobalPosts,

        subscribeToMore: subscribeGlblPosts
      }) => {
        if (errorGlblPosts) return <div>{JSON.stringify(errorGlblPosts)}</div>;
        if (loadingGlblPosts) {
          return <div>LOADING...</div>;
        }
        if (me !== undefined && me !== null) {
          return (
            <Flex p={0} flex="1 1 auto" style={{ position: "relative" }}>
              <AbFlex
                // flex="1 1 auto"
                id="absolute-scroll-list"
                // ref={this.listRef}
                top={0}
                bottom={67}
                right={0}
                left={0}
                // overflow="auto"
                position="absolute"
                flexDirection="column"
                alignItems="center"
                // alignItems="stretch"v
                width={1}
              >
                <Flex
                  ref={scrollContainerRef}
                  alignItems="center"
                  width={1}
                  py={2}
                  flexDirection="column"
                  style={{
                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch"
                  }}
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
                          data={dataGlblPosts}
                          errorGlblPosts={errorGlblPosts}
                          refetchGetGlobalPosts={refetchGetGlobalPosts}
                          subscribeGlblPosts={() =>
                            subscribeGlblPosts({
                              document: GLOBAL_POSTS,
                              updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                if (prev && prev.getGlobalPosts) {
                                  const newItem =
                                    subscriptionData.data.getGlobalPosts;

                                  return Object.assign({}, prev, {
                                    // @ts-ignore
                                    getGlobalPosts: [
                                      newItem,
                                      ...prev.getGlobalPosts
                                    ]
                                  });
                                } else {
                                  return prev;
                                }
                              }
                            })
                          }
                        />
                      );
                    }}
                  </FollowUserComponent>
                </Flex>
              </AbFlex>
            </Flex>
          );
        } else {
          return <div>div</div>;
        }
      }}
    </GetGlobalPostsComponent>
  );
};

export default Feed;
