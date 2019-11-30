import React from "react";

import { HelloWorldComponent } from "../src/components/generated/apollo-graphql";
import ProfilePage from "../src/modules/profile/profile-page";
import { getLayout } from "../src/modules/site-layout/layout";
import { MyContext } from "../types/types";

interface IProfile {
  (): JSX.Element;

  getInitialProps: ({
    pathname,
    query
  }: MyContext) => Promise<{
    pathname: MyContext["pathname"];
    query: MyContext["query"];
  }>;

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

Profile.getInitialProps = async ({ pathname, query }: MyContext) => {
  return { pathname, query };
};

Profile.title = "Profile";

Profile.getLayout = getLayout;

export default Profile;
