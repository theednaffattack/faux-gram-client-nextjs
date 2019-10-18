import React from "react";
import posed from "react-pose";

import { LoginComponent } from "./generated/apollo-graphql";

import { Button, Text } from "./styled-rebass";

// @ts-ignore
const PButton = posed(Button)({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

function LoginButton() {
  return (
    <LoginComponent>
      {mutate => (
        <PButton
          // shadow="0px 13px 27px 0px rgba(0, 0, 0, 0.1)"
          bg="rebeccapurple"
          disabled={false}
          label=""
          key="register button"
          mt={0}
          mb={0}
          onClick={async () => {
            const response = await mutate({
              variables: {
                email: "iti@iti.com",
                password: "testLoad"
              }
            });
            console.log({ response });
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
      )}
    </LoginComponent>
  );
}

export default LoginButton;
