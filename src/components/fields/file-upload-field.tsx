import { FieldProps } from "formik";
import React from "react";
import { Text } from "rebass";

import { InputProps } from "./types";
import { IInputFieldProps } from "../types";

// export interface IInputFieldProps {
//   label: string;
// }

export const FileUploadField = ({
  field,
  label,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps & IInputFieldProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      <Text fontFamily="montserrat">
        <label htmlFor={field.name}>{label}</label>
      </Text>
      <input
        // @ts-ignore
        id={field && field.id ? field.id : field.name}
        name={field.name}
        {...field}
        {...props}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
