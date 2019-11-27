import React from "react";
import { FieldProps, getIn } from "formik";
import styled from "styled-components";
import { space, typography, SpaceProps, TypographyProps } from "styled-system";

import { Text } from "../../components/styled-rebass";
// import Yup from "yup";

interface SliderFormFieldCustomProps {
  label?: string;
  // options: Array<{ label: string; value: string }>;
}

export const SliderFormField: React.FunctionComponent<FieldProps &
  SliderFormFieldCustomProps> = ({ field, form, label, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <>
      {errorText ? <div>{JSON.stringify(errorText, null, 2)}</div> : ""}
      <Label htmlFor={field.name} id={field.name} className="CustomSliderLabel">
        {field.name}
      </Label>

      <div className="slide-container">
        <Text>{field.value}</Text>

        <Slider
          type="range"
          className="slider"
          marks
          step={10}
          min={10}
          max={100}
          // onChange={(event: ChangeEvent<HTMLInputElement>) => {
          //   console.log({ event: event.target.value });
          //   form.setFieldValue(field.name, event.target.value);
          // }}
          {...field}
          {...props}
        />
      </div>
    </>
  );
};

interface LabelProps extends SpaceProps, TypographyProps {}

const Label = styled.label<LabelProps>`
  display: block;
  transform-origin: top left;

  color: rgba(0, 0, 0, 0.54);
  padding: 0;
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;

  ${space}
  ${typography}

  cursor: default;
`;

interface SliderProps {
  min: number;
  max: number;
  marks: boolean;
}

const Slider = styled.input<SliderProps>`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  border-radius: 15px;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 25px;
    height: 25px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 35px;
    height: 35px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
  }
`;

// const SliderThumb = styled.input
