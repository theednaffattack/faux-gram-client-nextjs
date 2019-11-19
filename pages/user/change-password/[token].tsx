import { NextPage } from "next";

// import Layout from "../../../src/components/layout";
import { IUserPageProps } from "../../../src/modules/auth/types";
import { HelloWorldComponent } from "../../../src/components/generated/apollo-graphql";

const dummyVar = "";

console.log(dummyVar);

const ChangePassword: NextPage<IUserPageProps> = ({
  pathname,
  query,
  token
}) => {
  return (
    <HelloWorldComponent>
      {() => (
        <>
          <h1>Post: {JSON.stringify({ token })}</h1>
          <h1>Post: {JSON.stringify({ pathname })}</h1>
          <h1>Post: {JSON.stringify({ query })}</h1>
        </>
      )}
    </HelloWorldComponent>
  );
};

ChangePassword.getInitialProps = async ({ pathname, query }) => {
  const { token } = query;

  console.log({ pathname, query, token });

  return { pathname, query, token };
};

export default ChangePassword;
