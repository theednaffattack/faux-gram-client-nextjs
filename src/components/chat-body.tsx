import React from "react";

import { AbFlex, Flex, Text } from "./styled-rebass";
import { MinButton } from "./styled-rebass";
import { MenuDots } from "./menu-dots-icon";
import { MessageBox } from "./message-box";
import ChatForm from "./chat-form";
import { IChatBodyProps } from "./types";
import UserProfileImage from "./user-avatar";
import AddressBookMutation from "./address-book-mutation";
import { MessagesWindow } from "./messages-window";

const breakWidths = [1, 1, 4 / 5];
const formWidths = [1, 1, "960px"];

const ChatBody = ({
  data,
  chatEmoji,
  disabled,
  handleThreadSelection,
  handleAddInviteeToThread,
  handleRemoveInviteeToThread,
  selectedThreadId,
  selectedThreadIndex,
  showMessagingAddressBook,
  handleChatMenuClick,
  dataMessageThreads,
  me,
  handleEngageMicrophoneClick,
  handleOpenEmojiMenuClick,
  handleUploadFileClick,
  handleChatFieldChange,
  newThreadDisabled,
  messagesEndRef
}: IChatBodyProps) => {
  // const getSentby =
  //   selectedThreadIndex &&
  //   dataMessageThreads &&
  //   dataMessageThreads[selectedThreadIndex]
  //     ? dataMessageThreads[selectedThreadIndex].messages[
  //         dataMessageThreads[selectedThreadIndex].messages.length - 1
  //       ].sentBy.firstName
  //     : "";

  // const getNewInvitees =
  //   newThreadInvitees && newThreadInvitees[0]
  //     ? newThreadInvitees.map((person: any, index: number) => (
  //         <UserProfileImage
  //           handleRemoveInviteeToThread={handleRemoveInviteeToThread}
  //           key={index}
  //           color="#b2b2d8"
  //           user={person}
  //           buttonThing={true}
  //           flexInstruction="column"
  //           isMe={person}
  //         />
  //         // <Heading key={index}>
  //         //   <Icon mx={2} name="user" fill="white" size=".8em" />
  //         //   {person.firstName} {person.lastName}
  //         // </Heading>
  //       ))
  //     : "";

  return (
    // CHAT
    <Flex
      width={breakWidths}
      flexDirection="column"
      alignItems="center"
      flex="1 1 auto"
      style={{
        overflowY: "auto",
        height: "100%"
        // position: "relative"
        // position: "absolute",
        // top: 0,
        // bottom: 0,
        // right: 0
      }}
    >
      {/* <AuthenticatedHeader bg="#5d5c8d" /> */}
      <Flex flex="0 0 auto" bg="chat_header" width={1} alignItems="center">
        <Flex width={1} flexDirection="column" mr="auto">
          <Flex>
            {selectedThreadIndex
              ? dataMessageThreads.getMessageThreads[
                  selectedThreadIndex
                ].invitees.map((person: any, index: number) => (
                  <UserProfileImage
                    handleRemoveInviteeToThread={handleRemoveInviteeToThread}
                    key={index}
                    color="#b2b2d8"
                    user={person}
                    buttonThing={false}
                    flexInstruction="column"
                    isMe={true}
                  />
                ))
              : ""}{" "}
            {JSON.stringify(dataMessageThreads.getMessageThreads[0].id)}
          </Flex>

          {selectedThreadId === null ? <>some stuff</> : ""}
        </Flex>

        <MinButton
          width="58px"
          minHeight="100%"
          // px={3}
          bg="#545281"
          type="button"
          onClick={handleChatMenuClick}
        >
          <MenuDots
            name="menu"
            className="menu"
            mx="auto"
            size="2em"
            fill="rgba(255,255,255,0.6)"
          />
        </MinButton>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent={selectedThreadIndex ? "flex-end" : "center"} // HERE
        alignItems="center"
        width={[1, 1, 1]}
        flex="1 1 auto"
        bg="chat_bg"
        style={{
          overflowY: "auto"
          // position: "relative"
        }}
      >
        {selectedThreadIndex !== null &&
        dataMessageThreads.getMessageThreads[selectedThreadIndex] ? (
          dataMessageThreads.getMessageThreads[
            selectedThreadIndex
          ].messages.map((message: any, index: number) => (
            <React.Fragment key={`${index}-${message.id}`}>
              <MessageBox
                key={`${index}-${message.id}-${message.__typename}`}
                message={message}
                me={me}
                handleRemoveInviteeToThread={handleRemoveInviteeToThread}
              />
            </React.Fragment>
          ))
        ) : (
          <>
            {!showMessagingAddressBook ? (
              <>
                <Text fontSize="2em">select a thread to view messages</Text>
                <MessagesWindow
                  data={data}
                  handleThreadSelection={handleThreadSelection}
                />
              </>
            ) : (
              <Text fontSize="2em">New Message Thread</Text>
            )}
            <div>
              {/* Load on demand */}
              {showMessagingAddressBook && (
                <AddressBookMutation
                  handleAddInviteeToThread={handleAddInviteeToThread}
                  handleRemoveInviteeToThread={handleRemoveInviteeToThread}
                  handleStartNewThread={() => console.log}
                  handleLocalCancelNewThread={() => console.log}
                  newThreadInvitees={[]}
                  handleCancelNewMessageThread={() => console.log}
                  // dataMessageThreads={dataMessageThreads}
                  // selectedThreadIndex={selectedThreadIndex}
                  // buttonThing={true}
                />
              )}
            </div>
          </>
        )}
        {chatEmoji}
        <Flex
          alignSelf="flex-end"
          style={{
            color: "black",
            float: "left",
            clear: "both",
            // border: "1px limegreen dashed",
            width: "100%"
            // justifySelf: "flex-end",
            // height: "300px"
          }}
          ref={messagesEndRef}
        />
      </Flex>
      <AbFlex
        position="fixed"
        width={formWidths}
        bottom={0}
        alignItems="flex-end"
        p={0}
        flexDirection="row"
        bg="white"
        color="thread_text"
        border="purp"
        // style={{ border: "2px rebeccapurple solid" }}
      >
        <ChatForm
          handleSetLastMessage={() => console.log("handlesetLastMessage")}
          handleSetLastMessenger={() => console.log("handlesetLastMessenger")}
          handleThreadSelection={handleThreadSelection}
          disabled={disabled}
          chatEmoji={chatEmoji}
          signS3Mutation={console.log("signS3Mutation")}
          // chatInput={chatInput}
          handleChatFieldChange={handleChatFieldChange}
          files={[]}
          handleEngageMicrophoneClick={handleEngageMicrophoneClick}
          handleOpenEmojiMenuClick={handleOpenEmojiMenuClick}
          handleUploadFileClick={handleUploadFileClick}
          selectedThreadId={selectedThreadId}
          sentTo={
            selectedThreadIndex !== null &&
            dataMessageThreads.getMessageThreads &&
            dataMessageThreads.getMessageThreads[selectedThreadIndex]
              ? dataMessageThreads.getMessageThreads[selectedThreadIndex]
                  .messages[
                  dataMessageThreads.getMessageThreads[selectedThreadIndex]
                    .messages.length - 1
                ].sentBy.id
              : ""
          }
          threadId={selectedThreadId ? selectedThreadId : ""}
          newThreadInvitees={
            selectedThreadIndex
              ? dataMessageThreads.getMessageThreads[selectedThreadIndex]
                  .invitees
              : []
          }
          newThreadDisabled={newThreadDisabled}
        />
      </AbFlex>
    </Flex>
  );
};

export default ChatBody;
