import React from "react";

import MessagePageContainer from "../../src/modules/messages/message-page-container";
import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";
import { getLayout } from "../../src/modules/site-layout/layout";
import { MyContext } from "../../types/types";

interface IMessages {
  (): JSX.Element;

  getInitialProps: ({
    pathname,
    query
  }: MyContext) => Promise<{
    pathname: MyContext["pathname"];
    query: MyContext["query"];
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Messages: IMessages = () => {
  return (
    <HelloWorldComponent>{() => <MessagePageContainer />}</HelloWorldComponent>
  );
};

Messages.getInitialProps = async ({ pathname, query }: MyContext) => {
  return { pathname, query };
};

Messages.getLayout = getLayout;
Messages.title = "My Feed";

export default Messages;
