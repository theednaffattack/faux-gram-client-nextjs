import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Sidebar = styled(motion.ul)`
  width: 255px;
  height: 100vh;
  background: #7386d5;
  /* padding: 30px; */
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;

  color: #fff;
  background: linear-gradient(5deg, #745fb5, #9066b8);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
`;

const SidebarLi = styled(motion.li)`
  /* background: limegreen; */
  display: block;
  list-style: none;
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const SidebarMotion = () => (
  <Sidebar animate={{ scale: 2 }} transition={{ duration: 0.5 }} />
);

export const SidebarMotionList = () => {
  return <SidebarLi animate={{ scale: 2 }} transition={{ druation: 0.5 }} />;
};
