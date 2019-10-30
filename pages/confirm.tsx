import React from "react";
import {
  ConfirmUserMutation,
  ConfirmUserMutationVariables
} from "../src/components/generated/apollo-graphql";
import { CONFIRM_USER } from "../src/graphql/user/mutations/confirmUser";
import redirect from "../src/lib/redirect";
import { MyContext } from "../types/types";

export default class Confirm extends React.PureComponent {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!token) {
      return {};
    }

    const validateToken = await apolloClient.mutate<
      ConfirmUserMutation,
      ConfirmUserMutationVariables
    >({
      mutation: CONFIRM_USER,
      variables: {
        token: token as string
      }
    });

    if (validateToken) {
      redirect(ctx, "/login");
    } else {
      return "soemthing went wrong, confirmation mutation";
    }

    return {};
  }

  render() {
    return "something went wrong";
  }
}
