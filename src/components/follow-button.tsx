import React from "react";
import { ApolloError } from "apollo-boost";

import { Button } from "../components/styled-rebass";
import { GET_GLOBAL_POSTS } from "../graphql/user/queries/GetGlobalPosts";
import {
  FollowUserMutationFn,
  FollowUserMutationResult,
  User
} from "./generated/apollo-graphql";

type HandleMutationClickProps = FollowUserMutationFn;

export interface IFollowButtonProps {
  isCtxUserIdAFollower: boolean;
  data?: FollowUserMutationResult["data"];
  children: any;
  followUser: FollowUserMutationFn;
  me: User;
  postUserId: User["id"];
  errorGlblPosts: FollowUserMutationResult["error"];
}

export default class FollowButton extends React.Component<
  IFollowButtonProps,
  object
> {
  constructor(props: IFollowButtonProps) {
    super(props);

    this.handleMutationClick = this.handleMutationClick.bind(this);
  }
  async handleMutationClick(followUser: HandleMutationClickProps) {
    await followUser({
      variables: {
        data: {
          userIDToFollow: this.props.postUserId
        }
      },
      update: (cache, { data, errors }) => {
        if (errors)
          console.error("Follow Error!", JSON.stringify(errors, null, 2));

        // server returns false if "me" is already
        // following the specified user, so we return to disallow
        // it quickly. Another check for this happens below
        if (!data || !data.followUser) {
          return;
        }

        const globalPostData: any = cache.readQuery({
          query: GET_GLOBAL_POSTS
        });

        const addUserToThoseIFollow = globalPostData
          ? {
              getGlobalPosts: [
                ...globalPostData.getGlobalPosts.map((item: any) => {
                  if (item.user.id === this.props.postUserId) {
                    return { ...item, isCtxUserIdAFollowerOfPostUser: true };
                  } else {
                    return item;
                  }
                })
              ]
            }
          : [];

        cache.writeQuery({
          query: GET_GLOBAL_POSTS,
          data: addUserToThoseIFollow
        });

        // // Read the data from our cache for this query.
        // const storeUpdateData = cache.readQuery({
        //   query: MY_FOLLOWING_POSTS
        // });
        // console.log("WHAT IS STORE UPDATE DATA?", storeUpdateData);

        // let getNewItems_too = globalPostData.getGlobalPosts.filter(
        //   (item: any) => {
        //     return item.user.id === this.props.postUserId;
        //   }
        // );

        // console.log("BEFORE WRITING TO CACHE...", {
        //   storeUpdateData,
        //   globalPostData,
        //   getNewItems_too
        // });

        // cache.writeQuery({
        //   query: MY_FOLLOWING_POSTS,
        //   data: {
        //     myFollowingPosts: [
        //       ...storeUpdateData.myFollowingPosts,
        //       ...getNewItems_too
        //     ]
        //   }
        // });
      }
    }).catch((error: ApolloError) => console.log("oh no an error", error));
  }
  render() {
    const { children, data, followUser, me, ...props } = this.props;

    return (
      <Button
        bg="blue"
        disabled={this.props.postUserId === me.id ? true : false}
        type="button"
        onClick={() => {
          if (this.props.postUserId !== me.id) {
            this.handleMutationClick(followUser);
          }
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
}
