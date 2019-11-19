import React from "react";

import PostPage from "../../src/modules/post/post-page";
import { HelloWorldComponent } from "../../src/components/generated/apollo-graphql";

const Post = () => {
  return <HelloWorldComponent>{() => <PostPage />}</HelloWorldComponent>;
};
export default Post;
