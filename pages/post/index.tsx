import React from "react";

import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";
import { getLayout } from "../../src/modules/site-layout/layout";
import CameraModule from "../../src/modules/feed/camera";

interface IPost {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Post: IPost = () => {
  return <HelloWorldComponent>{() => <CameraModule />}</HelloWorldComponent>;
};

Post.getLayout = getLayout;
Post.title = "Create post";

export default Post;
