import React from "react";
import { Flex as FlexBase, Text } from "rebass";
import styled from "styled-components";
import { minHeight } from "styled-system";

import { Flex } from "../src/components/styled-rebass";
import TrySvg from "../src/components/try-svg";
import LoginButton from "../src/components/login-button";
import { Container, PButton } from "../src/components/posed-components";
import Router from "next/router";

const InnerFlex = styled(FlexBase)`
  ${minHeight}
  background: url('/static/bg.png') center center no-repeat;
  background-size: cover;
`;

const Home = () => {
  return (
    <Flex flexDirection="column" width={1}>
      <InnerFlex flexDirection="column" width={[1, 1, 1, 1]}>
        <Container
          alignItems="center"
          justifyContent="center"
          color="black"
          flexDirection="column"
        >
          <Flex width="300px">
            <TrySvg fill="black" />
          </Flex>
          <PButton
            bg="blue"
            disabled={false}
            label=""
            key="login button"
            mt={0}
            mb={0}
            onClick={() => {
              Router.push("/login");
            }}
          >
            <Text
              letterSpacing="0.2em"
              fontSize="0.9em"
              fontFamily="Montserrat, sans-serif"
              color="white"
            >
              Login
            </Text>
          </PButton>
          <PButton
            bg="crimson"
            disabled={false}
            label=""
            key="create an account button"
            mt={0}
            mb={0}
            onClick={() => {
              Router.push("/register");
            }}
          >
            <Text
              letterSpacing="0.2em"
              fontSize="0.9em"
              fontFamily="Montserrat, sans-serif"
              color="white"
            >
              Create an account
            </Text>
          </PButton>
          <LoginButton key="special login button" />
        </Container>
      </InnerFlex>
    </Flex>
  );
};

export default Home;
