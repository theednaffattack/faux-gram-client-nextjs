import { Variants } from "framer-motion";

export const button: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 }
};

export const arrow: Variants = {
  rest: { rotate: 0 },

  hover: { rotate: 360, transition: { duration: 0.4 } }
};
