import React, { Component } from "react";
import { clearAllBodyScrollLocks } from "body-scroll-lock";
import dynamic from "next/dynamic";

import { Flex } from "./styled-rebass";
// import ChatForm from "./chat-form";
// import {
//   SignS3Component,
//   GetMessagesByThreadIdComponent
// } from "./generated/apollo-graphql";
import ThreadWindow from "./threads-user-window";
// import MessagesWindow from "./messages-user-window";
// import AddressBookMutationOLD from "./address-book-mutation";

const AddressBookMutation = dynamic({
  loader: () => import("./address-book-mutation"),
  loading: () => <p>Loading caused by client page transition ...</p>
});

// const { log } = console;

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
      handleCancelNewMessageThread
      // me
    } = this.props;

    // const { threadIdSelected } = this.state;

    if (errorGetOnlyThreads) {
      console.error("errorGetOnlyThreads", errorGetOnlyThreads);
      return <Flex>{JSON.stringify(errorGetOnlyThreads)}</Flex>;
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
        // Show a progress indicator while loading
        // <DynamicComponent2WithCustomLoading />

        <AddressBookMutation
          newThreadInvitees={this.state.newThreadInvitees}
          handleAddInviteeToThread={this.handleAddInviteeToThread}
          handleRemoveInviteeToThread={this.handleRemoveInviteeToThread}
          handleLocalCancelNewThread={this.handleLocalCancelNewThread}
          handleCancelNewMessageThread={handleCancelNewMessageThread}
          handleStartNewThread={this.handleStartNewThread}
        />
      );
    }

    return <div>how weird</div>;
  }
}
