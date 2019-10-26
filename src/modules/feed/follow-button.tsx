import React from "react";
import { Button } from "rebass";

import { GET_GLOBAL_POSTS } from "../../graphql/user/queries/GetGlobalPosts";
import { MY_FOLLOWING_POSTS } from "../../graphql/user/queries/MyFollowingPosts";
import {
  FollowUserMutationFn,
  User,
  GetGlobalPostsQueryResult
} from "../../components/generated/apollo-graphql";

export interface FollowButtonProps {
  postUserId: User["id"];
  errorGlobalPosts: GetGlobalPostsQueryResult["error"];
  followUser: FollowUserMutationFn;
  me: User;
}

export default class FollowButton extends React.Component<
  FollowButtonProps,
  object
> {
  constructor(props: FollowButtonProps) {
    super(props);

    this.handleMutationClick = this.handleMutationClick.bind(this);
  }
  handleMutationClick({ followUser }: any) {
    try {
      followUser({
        variables: {
          data: {
            userIDToFollow: this.props.postUserId
          }
        },
        update: (cache: any, { data, error }: any) => {
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
    const { children, followUser, me, ...props } = this.props;

    return (
      <Button
        disabled={this.props.postUserId === me.id ? true : false}
        type="button"
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          if (this.props.postUserId !== me.id) {
            this.handleMutationClick({ followUser });
          }
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
}
