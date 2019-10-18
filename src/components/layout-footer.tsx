import React from "react";
import { Flex, MaxFlex } from "./styled-rebass";

function LayoutFooter() {
  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      width={[1, 1, 1]}
      px={[1, 1, 4]}
      as="footer"
    >
      <MaxFlex alignSelf="flex-end" flexDirection="column" width="860px">
        <hr />
        {/* <AuthHeader title="My Feed" /> */}
        <span>
          Made with{" "}
          <span role="img" aria-label="Love">
            ❤️
          </span>{" "}
          by Eddie Naff
        </span>
      </MaxFlex>
    </Flex>
  );
}

export default LayoutFooter;
