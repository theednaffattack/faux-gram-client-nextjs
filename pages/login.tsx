import { NextPage } from "next";

import Login from "../src/modules/auth/login";
import { MyContext } from "../types/types";

interface LoginProps {
  referer: MyContext["referer"];
}

const LoginPage: NextPage<LoginProps> = ({ referer }) => (
  <Login referer={referer} />
);

// @ts-ignore
LoginPage.getInitialProps = async ({ referer }: MyContext) => {
  let setReferer = referer === undefined ? "/login" : referer;
  return { referer: setReferer };
};

export default LoginPage;
