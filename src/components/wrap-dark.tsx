import React from "react";
import styled from "styled-components";
import {
  background,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  minHeight,
  space,
  MinHeightProps,
  BackgroundProps,
  BackgroundImageProps,
  BackgroundSizeProps,
  BackgroundPositionProps,
  BackgroundRepeatProps,
  WidthProps
} from "styled-system";

import {
  Flex as FlexBase,
  Card,
  Heading,
  Icon as IconBase
} from "./styled-rebass";

const Flex = styled(FlexBase)`
  background-color: rgba(0, 0, 0, 0.1);
`;

const Icon = styled(IconBase)`
  ${space}
`;

export interface IInnerFlexProps
  extends MinHeightProps,
    BackgroundProps,
    BackgroundImageProps,
    BackgroundSizeProps,
    BackgroundRepeatProps,
    BackgroundPositionProps,
    WidthProps {}

const InnerFlex: React.FC<IInnerFlexProps> = styled(FlexBase)`
  ${minHeight}
  ${background}
  ${backgroundImage}
  ${backgroundSize}
  ${backgroundRepeat}
  ${backgroundPosition}
`;

export const WrapDark = ({ children, heading }: any) => (
  <Flex minHeight="100vh">
    <InnerFlex
      backgroundImage="rgba(0,0,0,0.1)" // {`"${bgUrl}"`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      width={[1]}
      minHeight="100vh"
    >
      <Flex
        mt={[0, 5, 0]}
        flexDirection="column"
        width={[1]}
        justifyContent="center"
        alignItems="center"
      >
        <Card
          mx={3}
          width={["350px", "350px"]}
          px={4}
          pb={4}
          pt={4}
          borderRadius="10px"
          bg="rgb(242,242,242)"
          boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
        >
          <Icon fill="grey" name="close" size="1.5em" />
          <Flex
            flexDirection="column"
            width={1}
            mt={3}
            mb={4}
            alignItems="center"
          >
            <Heading
              width={1}
              mb={3}
              color="text"
              fontSize={[5]}
              fontFamily="montserrat"
            >
              {heading}
            </Heading>
            {children}
          </Flex>
        </Card>
      </Flex>
    </InnerFlex>
  </Flex>
);
