import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Text } from "rebass";

import { InputB } from "../styled-rebass";
import { IInputFieldProps } from "../types";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps & IInputFieldProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      <Text fontFamily="montserrat">
        <label htmlFor={field.name}>{props.label}</label>
      </Text>
      <InputB
        id={field && props.id ? props.id : field.name}
        name={field.name}
        {...field}
        // {...props}
        // fontSize={1}
        // width={1}
        // bg="rgba(0,0,0,0.1)"
        // color="text"
        // borderRadius={0}
        // p={2}
        // mt={2}
        // mb={3}
        // letterSpacing=".1em"
        // border="0"
        // borderBottom="2.5px rgba(244, 50, 127, 1) solid"
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
