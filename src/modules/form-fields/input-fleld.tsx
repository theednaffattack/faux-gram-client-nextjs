import { FieldProps } from "formik";
import React from "react";
import { Text } from "rebass";
import styled from "@emotion/styled";
import {
  color,
  borders,
  space,
  width,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  borderRadius
} from "styled-system";
import { IInputProps, IInputBProps } from "./types";

const InputB = styled.input`
${color}
${borders}
${space}
${width}
${borderRadius}
${fontFamily}
${fontSize}
${fontWeight}
${letterSpacing}
outline: none;
box-sizing:border-box;
transition: all 0.30s ease-in-out;
box-sizing: border-box;
/* border-left: 2.5px transparent solid;
border-right: 2.5px transparent solid; */
:focus {
  border-bottom: 2.5px lawngreen solid;
  // box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6);
  
}

  ::placeholder {
    color: palevioletred;
  }
`;

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & IInputProps & IInputBProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      <Text fontFamily="montserrat">
        <label htmlFor={field.name}>{props && props.label}</label>
      </Text>
      <InputB
        id={field && props.id ? props.id : field.name}
        name={field.name}
        fontSize={1}
        width={1}
        bg="rgba(0,0,0,0.1)"
        color="text"
        borderRadius={0}
        p={2}
        mt={2}
        mb={3}
        letterSpacing=".1em"
        border="0"
        borderBottom="2.5px rgba(244, 50, 127, 1) solid"
        {...field}
        {...props}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
