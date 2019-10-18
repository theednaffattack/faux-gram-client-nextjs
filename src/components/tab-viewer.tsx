import React from "react";

import Tabs from "./tabs";
import { Flex, Heading, Text } from "../components/styled-rebass";
import styled from "styled-components";
import GlobalFeed from "../components/global-feed";
import MyFeed from "../components/my-feed";
import { MeComponent } from "./generated/apollo-graphql";

const SpecialFlex = styled(Flex)``;

function TabViewer() {
  return (
    <MeComponent>
      {({ data, loading, error }) => {
        if (!data || !data.me) {
          return null;
        }
        if (error) {
          return (
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading>error!!!</Heading>
              <Text>{error.message}</Text>
            </Flex>
          );
        }
        if (loading) {
          return (
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading>loading...</Heading>
            </Flex>
          );
        }

        return (
          // <Flex flex="1 1 auto" flexDirection="column" border="crimson">
          <Tabs>
            <SpecialFlex label="My Feed">
              <MyFeed me={data.me} />
            </SpecialFlex>
            <SpecialFlex label="Global Feed">
              <GlobalFeed me={data.me} />
            </SpecialFlex>
          </Tabs>
          // </Flex>
        );
      }}
    </MeComponent>
  );
}

export default TabViewer;
