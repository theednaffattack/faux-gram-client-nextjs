import React from "react";

import {
  CreatePostComponent,
  SignS3Component
} from "./generated/apollo-graphql";
import DropZoneContainer from "./dropzone-container";

interface IFileListMutation {
  me: string;
}

const CreatePostMutation = ({ me }: IFileListMutation) => {
  return (
    <SignS3Component>
      {(
        signS3
        // { data: dataSignS3, error: errorSignS3, loading: loadingSignS3 }
      ) => {
        return (
          <CreatePostComponent>
            {(
              createPost,
              {
                data: dataCreatePost,
                error: errorCreatePost,
                loading: loadingCreatePost
              }
            ) => (
              <DropZoneContainer
                me={me}
                mutateCreatePost={createPost}
                mutateSignS3={signS3}
                dataCreatePost={dataCreatePost}
                errorCreatePost={errorCreatePost}
                loadingCreatePost={loadingCreatePost}
              />
            )}
          </CreatePostComponent>
        );
      }}
    </SignS3Component>
  );
};

export default CreatePostMutation;
