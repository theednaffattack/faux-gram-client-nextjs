import React from "react";

import { MyContext } from "../../../types/types";
import { MeComponent } from "../../../src/components/generated/apollo-graphql";
import GlobalFeed from "../../../src/components/global-feed";
import { getLayout } from "../../../src/modules/site-layout/layout";

interface IFeed {
  ({ pathname }: MyContext): JSX.Element;

  getInitialProps: ({
    pathname
  }: MyContext) => Promise<{
    pathname: MyContext["pathname"];
  }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Feed: IFeed = () => {
  return (
    <MeComponent>
      {({ data, error, loading }) => {
        if (error) return <div>Error, {JSON.stringify(error)}</div>;
        if (loading) return <div>loading...</div>;
        return <GlobalFeed me={data} />;
      }}
    </MeComponent>
  );
};

Feed.getInitialProps = async ({ pathname }) => {
  return { pathname };
};

Feed.getLayout = getLayout;
Feed.title = "Global Feed";

export default Feed;
