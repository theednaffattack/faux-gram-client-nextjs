// import { useRouter } from "next/router";
import { NextPage } from "next";

type Props = {
  pathname: string;
  query: ParsedUrlQuery;
  pid?: string | string[];
};

import Layout from "../../src/components/Layout";
import { Header } from "../../src/components/Header";
import { ParsedUrlQuery } from "querystring";

const Comment: NextPage<Props> = ({ pathname, pid, query }: Props) => {
  // const router = useRouter();
  // const { id, comment } = router.query;

  return (
    <Layout>
      <Header />
      <h1>Post: {JSON.stringify({ pid })}</h1>
      <h1>Post: {JSON.stringify({ pathname })}</h1>
      <h1>Post: {JSON.stringify({ query })}</h1>
      {/* <h1>Comment: {comment}</h1> */}
    </Layout>
  );
};

Comment.getInitialProps = async ({ pathname, query }) => {
  // pid = 'hello-nextjs'
  const { pid } = query;

  // const postContent = await fetch(
  //   `https://api.example.com/post/${encodeURIComponent(pid)}`
  // ).then(r => r.text())

  // return { postContent }
  return { pathname, query, pid };
};

export default Comment;
