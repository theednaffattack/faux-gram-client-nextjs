import React from "react";
import Layout from "../components/Layout";
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
  </Layout>
);

BPage.getInitialProps = async ({ pathname, query }) => {
  // pid = 'hello-nextjs'
  const { pid } = query;

  // const postContent = await fetch(
  //   `https://api.example.com/post/${encodeURIComponent(pid)}`
  // ).then(r => r.text())

  // return { postContent }
  return { pathname, query };
};

export default BPage;
