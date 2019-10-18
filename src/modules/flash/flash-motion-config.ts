export const containerConfig = {
  enter: { staggerChildren: 50 }
};

export const buttonConfig = {
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
};

export const flashConfig = {
  enter: { y: 0, opacity: 1, delay: 500 },
  exit: { y: 20, opacity: 0 }
};

export const contentConfig = {
  closed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 }
};

export const messageContainerConfig = {
  open: { height: "auto", opacity: 1, delayChildren: 200, staggerChildren: 50 },
  closed: { height: 0, opacity: 0, delayChildren: 200, staggerChildren: 50 }
};
