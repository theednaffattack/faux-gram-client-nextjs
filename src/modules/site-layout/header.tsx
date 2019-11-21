import React from "react";

import { Flex, Heading } from "../../components/styled-rebass";
import { breakWidths } from "./layout";

interface IHeadingProps {}

const Header: React.FunctionComponent<IHeadingProps> = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width={breakWidths}
      bg="#fff"
      borderBottom="2px #eee solid"
    >
      <Heading as="h1" fontSize="2.3em" fontFamily="main">
        <span sx={{ fontWeight: "600" }}>Faux</span>Gram
      </Heading>
    </Flex>
  );
};

export default Header;
