import React from "react";

import PostPage from "../../src/modules/post/post-page";
import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";
import { getLayout } from "../../src/modules/site-layout/layout";

interface IPost {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const Post: IPost = () => {
  return <HelloWorldComponent>{() => <PostPage />}</HelloWorldComponent>;
};

Post.getLayout = getLayout;
Post.title = "Create post";

export default Post;
