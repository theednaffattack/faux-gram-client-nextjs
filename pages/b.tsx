import React from "react";
import { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

export type TBProps = {
  pathname: string;
  query: ParsedUrlQuery;
};

const BPage: NextPage<TBProps> = ({ pathname, query }) => (
  <>
    <div>b</div>
    <div>{pathname}</div>
    {JSON.stringify(query)}
  </>
);

BPage.getInitialProps = async ({ pathname, query }) => {
  // const postContent = await fetch(
  //   `https://api.example.com/post/${encodeURIComponent(pid)}`
  // ).then(r => r.text())

  // return { postContent }
  return { pathname, query };
};

export default BPage;
