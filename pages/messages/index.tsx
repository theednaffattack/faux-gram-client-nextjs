import React from "react";

import MessagePageContainer from "../../src/modules/messages/message-page-container";
import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";

const Messages = () => {
  return (
    <HelloWorldComponent>{() => <MessagePageContainer />}</HelloWorldComponent>
  );
};

export default Messages;
