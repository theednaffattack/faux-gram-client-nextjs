import React from "react";
import Router from "next/router";

import GetMessagesByThreadIdPage from "../../src/components/messages/get-messages-by-thread-id-page";
import { IExtendedPageProps } from "../../src/page-types/types";
import { MyContext } from "../../types/types";
import { MeComponent } from "../../src/components/generated/apollo-graphql";
import { isBrowser } from "../../src/lib/isBrowser";
import { getLayout } from "../../src/modules/site-layout/layout";
import { ParsedUrlQuery } from "querystring";

interface IMessagesById {
  ({ pathname, query, id }: IExtendedPageProps): JSX.Element;

  getInitialProps: ({
    pathname,
    query
  }: MyContext) => Promise<{
    pathname: string;
    query: ParsedUrlQuery;
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const MessagesById: IMessagesById = ({ id }) => {
  let preppedId: string;
  if (id && id.constructor === Array) {
    preppedId = id[0];
  }
  if (id && typeof id === "string") {
    preppedId = id;
  } else {
    preppedId = "";
  }
  return (
    <MeComponent>
      {({ data: dataMe, loading: loadingMe, error: errorMe }) => {
        let isData = dataMe && dataMe.me ? dataMe.me : null;
        let isLoading = loadingMe ? loadingMe : null;
        let isError = errorMe ? errorMe : null;

        if (!isError && !isLoading && !isData && isBrowser) {
          Router.push("/login");
        }

        if (isError) return <div>"Me" data loading Error!</div>;
        if (isLoading) {
          return <div>"Me" data is loading</div>;
        }
        if (isData) {
          return (
            <GetMessagesByThreadIdPage
              threadIdSelected={preppedId}
              handleCloseThread={() =>
                console.log("handleCloseThread passed as prop")
              }
              me={isData}
              handleDisplayMessages={() =>
                console.log("handleDisplayMessages passed as prop")
              }
              formDisabled={false}
            />
          );
        } else {
          return (
            <div>
              None of three "Me" states (loaded data, loading data, error
              loading data) is present!
            </div>
          );
        }
      }}
    </MeComponent>
  );
};

MessagesById.getInitialProps = async ({ pathname, query }: MyContext) => {
  const { id } = query;

  return { pathname, query, id };
};

MessagesById.getLayout = getLayout;
MessagesById.title = "My Feed";

export default MessagesById;
