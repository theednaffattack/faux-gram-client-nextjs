import React from "react";

interface LayoutFootSpacerProps {
  setHeight?: string | undefined;
  border?: string | undefined;
}

const LayoutFootSpacer: React.FunctionComponent<LayoutFootSpacerProps> = ({
  setHeight = "67px",
  border
}) => {
  return (
    <div
      style={{
        width: "25px",
        height: setHeight,
        border
      }}
    ></div>
  );
};

export default LayoutFootSpacer;
