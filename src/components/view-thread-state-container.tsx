import React from "react";

import { AbFlex, Flex } from "./styled-rebass";
import { MESSAGE_THREADS } from "../graphql/user/subscriptions/MessageThreads";
// import { User } from "../src/components/generated/apollo-graphql";

export interface IViewThreadStateContainerProps {
  data: any;
  loading: any;
  error: any;
  subscribeToMore: any;
  // threadIdList: string[];
  me: any;
}

export interface IViewThreadStateContainerState {
  selectedThread: number | null;
  myThreadId: string;
  emojiPickerVisible: boolean;
  chatInput: string;
  chatEmoji: string;
  showMessagingAddressBook: boolean;
  newThreadInvitees: string[];
  selectedThreadId: string;
}

export class ViewThreadStateContainer extends React.Component<
  IViewThreadStateContainerProps,
  IViewThreadStateContainerState
> {
  messagesEnd: React.RefObject<HTMLElement>;
  constructor(props: IViewThreadStateContainerProps) {
    super(props);

    this.handleThreadSelection = this.handleThreadSelection.bind(this);
    this.handleThreadMenuClick = this.handleThreadMenuClick.bind(this);
    this.handleThreadAddThreadClick = this.handleThreadAddThreadClick.bind(
      this
    );
    this.handleUploadFileClick = this.handleUploadFileClick.bind(this);
    this.handleChatMenuClick = this.handleChatMenuClick.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleOpenEmojiMenuClick = this.handleOpenEmojiMenuClick.bind(this);
    this.handleAddInviteeToThread = this.handleAddInviteeToThread.bind(this);
    this.handleRemoveInviteeToThread = this.handleRemoveInviteeToThread.bind(
      this
    );

    this.handleSelectEmojiClick = this.handleSelectEmojiClick.bind(this);
    this.handleChatFieldChange = this.handleChatFieldChange.bind(this);

    this.messagesEnd = React.createRef();
  }
  state = {
    selectedThread: 0,
    myThreadId: "97798d95-04d9-4147-8913-30b7124abc95",
    emojiPickerVisible: false,
    chatInput: "",
    chatEmoji: "",
    showMessagingAddressBook: false,
    newThreadInvitees: [],
    selectedThreadId: ""
  };

  handleSelectEmojiClick() {}

  handleChatFieldChange() {}

  handleThreadSelection(selection: any) {
    // const { data } = this.props;
    // const selectedThreadIndex = this.props.data.getMessageThreads[
    //   selection.index
    // ];

    this.setState(prevState => ({
      selectedThread: selection.index,
      showMessagingAddressBook: !prevState.showMessagingAddressBook,
      newThreadInvitees: []
    }));
  }

  handleAddInviteeToThread({ user }: any) {
    this.setState(prevState => ({
      newThreadInvitees: prevState.newThreadInvitees.concat(user)
    }));
  }

  handleRemoveInviteeToThread({ user }: any) {
    this.setState(prevState => ({
      newThreadInvitees: prevState.newThreadInvitees.filter(invitee => {
        return invitee !== user.id;
      })
    }));
  }

  handleThreadAddThreadClick() {
    this.setState(prevState => ({
      showMessagingAddressBook: !prevState.showMessagingAddressBook,
      selectedThread: null
    }));
  }

  handleOpenEmojiMenuClick() {
    this.setState(prevState => ({
      emojiPickerVisible: !prevState.emojiPickerVisible
    }));
  }

  scrollToBottom = () => {
    if (this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
      return;
    }
    return;
  };

  handleThreadMenuClick() {
    console.log("handleThreadMenuClick");
  }

  handleUploadFileClick() {
    console.log("handleUploadFileClick");
  }

  handleEngageMicrophoneClick() {
    console.log("handleEngageMicrophoneClick");
  }

  handleChatMenuClick() {
    console.log("handleChatMenuClick");
  }

  componentDidMount() {
    let threadIdList;
    if (!this.props.loading && this.props.data.getMessageThreads) {
      this.setState({
        selectedThreadId: this.props.data.getMessageThreads[0].id
      });
      threadIdList = this.props.data.getMessageThreads.map(
        (thread: any) => thread.id
      );
      threadIdList.map((threadIdThing: any) =>
        this.props.subscribeToMore(
          // subscribeToMore(
          {
            document: MESSAGE_THREADS,
            variables: {
              data: {
                threadId: threadIdThing,
                sentTo: "0a8c2ccf-114f-4c3f-99b0-07d83bc668e5",
                message: "hi bob",
                invitees: [
                  "0a8c2ccf-114f-4c3f-99b0-07d83bc668e5",
                  "5102bae2-5000-42f1-986a-58e8f8506971"
                ]
              }
            },
            updateQuery: (prev: any, { subscriptionData }: any) => {
              if (!subscriptionData.data) return prev;

              let newMessageThreads = [...prev.getMessageThreads].map(
                (messageThread: any) => {
                  // do stuff

                  let messageThreadTrans = messageThread;
                  if (threadIdThing === messageThread.id) {
                    messageThreadTrans.messages.push(
                      subscriptionData.data.messageThreads.message
                    );
                  }
                  return messageThreadTrans;
                }
              );
              if (!newMessageThreads) {
                throw Error("No message threads in previous cache!");
              }

              let newThreadList = [
                ...prev.getMessageThreads,
                ...newMessageThreads
              ];

              // let returnObj = {
              //   getMessageThreads: [...prev.getMessageThreads, ...newThreadList]
              // };

              return { getMessageThreads: [...newThreadList] };
            }
          }
          // )
        )
      );
    }

    if (this.messagesEnd.current) {
      this.scrollToBottom();
    }
  }
  componentDidUpdate(prevProps: any) {
    if (prevProps.data !== this.props.data) {
      console.log({ oldData: prevProps.data, newData: this.props.data });
    }

    if (this.messagesEnd.current) {
      this.scrollToBottom();
    }
  }

  render() {
    const { data } = this.props;

    // let selectedIndex;
    // if (
    //   this.state.selectedThread != null &&
    //   this.props.data.getMessageThreads
    // ) {
    //   selectedIndex = this.props.data.getMessageThreads[
    //     this.state.selectedThread || 0
    //   ].id;
    // }

    return (
      <AbFlex
        top={0}
        bottom={0}
        bg="black"
        color="thread_text"
        position="absolute"
        width={[1, 1, 1]}
        flexDirection="column"
        flex="1 1 auto"
        style={{
          height: "100%"
        }}
      >
        <Flex
          bg="white"
          flex="1 1 auto"
          flexDirection="column"
          width={[1, 1, 1]}
        >
          {data.getMessageThreads.map((thread: any) => (
            <div>
              {thread.id}
              {"  :  "}
              {thread.invitees.length}
            </div>
          ))}
        </Flex>
      </AbFlex>
    );
  }
}
