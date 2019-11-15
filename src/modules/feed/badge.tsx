import React from "react";
import { FlexProps } from "rebass";

import { Flex } from "../../components/styled-rebass";

interface Props extends FlexProps {}

const Badge: React.FunctionComponent<Props> = ({ children, bg = "blue" }) => {
  return (
    <Flex
      alignSelf="center"
      sx={{
        display: "inline-block",
        color: "text",
        bg,
        px: 2,
        py: 1,
        borderRadius: 9999
      }}
    >
      {children}
    </Flex>
  );
};

export default Badge;
