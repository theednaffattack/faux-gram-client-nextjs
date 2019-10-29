import { NextPage } from "next";

import redirect from "../src/lib/redirect";
import { LogoutDocument } from "../src/components/generated/apollo-graphql";
import { MyContext } from "../src/interfaces";

interface Props {}

const Logout: NextPage<Props> = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  await apolloClient.mutate({
    mutation: LogoutDocument
  });
  await apolloClient.clearStore();

  redirect(ctx, "/login", { message: "You have been logged out" });

  return {};
};

export default Logout;
