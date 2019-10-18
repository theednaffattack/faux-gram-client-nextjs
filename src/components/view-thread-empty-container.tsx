import React from "react";
import { AbFlex } from "./styled-rebass";
import { Flex } from "rebass";

function ViewThreadEmptyContainer() {
  return (
    <div>
      <AbFlex
        top={0}
        // right={0}
        bottom={0}
        // left={0}
        bg="black"
        color="thread_text"
        position="absolute"
        width={[1, 1, 1]}
        flexDirection="column"
        border="2px yellow solid"
        // height="100%"
        flex="1 1 auto"
        // overflow="hidden"
        // style={{
        //   overflow: "hidden"
        // }}
      >
        <Flex
          bg="white"
          flex="1 1 auto"
          width={[1, 1, 1]}
          // style={{
          //   overflow: "hidden"
          // }}
        >
          hey so there's nothing
          {/* <ThreadBody
            data={data}
            selectedThreadIndex={this.state.selectedThread}
            handleThreadMenuClick={this.handleThreadMenuClick}
            handleThreadSelection={this.handleThreadSelection}
            selectedThread={this.state.selectedThread}
            handleThreadAddThreadClick={this.handleThreadAddThreadClick}
          />

          <ChatBody
            loadingMessageThreads={this.props.loading}
            dataMessageThreads={this.props.data}
            chatEmoji={this.state.chatEmoji}
            chatInput={this.state.chatInput}
            selectedThreadIndex={this.state.selectedThread}
            selectedThreadId={
              (this.state.selectedThread === 0 &&
                this.props.data.getMessageThreads) ||
              (this.state.selectedThread != null &&
                this.props.data.getMessageThreads)
                ? this.props.data.getMessageThreads[
                    this.state.selectedThread || 100
                  ].id
                : null
            }
            showMessagingAddressBook={this.state.showMessagingAddressBook}
            handleThreadAddThreadClick={this.handleThreadAddThreadClick}
            disabled={
              this.state.selectedThread === 0 ||
              this.state.newThreadInvitees.length > 0 ||
              this.state.selectedThread
                ? false
                : true
            }
            newThreadDisabled={
              this.state.newThreadInvitees.length > 0 ? false : true
            }
            emojiPickerVisible={this.state.emojiPickerVisible}
            handleChatMenuClick={this.handleChatMenuClick}
            handleAddInviteeToThread={this.handleAddInviteeToThread}
            handleRemoveInviteeToThread={this.handleRemoveInviteeToThread}
            newThreadInvitees={this.state.newThreadInvitees}
            me={this.props.me}
            handleEngageMicrophoneClick={this.handleEngageMicrophoneClick}
            handleOpenEmojiMenuClick={this.handleOpenEmojiMenuClick}
            handleSelectEmojiClick={this.handleSelectEmojiClick}
            handleChatFieldChange={this.handleChatFieldChange}
            handleThreadSelection={this.handleThreadSelection}
            handleUploadFileClick={this.handleUploadFileClick}
            messagesEndRef={this.messagesEnd}
          /> */}
        </Flex>
      </AbFlex>
    </div>
  );
}

export default ViewThreadEmptyContainer;
