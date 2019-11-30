/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { AbFlex, Flex, Text } from "../../../src/components/styled-rebass";
import Icon from "../../../src/modules/icon/m-icon";
import { breakWidths } from "./layout";
// import styled from "styled-components";
import { MaterialIcons } from "../icon/generated-material-icon-types";
import { MyContext } from "types/types";

interface Props {
  pathname?: string;
}

type Name = keyof MaterialIcons;

interface MaterialIconProps {
  fill: string;
  name: Name;
  size?: string;
  width?: string;
}

interface NavItemProps {
  as: string;
  to: string;
  iconName: MaterialIconProps["name"];
  pathname?: MyContext["pathname"];
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
  home: { to: "/feed", as: "/feed" },
  global: { to: "/feed/global", as: "/feed/global" },
  post: { to: "/post", as: "/post" },
  messages: { to: "/messages", as: "/messages" },
  profile: { to: "/profile", as: "/profile" }
};

// let Anchor = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-decoration: none;
//   cursor: pointer;

//   &:hover {
//     color: crimson;
//   }
// `;

let NavItem: React.FunctionComponent<NavItemProps> = ({
  children,
  iconName,
  pathname,
  to,
  as
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
      <Link href={to} as={as}>
        <a>
          <Icon
            fill={as === pathname ? "crimson" : color}
            size={iconSize}
            name={iconName}
            setColor={setColor}
          />
        </a>
      </Link>

      <Link href={to} as={as}>
        <a
          onMouseEnter={() => setColor("crimson")}
          onMouseLeave={() => setColor("rebeccapurple")}
          style={{
            color: as === pathname ? "crimson" : "rebeccapurple",
            textDecoration: "none"
          }}
        >
          <Text
            pt={1}
            alignSelf="center"
            fontSize={navFontSize}
            letterSpacing={navLetterSpacing}
            color={
              color === "crimson" ? color : as === pathname ? "crimson" : "text"
            }
          >
            {children}
          </Text>
        </a>
      </Link>
    </Flex>
  );
};

const FooterNavigation: React.FunctionComponent<Props> = ({ pathname }) => {
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
      <NavItem
        pathname={pathname}
        to={newRoutes.home.to}
        as={newRoutes.home.as}
        iconName="home"
      >
        Home
      </NavItem>
      <NavItem
        pathname={pathname}
        to={newRoutes.global.to}
        as={newRoutes.global.as}
        iconName="search"
      >
        Global
      </NavItem>
      <NavItem
        pathname={pathname}
        to={newRoutes.post.to}
        as={newRoutes.post.as}
        iconName="camera"
      >
        Post
      </NavItem>
      <NavItem
        pathname={pathname}
        to={newRoutes.messages.to}
        as={newRoutes.messages.as}
        iconName="announcement"
      >
        Notifications
      </NavItem>
      <NavItem
        pathname={pathname}
        to={newRoutes.profile.to}
        as={newRoutes.profile.as}
        iconName="account_circle"
      >
        Profile
      </NavItem>
    </AbFlex>
  );
};

export default FooterNavigation;
