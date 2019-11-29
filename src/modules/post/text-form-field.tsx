import React from "react";
import { FieldProps, getIn } from "formik";
import { typography, TypographyProps } from "styled-system";
// import Yup from "yup";
import styled from "styled-components";

interface TextFormFieldProps {
  hidden: boolean;
  label: string;
  loadingCreatePost?: boolean;
}

export const TextFormField: React.FunctionComponent<FieldProps &
  TextFormFieldProps> = ({ field, form, loadingCreatePost, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <>
      {errorText ? <div>{JSON.stringify(errorText, null, 2)}</div> : ""}
      {props.hidden === true ? (
        ""
      ) : (
        <LabelWrapper>
          <Label htmlFor={field.name} id="standard-basic-label">
            {props.label}
          </Label>
        </LabelWrapper>
      )}
      <Input
        aria-invalid="false"
        type={props.hidden ? "hidden" : "text"}
        disabled={loadingCreatePost}
        {...field}
        {...props}
        fontSize={3}
        fontFamily="main"
      />
    </>
  );
};

const LabelWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  /* border: 2px limegreen dashed; */
`;

const Input = styled.input<TypographyProps>`
  font: inherit;
  color: #000;
  width: 100%;
  /* border: 0; */
  height: 1.1875em;
  margin: 0;
  margin-bottom: 12px;
  display: block;
  padding: 6px 0 7px;
  min-width: 0;
  ${typography}
  background: none;
  box-sizing: content-box;
  animation-name: MuiInputBase-keyframes-auto-fill-cancel;
  -webkit-tap-highlight-color: transparent;

  :focus {
    outline-offset: -2px;
    border-bottom: 2px orange solid;
    /* border-bottom: 2.5px lawngreen solid; */
  }

  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  /* :focus {
    border-bottom: 2.5px lawngreen solid;
    // box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6);
  } */
  ::placeholder {
    color: palevioletred;
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
  /* font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400; */
  line-height: 1;
  letter-spacing: 0.00938em;

  ${Input}:focus & {
    color: rebeccapurple;
  }
  cursor: default;
`;
