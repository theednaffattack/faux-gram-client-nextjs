import React from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import Layout from "../../src/components/layout";
import { AbFlex, Flex } from "../../src/components/styled-rebass";
import { MeComponent } from "../../src/components/generated/apollo-graphql";
import { FollowingPostsWrapper } from "../../src/modules/feed/following-posts-container";

class Feed extends React.Component<object, object> {
  listRef: React.RefObject<HTMLDivElement>;
  constructor(props: object) {
    super(props);
    this.listRef = React.createRef();
  }

  componentDidMount() {
    if (this.listRef.current) {
      console.log("THE REF APPEARS TO BE ASSIGNED", this.listRef.current);

      disableBodyScroll(this.listRef.current);
    }
  }
  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  render() {
    return (
      <Layout title="Feed">
        <Flex bg="#eee">Some feed stuff</Flex>
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
                  <FollowingPostsWrapper />
                </AbFlex>
              </Flex>
            );
          }}
        </MeComponent>
      </Layout>
    );
  }
}

export default Feed;
