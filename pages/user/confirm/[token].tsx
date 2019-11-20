import React from "react";
import Router from "next/router";

import { ConfirmUserComponent } from "../../../src/components/generated/apollo-graphql";
import { getLayout } from "../../../src/modules/site-layout/layout";
import { IUserPageProps } from "../../../src/modules/auth/types";
import { MyContext } from "../../../types/types";

interface IConfirm {
  ({ pathname, query, token }: IUserPageProps): JSX.Element;

  getInitialProps: ({ pathname, query }: MyContext) => Promise<IUserPageProps>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Confirm: IConfirm = ({ token }) => {
  let preppedToken: string;
  if (token && token.constructor === Array) {
    preppedToken = token[0];
  }
  if (typeof token === "string") {
    preppedToken = token;
  }
  return (
    <ConfirmUserComponent>
      {confirmUser => {
        confirmUser({
          variables: { token: preppedToken }
        })
          .catch(error => console.error({ error }))
          // @ts-ignore
          .then(data => {
            Router.push("/profile");
          });
        return <div>hello</div>;
      }}
    </ConfirmUserComponent>
  );
};

Confirm.getInitialProps = async ({ pathname, query }) => {
  const { token } = query;

  return { pathname, query, token };
};

Confirm.getLayout = getLayout;
Confirm.title = "Change password";

export default Confirm;
