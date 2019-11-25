import React from "react";
import styled from "styled-components";
import {
  grid,
  GridProps,
  space,
  SpaceProps,
  width,
  WidthProps,
  height,
  HeightProps,
  borders,
  BorderProps
} from "styled-system";

import { Heading } from "../../components/styled-rebass";
import Icon from "../icon/m-icon";
// import { breakWidths } from "./layout";

interface IHeadingProps {}

const Header: React.FunctionComponent<IHeadingProps> = () => {
  return (
    <Grid
      borderBottom="1px #ccc solid"
      gridTemplateRows="repeat(3, 1fr)"
      height="40px"
      width="100vw"
    >
      <Heading fontSize="2.3em" fontFamily="main">
        FauxGram
      </Heading>
      <Icon name="power_off" fill="pink" size="1.5rem" />
    </Grid>
  );
};

export default Header;

interface CustomGridProps
  extends BorderProps,
    GridProps,
    HeightProps,
    SpaceProps,
    WidthProps {}

const Grid = styled.div<CustomGridProps>`
${borders}
  ${grid}
  ${height}
  ${space}
  ${width}

`;
