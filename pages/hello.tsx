import React, { useState, useEffect } from "react";
import { Flex, Box, Text } from "rebass";

import { HelloWorldComponent } from "../src/components/generated/apollo-graphql";
import { getLayout } from "../src/modules/site-layout/layout";
import { Button } from "../src/components/styled-rebass";

interface IHelloWorld {
  (): JSX.Element;
  getLayout: (page: any) => JSX.Element;
  title: string;
}

const HelloWorld: IHelloWorld = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    console.log(count);
  }, [count]);

  // setCount(20);
  return (
    <Flex
      minHeight="50vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <h1>hello</h1>
      <HelloWorldComponent>
        {data => (
          <Box>
            <Text fontSize={[4]}>
              {data && data.data && data.data.helloWorld
                ? data.data.helloWorld
                : "loading..."}
            </Text>
            <Text>{count}</Text>
            <Button onClick={() => setCount(count + 1)}>change count</Button>
          </Box>
        )}
      </HelloWorldComponent>
    </Flex>
  );
};

HelloWorld.getLayout = getLayout;
HelloWorld.title = "Hello World";

export default HelloWorld;
