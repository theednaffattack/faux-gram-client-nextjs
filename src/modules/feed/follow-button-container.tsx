import React from "react";
import { Button } from "rebass";

import { IFollowButtonProps } from "./types";
import { GET_GLOBAL_POSTS } from "../../graphql/user/queries/GetGlobalPosts";
import { MY_FOLLOWING_POSTS } from "../../graphql/user/queries/MyFollowingPosts";

export default class FollowButton extends React.Component<
  IFollowButtonProps,
  object
> {
  constructor(props: IFollowButtonProps) {
    super(props);

    this.handleMutationClick = this.handleMutationClick.bind(this);
  }
  handleMutationClick(mutationFn: IFollowButtonProps["mutationFn"]) {
    try {
      mutationFn({
        variables: {
          data: {
            userIDToFollow: this.props.postUserId
          }
        },
        update: (cache: any, { data, error }: any) => {
          console.log("MODULE FOLLOW BUTTON CLICKED CONTAINER UPDATE FUNC");
          if (error) console.error("Follow Error!", error);

          // server returns false if "me" is already
          // following the specified user, so we return to disallow
          // it quickly. Another check for this happens below
          if (!data || !data.followUser) {
            return;
          }

          // Read the data from our cache for this query.
          const storeUpdateData = cache.readQuery({
            query: MY_FOLLOWING_POSTS
          });

          const globalPostData = cache.readQuery({
            query: GET_GLOBAL_POSTS
          });

          let getNewItems_too = globalPostData.getGlobalPosts.filter(
            (item: any) => {
              return item.user.id === this.props.postUserId;
            }
          );

          cache.writeQuery({
            query: MY_FOLLOWING_POSTS,
            data: {
              myFollowingPosts: [
                ...storeUpdateData.myFollowingPosts,
                ...getNewItems_too
              ]
            }
          });
        }
      });
    } catch (error) {
      console.log("oh no an error", error);
    }
  }
  render() {
    const { children, data, mutationFn, dataMe, ...props } = this.props;
    const { me } = dataMe;

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
