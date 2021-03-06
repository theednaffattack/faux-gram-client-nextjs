import React from "react";
import posed from "react-pose";

import { Box, Card, Flex, Heading, Text } from "../../components/styled-rebass";

import UnFollowButton from "./unfollow-button";
import WrappedAvatar from "./wrapped-avatar";

const staggerDuration = 100;

interface IFollowingListProps {
  mounted: boolean;
  data: any;
}

const PosedCard = posed(Card)({
  enter: { opacity: 1, delay: ({ index = 1 }) => index * staggerDuration },
  exit: { opacity: 0 },
  invisible: { opacity: 0 }
});

export class FollowingList extends React.Component<
  IFollowingListProps,
  object
> {
  listRef: React.RefObject<HTMLDivElement>;
  constructor(props: IFollowingListProps) {
    super(props);
    this.listRef = React.createRef();
  }
  render() {
    const { data } = this.props;

    return (
      <Flex
        width={1}
        justifyContent="center"
        flexDirection="row"
        flexWrap="wrap"
        border="lime"
      >
        {data.myFollowingPosts &&
          data.myFollowingPosts.map((post: any, pIndex: number) => (
            <PosedCard
              index={pIndex}
              pose="enter"
              bg="white"
              key={`${pIndex} - ${post.title}`}
              my={[3, 3, 3]}
              mx={[3, 3, 3]}
              sx={{
                borderRadius: "15px",
                boxShadow: "0 0 16px rgba(0, 0, 0, .25)"
              }}
              width={[1, "350px", "350px"]}
              // border="lime"
              display="flex"
              style={{ opacity: 0, overflow: "hidden" }}
            >
              <Flex width={[1, 1, 1]} flexDirection="column">
                <Box
                  width={[1, 1, 1]}
                  style={{
                    minHeight: "250px",
                    maxHeight: "250px",
                    overflow: "hidden",
                    backgroundImage: post.images[0]
                      ? `url(${post.images[0].uri})`
                      : " ",
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
                      <Flex flexDirection="row" my={2} p={3} width={1}>
                        <WrappedAvatar
                          flexInstruction="column"
                          user={post.user}
                          buttonThing={false}
                          color="blue"
                          handleRemoveInviteeToThread={console.log}
                        />
                      </Flex>
                      <UnFollowButton followingId={post.user.id}>
                        unfollow
                      </UnFollowButton>
                    </Flex>
                  </Flex>
                  <Text alignSelf="end">{post.text}</Text>
                </Box>
              </Flex>
            </PosedCard>
          ))}
      </Flex>
    );
  }
}
