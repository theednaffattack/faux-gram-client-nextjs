/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { AbFlex, Flex, Text } from "../../../src/components/styled-rebass";
import Icon from "../../../src/modules/icon/m-icon";
import { breakWidths } from "./layout";
import styled from "styled-components";
import { MaterialIcons } from "../icon/generated-material-icon-types";

interface Props {}

type Name = keyof MaterialIcons;

interface MaterialIconProps {
  fill: string;
  name: Name;
  size?: string;
  width?: string;
}

interface NavItemProps {
  to: string;
  iconName: MaterialIconProps["name"];
}

// interface RouteType {
//   [key: string]: any;
// }

// let routes = {
//   home: () => Router.push("/feed", "/feed"),
//   global: () => Router.push("/feed/global", "/feed/global"),
//   post: () => Router.push("/post", "/post"),
//   messages: () => Router.push("/messages", "/messages"),
//   profile: () => Router.push("/profile", "/profile")
// };

let rowPY = 2;

let navLetterSpacing = ".08rem";
let navFontSize = ".6rem";

let iconSize = "2rem";

let newRoutes = {
  home: "/feed",
  global: "/global",
  post: "/post",
  messages: "/messages",
  profile: "/profile"
};

let Anchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: crimson;
  }
`;

let NavItem: React.FunctionComponent<NavItemProps> = ({
  children,
  iconName,
  to
}) => {
  let initialStateColor = "rebeccapurple";
  const [color, setColor] = useState<string>(initialStateColor);
  useEffect(() => {
    setColor(initialStateColor);
  }, [initialStateColor]);
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={rowPY}
    >
      <Link href={to} as="/hello">
        <Anchor>
          <Icon
            fill={color}
            size={iconSize}
            name={iconName}
            setColor={setColor}
          />
        </Anchor>
      </Link>

      <Link href={to} as="/hello">
        <Anchor
          onMouseEnter={() => setColor("crimson")}
          onMouseLeave={() => setColor("rebeccapurple")}
        >
          <Text
            pt={1}
            alignSelf="center"
            fontSize={navFontSize}
            letterSpacing={navLetterSpacing}
            color={color === "crimson" ? color : "text"}
          >
            {children}
          </Text>
        </Anchor>
      </Link>
    </Flex>
  );
};

const FooterNavigation: React.FunctionComponent<Props> = () => {
  return (
    <AbFlex
      // alignSelf="center"
      // alignItems="center"
      justifyContent="space-around"
      width={breakWidths}
      borderTop="2px #eee solid"
      bg="#fff"
      position="fixed"
      bottom={0}
    >
      <NavItem to={newRoutes.home} iconName="home">
        Home
      </NavItem>
      <NavItem to={newRoutes.global} iconName="search">
        Global
      </NavItem>
      <NavItem to={newRoutes.post} iconName="camera">
        Post
      </NavItem>
      <NavItem to={newRoutes.messages} iconName="announcement">
        Notifications
      </NavItem>
      <NavItem to={newRoutes.profile} iconName="account_circle">
        Profile
      </NavItem>
    </AbFlex>
  );
};

export default FooterNavigation;
