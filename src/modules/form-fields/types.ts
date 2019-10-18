import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import {
  ColorProps,
  BordersProps,
  SpaceProps,
  WidthProps,
  FontFamilyProps,
  BorderRadiusProps,
  LetterSpacingProps,
  FontWeightProps,
  FontSizeProps
} from "styled-system";

// export type InputProps = DetailedHTMLProps<
//   InputHTMLAttributes<HTMLInputElement>,
//   HTMLInputElement
// >;

export interface IInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export interface IInputBProps
  extends ColorProps,
    BordersProps,
    SpaceProps,
    WidthProps,
    ColorProps,
    BorderRadiusProps,
    FontFamilyProps,
    FontWeightProps,
    FontSizeProps,
    LetterSpacingProps {
  label: string;
}
