import React from "react";

import { Button } from "../../components/styled-rebass";
import {
  UnFollowUserComponent,
  User
} from "../../components/generated/apollo-graphql";
import { MY_FOLLOWING_POSTS } from "../../graphql/user/queries/MyFollowingPosts";

interface UnFollowButtonProps {
  followingId: User["id"];
}

export default class UnFollowButton extends React.Component<
  UnFollowButtonProps,
  object
> {
  constructor(props: UnFollowButtonProps) {
    super(props);

    this.handleMutationClick = this.handleMutationClick.bind(this);
  }
  handleMutationClick({ unFollowUser }: any) {
    unFollowUser({
      variables: {
        data: {
          userIDToUnFollow: this.props.followingId
        }
      },
      update: (cache: any, { data }: any) => {
        if (!data || data === "undefined" || data === null) {
          return;
        }

        let currentCache = cache.readQuery({
          query: MY_FOLLOWING_POSTS
        });

        let newArray = currentCache.myFollowingPosts.filter(
          (post: any) => post.user.id !== this.props.followingId
        );

        cache.writeQuery({
          query: MY_FOLLOWING_POSTS,
          data: {
            myFollowingPosts: [...newArray]
          }
        });
      }
    });
  }
  render() {
    return (
      <UnFollowUserComponent>
        {(unFollowUser, { error, loading }) => {
          if (error) return <span>error: {error}</span>;
          if (loading) {
            return <span>loading...</span>;
          }
          return (
            <Button
              type="button"
              bg="fuchsia"
              onClick={() => this.handleMutationClick({ unFollowUser })}
              // {...props}
            >
              unfollow
            </Button>
          );
        }}
      </UnFollowUserComponent>
    );
  }
}
