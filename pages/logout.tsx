import { NextPage } from "next";

import redirect from "../src/lib/redirect";
import { LogoutDocument } from "../src/components/generated/apollo-graphql";
import { MyContext } from "../src/interfaces";
import { isBrowser } from "../src/lib/isBrowser";
import { logout } from "../src/lib/localstorage-logout";

interface Props {}

const Logout: NextPage<Props> = () => {
  return null;
};

// @ts-ignore
Logout.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  await apolloClient.mutate({
    mutation: LogoutDocument
  });

  // await apolloClient.resetStore();
  await apolloClient.clearStore();

  let now = new Date();

  console.log("Before logout?");

  // To trigger the event listener we save some random data into the `logout` key
  isBrowser ? window.localStorage.setItem("logout", now.toISOString()) : null; // new

  isBrowser ? logout() : console.log("dammit");

  redirect(ctx, "/login");

  return {};
};

export default Logout;
