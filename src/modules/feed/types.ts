import { MinHeightProps, BordersProps, FlexProps } from "styled-system";
import { ButtonProps } from "rebass";

export interface CardData {
  id: string;
  category: string;
  title: string;
  pointOfInterest: number;
  backgroundColor: string;
}

export interface IUnFollowButtonProps extends ButtonProps {
  me: string;
  oldData: any;
  followingId: string;
}

export interface IFollowButtonProps {
  data?: any;
  children: any;
  followUser: any;
  me: any;
  postUserId: string;
  errorGlblPosts: any;
}

export interface IWrappedAvatar {
  user: any;
  flexInstruction: "row" | "column";
  color: string;
  handleRemoveInviteeToThread: any;
  buttonThing: boolean;
}

export type TFlexProps = MinHeightProps & BordersProps & FlexProps;
