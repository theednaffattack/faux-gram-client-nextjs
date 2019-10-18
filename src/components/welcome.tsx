import React from "react";

import { Flex, Heading } from "rebass";

const Welcome = () => {
  return (
    <Flex alignItems="center" flexDirection="column" width={[1, 1, 1, 1]}>
      <Heading as="h1">Welcome</Heading>
    </Flex>
  );
};

export default Welcome;
