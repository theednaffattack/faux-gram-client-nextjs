import React from "react";

import { Button, Text } from "../../components/styled-rebass";
import { IUnFollowButtonProps } from "./types";
import { MY_FOLLOWING_POSTS } from "../../graphql/user/queries/MyFollowingPosts";

export default class UnFollowButton extends React.Component<
  IUnFollowButtonProps,
  object
> {
  constructor(props: IUnFollowButtonProps) {
    super(props);

    this.handleMutationClick = this.handleMutationClick.bind(this);
  }
  handleMutationClick(mutationFn: IUnFollowButtonProps["mutationFn"]) {
    try {
      mutationFn({
        variables: {
          data: {
            userIDToUnFollow: this.props.postUserId
          }
        },
        update: (cache: any, { data, error }: any) => {
          if (error)
            return console.error(
              "An error occurred attempting to follow user",
              error
            );
          if (!data || data === "undefined" || data === null) {
            return;
          }

          let currentCache = cache.readQuery({
            query: MY_FOLLOWING_POSTS
          });

          let newArray = currentCache.myFollowingPosts.filter(
            (post: any) => post.user.id !== this.props.postUserId
          );

          cache.writeQuery({
            query: MY_FOLLOWING_POSTS,
            data: {
              myFollowingPosts: [...newArray]
            }
          });
        }
      });
    } catch (error) {
      console.log("oh no an error", error);
    }
  }
  render() {
    const {
      children,
      data,
      mutationFn,
      dataMe,
      loading,
      ...props
    } = this.props;
    const { me } = dataMe;
    if (loading)
      return (
        <>
          <Text>loading...</Text>
          <Button
            bg="blue"
            disabled={true}
            type="button"
            onClick={() => {
              if (this.props.postUserId !== me!.id) {
                this.handleMutationClick(mutationFn);
              }
            }}
            {...props}
          >
            UnFollow Me
          </Button>
        </>
      );
    return (
      <Button
        bg="blue"
        disabled={this.props.postUserId === me!.id ? true : false}
        type="button"
        onClick={() => {
          if (this.props.postUserId !== me!.id) {
            this.handleMutationClick(mutationFn);
          }
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
}
