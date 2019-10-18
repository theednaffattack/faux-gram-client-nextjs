// import react from "React";
import { Flex as FlexBase, Text as TextBase } from "rebass";
import styled from "@emotion/styled";
import {
  borders,
  space,
  FlexboxProps,
  BordersProps,
  SpaceProps
} from "styled-system";
import MyLink from "./my-link";

interface Props {
  width: number | string | string[];
}

interface IFlexWithBorder
  extends FlexboxProps,
    BordersProps,
    SpaceProps,
    Props {}

const Flex: React.FunctionComponent<IFlexWithBorder> = styled(FlexBase)`
  ${borders}
  ${space}
`;

const Text = styled(TextBase)`
  ${borders}
`;

export const SignUpLink: React.FunctionComponent<Props> = ({
  width
}: Props) => {
  return (
    <Flex
      justifyContent="center"
      width={width}
      borderTop="2px rgba(255,255,255,0.4) solid"
      p={3}
      my={4}
    >
      <Text fontFamily="montserrat" color="rgba(255,255,255,.6)">
        Not a user?
      </Text>
      &nbsp; &nbsp;
      <Text fontFamily="montserrat" color="rgba(255,255,255,.8)">
        <MyLink href="register" name="Sign Up" />
      </Text>
    </Flex>
  );
};
