import { Button } from "rebass";

import { Flex } from "../components/styled-rebass";

import posed from "react-pose";

export const Container = posed(Flex)({
  enter: { staggerChildren: 50 }
});

export const PButton = posed(Button)({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

export const PosedFlash = posed(Flex)({
  enter: { y: 0, opacity: 1, delay: 500 },
  exit: { y: 20, opacity: 0 }
});

export const Content = posed(Flex)({
  closed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 }
});

export const MessageContainer = posed(Flex)({
  open: { height: "auto", opacity: 1, delayChildren: 200, staggerChildren: 50 },
  closed: { height: 0, opacity: 0, delayChildren: 200, staggerChildren: 50 }
});
