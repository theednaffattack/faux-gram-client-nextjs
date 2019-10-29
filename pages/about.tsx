import React from "react";
import Link from "next/link";
import { Flex } from "../src/components/styled-rebass";
import { logout } from "../src/lib/localstorage-logout";

const AboutPage: React.FunctionComponent = () => (
  <Flex flexDirection="column">
    <h1>About</h1>
    <p>This is the about page</p>
    <button type="button" onClick={() => logout()}>
      log me out
    </button>
    <p>
      <Link href="/" as="/  ">
        <a>Go home</a>
      </Link>
    </p>
  </Flex>
);

export default AboutPage;
