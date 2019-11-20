import Welcome from "../src/components/welcome";
import { HelloWorldComponent } from "../src/components/generated/apollo-graphql";
import { getLayout } from "../src/modules/site-layout/layout";

interface IWelcome {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const WelcomePage: IWelcome = () => (
  <HelloWorldComponent>{() => <Welcome />}</HelloWorldComponent>
);

WelcomePage.getLayout = getLayout;
WelcomePage.title = "Welcome";

export default WelcomePage;
