import React from "react";
import { VariableSizeList } from "react-window";

import { Flex, Image } from "./styled-rebass";
import { Frame } from "./zoom-image";

import { MESSAGE_THREADS } from "../graphql/user/subscriptions/MessageThreads";
import { IChatHistoryStateObject } from "./chat-example/Chat";
// import { getRowHeight } from "./get-chat-message-container-size";
import InfiniteLoader from "./infinite-loader";
import { clearAllBodyScrollLocks } from "body-scroll-lock";

export interface IChatHistoryStateObject {
  text: string;
  height: number;
}

// interface IScrollToLastRowProps {
//   listRef: any;
//   state: any;
// }

// const scrollToLastRow = ({ listRef, state }: IScrollToLastRowProps) => {
//   if (listRef && listRef.current && state.listLength) {
//     listRef.current.scrollToItem(state.listLength, "center");
//     return;
//   }
//   if (!listRef.current) {
//     console.log("no ref is set dummy");
//   }
//   return;
// };

// interface IRowProps {
//   index: number;
//   style: any;
//   data: any;
// }

// const Row = ({ index, data, style }: IRowProps) => {
//   return (
//     <MessageBox
//       pageInfo={data.pageInfo}
//       threadId={data.threadId}
//       fetchMoreGetMessagesByThreadId={data.fetchMoreGetMessagesByThreadId}
//       key={`${index}-${data.itemData[index].node.id}-${data.itemData[index].node.__typename}`}
//       allData={data.itemData[index]}
//       type={data.itemData[index].__typename}
//       message={data.itemData[index].node.message}
//       sentBy={data.itemData[index].node.sentBy}
//       createdAt={data.itemData[index].node.created_at}
//       images={data.itemData[index].node.images}
//       me={data.me.id}
//       handleRemoveInviteeToThread={data.handleRemoveInviteeToThread}
//       handleToggleImageModal={data.handleToggleImageModal}
//       style={style}
//       imageModalState={data.imageModalState}
//       itemIndex={index}
//     />
//   );
// };

interface IMessagesWindowProps {
  data: any;
  handleDisplayMessages: any;
  loadingGetMessagesByThreadId: any;
  // handleThreadSelection: any;
  handleCloseThread: any;
  me: any;
  subscribeToMore: any;
  threadIdSelected: string;
  fetchMoreGetMessagesByThreadId: any;
}

// interface IMessageDimensions {
//   height: number;
//   width: number;
// }

type TImageModalState = "open" | "closed";

interface IMessageWindowState {
  listLength: number | null;
  chatHistory: IChatHistoryStateObject[];
  warning: string;
  imageModal: TImageModalState;
  dimensions: any;
  fetchedPrevious: boolean;
  keepHeight: number;
  initialMeasurement: number;
  initialMeasurementHappened: boolean;
  modalImages: any[];
  selectedItemIndex: number;
}

// const WARNING = {
//   noHistory:
//     "warning: there is no chat history (chatHistoryRef.current is null)",
//   noListRef: "warning: there is no list present (noListRef.current is null)"
// };

class MessagesWindow extends React.Component<
  IMessagesWindowProps,
  IMessageWindowState
> {
  listRef: React.RefObject<VariableSizeList>;
  messageHistoryRef: React.RefObject<VariableSizeList>;
  _lastElem: HTMLDivElement | null;
  constructor(props: IMessagesWindowProps) {
    super(props);

    this.listRef = React.createRef();
    this.messageHistoryRef = React.createRef();

    // this.scrollToLastRow = this.scrollToLastRow.bind(this);

    this.handleToggleImageModal = this.handleToggleImageModal.bind(this);

    this._lastElem = null;

    this.state = {
      listLength: null,
      chatHistory: [],
      warning: "",
      imageModal: "closed",
      fetchedPrevious: false,
      initialMeasurement: -1,
      initialMeasurementHappened: false,
      keepHeight: -1,
      modalImages: [],
      selectedItemIndex: -1,
      dimensions: {
        height: -1,
        width: -1
      }
    };
  }

  handleToggleImageModal(imageIndex: number) {
    this.setState(prevState => {
      return {
        imageModal: prevState.imageModal === "open" ? "closed" : "open",
        selectedItemIndex: imageIndex
      };
    });
  }

  closeImageModal() {
    this.setState(() => {
      return {
        imageModal: "closed"
      };
    });
  }

  openImageModal() {
    clearAllBodyScrollLocks();
    this.setState(() => {
      return {
        imageModal: "open"
      };
    });
  }

  componentDidMount() {
    this.setState({
      listLength: this.props.data.edges.length
    });

    this.props.subscribeToMore({
      document: MESSAGE_THREADS,
      variables: {
        data: {
          threadId: this.props.threadIdSelected,
          sentTo: "0a8c2ccf-114f-4c3f-99b0-07d83bc668e5",
          message: "hi bob",
          invitees: [
            "0a8c2ccf-114f-4c3f-99b0-07d83bc668e5",
            "5102bae2-5000-42f1-986a-58e8f8506971"
          ]
        }
      },

      updateQuery: (prev: any, { subscriptionData }: any) => {
        let returnObj = Object.assign({}, prev, {
          // @ts-ignore
          getMessagesByThreadId: {
            pageInfo: {
              ...prev.getMessagesByThreadId.pageInfo
            },
            edges: [
              // @ts-ignore
              ...prev.getMessagesByThreadId.edges,
              {
                node: subscriptionData.data.messageThreads.message,
                __typename: "MessageEdge"
              }
            ],
            __typename: {
              ...prev.getMessagesByThreadId.__typename
            }
          }
        });

        return returnObj;
      }
    });
  }

  render() {
    const {
      data,
      loadingGetMessagesByThreadId,
      fetchMoreGetMessagesByThreadId,
      me,
      threadIdSelected
    } = this.props;

    // const { width } = this.state.dimensions;
    // const className = classNames(width < 400 && "small-width-modifier");

    const loadingRow = {
      node: {
        last_message: "Load older messages",
        sentBy: {
          id: "fake"
        },
        message: "loading row"
      },
      __typename: "LoadingIndicator"
    };

    const { pageInfo } = data;

    // Array of items loaded so far.
    const items = pageInfo.hasPreviousPage
      ? [loadingRow, ...data.edges]
      : data.edges;

    const initialScrollY = 182 * items.length;

    // const itemsTotalHeight =
    //   items
    //     .map((item: any, index: number) => {
    //       let showRowHeight = getRowHeight({
    //         text:
    //           item && index !== 0 ? item.node.message : item.node.last_message,
    //         attributes: "",
    //         className: "fakeClass",
    //         created_at: item.node.created_at,
    //         // data: allItems,
    //         images: item.node.images,
    //         itemIndex: index
    //       });
    //       return showRowHeight;
    //     })
    //     .reduce((a: number, b: number) => a + b, 0) - 1;

    console.log("initialScrollY EQUALSSSSSSS\n", {
      initialScrollY
      // itemsTotalHeight
    });

    const { imageModal } = this.state;

    const pose = imageModal === "open" ? "zoom" : "init";
    return (
      <Flex flexDirection="column" width={1} flex="1 1 auto">
        <Frame
          pose={pose}
          onClick={() => this.closeImageModal()}
          className="frame"
          style={{
            // backgroundColor: isZoomed ? "rgba(255,255,255,0.5)" : "transparent"
            backgroundColor: "rgba(255,255,255,1)",
            width: "100%",
            height: "100%",
            zIndex: 9999,
            display: "flex",
            flexWrap: "wrap",
            overflow: "hidden",
            alignContent: "flex-start"
          }}
        >
          {items &&
            items[this.state.selectedItemIndex] &&
            items[this.state.selectedItemIndex].node.images &&
            items[this.state.selectedItemIndex].node.images.length > 0 &&
            items[this.state.selectedItemIndex].node.images.map(
              (image: any) => (
                // <img
                //   src={image.uri}
                //   style={{
                //     display: imageModal === "open" ? "block" : "none",
                //     maxWidth: "250px"
                //   }}
                // />
                <Image
                  key={image.uri}
                  src={image.uri}
                  width={["50%"]}
                  maxHeight="150px"
                  sx={{
                    maxHeight: "150px"
                  }}
                  // sx={{
                  //   width: ["50%"]
                  // }}
                  style={{
                    maxHeight: "250px",
                    maxWidth: "250px"
                  }}
                />
              )
            )}
        </Frame>

        <InfiniteLoader
          imageModalState={this.state.imageModal}
          loadingGetMessagesByThreadId={loadingGetMessagesByThreadId}
          toggleImageModal={this.handleToggleImageModal}
          items={items}
          pageInfo={pageInfo}
          me={me}
          fetchMore={() =>
            fetchMoreGetMessagesByThreadId({
              variables: {
                input: {
                  threadId: threadIdSelected,
                  skip: 0,
                  take: 15,
                  cursor: pageInfo.endCursor
                }
              },

              updateQuery: (prev: any, { fetchMoreResult }: any) => {
                if (!fetchMoreResult) return prev;

                // return;
                let returnObj = Object.assign({}, prev, {
                  // @ts-ignore
                  getMessagesByThreadId: {
                    pageInfo: {
                      ...prev.getMessagesByThreadId.pageInfo,
                      endCursor:
                        fetchMoreResult.getMessagesByThreadId.pageInfo
                          .endCursor,
                      hasPreviousPage:
                        fetchMoreResult.getMessagesByThreadId.pageInfo
                          .hasPreviousPage
                    },
                    edges: [
                      ...fetchMoreResult.getMessagesByThreadId.edges,
                      ...prev.getMessagesByThreadId.edges
                    ],
                    __typename: {
                      ...prev.getMessagesByThreadId.__typename
                    }
                  }
                });

                return returnObj;
              }
            })
          }
        />
      </Flex>
    );
  }
}

export default MessagesWindow;
