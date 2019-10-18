export const sidebarPoses = {
  open: {
    x: "0%",
    delayChildren: 300,
    staggerChildren: 50
  },
  closed: {
    delay: 500,
    staggerChildren: 20,
    x: "-100%"
  }
};

export const sidebarListPoses = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 20 },
  init: {
    boxShadow: "0px 0px 0px rgba(0,0,0,0)"
  },

  hoverable: true,

  hover: {
    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
  }
};
