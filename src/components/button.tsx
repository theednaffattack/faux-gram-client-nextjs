import React from "react";
import styled from "styled-components";

import { Button as MyButton, ButtonProps, Text } from "rebass";
import {
  borderRadius,
  boxShadow,
  BorderRadiusProps,
  BoxShadowProps,
  TLengthStyledSystem
} from "styled-system";

type BaseButtonProps = BorderRadiusProps & BoxShadowProps & ButtonProps;

const StyledButton: React.FC<BaseButtonProps> = styled(MyButton)`
  ${boxShadow}
  ${borderRadius}

  :focus {
    border: 4px lawngreen solid;
    border-radius: 20px;
    outline: none;
  }

  background-image: linear-gradient(
    0deg,
    rgb(210, 48, 120) 6%,
    rgb(254, 97, 97) 74%,
    rgb(255, 121, 85) 100%
  );
`;

interface IButtonProps {
  bg?: string;
  disabled?: boolean;
  label?: string;
  mt?: TLengthStyledSystem;
  children?: React.ReactNode;
  mb?: string | number;
  onClick?: any;
  shadow?: string;
}

export const Button: React.FC<IButtonProps> = ({
  bg,
  disabled = false,
  label,
  mt,
  children,
  mb,
  onClick,
  shadow,
  ...theRest
}: IButtonProps) => {
  return (
    <StyledButton
      type="button"
      width="250px"
      mt={mt}
      bg={bg}
      sx={{
        borderRadius: "23px"
      }}
      onClick={onClick}
      boxShadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
      {...theRest}
    >
      <Text fontFamily="montserrat">{label ? label : children}</Text>
    </StyledButton>
  );
};

export {};
