import { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import { Header } from "../../src/components/Header";
import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";

type Props = {
  pathname: string;
  query: ParsedUrlQuery;
  pid?: string | string[];
};

const Comment: NextPage<Props> = ({ pathname, pid, query }) => {
  // const router = useRouter();
  // const { id, comment } = router.query;

  return (
    <HelloWorldComponent>
      {() => (
        <>
          <Header />
          <h1>Post: {JSON.stringify({ pid })}</h1>
          <h1>Post: {JSON.stringify({ pathname })}</h1>
          <h1>Post: {JSON.stringify({ query })}</h1>
        </>
      )}
    </HelloWorldComponent>
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
