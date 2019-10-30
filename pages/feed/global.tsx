import React from "react";
import { NextPage } from "next";

import { MyContext } from "../../types/types";
import { IPageProps } from "../../src/page-types/types";
import { MeComponent } from "../../src/components/generated/apollo-graphql";
import GlobalFeed from "../../src/components/global-feed";

const Feed: NextPage<IPageProps> = () => {
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

Feed.getInitialProps = async ({ pathname, query }: MyContext) => {
  const { id } = query;

  return { pathname, query, id };
};

export default Feed;
