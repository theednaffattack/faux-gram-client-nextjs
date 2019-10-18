import React from "react";
import posed, { PoseGroup } from "react-pose";

import {
  Box,
  Card,
  Flex,
  Heading,
  Icon,
  Text,
  FlexUserProfileWrap
} from "./styled-rebass";

import FollowButton from "./follow-button";

const staggerDuration = 100;

interface IIndex {
  index: number;
}

const PosedCard = posed(Card)({
  enter: { opacity: 1, delay: ({ index }: IIndex) => index * staggerDuration },
  exit: { opacity: 0, delay: ({ index }: IIndex) => index * staggerDuration },
  invisible: { opacity: 0 }
});

interface IDisplayPostsProps {
  data: any;
  followUser: any;
  me: any;
  errorGlblPosts: any;
  loadingFollowUser?: any;
  subscribeGlblPosts?: any;
  dataFollowUser?: any;
  errorFollowUser?: any;
}

export const DisplayCards = ({
  data,
  errorFollowUser,
  followUser,
  loadingFollowUser,
  me,
  errorGlblPosts
}: IDisplayPostsProps) => (
  <PoseGroup
    delta={1}
    preEnterPose="invisible"
    enterPose="enter"
    exitPose="exit"
    animateOnMount={true}
  >
    {data.getGlobalPosts.map((post: any, index: number) => {
      if (errorFollowUser) {
        return <Flex>Error!</Flex>;
      }
      if (loadingFollowUser) {
        return <Flex>loading...</Flex>;
      } else {
        return (
          <PosedCard
            key={`${index} - ${post.__typename}`}
            bg="white"
            my={[3, 3, 3]}
            mx={[3, 3, 3]}
            sx={{
              borderRadius: "15px"
            }}
            width={[1, "350px", "350px"]}
            boxShadow="0 0 16px rgba(0, 0, 0, .25)"
            display="flex"
            style={{ overflow: "hidden" }}
          >
            <Flex width={[1, 1, 1]} flexDirection="column">
              <Box
                width={[1, 1, 1]}
                style={{
                  minHeight: "250px",
                  maxHeight: "250px",
                  overflow: "hidden", // `url(${Background})`
                  backgroundImage:
                    post.images.length > 0 ? `url(${post.images[0].uri})` : "",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
                }}
              />
              <Box p={[3, 3, 3]} pt={[1, 1, 2]}>
                <Flex alignItems="center">
                  <Heading mr="auto">{post.title}</Heading>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <FlexUserProfileWrap
                      maxHeight="40px"
                      width="40px"
                      overflow="hidden"
                      sx={{
                        borderRadius: "50%"
                      }}
                      bg="thread_footer"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                    >
                      <Icon size="2em" name="user" fill="white" />
                    </FlexUserProfileWrap>
                    <Text color="text">
                      {post.user.firstName} {post.user.lastName}
                    </Text>
                    <FollowButton
                      me={me}
                      postUserId={post.user.id}
                      followUser={followUser}
                      errorGlblPosts={errorGlblPosts}
                    >
                      follow
                    </FollowButton>
                  </Flex>
                </Flex>
                <Text alignSelf="end">{post.text}</Text>
              </Box>
            </Flex>
          </PosedCard>
        );
      }
    })}
  </PoseGroup>
);

// interface IDisplayPostsProps {
//   subscribeGlblPosts: any;
//   dataFollowUser: any;
// }

export class DisplayPosts extends React.Component<IDisplayPostsProps, object> {
  componentDidMount() {
    this.props.subscribeGlblPosts();
  }
  render() {
    return (
      <DisplayCards
        me={this.props.me}
        followUser={this.props.followUser}
        errorGlblPosts={this.props.errorGlblPosts}
        data={this.props.data}
      />
    );
  }
}

// subcribeGlblPosts: any;
// dataFollowerUser: any;
// errorFollowUser: any;
// loadingFollowUser: any;
