import React, { Component } from "react";

import { Flex } from "./styled-rebass";
import { FollowingList } from "./following-lists-posts-only";
import { FOLLOWING_POSTS } from "../graphql/user/subscriptions/FollowingPosts";

interface IThoseIFollowProps {
  data: any;
  loading: any;
  error: any;
  subscribeToMore: any;
  subscribeToNewPosts?: any;
}

interface IThoseIFollowState {
  mounted: boolean;
}

export default class ThoseIFollow extends Component<
  IThoseIFollowProps,
  IThoseIFollowState
> {
  constructor(props: IThoseIFollowProps) {
    super(props);
    this.state = {
      mounted: false
    };
  }
  componentDidMount() {
    this.props.subscribeToMore({
      document: FOLLOWING_POSTS,
      variables: {
        data: {
          sentBy: "init",
          message: "init"
        }
      },
      updateQuery: (prev: any, { subscriptionData }: any) => {
        console.log("view prev", prev);
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
      // updateFunctionMyFollows(prev, { subscriptionData })
    });
    // this.props.subscribeToNewPosts();
    this.setState({
      mounted: true
    });
  }
  render() {
    const {
      data,
      loading: getMessageLoading,
      error: getMessageError
      // subscribeToMore
    } = this.props;

    return (
      <Flex
        width={[1, 1, 1]}
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
      >
        {getMessageError ? "error" : ""}
        {getMessageLoading ? "loading" : ""}
        <FollowingList
          mounted={this.state.mounted}
          data={data ? this.props.data : ""}
        />
      </Flex>
    );
  }
}
