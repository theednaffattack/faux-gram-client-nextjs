import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Button, Flex, Text } from "./styled-rebass";
import UserProfileImage from "./user-avatar";

import Router from "next/router";
import { Heading } from "rebass";

export interface IRowProps {
  index: number;
  style: any;
  data: any;
}

// function handleOnWheel({ deltaY }: any) {
//   // Your handler goes here ...
//   console.log("handleOnWheel()", deltaY);
// }

const Row = ({ index, data, style }: IRowProps) => {
  if (
    data.itemData[index] &&
    data.itemData[index].__typename &&
    data.itemData[index].__typename === "LoadingIndicator"
  ) {
    return (
      <Flex
        bg={index % 2 === 0 ? "#eee" : "white"}
        flexDirection="row"
        alignItems="center"
        width={1}
        style={style}
        pr={3}
        justifyContent="center"
      >
        <Button
          backgroundColor="theme.colors.blue"
          // bg={`${(props: any) => console.log("GOOD GAWD", props)}`}
          // bg="custom"
          // bg="blue"
          type="button"
          onClick={data.loadMoreItems}
        >
          LOAD OLDER THREADS
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      bg={index % 2 === 0 ? "#eee" : "white"}
      flexDirection="row"
      alignItems="stretch"
      width={1}
      style={style}
      pr={3}
    >
      <Flex
        bg="transparent"
        width={1 / 5}
        pl={3}
        alignItems="center"
        style={{ overflowY: "auto" }}
      >
        {data.itemData[index] &&
          data.itemData[index].node &&
          data.itemData[index].node.invitees &&
          data.itemData[index].node.invitees.map(
            (person: any, itemIndex: number) => (
              <UserProfileImage
                key={`${itemIndex}-${person.typename}`}
                isMe={true}
                flexInstruction="column"
                user={person}
                buttonThing={false}
                color="blue"
                handleRemoveInviteeToThread={data.handleRemoveInviteeToThread}
              />
            )
          )}
      </Flex>
      <Flex
        bg="transparent"
        width={2 / 3}
        mr="auto"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex width="135px" alignItems="center">
          <Text bg="lightblue" textAlign="center" mr={1} p={1}>
            {data.itemData[index] &&
              data.itemData[index].node &&
              data.itemData[index].node.message_count}
          </Text>

          <Text textAlign="center" width={1}>
            messages
          </Text>
        </Flex>
        <Text
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {data.itemData[index] &&
            data.itemData[index].node &&
            data.itemData[index].node.last_message}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Button
          mr={2}
          type="button"
          onClick={() => {
            // data.handleDisplayMessages(data.itemData[index].node.id);
            Router.push(
              "/messages/[id]",
              `/messages/${data.itemData[index].node.id}`
            );
          }}
        >
          View messages
        </Button>
      </Flex>
    </Flex>
  );
};

interface IThreadWindowProps {
  hasNextPage: any;
  hasPreviousPage: any;
  isNextPageLoading: any;
  fetchMoreGetOnlyThreads: any;
  data: any;

  loadingGetOnlyThreads: any;
  handleThreadSelection: any;
  handleDisplayMessages: any;
  showMessagingAddressBook: any;
}

interface IThreadWindowState {
  listLength: number | null;
  scrollOffset: number;
}

class ThreadWindow extends React.Component<
  IThreadWindowProps,
  IThreadWindowState
> {
  listRef: React.RefObject<List>;
  outerListRef: React.RefObject<List>;
  innerListRef: React.RefObject<List>;
  targetScrollToElement: any;

  constructor(props: IThreadWindowProps) {
    super(props);
    this.scrollToLastRow = this.scrollToLastRow.bind(this);

    this.listRef = React.createRef();
    this.innerListRef = React.createRef();
    this.outerListRef = React.createRef();
    this.targetScrollToElement = null;

    this.state = {
      listLength: null,
      scrollOffset: 0
    };
  }

  scrollToLastRow() {
    if (
      this.targetScrollToElement &&
      this.targetScrollToElement.current &&
      this.state.listLength
    ) {
      this.targetScrollToElement.scrollToItem(this.state.listLength, "center");
      return;
    }
    if (!this.targetScrollToElement.current) {
      throw Error("no ref is set dummy");
    }
    return;
  }

  componentDidMount() {
    this.targetScrollToElement = this.outerListRef;

    this.setState({
      listLength: this.props.data.edges.length
    });
  }

  componentDidUpdate() {
    if (
      typeof this.state.listLength === "number" &&
      this.outerListRef &&
      this.outerListRef.current
    ) {
      this.outerListRef.current.scrollToItem(this.state.listLength, "center");
    }
  }

  render() {
    const {
      hasPreviousPage,
      isNextPageLoading,
      fetchMoreGetOnlyThreads,
      data,

      loadingGetOnlyThreads,
      handleThreadSelection,
      handleDisplayMessages
    } = this.props;

    // (this.innerListRef.current &&
    //   this.innerListRef.current.style.height.replace('px', '')) ||

    const loadingRow = {
      node: {
        last_message: "Load older messages"
      },
      __typename: "LoadingIndicator"
    };

    // Array of items loaded so far.
    const items = hasPreviousPage ? [loadingRow, ...data.edges] : data.edges;

    // If there are more items to be loaded then add an extra row to hold a loading indicator.
    const itemCount = items.length;

    // Only load 1 page of items at a time.
    // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.

    const loadMoreItems = () => {
      return isNextPageLoading
        ? () => {
            console.log("IT'S FAKE!!!", isNextPageLoading);
          }
        : fetchMoreGetOnlyThreads({
            variables: {
              feedinput: { cursor: data.pageInfo.endCursor, take: 6 }
            },
            updateQuery(previousResult: any, { fetchMoreResult }: any) {
              const prevThreadFeed = previousResult.getOnlyThreads;
              const newThreadFeed = fetchMoreResult.getOnlyThreads;

              const newThreadData = {
                ...previousResult.getOnlyThreads,
                edges: [...newThreadFeed.edges, ...prevThreadFeed.edges],
                pageInfo: newThreadFeed.pageInfo
              };

              const newData = {
                ...previousResult,
                getOnlyThreads: newThreadData
              };

              return newData;
            }
          });
    };

    // // Every row is loaded except for our loading indicator row.
    // const isItemLoaded = (index: number) =>
    //   !hasPreviousPage || index < items.length;

    return (
      <AutoSizer>
        {({ height, width }) => {
          if (itemCount > 0) {
            return (
              // <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount}>
              //   {({ onItemsRendered, ref }) => {
              //     return (
              <List
                itemData={{
                  itemData: items,
                  loadMoreItems,
                  loadingGetOnlyThreads,
                  handleThreadSelection,
                  handleDisplayMessages,
                  height,
                  width
                }}
                ref={this.listRef}
                height={height}
                itemCount={itemCount}
                itemSize={85}
                width={width}
              >
                {Row}
              </List>
              //     );
              //   }}
              // </InfiniteLoader>
            );
          } else {
            return <Heading>You don't have any Threads Yet</Heading>;
          }
        }}
      </AutoSizer>
    );
  }
}

export default ThreadWindow;
