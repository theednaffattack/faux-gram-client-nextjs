import React from "react";
import posed from "react-pose";

import { Button } from "./styled-rebass";

export interface IMenuButtonProps {
  dropdownMenu: string;
  toggleMenuOpenOrClosed: any;
}

export const PathOne = posed.path({
  closed: { rotate: 0, originX: "0", originY: "0" },
  open: { rotate: 40, originX: "0", originY: "0" }
});

export const PathTwo = posed.path({
  closed: { opacity: 1 },
  open: { opacity: 0 }
});

export const PathThree = posed.path({
  closed: { rotate: 0, originX: "0", originY: "0" },
  open: { rotate: -45, originX: "0", originY: "0" }
});

function MenuButton({
  dropdownMenu,
  toggleMenuOpenOrClosed
}: IMenuButtonProps) {
  return (
    <Button
      className="menu-toggle"
      type="button"
      id="menu-toggle"
      aria-expanded="false"
      m={3}
      bg={dropdownMenu === "open" ? "rgba(0,0,0,0.08)" : "transparent"}
      width="30px"
      onClick={toggleMenuOpenOrClosed}
      style={{
        padding: 0,
        display: "inline-block",
        verticalAlign: "middle"
      }}
    >
      <svg
        className="icon icon-menu-toggle"
        aria-hidden="true"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        height="100%"
        fill="white"
        // width="25px"
        style={{
          padding: 0,
          margin: "4px",
          display: "inline-block",
          verticalAlign: "middle"
        }}
      >
        <g className="svg-menu-toggle">
          <PathOne
            pose={dropdownMenu}
            className="line line-1"
            d="M5 13h90v14H5z"
            style={{
              transformOrigin: "0.3em 1.4em"
            }}
          />
          <PathTwo
            pose={dropdownMenu}
            className="line line-2"
            d="M5 43h90v14H5z"
          />
          <PathThree
            pose={dropdownMenu}
            className="line line-3"
            d="M5 73h90v14H5z"
            style={{
              transformOrigin: "0.2em -0.8em"
            }}
          />
        </g>
      </svg>
    </Button>
  );
}

export default MenuButton;
