import React from "react";
import styled from "@emotion/styled";
import { flexbox, borders, space } from "styled-system";
import { motion } from "framer-motion";

import { IFlashProps } from "./types";

const MotionBox = styled(motion.div)`
  ${flexbox}
  ${borders}
  ${space}
`;

const Flash: React.FunctionComponent<IFlashProps> = (props: IFlashProps) => {
  return (
    <MotionBox
      animate={{ scaleZ: 2 }}
      transition={{ ease: "easeOut", duration: 2 }}
      justifyContent="center"
      alignItems="center"
      border="crimson"
      p={4}
      key="one"
      {...props}
    />
  );
};

export default Flash;
