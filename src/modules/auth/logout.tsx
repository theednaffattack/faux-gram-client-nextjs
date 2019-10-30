import { NextPage } from "next";

import { LogoutDocument } from "../../components/generated/apollo-graphql";
import redirect from "../../lib/redirect";
import { MyContext } from "../../../types/types";
import { logout } from "../../../src/lib/localstorage-logout";

interface Props {}

const Logout: NextPage<Props> = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  await apolloClient.mutate({
    mutation: LogoutDocument
  });

  // await apolloClient.resetStore();
  await apolloClient.clearStore();

  // let now = new Date();

  // To trigger the event listener we save some random data into the `logout` key
  // window.localStorage.setItem("logout", now.toISOString()); // new
  logout();

  redirect(ctx, "/login");

  return {};
};

export default Logout;
