import React from "react";

import { MeComponent } from "../../src/components/generated/apollo-graphql";
import { getLayout } from "../../src/modules/site-layout/layout";
import CameraModule from "../../src/modules/feed/camera";

interface IPost {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Post: IPost = () => {
  return (
    <MeComponent>
      {({ data, error, loading }) => {
        if (loading) return <div> loaidng me data!!!</div>;
        if (error) return <div>Error of Me DATA</div>;
        return (
          <CameraModule
            me={data && data.me && data.me.id ? data.me.id : undefined}
          />
        );
      }}
    </MeComponent>
  );
};

Post.getLayout = getLayout;
Post.title = "Create post";

export default Post;
