import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";

import { PageListProps } from "../types/types";

const NavLi = styled(motion.li)`
  list-style: none;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 999;
`;

const TextPlaceholder = styled.div`
  border-radius: 5px;
  width: 100%;
  /* height: 20px; */
  flex: 1;
  padding: 8px;
`;

const IconPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: 40px 0;
  margin-right: 20px;
`;

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

interface MenuItemProps extends PageListProps {
  index: number;
}

export const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  as,
  href,
  index,
  label
}) => {
  const style = { border: `2px solid ${colors[index]}` };
  const defaultStyle = { border: `2px solid grey` };
  const itemBorderColor = colors[index] ? style : defaultStyle;

  return (
    <NavLi
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconPlaceholder className="icon-placeholder" style={itemBorderColor} />
      <TextPlaceholder style={itemBorderColor}>
        <Link href={href} as={as}>
          <a>{label}</a>
        </Link>
      </TextPlaceholder>
    </NavLi>
  );
};
