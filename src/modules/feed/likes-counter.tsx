import React from "react";

import { Text } from "../../components/styled-rebass";
import { LikesCountComponent } from "../../components/generated/apollo-graphql";

export interface LikesCounterProps {
  initialLikesCount: number;
  postId: string;
}

export interface LikesCounterState {
  count: number;
}

export class LikesCounter extends React.Component<
  LikesCounterProps,
  LikesCounterState
> {
  constructor(props: LikesCounterProps) {
    super(props);
    this.state = {
      count: -1
    };
  }
  render() {
    const { postId } = this.props;
    return (
      <LikesCountComponent
        onSubscriptionData={data => {
          if (data && data.subscriptionData && data.subscriptionData.data) {
            this.setState({
              count: data.subscriptionData.data.likesCount.count
            });
          }
        }}
        variables={{ input: { postId } }}
      >
        {({ data, error }) => {
          // if (loading) {
          //   return <div>loading...</div>;
          // }
          if (error) {
            return <div>error: {JSON.stringify(error, null, 2)}</div>;
          }
          if (
            this.state.count === -1 &&
            this.props.initialLikesCount !== null &&
            this.props.initialLikesCount !== undefined
          ) {
            return <Text fontSize="1em">{this.props.initialLikesCount}</Text>;
          }
          if (data && this.state.count !== -1) {
            return <Text>{this.state.count}</Text>;
          }
          return (
            <div style={{ color: "crimson" }}>error: shouldn't be visible</div>
          );
        }}
      </LikesCountComponent>
    );
  }
}
