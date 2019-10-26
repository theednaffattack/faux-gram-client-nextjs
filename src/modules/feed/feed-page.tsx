import React from "react";

import { AbFlex, Flex, Heading } from "../../components/styled-rebass";
import { MeComponent } from "../../components/generated/apollo-graphql";
import { FollowingPostsWrapper } from "./following-posts-container";
import { IPageProps } from "../../page-types/types";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

interface IFeedPageProps extends IPageProps {}

export default class FeedPage extends React.Component<IFeedPageProps, object> {
  listRef: React.RefObject<HTMLDivElement>;
  constructor(props: IFeedPageProps) {
    super(props);

    this.listRef = React.createRef();
  }

  componentDidMount() {
    if (this.listRef && this.listRef.current) {
      disableBodyScroll(this.listRef.current);
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }
  render() {
    let { pathname, query } = this.props;
    return (
      <>
        <Flex bg="#eee">
          <Heading as="h1" fontFamily="mySans">
            My Feed
          </Heading>
        </Flex>
        <MeComponent>
          {({ data: dataMe, error: errorMe, loading: loadingMe }) => {
            if (errorMe) return <div>{JSON.stringify(errorMe)}</div>;
            if (loadingMe) return <div>loading "Me" data...</div>;
            const missingDataErrorMessage = {
              __typename: "user-facing-error",
              message: "Oh no!\nThere doesn't appear to be any data"
            };
            const dataConfirmed = dataMe ? dataMe : missingDataErrorMessage;

            if (dataConfirmed.__typename === "user-facing-error")
              return <div>{dataConfirmed.message}</div>;
            return (
              <Flex p={0} flex="1 1 auto" style={{ position: "relative" }}>
                <AbFlex
                  // flex="1 1 auto"
                  id="absolute-scroll-list"
                  ref={this.listRef}
                  top={0}
                  bottom={0}
                  right={0}
                  left={0}
                  overflow="auto"
                  position="absolute"
                  flexDirection="column"
                  alignItems="stretch"
                  width={1}
                  style={{
                    WebkitOverflowScrolling: "touch"
                  }}
                >
                  <FollowingPostsWrapper pathname={pathname} query={query} />
                </AbFlex>
              </Flex>
            );
          }}
        </MeComponent>
      </>
    );
  }
}
