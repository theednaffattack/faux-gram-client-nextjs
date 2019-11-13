import React from "react";
import { Text, Heading } from "rebass/styled-components";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { AbFlex, Flex } from "../../components/styled-rebass";
import FeedCard, { TImage } from "./feed-card";
import { GetMyFollowingPostByIdComponent } from "../../components/generated/apollo-graphql";
import { IPageProps } from "../../page-types/types";

interface IFeedItemPageProps extends IPageProps {
  itemId: string;
}

export interface IFeedContainerProps {}

export default class FeedContainer extends React.Component<
  IFeedContainerProps
> {
  listContainerRef: React.RefObject<HTMLDivElement>;
  constructor(props: IFeedItemPageProps) {
    super(props);
    this.listContainerRef = React.createRef();
  }

  componentDidMount() {
    if (this.listContainerRef && this.listContainerRef.current) {
      disableBodyScroll(this.listContainerRef.current);
    }
  }
  componentWillUnmount() {
    if (this.listContainerRef && this.listContainerRef.current) {
      clearAllBodyScrollLocks();
    }
  }
  render() {
    return (
      <div
        ref={this.listContainerRef}
        id="feedRoot"
        style={{
          overflowY: "scroll",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          WebkitOverflowScrolling: "touch"
        }}
      >
        FeedContainer
      </div>
    );
  }
}

export const FeedItemPage: React.FC<IFeedItemPageProps> = ({
  itemId,
  pathname,
  query
}) => {
  return (
    <Flex flex="1 1 auto" flexDirection="column">
      <Flex bg="#eee" p={2}>
        <Heading as="h1">Feed Item Page</Heading>
        <Text>Item Id: {itemId}</Text>
      </Flex>
      <Flex id="ab-wrapper" flex="1 1 auto" style={{ position: "relative" }}>
        <AbFlex
          flexDirection="column"
          position="absolute"
          width={1}
          top={0}
          bottom={0}
          left={0}
          right={0}
          style={{ overflow: "auto" }}
        >
          <GetMyFollowingPostByIdComponent
            variables={{
              getpostinput: {
                postId: itemId
              }
            }}
          >
            {({
              data: dataGetMyFollowingPostById,
              loading: loadingGetMyFollowingPostById,
              error: errorGetMyFollowingPostById
            }) => {
              if (errorGetMyFollowingPostById) {
                return (
                  <div>
                    ERROR
                    {JSON.stringify(errorGetMyFollowingPostById, null, 2)}
                  </div>
                );
              }
              if (loadingGetMyFollowingPostById) {
                return <div>loading POST...</div>;
              }
              if (
                dataGetMyFollowingPostById &&
                dataGetMyFollowingPostById.getMyFollowingPostById
              ) {
                const { getMyFollowingPostById } = dataGetMyFollowingPostById;
                const { images } = getMyFollowingPostById;
                const getUserId =
                  getMyFollowingPostById && getMyFollowingPostById.user
                    ? getMyFollowingPostById.user
                    : "skdfjdksjdkf";
                return (
                  <FeedCard
                    id={
                      getMyFollowingPostById.id
                        ? getMyFollowingPostById.id
                        : "no id"
                    }
                    initialLikesCount={-1}
                    initialCommentsCount={-1}
                    postUserId={getUserId as string}
                    pathname={pathname}
                    query={query}
                    title={
                      getMyFollowingPostById.title
                        ? getMyFollowingPostById.title
                        : "no title"
                    }
                    description={
                      getMyFollowingPostById.text
                        ? getMyFollowingPostById.text
                        : "no description"
                    }
                    images={images as TImage[]}
                  />
                );
              } else {
                return <div>You shouldn't be able to see this</div>;
              }
            }}
          </GetMyFollowingPostByIdComponent>
        </AbFlex>
      </Flex>
      {/* <FeedContainer /> */}
    </Flex>
  );
};
