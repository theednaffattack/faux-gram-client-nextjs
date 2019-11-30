import React from "react";

import Login from "../src/modules/auth/login";
import { MyContext } from "../types/types";
import { getLayout } from "../src/modules/site-layout/layout";

interface LoginProps {
  referer: MyContext["referer"];
}

interface ILoginPage {
  ({ referer }: LoginProps): JSX.Element;

  getInitialProps: ({
    referer
  }: MyContext) => Promise<{ referer: MyContext["referer"] }>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const LoginPage: ILoginPage = ({ referer }) => <Login referer={referer} />;

LoginPage.getInitialProps = async ({ referer }: MyContext) => {
  let setReferer = referer === undefined ? "/unknown page" : referer;
  return { referer: setReferer };
};

LoginPage.getLayout = getLayout;
LoginPage.title = "Login";

export default LoginPage;
