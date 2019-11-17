import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { MenuItem } from "./menu-item";
import { PageListProps } from "../types/types";

const pages: PageListProps[] = [
  { href: "/about", as: "/about", label: "about" },
  { href: "/login", as: "/login", label: "login" },
  { href: "/logout", as: "/logout", label: "logout" },
  { href: "/feed/global", as: "/feed/global", label: "global feed" },
  { href: "/feed", as: "/feed", label: "my feed" },
  { href: "/post", as: "/post", label: "post image" },
  { href: "/messages", as: "/messages", label: "messages" },
  { href: "/profile", as: "/profile", label: "profile" },
  { href: "/register", as: "/register", label: "register" }
];

const MenuUl = styled(motion.ul)`
  padding: 25px;
  position: absolute;
  top: 100px;
  width: 230px;
  z-index: 999;
`;

const variants: any = {
  open: {
    display: "inline",
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    display: "none",
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const Navigation = () => (
  <MenuUl variants={variants}>
    {pages.map((page, index) => (
      <MenuItem
        label={page.label}
        href={page.href}
        as={page.as}
        index={index}
        key={index}
      />
    ))}
  </MenuUl>
);
