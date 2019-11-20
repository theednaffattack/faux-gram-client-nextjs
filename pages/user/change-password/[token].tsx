import { IUserPageProps } from "../../../src/modules/auth/types";
import { HelloWorldComponent } from "../../../src/components/generated/apollo-graphql";
import { getLayout } from "../../../src/modules/site-layout/layout";
import { MyContext } from "../../../types/types";

interface IChangePassword {
  ({ pathname, query, token }: IUserPageProps): JSX.Element;

  getInitialProps: ({ pathname, query }: MyContext) => Promise<IUserPageProps>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const ChangePassword: IChangePassword = ({ pathname, query, token }) => {
  return (
    <HelloWorldComponent>
      {() => (
        <>
          <h1>Post: {JSON.stringify({ token })}</h1>
          <h1>Post: {JSON.stringify({ pathname })}</h1>
          <h1>Post: {JSON.stringify({ query })}</h1>
        </>
      )}
    </HelloWorldComponent>
  );
};

ChangePassword.getInitialProps = async ({ pathname, query }) => {
  const { token } = query;

  return { pathname, query, token };
};

ChangePassword.getLayout = getLayout;
ChangePassword.title = "Change password";

export default ChangePassword;
