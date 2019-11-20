import { HelloWorldComponent } from "../src/components/generated/apollo-graphql";
import ProfilePage from "../src/modules/profile/profile-page";
import { getLayout } from "src/modules/site-layout/layout";

interface IProfile {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Profile: IProfile = () => {
  return (
    <HelloWorldComponent>
      {() => {
        return <ProfilePage />;
      }}
    </HelloWorldComponent>
  );
};

Profile.title = "Profile";

Profile.getLayout = getLayout;

export default Profile;
