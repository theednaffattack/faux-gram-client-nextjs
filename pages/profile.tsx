// import Profile from "../src/modules/profile/profile-page";
import { HelloWorldComponent } from "../src/components/generated/apollo-graphql";

const ProfilePage = () => {
  return (
    <HelloWorldComponent>
      {({ data }) => {
        console.log(data);
        return <div>{JSON.stringify(data)}</div>;
        // return <Profile data={data} />;
      }}
    </HelloWorldComponent>
  );
};

export default ProfilePage;
