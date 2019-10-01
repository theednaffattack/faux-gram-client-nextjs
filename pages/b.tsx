import React from "react";
import Layout from "../src/components/Layout";
import { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = {
  pathname: string;
  query: ParsedUrlQuery;
};

const BPage: NextPage<Props> = ({ pathname, query }) => (
  <Layout title="b">
    <div>b</div>
    <div>{pathname}</div>
    {JSON.stringify(query)}
  </Layout>
);

BPage.getInitialProps = async ({ pathname, query }) => {
  // const postContent = await fetch(
  //   `https://api.example.com/post/${encodeURIComponent(pid)}`
  // ).then(r => r.text())

  // return { postContent }
  return { pathname, query };
};

export default BPage;
