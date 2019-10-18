import { NextPage } from "next";

import Layout from "../../../src/components/layout";
import { IUserPageProps } from "../../../src/modules/auth/types";

const dummyVar = "";

console.log(dummyVar);

const ChangePassword: NextPage<IUserPageProps> = ({
  pathname,
  query,
  token
}) => {
  return (
    <Layout>
      <h1>Post: {JSON.stringify({ token })}</h1>
      <h1>Post: {JSON.stringify({ pathname })}</h1>
      <h1>Post: {JSON.stringify({ query })}</h1>
    </Layout>
  );
};

ChangePassword.getInitialProps = async ({ pathname, query }) => {
  const { token } = query;

  console.log({ pathname, query, token });

  return { pathname, query, token };
};

export default ChangePassword;
