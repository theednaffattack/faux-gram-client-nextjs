import React from "react";
import Router from "next/router";

import {
  AbFlex,
  Box,
  Button,
  Text
} from "../../../src/components/styled-rebass";
import { breakWidths } from "./layout";

interface Props {}

interface NavItemProps {
  to: () => RouteType;
}

interface RouteType {
  [key: string]: any;
}

let rowPY = 3;

let navLetterSpacing = ".08rem";

let routes = {
  home: () => Router.push("/feed", "/feed"),
  global: () => Router.push("/feed/global", "/feed/global"),
  post: () => Router.push("/post", "/post"),
  messages: () => Router.push("/messages", "/messages"),
  profile: () => Router.push("/profile", "/profile")
};

let NavItem: React.FunctionComponent<NavItemProps> = ({ children, to }) => {
  return (
    <Box py={rowPY} sx={{ cursor: "pointer", ":hover": { color: "crimson" } }}>
      <Button
        onClick={to}
        type="button"
        color="text"
        bg="transparent"
        sx={{ cursor: "pointer", ":hover": { color: "crimson" } }}
      >
        <Text letterSpacing={navLetterSpacing} fontFamily="main">
          {children}
        </Text>
      </Button>
    </Box>
  );
};

const FooterNavigation: React.FunctionComponent<Props> = () => {
  return (
    <AbFlex
      alignSelf="center"
      alignItems="center"
      justifyContent="space-around"
      width={breakWidths}
      borderTop="2px #eee solid"
      bg="#fff"
      position="fixed"
      bottom={0}
    >
      <NavItem to={routes.home}>Home</NavItem>
      <NavItem to={routes.global}>Global</NavItem>
      <NavItem to={routes.post}>Post</NavItem>
      <NavItem to={routes.messages}>Notifications</NavItem>
      <NavItem to={routes.profile}>Profile</NavItem>
    </AbFlex>
  );
};

export default FooterNavigation;
