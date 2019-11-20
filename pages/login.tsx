import Login from "../src/modules/auth/login";
import { MyContext } from "../types/types";
import Layout, { getLayout } from "../src/modules/site-layout/layout";

interface LoginProps {
  referer: MyContext["referer"];
}

interface IIndexPage {
  ({ referer }: LoginProps): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const LoginPage: IIndexPage = ({ referer }) => (
  <Layout title="Login">
    <Login referer={referer} />
  </Layout>
);

// @ts-ignore
LoginPage.getInitialProps = async ({ referer }: MyContext) => {
  let setReferer = referer === undefined ? "/login" : referer;
  return { referer: setReferer };
};

LoginPage.getLayout = getLayout;
LoginPage.title = "Home";

export default LoginPage;
