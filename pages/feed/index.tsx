import React from "react";
import { ParsedUrlQuery } from "querystring";

import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";
import FeedPage from "../../src/modules/feed/feed-page";
import { MyContext } from "../../types/types";
import Layout, { getLayout } from "../../src/modules/site-layout/layout";

interface IFeed {
  ({ pathname, query }: MyContext): JSX.Element;

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

const Feed: IFeed = ({ pathname, query }) => {
  return (
    <Layout title="My Feed">
      <HelloWorldComponent>
        {() => {
          return <FeedPage pathname={pathname} query={query} />;
        }}
      </HelloWorldComponent>
    </Layout>
  );
};

Feed.getInitialProps = async ({ pathname, query }) => {
  return { pathname, query };
};

Feed.getLayout = getLayout;
Feed.title = "My Feed";

export default Feed;
