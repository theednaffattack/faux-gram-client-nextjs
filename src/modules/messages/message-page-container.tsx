import React from "react";

import Messages from "./messages-data-fetching";

export interface IMessagePageContainerProps {
  title?: string;
}

export interface IMessagePageContainerState {
  sidebarStatus: string;
  showMessagingAddressBook: boolean;
}

export default class MessagePageContainer extends React.Component<
  IMessagePageContainerProps,
  IMessagePageContainerState
> {
  constructor(props: IMessagePageContainerProps) {
    super(props);

    this.handleCreateNewMessageThread = this.handleCreateNewMessageThread.bind(
      this
    );
    this.handleCancelNewMessageThread = this.handleCancelNewMessageThread.bind(
      this
    );

    this.handleLoadNewThreadCreated = this.handleLoadNewThreadCreated.bind(
      this
    );

    this.state = {
      sidebarStatus: "closed",
      showMessagingAddressBook: false
    };
  }

  handleCreateNewMessageThread() {
    this.setState(prevState => {
      return {
        showMessagingAddressBook: !prevState.showMessagingAddressBook
      };
    });
  }

  handleCancelNewMessageThread() {
    this.setState({
      showMessagingAddressBook: false
    });
  }

  handleLoadNewThreadCreated() {
    this.setState({
      showMessagingAddressBook: false
    });
  }

  public render() {
    return (
      <Messages
        handleCancelNewMessageThread={this.handleCancelNewMessageThread}
        handleCreateNewMessageThread={this.handleCreateNewMessageThread}
        handleLoadNewThreadCreated={this.handleLoadNewThreadCreated}
        showMessagingAddressBook={false}
      />
    );
  }
}
