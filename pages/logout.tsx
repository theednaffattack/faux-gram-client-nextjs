import { NextPage } from "next";

import redirect from "../src/lib/redirect";
import { LogoutDocument } from "../src/components/generated/apollo-graphql";
import { isBrowser } from "../src/lib/isBrowser";
import { logout } from "../src/lib/localstorage-logout";
import { MyContext } from "../types/types";

interface Props {}

const Logout: NextPage<Props> = () => {
  return null;
};

// @ts-ignore
Logout.getInitialProps = async (ctx: MyContext) => {
  await ctx.apolloClient.mutate({
    mutation: LogoutDocument
  });

  // await apolloClient.resetStore();
  await ctx.apolloClient.clearStore();

  let now = new Date();

  // To trigger the event listener we save some random data into the `logout` key
  isBrowser ? window.localStorage.setItem("logout", now.toISOString()) : null; // new

  isBrowser ? logout() : null;

  redirect(ctx, "/login");

  return {};
};

export default Logout;
