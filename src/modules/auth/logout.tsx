import { NextPage } from "next";

import { LogoutDocument } from "../../components/generated/apollo-graphql";
import redirect from "../../lib/redirect";
import { MyContext } from "../../../src/interfaces";

interface Props {}

const Logout: NextPage<Props> = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
  await apolloClient.mutate({ mutation: LogoutDocument });
  await apolloClient.resetStore();

  redirect(ctx, "/login");

  return {};
};

export default Logout;
