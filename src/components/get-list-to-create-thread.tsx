import React, { Component } from "react";
import { GetListToCreateThreadComponent } from "./generated/apollo-graphql";
import { Flex } from "./styled-rebass";
import { ChooseThreadUser } from "./choose-thread-user";

interface IGetListToCreateThreadProps {
  dataMessageThreads: any;
  selectedThreadIndex: any;
  handleAddInviteeToThread: any;
  newThreadInvitees: any;
  getNewInvitees: any;
}

interface IGetListToCreateThreadState {}

export class GetListToCreateThread extends Component<
  IGetListToCreateThreadProps,
  IGetListToCreateThreadState
> {
  render() {
    const {
      dataMessageThreads,
      selectedThreadIndex,
      handleAddInviteeToThread,
      newThreadInvitees,
      getNewInvitees
    } = this.props;
    return (
      <GetListToCreateThreadComponent>
        {({
          data: dataCreateThread,
          loading: loadingCreateThread,
          error: errorCreateThread
        }) => {
          // if (error) return <div>some error: {error}</div>;
          // if (loading) return <div>loading...</div>;
          // return <div>hello data{JSON.stringify(data)}</div>;
          return (
            <Flex width={[1, 1, 1]} flexDirection="row">
              {selectedThreadIndex && dataCreateThread ? (
                <ChooseThreadUser
                  newThreadInvitees={[]}
                  handleRemoveInviteeToThread={() => console.log}
                  handleAddInviteeToThread={handleAddInviteeToThread}
                  dataCreateThread={
                    dataCreateThread.getListToCreateThread &&
                    dataCreateThread.getListToCreateThread.thoseICanMessage
                  }
                  loadingCreateThread={loadingCreateThread}
                  errorCreateThread={errorCreateThread}
                  messages={
                    dataMessageThreads.getMessageThreads &&
                    dataMessageThreads.getMessageThreads[selectedThreadIndex]
                      ? dataMessageThreads.getMessageThreads[
                          selectedThreadIndex
                        ].messages
                      : []
                  }
                />
              ) : (
                <>
                  {newThreadInvitees && newThreadInvitees[0]
                    ? getNewInvitees
                    : ""}
                </>
              )}
            </Flex>
          );
        }}
      </GetListToCreateThreadComponent>
    );
  }
}

export default GetListToCreateThread;
