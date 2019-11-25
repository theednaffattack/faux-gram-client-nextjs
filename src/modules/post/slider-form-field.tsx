import React, { ChangeEvent } from "react";
import { FieldProps, getIn } from "formik";
import styled from "styled-components";
import { space, typography, SpaceProps, TypographyProps } from "styled-system";

// import Yup from "yup";

interface SliderFormFieldCustomProps {
  label?: string;
  // options: Array<{ label: string; value: string }>;
}

export const SelectFormField: React.FunctionComponent<FieldProps &
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
        <input
          type="range"
          min="1"
          max="100"
          value="50"
          className="slider"
          {...field}
          {...props}
        />
        <Slider
          type="range"
          value="50"
          className="slider"
          marks
          step={10}
          min={10}
          max={100}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            console.log({ event });
            // form.setFieldValue(field.name, event.)
          }}
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

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border: 1px solid black;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border: 1px solid black;
    cursor: pointer;
  }
`;

// const SliderThumb = styled.input
