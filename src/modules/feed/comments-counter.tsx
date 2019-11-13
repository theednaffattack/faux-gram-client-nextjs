import React from "react";

import { Text } from "../../components/styled-rebass";
import { CommentCountComponent } from "../../components/generated/apollo-graphql";

export interface CommentCounterProps {
  initialCommentsCount: number;
  postId: string;
}

export interface CommentCounterState {
  count: number;
}

export class CommentCounter extends React.Component<
  CommentCounterProps,
  CommentCounterState
> {
  constructor(props: CommentCounterProps) {
    super(props);
    this.state = {
      count: -1
    };
  }
  render() {
    const { postId } = this.props;
    return (
      <CommentCountComponent
        onSubscriptionData={data => {
          if (
            data &&
            data.subscriptionData &&
            data.subscriptionData.data &&
            data.subscriptionData.data.commentCount.__typename ===
              "CommentCountType"
          ) {
            this.setState({
              count: data.subscriptionData.data.commentCount.count
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
            this.props.initialCommentsCount !== null &&
            this.props.initialCommentsCount !== undefined
          ) {
            return <Text>{this.props.initialCommentsCount}</Text>;
          }
          if (data && this.state.count !== -1) {
            return <pre style={{ color: "crimson" }}>{this.state.count}</pre>;
          }
          return <div>nothing subscription</div>;
        }}
      </CommentCountComponent>
    );
  }
}
