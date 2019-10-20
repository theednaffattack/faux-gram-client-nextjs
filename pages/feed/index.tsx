import React from "react";
import Layout from "../../src/components/layout";
import { Flex, AbFlex } from "../../src/components/styled-rebass";
import { MeComponent } from "../../src/components/generated/apollo-graphql";
import { TabViewer } from "../../src/modules/feed/tab-viewer";
// import InfiniteLoader from "../../src/modules/feed/feed-infinite-loader";

// @ts-ignore
const items = new Array(45)
  .fill(undefined)
  // @ts-ignore
  .map((fakeItem: any, index: number) => (
    <Flex
      key={index}
      // width={1 / 2}
      ml={1}
      mr={2}
      p={3}
      my={2}
      sx={{
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25 )",
        borderTop: "1px solid #eee"
      }}
    >
      Item No: {index}
    </Flex>
  ));

const Feed = () => {
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
                top={0}
                bottom={0}
                right={0}
                left={0}
                overflow="auto"
                position="absolute"
                flexDirection="column"
                alignItems="stretch"
                width={1}
              >
                {dataConfirmed &&
                dataConfirmed.__typename === "user-facing-error" ? (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    width={[1]}
                  >
                    {dataConfirmed.message}
                  </Flex>
                ) : (
                  <TabViewer
                    dataMe={dataMe}
                    errorMe={errorMe}
                    loadingMe={loadingMe}
                  />
                )}
                {/* <CardList /> */}
                {/* <InfiniteLoader
                  fetchMore={() => console.log}
                  imageModalState="closed"
                  items={[1, 2, 3]}
                  pageInfo={{}}
                  me={dataConfirmed}
                  toggleImageModal={() => console.log}
                  loadingGetMessagesByThreadId={() => console.log}
                /> */}
              </AbFlex>
            </Flex>
          );
        }}
      </MeComponent>
    </Layout>
  );
};

export default Feed;
