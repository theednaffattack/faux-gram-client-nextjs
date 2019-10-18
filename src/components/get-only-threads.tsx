import React, { Component } from "react";
import { clearAllBodyScrollLocks } from "body-scroll-lock";

import {
  GetMessagesByThreadIdComponent
  // GetOnlyThreadsQuery,
  // GetOnlyThreadsQueryVariables
} from "./generated/apollo-graphql";
import { Button, Flex, Icon, AbFlex } from "./styled-rebass";
import ChatForm from "./chat-form";
import { SignS3Component } from "./generated/apollo-graphql";
import ThreadWindow from "./threads-user-window";
import MessagesWindow from "./messages-user-window";
import AddressBookMutation from "./address-book-mutation";

const { log } = console;

// interface IShowThreadsProps {
//   data: any;
//   handleDisplayMessages: any;
//   handleRemoveInviteeToThread: any;
// }

// const ShowThreads: React.FC<IShowThreadsProps> = ({
//   data,
//   handleDisplayMessages,
//   handleRemoveInviteeToThread
// }) =>
//   data.getOnlyThreads.map((thread: any, index: number) => (
//     <Flex key={index} flexDirection="column" width={1}>
//       <Flex>
//         {thread.invitees.map((person: any, index: number) => (
//           <UserProfileImage
//             key={`${index}-${person.typename}`}
//             isMe={true}
//             flexInstruction="column"
//             user={person}
//             buttonThing={false}
//             color="blue"
//             handleRemoveInviteeToThread={handleRemoveInviteeToThread}
//           />
//         ))}

//         <Button
//           type="button"
//           onClick={(event: React.MouseEvent) => {
//             handleDisplayMessages(thread.id);
//           }}
//         >
//           View messages
//         </Button>
//       </Flex>
//     </Flex>
//   ));

interface IGetOnlyThreadsProps {
  me: any;
  dataGetOnlyThreads: any;
  errorGetOnlyThreads: any;
  loadingGetOnlyThreads: any;
  showMessagingAddressBook: boolean;
  handleCreateNewMessageThread: any;
  handleCancelNewMessageThread: any;
  handleLoadNewThreadCreated: any;
  fetchMoreGetOnlyThreads: any;
}

interface IGetOnlyThreadsState {
  displayMessages: boolean;
  threadIdSelected: string | null;
  messagesMounted: boolean;

  displayCreateThread: boolean;

  emojiPickerVisible: boolean;
  chatInput: string;
  chatEmoji: string;
  showMessagingAddressBook: boolean;
  newThreadInvitees: any[];

  disabled: boolean;
  newThreadDisabled: boolean;

  lastMessage: string;
  lastMessenger: any;
}
interface IMessengerProps {
  id: string;
  firstName: string;
  lastName: string;
  __typename: string;
}

export default class GetOnlyThreads extends Component<
  IGetOnlyThreadsProps,
  IGetOnlyThreadsState
> {
  targetRef: React.RefObject<HTMLDivElement>;
  messagesEnd: React.RefObject<HTMLDivElement>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  targetElement: any;
  targetScrollToElement: any;
  setTextInputRef: any;

  constructor(props: any) {
    super(props);

    this.targetRef = React.createRef();
    this.messagesEnd = React.createRef();
    this.fileInputRef = React.createRef();

    this.targetElement = null;
    this.targetScrollToElement = null;

    this.handleAddInviteeToThread = this.handleAddInviteeToThread.bind(this);

    this.handleCloseThread = this.handleCloseThread.bind(this);
    this.handleDisplayMessages = this.handleDisplayMessages.bind(this);

    this.handleSetLastMessage = this.handleSetLastMessage.bind(this);
    this.handleSetLastMessenger = this.handleSetLastMessenger.bind(this);

    this.handleOpenEmojiMenuClick = this.handleOpenEmojiMenuClick.bind(this);
    this.handleRemoveInviteeToThread = this.handleRemoveInviteeToThread.bind(
      this
    );
    this.handleUpdateMessageState = this.handleUpdateMessageState.bind(this);
    // this.handleCancelNewThread = this.handleCancelNewThread.bind(this);
    this.handleLocalCancelNewThread = this.handleLocalCancelNewThread.bind(
      this
    );

    this.handleStartNewThread = this.handleStartNewThread.bind(this); // I think this ws supposed to be the function below

    this.handleThreadSelection = this.handleThreadSelection.bind(this);

    this.state = {
      displayMessages: false,
      threadIdSelected: null,
      messagesMounted: false,

      displayCreateThread: false,

      emojiPickerVisible: false,
      chatInput: "",
      chatEmoji: "",
      showMessagingAddressBook: false,
      newThreadInvitees: [],
      disabled: false,
      newThreadDisabled: false,
      lastMessage: "",
      lastMessenger: ""
    };
  }

  handleSetLastMessage(message: string) {
    this.setState({
      lastMessage: message
    });
  }

  handleSetLastMessenger({
    id,
    firstName,
    lastName,
    __typename
  }: IMessengerProps) {
    this.setState({
      lastMessenger: {
        id,
        firstName,
        lastName,
        __typename
      }
    });
  }

  // FENCE

  handleThreadSelection({ threadId }: any) {
    // const { data } = this.props;
    // const selectedThreadIndex = this.props.data.getMessageThreads[
    //   selection.index
    // ];

    this.props.handleLoadNewThreadCreated({ threadId });

    this.setState(() => ({
      threadIdSelected: threadId,
      showMessagingAddressBook: false,
      newThreadInvitees: [],
      displayMessages: true
    }));
  }

  handleStartNewThread() {
    this.setState({
      showMessagingAddressBook: false,
      displayCreateThread: true,
      displayMessages: false
    });
  }

  handleAddInviteeToThread({ user }: any) {
    this.setState(prevState => {
      if (prevState.newThreadInvitees.includes(user)) {
        return {
          newThreadInvitees: prevState.newThreadInvitees
        };
      }
      return {
        newThreadInvitees: prevState.newThreadInvitees.concat(user)
      };
    });
  }

  handleRemoveInviteeToThread({ user }: any) {
    this.setState(prevState => ({
      newThreadInvitees: prevState.newThreadInvitees.filter(invitee => {
        return invitee.id !== user.id;
      })
    }));
  }

  handleThreadAddThreadClick() {
    this.setState(prevState => ({
      showMessagingAddressBook: !prevState.showMessagingAddressBook,
      threadIdSelected: null
    }));
  }

  handleLocalCancelNewThread() {
    this.props.handleCancelNewMessageThread();

    this.setState(() => ({
      showMessagingAddressBook: false,
      threadIdSelected: null,
      newThreadInvitees: []
    }));
  }

  handleOpenEmojiMenuClick() {
    this.setState(prevState => ({
      emojiPickerVisible: !prevState.emojiPickerVisible
    }));
  }

  // FENCE

  scrollToBottom = () => {
    this.targetScrollToElement.current.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };

  // showTargetElement = () => {
  //   // ... some logic to show target element

  //   // 4. Disable body scroll
  //   if (this.targetElement !== null) {
  //     disableBodyScroll(this.targetElement);
  //   }
  // };

  // hideTargetElement = () => {
  //   // ... some logic to hide target element

  //   // 5. Re-enable body scroll
  //   if (this.targetElement !== null) {
  //     enableBodyScroll(this.targetElement);
  //   }
  // };

  handleDisplayMessages(threadId: string) {
    this.setState(() => {
      return {
        displayMessages: true,
        threadIdSelected: threadId
      };
    });
  }

  handleCloseThread() {
    this.setState(() => {
      return {
        displayMessages: false,
        threadIdSelected: null
      };
    });
  }

  handleUpdateMessageState() {
    this.setState({
      messagesMounted: true
    });
  }

  componentDidMount() {
    // 3. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
    // Specifically, the target element is the one we would like to allow scroll on (NOT a parent of that element).
    // This is also the element to apply the CSS '-webkit-overflow-scrolling: touch;' if desired.

    // this.targetElement = this.targetRef;

    // disableBodyScroll(this.targetElement);

    if (this.messagesEnd.current) {
      this.targetScrollToElement = this.messagesEnd;

      this.scrollToBottom();
    }
  }

  componentDidUpdate(
    // @ts-ignore
    prevProps: IGetOnlyThreadsProps,
    prevState: IGetOnlyThreadsState
  ) {
    if (
      this.state.displayMessages !== prevState.displayMessages &&
      this.messagesEnd.current
    ) {
      this.scrollToBottom();
    }

    if (
      this.state.messagesMounted !== prevState.messagesMounted &&
      this.messagesEnd.current
    ) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    // 5. Useful if we have called disableBodyScroll for multiple target elements,
    // and we just want a kill-switch to undo all that.
    // OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
    // clicks a link which takes him/her to a different page within the app.
    clearAllBodyScrollLocks();
  }

  render() {
    const {
      dataGetOnlyThreads,
      errorGetOnlyThreads,
      loadingGetOnlyThreads,
      showMessagingAddressBook,
      handleCancelNewMessageThread,
      me
    } = this.props;

    const { threadIdSelected } = this.state;

    if (errorGetOnlyThreads) {
      return <Flex>{errorGetOnlyThreads}</Flex>;
    }

    if (loadingGetOnlyThreads) {
      return <Flex>loading...</Flex>;
    }

    if (
      !this.state.displayMessages &&
      this.state.threadIdSelected === null &&
      dataGetOnlyThreads &&
      showMessagingAddressBook === false &&
      this.state.newThreadInvitees.length === 0
    ) {
      return (
        <ThreadWindow
          loadingGetOnlyThreads={this.props.loadingGetOnlyThreads}
          data={dataGetOnlyThreads.getOnlyThreads}
          showMessagingAddressBook={this.props.showMessagingAddressBook}
          handleDisplayMessages={this.handleDisplayMessages}
          // handleThreadAddThreadClick={this.handleThreadAddThreadClick}
          // handleRemoveInviteeToThread={this.handleRemoveInviteeToThread}
          handleThreadSelection={this.handleThreadSelection}
          fetchMoreGetOnlyThreads={this.props.fetchMoreGetOnlyThreads}
          isNextPageLoading={this.props.loadingGetOnlyThreads}
          hasNextPage={dataGetOnlyThreads.getOnlyThreads.pageInfo.hasNextPage}
          hasPreviousPage={
            dataGetOnlyThreads.getOnlyThreads.pageInfo.hasPreviousPage
          }
        />
      );
    }

    if (
      this.state.displayMessages === false &&
      this.state.threadIdSelected === null &&
      showMessagingAddressBook === true &&
      this.state.displayCreateThread === false
    ) {
      return (
        <AddressBookMutation
          newThreadInvitees={this.state.newThreadInvitees}
          handleAddInviteeToThread={this.handleAddInviteeToThread}
          handleRemoveInviteeToThread={this.handleRemoveInviteeToThread}
          handleLocalCancelNewThread={this.handleLocalCancelNewThread}
          handleCancelNewMessageThread={handleCancelNewMessageThread}
          handleStartNewThread={this.handleStartNewThread}
          // dataMessageThreads={dataGetOnlyThreads.getOnlyThreads}
          // selectedThreadIndex={this.state.threadIdSelected}
          // data={dataGetOnlyThreads.getOnlyThreads}
          // showMessagingAddressBook={this.props.showMessagingAddressBook}
          // handleDisplayMessages={this.handleDisplayMessages}
          // handleThreadAddThreadClick={this.handleThreadAddThreadClick}
          // handleRemoveInviteeToThread={this.handleRemoveInviteeToThread}
        />
      );
    }

    if (
      this.state.displayMessages === false &&
      // this.state.threadIdSelected === null &&
      // showMessagingAddressBook === false &&
      // this.state.newThreadInvitees.length > 0 &&
      this.state.displayCreateThread === true
    ) {
      return (
        <Flex
          flexDirection="column"
          alignItems="space-between"
          width={1}
          id="isItMe"
          style={{ overflowY: "hidden", overflowX: "hidden" }}
        >
          <Button
            ml="auto"
            key="justAButton"
            type="button"
            onClick={this.handleCloseThread}
          >
            <Icon name="triangleLeft" fill="white" size="1.5em" /> Back to
            Threads
          </Button>

          <Flex
            flex="1 1 auto"
            style={{
              position: "relative"
            }}
          >
            Type a message to get started
            <AbFlex position="absolute" bottom={0} width={[1]}>
              <SignS3Component>
                {(
                  signS3,
                  {
                    data: dataSignS3,
                    error: errorSignS3,
                    loading: loadingSignS3
                  }
                ) => {
                  if (errorSignS3) return <div>{errorSignS3}</div>;
                  if (loadingSignS3) return <div>loading</div>;
                  if (dataSignS3) {
                    return (
                      <div>
                        Sign S3 stuff{" "}
                        <button type="button" onClick={() => signS3}>
                          blah button
                        </button>
                      </div>
                    );
                  }
                  return (
                    <ChatForm
                      handleChatFieldChange={() => log("handleChatFieldChange")}
                      handleUploadFileClick={() => log("handleUploadFile")}
                      handleThreadSelection={this.handleThreadSelection}
                      chatEmoji=""
                      disabled={this.state.disabled}
                      emojiPickerVisible={this.state.emojiPickerVisible}
                      files={[]}
                      handleSetLastMessenger={this.handleSetLastMessenger}
                      handleOpenEmojiMenuClick={this.handleOpenEmojiMenuClick}
                      handleEngageMicrophoneClick={() => console.log}
                      handleSetLastMessage={this.handleSetLastMessage}
                      key="someOtherKey"
                      newThreadInvitees={this.state.newThreadInvitees}
                      newThreadDisabled={this.state.newThreadDisabled}
                      selectedThreadId={
                        threadIdSelected ? threadIdSelected : ""
                      }
                      sentTo={""}
                      signS3Mutation={signS3}
                      threadId={threadIdSelected ? threadIdSelected : ""}
                    />
                  );
                }}
              </SignS3Component>
            </AbFlex>
          </Flex>
        </Flex>
      );
    }

    if (this.state.displayMessages && this.state.threadIdSelected) {
      return (
        <>
          <GetMessagesByThreadIdComponent
            // notifyOnNetworkStatusChange
            variables={{
              input: {
                threadId: this.state.threadIdSelected,
                skip: 0,
                take: 15
              }
            }}
          >
            {({
              data,
              error,
              fetchMore: fetchMoreGetMessagesByThreadId,
              loading: loadingGetMessagesByThreadId,
              subscribeToMore
            }) => {
              // const lastMessengerHere =
              //   data.getMessagesByThreadId[
              //     data.getMessagesByThreadId.length - 1
              //   ].sentBy;
              if (error) return <div>{error}</div>;
              if (loadingGetMessagesByThreadId)
                return <div>loading MESSAGES BY THREAD ID...</div>;
              if (data) {
                return (
                  <Flex
                    flexDirection="column"
                    alignItems="space-between"
                    width={1}
                    id="isItMe"
                    style={{ overflowY: "hidden", overflowX: "hidden" }}
                  >
                    <Button
                      ml="auto"
                      key="justAButton"
                      type="button"
                      onClick={this.handleCloseThread}
                    >
                      <Icon name="triangleLeft" fill="white" size="1.5em" />{" "}
                      Back to Threads
                    </Button>
                    {/* {JSON.stringify(data.getMessagesByThreadId)} */}
                    <Flex
                      flex="1 1 auto"
                      border="lime"
                      style={{ position: "relative" }}
                    >
                      {showMessagingAddressBook === false ? (
                        <MessagesWindow
                          data={data.getMessagesByThreadId}
                          me={me}
                          handleDisplayMessages={this.handleDisplayMessages}
                          subscribeToMore={subscribeToMore}
                          threadIdSelected={threadIdSelected || ""}
                          loadingGetMessagesByThreadId={
                            loadingGetMessagesByThreadId
                          }
                          fetchMoreGetMessagesByThreadId={
                            fetchMoreGetMessagesByThreadId
                          }
                          // handleRemoveInviteeToThread={
                          //   this.handleRemoveInviteeToThread
                          // }
                          handleCloseThread={this.handleCloseThread}
                        />
                      ) : (
                        ""
                      )}
                    </Flex>
                    {/* <Flex> */}
                    <SignS3Component>
                      {signS3 => {
                        // success: boolean;
                        // threadId: string;
                        // message: Message;
                        // user: User;
                        // invitees: User[];
                        if (
                          data !== null &&
                          data.getMessagesByThreadId &&
                          data.getMessagesByThreadId.edges.length > 0
                        ) {
                          let blahBy =
                            data.getMessagesByThreadId.edges[
                              data.getMessagesByThreadId.edges.length - 1
                            ];

                          let userIdForComparison = blahBy
                            ? blahBy.node.user.id
                            : "it's null";
                          let sentByIdForComparison = blahBy
                            ? blahBy.node.sentBy.id
                            : "it's null";

                          let sentToWinner =
                            userIdForComparison === this.props.me
                              ? sentByIdForComparison
                              : userIdForComparison;

                          return (
                            <ChatForm
                              chatEmoji=""
                              disabled={this.state.disabled}
                              emojiPickerVisible={this.state.emojiPickerVisible}
                              files={[]}
                              handleChatFieldChange={() =>
                                log("handleChatFieldChange")
                              }
                              handleUploadFileClick={() =>
                                log("handleUploadFile")
                              }
                              handleThreadSelection={this.handleThreadSelection}
                              handleSetLastMessenger={
                                this.handleSetLastMessenger
                              }
                              handleOpenEmojiMenuClick={
                                this.handleOpenEmojiMenuClick
                              }
                              handleEngageMicrophoneClick={() => log}
                              handleSetLastMessage={this.handleSetLastMessage}
                              key="someKey"
                              newThreadInvitees={[]}
                              newThreadDisabled={this.state.newThreadDisabled}
                              selectedThreadId={
                                threadIdSelected ? threadIdSelected : ""
                              }
                              sentTo={sentToWinner}
                              signS3Mutation={signS3}
                              threadId={
                                threadIdSelected ? threadIdSelected : ""
                              }
                            />
                          );
                        } else {
                          return <div>null</div>;
                        }
                      }}
                    </SignS3Component>
                    {/* </Flex> */}
                  </Flex>
                );
              } else {
                return <div>Essentially null</div>;
              }
            }}
          </GetMessagesByThreadIdComponent>
        </>
      );
    }
    return <div>how weird</div>;
  }
}
