import React, { Fragment } from "react";

import FeedCard from "./feed-card";
import { Flex } from "../../components/styled-rebass";
import {
  MyFollowingPostsComponent,
  MyFollowingPostsQuery,
  MyFollowingPostsQueryResult
} from "../../components/generated/apollo-graphql";
import { FOLLOWING_POSTS } from "../../graphql/user/subscriptions/FollowingPosts";
import { IPageProps } from "../../page-types/types";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

export interface IFollowingPostsWrapperProps extends IPageProps {}

export const FollowingPostsWrapper: React.FunctionComponent<IFollowingPostsWrapperProps> = ({
  pathname,
  query
}) => {
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
        if (loadingMyFollowingPosts) {
          return <div>loading MyFollowingPosts...</div>;
        }

        if (
          dataMyFollowingPosts &&
          dataMyFollowingPosts.myFollowingPosts &&
          dataMyFollowingPosts.myFollowingPosts.length === 0
        ) {
          return <div>Try following someone to see posts</div>;
        }
        if (dataMyFollowingPosts && dataMyFollowingPosts.myFollowingPosts) {
          return (
            <FollowingPostsContainer
              pathname={pathname}
              query={query}
              myFollowingPosts={dataMyFollowingPosts.myFollowingPosts}
              subscribeToMore={subscribeToMoreMyFollowingPosts}
              subscriptionDocument={FOLLOWING_POSTS}
            />
          );
        } else {
          return <div>What, why can you see this?</div>;
        }
      }}
    </MyFollowingPostsComponent>
  );
};

export interface IFollowingPostsContainerProps
  extends IPageProps,
    MyFollowingPostsQuery {
  // data: MyFollowingPostsQueryResult;
  subscribeToMore: MyFollowingPostsQueryResult["subscribeToMore"];
  subscriptionDocument: any;
}

class FollowingPostsContainer extends React.Component<
  IFollowingPostsContainerProps
> {
  listRef: React.RefObject<HTMLDivElement>;
  constructor(props: IFollowingPostsContainerProps) {
    super(props);

    this.listRef = React.createRef();
  }
  componentDidMount() {
    if (this.listRef && this.listRef.current) {
      disableBodyScroll(this.listRef.current);
    }

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
        if (!subscriptionData.data) return prev;
        return Object.assign({}, prev, {
          // @ts-ignore
          myFollowingPosts: [
            // @ts-ignore
            subscriptionData.data.followingPosts,
            // @ts-ignore
            ...prev.myFollowingPosts
          ]
        });
      }
    });
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }
  render() {
    const { pathname, query, myFollowingPosts } = this.props;
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        width={1}
        style={{
          overflowY: "auto",
          WebkitOverflowScrolling: "touch"
        }}
        ref={this.listRef}
      >
        {myFollowingPosts &&
          myFollowingPosts.map((post, index) => {
            let {
              text,
              id,
              title,
              images,
              user,
              comments,
              currently_liked,
              comments_count,
              likes_count
            } = post;

            // perform checks for TypeScript
            // maybe these should be type guards
            id = id || "no id";
            title = title || "no title";
            let useUser = user && user.id ? user.id : "no user";
            images = images || [{ id: "no-image", uri: "http://no-image.com" }];
            let description = text || "no description";
            return (
              <Fragment key={index}>
                <hr
                  style={{
                    borderTop: "1px dashed rgba(0,0,0,0.05)",
                    width: "100%",
                    marginTop: "16px",
                    marginBottom: "16px"
                  }}
                />
                <FeedCard
                  currentlyLiked={currently_liked}
                  comments={comments}
                  initialLikesCount={likes_count}
                  initialCommentsCount={comments_count}
                  pathname={pathname}
                  postUserId={useUser as string}
                  userInfo={user}
                  query={query}
                  id={id}
                  key={index}
                  title={title}
                  images={images}
                  description={description}
                />
              </Fragment>
            );
          })}
      </Flex>
    );
  }
}
