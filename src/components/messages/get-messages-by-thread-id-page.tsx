import React from "react";
import {
  GetMessagesByThreadIdComponent,
  SignS3Component
} from "../generated/apollo-graphql";
import { Button, Flex, Icon } from "../styled-rebass";
import MessagesWindow from "../messages-user-window";
import ChatForm from "../chat-form";
import Router from "next/router";

export interface IGetMessagesByThreadIdPageProps {
  threadIdSelected: string;
  handleCloseThread: any;
  me: any;
  handleDisplayMessages: any;
  formDisabled: boolean;
}

const { log } = console;

export default function GetMessagesByThreadIdPage(
  props: IGetMessagesByThreadIdPageProps
) {
  return (
    <>
      <GetMessagesByThreadIdComponent
        // notifyOnNetworkStatusChange
        variables={{
          input: {
            threadId: props.threadIdSelected, // "8a20137c-923e-4d7c-baa5-c66461bc81f9"
            skip: 0,
            take: 15
          }
        }}
      >
        {({
          data: dataGetMessagesByThreadId,
          error: errorGetMessagesByThreadId,
          fetchMore: fetchMoreGetMessagesByThreadId,
          loading: loadingGetMessagesByThreadId,
          subscribeToMore
        }) => {
          // @TODO: change these if statements into skeleton loading below
          if (errorGetMessagesByThreadId)
            return <div>{JSON.stringify(errorGetMessagesByThreadId)}</div>;
          if (loadingGetMessagesByThreadId)
            return <div>loading MESSAGES BY THREAD ID...</div>;
          if (dataGetMessagesByThreadId) {
            return (
              <Flex
                flexDirection="column"
                alignItems="space-between"
                width={1}
                id="isItMe"
                flex="1 1 auto"
                style={{
                  overflowY: "hidden",
                  overflowX: "hidden"
                }}
              >
                <Button
                  ml="auto"
                  key="justAButton"
                  type="button"
                  onClick={() => Router.push("/messages")}
                >
                  <Icon name="triangleLeft" fill="white" size="1.5em" />
                  Back to Threads
                </Button>

                <Flex
                  flex="1 1 auto"
                  style={{
                    position: "relative"
                  }}
                >
                  <MessagesWindow
                    data={dataGetMessagesByThreadId.getMessagesByThreadId}
                    me={props.me}
                    handleDisplayMessages={props.handleDisplayMessages}
                    subscribeToMore={subscribeToMore}
                    threadIdSelected={props.threadIdSelected || ""}
                    loadingGetMessagesByThreadId={loadingGetMessagesByThreadId}
                    fetchMoreGetMessagesByThreadId={
                      fetchMoreGetMessagesByThreadId
                    }
                    // handleRemoveInviteeToThread={
                    //   this.handleRemoveInviteeToThread
                    // }
                    handleCloseThread={props.handleCloseThread}
                  />
                </Flex>

                <SignS3Component>
                  {signS3 => {
                    // success: boolean;
                    // threadId: string;
                    // message: Message;
                    // user: User;
                    // invitees: User[];
                    if (
                      dataGetMessagesByThreadId !== null &&
                      dataGetMessagesByThreadId.getMessagesByThreadId &&
                      dataGetMessagesByThreadId.getMessagesByThreadId.edges
                        .length > 0
                    ) {
                      let blahBy =
                        dataGetMessagesByThreadId.getMessagesByThreadId.edges[
                          dataGetMessagesByThreadId.getMessagesByThreadId.edges
                            .length - 1
                        ];

                      let userIdForComparison = blahBy
                        ? blahBy.node.user.id
                        : "it's null";
                      let sentByIdForComparison = blahBy
                        ? blahBy.node.sentBy.id
                        : "it's null";

                      let sentToWinner =
                        userIdForComparison === props.me
                          ? sentByIdForComparison
                          : userIdForComparison;

                      return (
                        <ChatForm
                          chatEmoji=""
                          disabled={props.formDisabled}
                          files={[]}
                          handleChatFieldChange={() =>
                            log("handleChatFieldChange")
                          }
                          handleUploadFileClick={() => log("handleUploadFile")}
                          handleSetLastMessenger={() =>
                            log("this.handleSetLastMessenger")
                          }
                          handleEngageMicrophoneClick={() => log}
                          handleSetLastMessage={() =>
                            log("this.handleSetLastMessage")
                          }
                          key="someKey"
                          newThreadInvitees={[]}
                          newThreadDisabled={false}
                          selectedThreadId={
                            props.threadIdSelected ? props.threadIdSelected : ""
                          }
                          sentTo={sentToWinner}
                          signS3Mutation={signS3}
                          threadId={
                            props.threadIdSelected ? props.threadIdSelected : ""
                          }
                        />
                      );
                    } else {
                      return <div>null</div>;
                    }
                  }}
                </SignS3Component>
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
