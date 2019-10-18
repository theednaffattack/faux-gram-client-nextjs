import React from "react";
import Router from "next/router";

import {
  MeComponent,
  HelloWorldComponent,
  GetOnlyThreadsComponent
} from "../../components/generated/apollo-graphql";
import GetOnlyThreads from "../../components/get-only-threads";

interface IMessagesProps {
  showMessagingAddressBook: any;
  handleCreateNewMessageThread: any;
  handleCancelNewMessageThread: any;
  handleLoadNewThreadCreated: any;
}

const Messages = ({
  showMessagingAddressBook,
  handleCreateNewMessageThread,
  handleCancelNewMessageThread,
  handleLoadNewThreadCreated
}: IMessagesProps) => {
  return (
    <HelloWorldComponent>
      {({ data: dataHello, error: errorHello, loading: loadingHello }) => {
        if (errorHello) {
          // navigate("/login", {
          //   state: {
          //     authenticated: false,
          //     flashMessage: "You are not authenticated"
          //   }
          // });
          // I need to look into how to pass state to NextJS components while routing
          Router.push({
            pathname: "/login",
            query: { error: "You are not authenticated" }
          });
        }
        if (loadingHello) {
          return <div>loading HELLO WORLD ...</div>;
        }
        if (!dataHello) {
          return <div>Something's wrong</div>;
        }
        return (
          <MeComponent>
            {({ data, loading, error }) => {
              if (loading) return <div>loading MEEEEEEEEEEEE...</div>;
              if (error) return <div>error: {error}</div>;
              if (data && data.me) {
                return (
                  <GetOnlyThreadsComponent
                    notifyOnNetworkStatusChange={true}
                    variables={{
                      feedinput: {
                        // cursor: "2019-09-17T20:59:38.512Z",
                        take: 6
                      }
                    }}
                  >
                    {({
                      data: dataGetOnlyThreads,
                      error: errorGetOnlyThreads,
                      loading: loadingGetOnlyThreads,
                      fetchMore: fetchMoreGetOnlyThreads
                    }) => {
                      // if (errorGetOnlyThreads)
                      //   return <div>Error{errorGetOnlyThreads}</div>;
                      // if (loadingGetOnlyThreads)
                      //   return <div>loading threads...</div>;

                      return (
                        <GetOnlyThreads
                          handleLoadNewThreadCreated={
                            handleLoadNewThreadCreated
                          }
                          dataGetOnlyThreads={dataGetOnlyThreads}
                          errorGetOnlyThreads={errorGetOnlyThreads}
                          loadingGetOnlyThreads={loadingGetOnlyThreads}
                          fetchMoreGetOnlyThreads={fetchMoreGetOnlyThreads}
                          handleCancelNewMessageThread={
                            handleCancelNewMessageThread
                          }
                          handleCreateNewMessageThread={
                            handleCreateNewMessageThread
                          }
                          showMessagingAddressBook={
                            showMessagingAddressBook !== undefined
                              ? showMessagingAddressBook
                              : false
                          }
                          me={data.me}
                        />
                      );
                    }}
                  </GetOnlyThreadsComponent>
                );
              }
              if (!data && !loading && !error) {
                return <div>no data</div>;
              } else {
                return null;
              }
            }}
          </MeComponent>
        );
      }}
    </HelloWorldComponent>
  );
};

export default Messages;
