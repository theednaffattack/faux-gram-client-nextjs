import React from "react";

import FeedCard from "./feed-card";
import { MyFollowingPostsComponent } from "../../components/generated/apollo-graphql";
import { MY_FOLLOWING_POSTS } from "../../graphql/user/queries/MyFollowingPosts";

export interface IFollowingPostsWrapperProps {}

export const FollowingPostsWrapper: React.FunctionComponent<
  IFollowingPostsWrapperProps
> = () => {
  return (
    <MyFollowingPostsComponent>
      {({
        data: dataMyFollowingPosts,
        error: errorMyFollowingPosts,
        loading: loadingMyFollowingPosts,
        // @ts-ignore
        subscribeToMore: subscribeToMoreMyFollowingPosts
      }) => {
        if (errorMyFollowingPosts)
          return <div>ERROR! {JSON.stringify(errorMyFollowingPosts)}</div>;
        if (loadingMyFollowingPosts)
          return <div>loading MyFollowingPosts...</div>;
        if (dataMyFollowingPosts && dataMyFollowingPosts.myFollowingPosts) {
          return (
            <FollowingPostsContainer
              data={dataMyFollowingPosts.myFollowingPosts}
              subscribeToMore={subscribeToMoreMyFollowingPosts}
              subscriptionDocument={MY_FOLLOWING_POSTS}
            />
          );
        } else {
          return <div>What, why can you see this?</div>;
        }
      }}
    </MyFollowingPostsComponent>
  );
};

export interface IFollowingPostsContainerProps {
  data: any[];
  subscribeToMore: any;
  subscriptionDocument: string;
}

class FollowingPostsContainer extends React.Component<
  IFollowingPostsContainerProps
> {
  componentDidMount() {
    console.log("SUB RUNNING");
    this.props.subscribeToMore({
      document: this.props.subscriptionDocument,
      variables: {
        data: {
          sentBy: "init",
          message: "init"
        }
      },
      // @ts-ignore
      updateQuery: (prev, { subscriptionData }) => {
        console.log("view prev", prev);
        console.log("view subscriptionData", subscriptionData);
        return Object.assign({}, prev, {
          // @ts-ignore
          myFollowingPosts: [
            // @ts-ignore
            subscriptionData.data.myFollowingPosts,
            // @ts-ignore
            ...prev.myFollowingPosts
          ]
        });
      }
      // updateFunctionMyFollows(prev, { subscriptionData })
    });
  }
  render() {
    const { data } = this.props;
    return (
      <>
        {data.map((post, index) => {
          return (
            <FeedCard
              key={index}
              title={post.title}
              images={post.images}
              description={post.description}
            />
          );
        })}
      </>
    );
  }
}
