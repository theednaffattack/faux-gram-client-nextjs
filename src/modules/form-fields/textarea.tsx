import { FieldProps } from "formik";
import React from "react";
import { Text } from "rebass/styled-components";
import styled, { StyledComponent } from "styled-components";

interface CustomTextareaProps {
  label?: string;
}

const CustomTextarea: StyledComponent<
  "textarea",
  any,
  CustomTextareaProps,
  never
> = styled.textarea`
  outline: none;
  box-sizing: border-box;
  /* transition: all 0.3s ease-in-out; */
  box-sizing: border-box;
  width: "100%";
  border: "1px grey solid";
  border-radius: "10px";
  
  /* width: ${props => props && props.style && props.style.width}; */
  /* border-left: 2.5px transparent solid;
border-right: 2.5px transparent solid; */
  :focus {
    border: 1.5px orange solid;
  }

  ::placeholder {
    color: palevioletred;
  }
`;

export const TextareaField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & CustomTextareaProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      <Text fontFamily="montserrat">
        <label htmlFor={field.name}>{props && props.label}</label>
      </Text>
      <CustomTextarea
        id={field && field.name ? field.name : ""}
        name={field.name}
        sx={{ fontFamily: "main" }}
        autoFocus
        {...field}
        {...props}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
