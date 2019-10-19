import React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./menu-item";
import styled from "styled-components";

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
    {pages.map((page, i) => (
      <MenuItem page={page} i={i} key={i} />
    ))}
  </MenuUl>
);

// const itemIds = [0, 1, 2, 3, 4];

const pages = [
  "about",
  "message",
  "login",
  "logout",
  "messages",
  "profile",
  "register",
  "welcome"
];
