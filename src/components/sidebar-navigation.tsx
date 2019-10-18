import React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import styled from "styled-components";

import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./menu-toggle";
import { Navigation } from "./navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

interface ISidebarNavigationProps {
  sidebarStatus?: "open" | "closed";
}

export const SidebarNavigation: React.FunctionComponent<
  ISidebarNavigationProps
> = _ => {
  // @ts-ignore

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const MotionNav = styled(motion.nav)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    border: "2px limegreen dashed";
    z-index: 999;
  `;

  const BackgroundDiv = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    background: #fff;
    z-index: 999;
  `;

  return (
    <MotionNav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <BackgroundDiv variants={sidebar} />
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </MotionNav>
  );
};
