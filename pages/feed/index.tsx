import React from "react";
import { NextPage } from "next";

import { MyContext } from "../../src/components/interfaces/my-context";
import { IPageProps } from "../../src/page-types/types";
import FeedPage from "../../src/modules/feed/feed-page";

const Feed: NextPage<IPageProps> = ({ pathname, query }) => {
  return <FeedPage pathname={pathname} query={query} />;
};

Feed.getInitialProps = async ({ pathname, query }: MyContext) => {
  const { id } = query;

  return { pathname, query, id };
};

export default Feed;
