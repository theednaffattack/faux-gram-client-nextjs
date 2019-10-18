import React, { Component } from "react";

interface IMountedProofProps {
  handleUpdateMessageState: any;
  handleSetLastMessage: any;
  handleSetLastMessenger: any;
  lastMessage: string;
  lastMessenger: any;
  lastMessageValue: string;
  lastMessengerValue: any;
}

export default class MountedProof extends Component<
  IMountedProofProps,
  object
> {
  componentDidMount() {
    this.props.handleUpdateMessageState();
    this.props.handleSetLastMessage();
    this.props.handleSetLastMessenger(this.props.lastMessenger);
  }
  render() {
    return (
      <div>
        {" "}
        .{this.props.lastMessenger.firstName}
        {this.props.lastMessage}
      </div>
    );
  }
}
