import {
  BorderRadiusProps,
  BoxShadowProps,
  SpaceProps,
  WidthProps,
  HeightProps
} from "styled-system";
import { BoxProps, ButtonProps } from "rebass";

import { IPageProps } from "../../page-types/types";

export interface LoginCredentials {
  [email: string]: string;
  password: string;
}

export interface IUserPageProps extends IPageProps {
  token?: string | string[];
}

export interface ICardProps
  extends BorderRadiusProps,
    BoxProps,
    BoxShadowProps {}

export interface IButtonProps
  extends ButtonProps,
    BoxShadowProps,
    BorderRadiusProps,
    SpaceProps,
    WidthProps,
    HeightProps {}
