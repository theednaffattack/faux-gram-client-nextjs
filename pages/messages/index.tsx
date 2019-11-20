import React from "react";

import MessagePageContainer from "../../src/modules/messages/message-page-container";
import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";
import { getLayout } from "../../src/modules/site-layout/layout";

interface IMessages {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Messages: IMessages = () => {
  return (
    <HelloWorldComponent>{() => <MessagePageContainer />}</HelloWorldComponent>
  );
};

Messages.getLayout = getLayout;
Messages.title = "My Feed";

export default Messages;
