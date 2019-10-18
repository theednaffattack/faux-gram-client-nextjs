import React, { Component } from "react";

import { Button, Flex } from "./styled-rebass";

interface IGetOlderMessgesButtonProps {
  fetchMoreGetMessagesByThreadId: any;
  threadId: string;
  pageInfo: any;
}

export default class GetOlderMessagesButton extends Component<
  IGetOlderMessgesButtonProps,
  object
> {
  render() {
    let { fetchMoreGetMessagesByThreadId, threadId, pageInfo } = this.props;
    return (
      <Flex
        flexDirection="row"
        // alignItems="center"
        justifyContent="center"
        width={1}
      >
        <Button
          type="button"
          onClick={() =>
            fetchMoreGetMessagesByThreadId({
              variables: {
                input: {
                  threadId,
                  skip: 0,
                  take: 15,
                  cursor: pageInfo.endCursor
                }
              },
              updateQuery(previousResult: any, fetchMoreResult: any) {
                const prevMessageFeed = previousResult.getMessagesByThreadId;
                const newMessageFeed =
                  fetchMoreResult.fetchMoreResult.getMessagesByThreadId;

                const newPageInfo = {
                  startCursor: prevMessageFeed.pageInfo.startCursor,
                  endCursor: newMessageFeed.pageInfo.endCursor,
                  hasNextPage: prevMessageFeed.pageInfo.hasNextPage,
                  hasPreviousPage: newMessageFeed.pageInfo.hasPreviousPage,
                  __typename: prevMessageFeed.pageInfo.__typename
                };

                const newFeedData = {
                  getMessagesByThreadId: {
                    ...previousResult.getMessagesByThreadId,
                    edges: [...newMessageFeed.edges, ...prevMessageFeed.edges],
                    pageInfo: newPageInfo
                  }
                };

                return newFeedData;
              }
            })
          }
        >
          LOAD OLDER MESSAGES
        </Button>
      </Flex>
    );
  }
}
