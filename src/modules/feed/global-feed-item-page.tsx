import React from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { AbFlex, Flex, Heading } from "../../components/styled-rebass";
import FeedCard from "./global-feed-card-by-id";
import { GetGlobalPostByIdComponent } from "../../components/generated/apollo-graphql";
import { IPageProps } from "../../page-types/types";

interface GlobalFeedItemPageProps extends IPageProps {
  itemId: string;
}

export interface IFeedContainerProps {}

export default class FeedContainer extends React.Component<
  IFeedContainerProps
> {
  listContainerRef: React.RefObject<HTMLDivElement>;
  constructor(props: GlobalFeedItemPageProps) {
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

export const FeedItemPage: React.FC<GlobalFeedItemPageProps> = ({
  itemId,
  pathname,
  query
}) => {
  return (
    <Flex flex="1 1 auto" flexDirection="column">
      <Flex bg="#eee" p={2}>
        <Heading fontFamily="main" as="h1">
          Feed Item Page
        </Heading>
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
          <GetGlobalPostByIdComponent
            variables={{
              getpostinput: {
                postId: itemId
              }
            }}
          >
            {({
              data: dataGetGlobalPostById,
              loading: loadingGetGlobalPostById,
              error: errorGetGlobalPostById
            }) => {
              if (errorGetGlobalPostById) {
                return (
                  <div>
                    ERROR
                    {JSON.stringify(errorGetGlobalPostById, null, 2)}
                  </div>
                );
              }
              if (loadingGetGlobalPostById) {
                return <div>loading POST...</div>;
              }
              if (
                dataGetGlobalPostById &&
                dataGetGlobalPostById.getGlobalPostById
              ) {
                const { getGlobalPostById } = dataGetGlobalPostById;

                let comments = getGlobalPostById.comments;
                // const { images } = getGlobalPostById;
                const getUserId =
                  getGlobalPostById && getGlobalPostById.user
                    ? getGlobalPostById.user
                    : "skdfjdksjdkf";
                return (
                  <Flex flexDirection="column">
                    <FeedCard
                      id={getGlobalPostById.id ? getGlobalPostById.id : "no id"}
                      currentlyLiked={getGlobalPostById.currently_liked}
                      comments={comments}
                      initialLikesCount={getGlobalPostById.likes_count}
                      initialCommentsCount={getGlobalPostById.comments_count}
                      postUserId={getUserId as string}
                      pathname={pathname}
                      query={query}
                      title={
                        getGlobalPostById.title
                          ? getGlobalPostById.title
                          : "no title"
                      }
                      description={
                        getGlobalPostById.text
                          ? getGlobalPostById.text
                          : "no description"
                      }
                      images={
                        getGlobalPostById.images
                          ? getGlobalPostById.images
                          : ["no images"]
                      }
                      renderTextarea
                    />
                  </Flex>
                );
              } else {
                return <div>You shouldn't be able to see this</div>;
              }
            }}
          </GetGlobalPostByIdComponent>
        </AbFlex>
      </Flex>
      {/* <FeedContainer /> */}
    </Flex>
  );
};
