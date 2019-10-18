import React from "react";

import { Button, Flex } from "./styled-rebass";
import { GetListToCreateThreadComponent } from "./generated/apollo-graphql";
import { ChooseThreadUser } from "./choose-thread-user";
import { IAddressBookMutationProps } from "./types";

function AddressBookMutation({
  handleAddInviteeToThread,
  handleRemoveInviteeToThread,
  newThreadInvitees,
  handleLocalCancelNewThread,

  handleStartNewThread
}: IAddressBookMutationProps) {
  return (
    <>
      <GetListToCreateThreadComponent>
        {({
          data: dataCreateThread,
          loading: loadingCreateThread,
          error: errorCreateThread
        }) => {
          if (errorCreateThread)
            return <div>some error: {errorCreateThread}</div>;
          if (loadingCreateThread) {
            return <div>loading...</div>;
          }

          if (dataCreateThread) {
            return (
              <Flex flexDirection="column" width={[1]}>
                <ChooseThreadUser
                  handleAddInviteeToThread={handleAddInviteeToThread}
                  handleRemoveInviteeToThread={handleRemoveInviteeToThread}
                  dataCreateThread={
                    dataCreateThread.getListToCreateThread &&
                    dataCreateThread.getListToCreateThread.thoseICanMessage
                  }
                  newThreadInvitees={newThreadInvitees}
                  loadingCreateThread={loadingCreateThread}
                  errorCreateThread={errorCreateThread}
                  // messages={
                  //   dataMessageThreads &&
                  //   selectedThreadIndex &&
                  //   dataMessageThreads.getMessageThreads &&
                  //   dataMessageThreads.getMessageThreads[selectedThreadIndex]
                  //     ? dataMessageThreads.getMessageThreads[
                  //         selectedThreadIndex
                  //       ].messages
                  //     : []
                  // }
                />

                <Button
                  type="button"
                  onClick={handleStartNewThread}
                  bg={newThreadInvitees.length < 1 ? "#eee" : "blue"}
                  disabled={newThreadInvitees.length < 1 ? true : false}
                  color={newThreadInvitees.length < 1 ? "text" : "white"}
                >
                  start thread
                </Button>
                <Button
                  type="button"
                  bg="crimson"
                  onClick={() => {
                    handleLocalCancelNewThread();
                  }}
                >
                  cancel
                </Button>
              </Flex>
            );
          } else {
            return <div>some weirdness</div>;
          }
        }}
      </GetListToCreateThreadComponent>
    </>
  );
}

export default AddressBookMutation;
