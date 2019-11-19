import Welcome from "../src/components/welcome";
import { HelloWorldComponent } from "../src/components/generated/apollo-graphql";

const WelcomePage = () => (
  <HelloWorldComponent>{() => <Welcome />}</HelloWorldComponent>
);

export default WelcomePage;
