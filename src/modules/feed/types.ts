import { MinHeightProps, BordersProps, FlexProps } from "styled-system";
import {
  FollowUserMutationFn,
  FollowUserMutationResult,
  MeQuery,
  User,
  UnFollowUserMutationFn,
  UnFollowUserMutationResult
} from "../../../src/components/generated/apollo-graphql";
import { SubscribeToMoreOptions } from "apollo-boost";

export interface CardData {
  id: string;
  category: string;
  title: string;
  pointOfInterest: number;
  backgroundColor: string;
}

export interface IFollowButtonProps {
  data: FollowUserMutationResult["data"];
  error: FollowUserMutationResult["error"];
  loading: FollowUserMutationResult["loading"];
  mutationFn: FollowUserMutationFn;
  postUserId: User["id"];
  dataMe: MeQuery;
  subscribeToMore?: any;
  subscribeToMoreOptions?: SubscribeToMoreOptions;
}

export interface IUnFollowButtonProps {
  data: UnFollowUserMutationResult["data"];
  error: UnFollowUserMutationResult["error"];
  loading: UnFollowUserMutationResult["loading"];
  mutationFn: UnFollowUserMutationFn;
  postUserId: User["id"];
  dataMe: MeQuery;
  subscribeToMore?: any;
  subscribeToMoreOptions?: SubscribeToMoreOptions;
}

export interface IWrappedAvatar {
  user: any;
  flexInstruction: "row" | "column";
  color: string;
  handleRemoveInviteeToThread: any;
  buttonThing: boolean;
}

export type TFlexProps = MinHeightProps & BordersProps & FlexProps;
