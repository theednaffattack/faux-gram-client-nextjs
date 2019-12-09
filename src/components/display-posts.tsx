import React from "react";
import { Fragment } from "react";

import FeedCard from "../modules/feed/global-feed-card";
import {
  GetGlobalPostsQueryResult,
  FollowUserMutationFn,
  FollowUserMutationResult,
  MeQueryResult
} from "./generated/apollo-graphql";

interface IDisplayPostsProps {
  data: GetGlobalPostsQueryResult["data"];
  followUser: FollowUserMutationFn;
  me: MeQueryResult["data"];
  errorGlblPosts: GetGlobalPostsQueryResult["error"];
  loadingFollowUser?: GetGlobalPostsQueryResult["loading"];
  subscribeGlblPosts?: any;
  dataFollowUser?: FollowUserMutationResult["data"];
  errorFollowUser?: FollowUserMutationResult["error"];
  refetchGetGlobalPosts: GetGlobalPostsQueryResult["refetch"];
}

export const DisplayCards: React.FunctionComponent<IDisplayPostsProps> = ({
  data,
  followUser,
  errorFollowUser,
  loadingFollowUser,
  me,
  errorGlblPosts,
  refetchGetGlobalPosts
}) => {
  if (errorGlblPosts) {
    return (
      <div>Error loading global posts {JSON.stringify(errorGlblPosts)}</div>
    );
  }
  return (
    <Fragment>
      {data && data.getGlobalPosts ? (
        data.getGlobalPosts.map(edge => {
          let post = edge;
          let {
            text,
            id,
            title,
            images,
            user,
            comments,
            currently_liked,
            comments_count,
            likes_count,
            isCtxUserIdAFollowerOfPostUser,
            __typename
          } = post;

          if (
            post &&
            __typename &&
            title &&
            images &&
            id &&
            user &&
            me !== undefined &&
            me !== null &&
            isCtxUserIdAFollowerOfPostUser !== undefined &&
            isCtxUserIdAFollowerOfPostUser !== null &&
            text !== undefined &&
            text !== null
          ) {
            return (
              <FeedCard
                key={id}
                id={id}
                // cacheManipulation={cacheManipulation}
                images={images}
                title={title}
                comments={comments}
                description={text}
                currentlyLiked={currently_liked}
                initialCommentsCount={comments_count}
                initialLikesCount={likes_count}
                postUserId={user.id}
                isCtxUserIdAFollowerOfPostUser={isCtxUserIdAFollowerOfPostUser}
                followUser={followUser}
                errorFollowUser={errorFollowUser}
                loadingFollowUser={loadingFollowUser}
                me={me}
                refetchGetGlobalPosts={refetchGetGlobalPosts}
              />
            );
          } else {
            return <div>nothing here</div>;
          }
        })
      ) : (
        <div>of nothing</div>
      )}
    </Fragment>
  );
};

// interface IDisplayPostsProps {
//   subscribeGlblPosts: any;
//   dataFollowUser: any;
// }

export class DisplayPosts extends React.Component<IDisplayPostsProps, object> {
  componentDidMount() {
    this.props.subscribeGlblPosts();
  }

  render() {
    return (
      <DisplayCards
        me={this.props.me}
        followUser={this.props.followUser}
        errorGlblPosts={this.props.errorGlblPosts}
        data={this.props.data}
        refetchGetGlobalPosts={this.props.refetchGetGlobalPosts}
      />
    );
  }
}

// subcribeGlblPosts: any;
// dataFollowerUser: any;
// errorFollowUser: any;
// loadingFollowUser: any;
