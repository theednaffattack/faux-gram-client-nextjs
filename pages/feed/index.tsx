import React from "react";
import { NextPage } from "next";

import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";
import { IPageProps } from "../../src/page-types/types";
import FeedPage from "../../src/modules/feed/feed-page";
import { MyContext } from "../../types/types";

const Feed: NextPage<IPageProps> = ({ pathname, query }) => {
  return (
    <HelloWorldComponent>
      {() => {
        return <FeedPage pathname={pathname} query={query} />;
      }}
    </HelloWorldComponent>
  );
};

Feed.getInitialProps = async ({ pathname, query }: MyContext) => {
  const { id } = query;

  return { pathname, query, id };
};

export default Feed;
