import React from "react";
// import styled from "styled-components";
// import {
//   grid,
//   GridProps,
//   space,
//   SpaceProps,
//   width,
//   WidthProps,
//   height,
//   HeightProps,
//   borders,
//   BorderProps
// } from "styled-system";

import { Box, Flex, Heading, AbFlex } from "../../components/styled-rebass";
import Icon from "../icon/m-icon";
// import { breakWidths } from "./layout";

interface IHeadingProps {}

const Header: React.FunctionComponent<IHeadingProps> = () => {
  return (
    <Flex alignItems="center" height="40px" style={{ position: "relative" }}>
      <AbFlex
        position="absolute"
        top={0}
        right={0}
        left={0}
        bottom={0}
        alignItems="center"
        justifyContent="center"
      >
        <Heading fontSize="2.3em" fontFamily="main">
          FauxGram
        </Heading>
      </AbFlex>
      <Box mx="auto" />
      <Icon name="power_off" fill="pink" size="2.5rem" />
    </Flex>
  );
};

export default Header;

// interface CustomGridProps
//   extends BorderProps,
//     GridProps,
//     HeightProps,
//     SpaceProps,
//     WidthProps {}

// const Grid = styled.div<CustomGridProps>`
// ${borders}
//   ${grid}
//   ${height}
//   ${space}
//   ${width}

// `;
