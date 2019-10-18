import React from "react";
import { Flex, Box, Text } from "rebass";

import { HelloWorldComponent } from "../src/components/generated/apollo-graphql";

const HelloWorld = () => {
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

export default HelloWorld;
