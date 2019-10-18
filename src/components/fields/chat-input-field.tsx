import { FieldProps } from "formik";
import React from "react";
import styled from "styled-components";
import {
  color,
  borders,
  space,
  width,
  height,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  borderRadius
} from "styled-system";

import { InputProps } from "./types";

// type InputProps = DetailedHTMLProps<
//   InputHTMLAttributes<HTMLInputElement>,
//   HTMLInputElement
// >;

// export type ChatInputProps = InputProps &
//   ColorProps &
//   BordersProps &
//   SpaceProps &
//   WidthProps &
//   HeightProps &
//   BorderRadiusProps &
//   FontSizeProps &
//   LetterSpacingProps;

export const MyInput = styled.input`
  ${borders}
  ${color}
  ${fontSize}
  ${space}
  ${width}

& ::placeholder,
::-webkit-input-placeholder {
  color: ${props => props.theme.colors.chat_placeholder};
}
:-ms-input-placeholder {
  color: red;
}
`;

const ChatInput: any = styled.input`
${color}
${borders}
${space}
${width}
${height}
${borderRadius}
${fontFamily}
${fontSize}
${fontWeight}
${letterSpacing}
outline: none;
box-sizing:border-box;
transition: all 0.30s ease-in-out;
box-sizing: border-box;
  ::placeholder {
    color: #3f3c62; // #b2b2d8;
  }
`;

export const ChatField = ({
  field,
  form: { errors, touched },
  onChange,
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      {/* <Text fontFamily="montserrat">
        <label htmlFor={field.name}>{props.label}</label>
      </Text> */}
      <ChatInput
        id={field.name}
        name={field.name}
        fontSize={1}
        width={1}
        // bg="rgba(0,0,0,0.1)"
        color="text"
        borderRadius={0}
        // sx={{
        //   borderRadius
        // }}
        p={2}
        pl={3}
        my={2}
        letterSpacing=".1em"
        {...field}
        onChange={onChange}
        // onChange={e => console.log(e.target.value)}
        {...props}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
