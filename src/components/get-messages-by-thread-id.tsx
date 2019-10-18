import React from "react";

import { GetMessagesByThreadIdComponent } from "./generated/apollo-graphql";
import { Button, Flex, Heading, Icon } from "./styled-rebass";
import { MessageBox } from "./message-box";
import MountedProof from "./mounted-proof";

export interface IThreadIdProps {
  threadId: string;
  displayMessages: any;
  me: any;
  handleCloseThread: any;
  handleRemoveInviteeToThread: any;
  handleUpdateMessageState: any;
  scrollToBottom: any;
  threadIdSelected: string;

  handleSetLastMessenger: any;
  handleSetLastMessage: any;
  lastMessage: string;
  lastMessenger: any;
}

const ThreadsOnly: React.FC<IThreadIdProps> = ({
  me,
  handleCloseThread,
  handleRemoveInviteeToThread,
  handleUpdateMessageState,
  threadIdSelected,
  handleSetLastMessenger,
  handleSetLastMessage,
  lastMessage,
  lastMessenger
}) => {
  return (
    <div>
      <GetMessagesByThreadIdComponent
        variables={{
          input: {
            threadId: threadIdSelected,
            skip: 0,
            take: 25
          }
        }}
      >
        {({ data, error, loading }: any) => {
          if (error) return <div>{error}</div>;
          if (loading) return <div>loading...</div>;

          return (
            <Flex flexDirection="column">
              <Flex>
                <Heading as="h1">Messages</Heading>

                <Button
                  ml="auto"
                  key="justAButton"
                  type="button"
                  onClick={handleCloseThread}
                >
                  <Icon name="triangleLeft" fill="white" size="2em" /> Back to
                  Threads
                </Button>
              </Flex>
              {data.getMessagesByThreadId.map((message: any, index: number) => (
                <MessageBox
                  key={`${index}-${message.id}-${message.__typename}`}
                  message={message}
                  me={me.id}
                  handleRemoveInviteeToThread={handleRemoveInviteeToThread}
                />
              ))}

              <MountedProof
                handleUpdateMessageState={handleUpdateMessageState}
                handleSetLastMessenger={handleSetLastMessenger}
                handleSetLastMessage={handleSetLastMessage}
                lastMessageValue={lastMessage}
                lastMessengerValue={lastMessenger}
                lastMessage={
                  data.getMessagesByThreadId[
                    data.getMessagesByThreadId.length - 1
                  ].message
                }
                lastMessenger={
                  data.getMessagesByThreadId[
                    data.getMessagesByThreadId.length - 1
                  ].user.id
                }
              />
            </Flex>
          );
        }}
      </GetMessagesByThreadIdComponent>
    </div>
  );
};

export default ThreadsOnly;
