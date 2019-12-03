import React from "react";
import { PoseGroup } from "react-pose";

// import {
//   // Box,
//   Card,
//   // Flex,
//   // Heading,
//   // Icon,
//   // Text,
//   // FlexUserProfileWrap
// } from "./styled-rebass";

// import FollowButton from "./follow-button";
import FeedCard from "../modules/feed/global-feed-card";
import {
  GetGlobalPostsQueryResult,
  FollowUserMutationFn,
  // User,
  // GlobalPostsSubscription,
  // GlobalPostsComponentProps,
  // GetGlobalPostsComponentProps,
  FollowUserMutationResult,
  MeQueryResult
} from "./generated/apollo-graphql";

// const staggerDuration = 100;

// interface IIndex {
//   index: number;
// }

// const PosedCard = posed(Card)({
//   enter: { opacity: 1, delay: ({ index }: IIndex) => index * staggerDuration },
//   exit: { opacity: 0, delay: ({ index }: IIndex) => index * staggerDuration },
//   invisible: { opacity: 0 }
// });

interface IDisplayPostsProps {
  data: GetGlobalPostsQueryResult["data"];
  followUser: FollowUserMutationFn;
  me: MeQueryResult["data"];
  errorGlblPosts: GetGlobalPostsQueryResult["error"];
  loadingFollowUser?: GetGlobalPostsQueryResult["loading"];
  subscribeGlblPosts?: any;
  dataFollowUser?: FollowUserMutationResult["data"];
  errorFollowUser?: FollowUserMutationResult["error"];
}

export const DisplayCards = ({
  data,
  followUser,
  errorFollowUser,
  loadingFollowUser,
  me,
  errorGlblPosts
}: IDisplayPostsProps) => {
  if (errorGlblPosts) {
    return (
      <div>Error loading global posts {JSON.stringify(errorGlblPosts)}</div>
    );
  }
  return (
    <PoseGroup
      delta={1}
      preEnterPose="invisible"
      enterPose="enter"
      exitPose="exit"
      animateOnMount={true}
    >
      {data && data.getGlobalPosts ? (
        data.getGlobalPosts.map(post => {
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
              />
            );
          } else {
            return <div>nothing here</div>;
          }
        })
      ) : (
        <div>of nothing</div>
      )}
    </PoseGroup>
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
      />
    );
  }
}

// subcribeGlblPosts: any;
// dataFollowerUser: any;
// errorFollowUser: any;
// loadingFollowUser: any;
