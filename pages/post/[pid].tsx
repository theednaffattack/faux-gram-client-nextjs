import React from "react";
import { ParsedUrlQuery } from "querystring";

import { Header } from "../../src/components/Header";
import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";
import { getLayout } from "../../src/modules/site-layout/layout";
import { IExtendedPageProps } from "../../src/page-types/types";
import { MyContext } from "types/types";

interface IPostById {
  ({ pathname, id, query }: IExtendedPageProps): JSX.Element;

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

const PostById: IPostById = ({ pathname, id, query }) => {
  return (
    <HelloWorldComponent>
      {() => (
        <>
          <Header />
          <h1>Post: {JSON.stringify({ id })}</h1>
          <h1>Post: {JSON.stringify({ pathname })}</h1>
          <h1>Post: {JSON.stringify({ query })}</h1>
        </>
      )}
    </HelloWorldComponent>
  );
};

PostById.getInitialProps = async ({ pathname, query }) => {
  // pid = 'hello-nextjs'
  const { id } = query;

  return { pathname, query, id };
};

PostById.getLayout = getLayout;
PostById.title = "Individual post";

export default PostById;
