import React, { Component } from "react";
import { GetMessagesByThreadIdComponent } from "./generated/apollo-graphql";

export default class ThreadsOnly extends Component {
  render() {
    return (
      <div>
        <GetMessagesByThreadIdComponent
          variables={{
            input: {
              threadId: "3c6b06c6-c51f-48d1-a70c-993c2354aca6",
              skip: 0,
              take: 15
            }
          }}
        >
          {({ data, error, loading }: any) => {
            if (error) return <div>{error}</div>;
            if (loading) return <div>loading...</div>;
            return (
              <div>
                Hello chat body
                {JSON.stringify(data.getMessagesByThreadId.length)}
                Messages
                {data.getMessagesByThreadId.map((thread: any) => (
                  <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                    {thread.id}
                    {thread.message}
                    {thread.user.firstName}
                    {thread.created_at}
                    {thread.sentBy.firstName}
                  </div>
                ))}
              </div>
            );
          }}
        </GetMessagesByThreadIdComponent>
      </div>
    );
  }
}
