import React from "react";
import { FieldProps, getIn } from "formik";
import styled from "styled-components";
import { space, typography, SpaceProps, TypographyProps } from "styled-system";

// import Yup from "yup";

interface SelectFormFieldCustomProps {
  label?: string;
  options: Array<{ label: string; value: string }>;
}

export const SelectFormField: React.FunctionComponent<FieldProps &
  SelectFormFieldCustomProps> = ({ field, form, label, options, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <>
      {errorText ? <div>{JSON.stringify(errorText, null, 2)}</div> : ""}
      <Label
        htmlFor="standard-basic"
        id="standard-basic-label"
        className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated"
      >
        {field.name}
      </Label>

      <div className="custom-select" style={{ width: "200px" }}>
        <select {...field} {...props}>
          {options.map((option, index) => {
            //
            return (
              <option key={`${index}-${option.label}`} value={option.value}>
                <MenuItem>{option.label}</MenuItem>
              </option>
            );
          })}
        </select>
        <FormHelperText>{errorText}</FormHelperText>
      </div>
    </>
  );
};

interface FormHelperTextProps extends SpaceProps, TypographyProps {}

const FormHelperText = styled.p<FormHelperTextProps>`
  display: "block";
  ${space}
  ${typography}
`;

const MenuItem = styled.div``;

const Input = styled.input`
  font: inherit;
  color: currentColor;
  width: 100%;
  border: 0;
  height: 1.1875em;
  margin: 0;
  display: block;
  padding: 6px 0 7px;
  min-width: 0;
  background: none;
  box-sizing: content-box;
  animation-name: MuiInputBase-keyframes-auto-fill-cancel;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline-offset: -2px;
  }

  -webkit-writing-mode: horizontal-tb !important;
  writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: textfield;
  background-color: white;
  -webkit-rtl-ordering: logical;
  cursor: text;
  margin: 0em;
  font: 400 11px system-ui;
  padding: 1px;
  border-width: 2px;
  border-style: inset;
  border-color: initial;
  border-image: initial;
`;

const Label = styled.label`
  display: block;
  transform-origin: top left;

  color: rgba(0, 0, 0, 0.54);
  padding: 0;
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;

  ${Input}:focus & {
    fill: rebeccapurple;
  }
  cursor: default;
`;
