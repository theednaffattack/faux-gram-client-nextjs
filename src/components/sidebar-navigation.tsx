import React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import styled from "styled-components";

import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./menu-toggle";
import { Navigation } from "./navigation";

const sidebarBackground = {
  open: {
    x: 0
    // opacity: 1
  },
  closed: {
    x: "-100%"
    // opacity: 0
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
    bottom: ${isOpen ? 0 : null};
    height: ${isOpen ? "100%" : null};
    width: 300px;
    z-index: 999;
  `;

  const BackgroundDiv = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    background: #fff;
  `;

  return (
    <MotionNav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      // variants={sidebar}
      custom={height}
      ref={containerRef}
    >
      <BackgroundDiv
        // animate={{ x: 500 }}
        transition={{ duration: 0.5 }}
        // transition={{
        //   ease: "easeInOut",
        //   // type: "spring",
        //   duration: 2
        //   // stiffness: 20,
        //   // restDelta: 2
        // }}
        variants={sidebarBackground}
      />

      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </MotionNav>
  );
};
