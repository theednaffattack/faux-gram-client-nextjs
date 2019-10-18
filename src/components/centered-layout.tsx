import React from "react";
import { Flex } from "./styled-rebass";

export interface ICenteredLayoutProps {
  children: any;
}

function CenteredLayout({ children }: ICenteredLayoutProps) {
  return (
    <Flex>
      <Flex>Layout</Flex>
      {children}
    </Flex>
  );
}

export default CenteredLayout;
