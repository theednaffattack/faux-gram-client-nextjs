import React from "react";
import { Flex, Box, Text } from "rebass";

import { HelloWorldComponent } from "../src/components/generated/apollo-graphql";
import { getLayout } from "../src/modules/site-layout/layout";

interface IHelloWorld {
  (): JSX.Element;
  getLayout: (page: any) => JSX.Element;
  title: string;
}

const HelloWorld: IHelloWorld = () => {
  return (
    <Flex
      minHeight="50vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <HelloWorldComponent>
        {data => (
          <Box>
            <Text fontSize={[4]}>
              {data && data.data && data.data.helloWorld
                ? data.data.helloWorld
                : "loading..."}
            </Text>
          </Box>
        )}
      </HelloWorldComponent>
    </Flex>
  );
};

HelloWorld.getLayout = getLayout;
HelloWorld.title = "Hello World";

export default HelloWorld;
