import {
  FollowUserComponent,
  MeComponent,
  User
} from "../../../src/components/generated/apollo-graphql";

import React from "react";
import FollowButton from "./follow-button-container";

interface Props {
  postUserId: User["id"];
}

const LikePostIconButton: React.FunctionComponent<Props> = ({ postUserId }) => {
  return (
    <div>
      <MeComponent>
        {({ data: dataMe, error: errorMe, loading: loadingMe }) => {
          if (loadingMe) return <div>loading ME...</div>;
          if (errorMe)
            return (
              <div>
                ERROR loading ME data {JSON.stringify(errorMe, null, 2)}
              </div>
            );
          if (dataMe !== undefined && dataMe.me)
            return (
              <FollowUserComponent>
                {(
                  followUser,
                  {
                    data: dataFollowUser,
                    error: errorFollowUser,
                    loading: loadingFollowUser
                  }
                ) => {
                  if (loadingFollowUser)
                    return <div>Loading Follow User...</div>;
                  if (errorFollowUser)
                    return (
                      <div>
                        ERROR
                        <FollowButton
                          dataMe={dataMe}
                          mutationFn={followUser}
                          data={dataFollowUser}
                          error={errorFollowUser}
                          loading={loadingFollowUser}
                          postUserId={postUserId}
                        >
                          UnFollow Me
                        </FollowButton>
                      </div>
                    );
                  return (
                    <div>
                      <FollowButton
                        dataMe={dataMe}
                        mutationFn={followUser}
                        data={dataFollowUser}
                        error={errorFollowUser}
                        loading={loadingFollowUser}
                        postUserId={postUserId}
                      >
                        UnFollow Me
                      </FollowButton>
                    </div>
                  );
                }}
              </FollowUserComponent>
            );
          return <div>no error or data or loading is present, big error</div>;
        }}
      </MeComponent>
    </div>
  );
};

export default LikePostIconButton;
