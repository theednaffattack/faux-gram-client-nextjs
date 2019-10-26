import React from "react";

import {
  UnFollowUserComponent,
  MeComponent,
  User
} from "../../components/generated/apollo-graphql";
import UnFollowButton from "./un-follow-button-container";

interface UnFollowUserButtonGqlWrapperProps {
  postUserId: User["id"];
}

const UnFollowUserButtonGqlWrapper: React.FunctionComponent<
  UnFollowUserButtonGqlWrapperProps
> = ({ postUserId }) => {
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
              <UnFollowUserComponent>
                {(
                  unFollowUser,
                  {
                    data: dataUnFollowUser,
                    error: errorUnFollowUser,
                    loading: loadingUnFollowUser
                  }
                ) => {
                  if (loadingUnFollowUser)
                    return <div>Loading Follow User...</div>;
                  if (errorUnFollowUser)
                    return (
                      <div>
                        ERROR
                        <UnFollowButton
                          dataMe={dataMe}
                          mutationFn={unFollowUser}
                          data={dataUnFollowUser}
                          error={errorUnFollowUser}
                          loading={loadingUnFollowUser}
                          postUserId={postUserId}
                        >
                          UnFollow Me
                        </UnFollowButton>
                      </div>
                    );
                  return (
                    <div>
                      <UnFollowButton
                        dataMe={dataMe}
                        mutationFn={unFollowUser}
                        data={dataUnFollowUser}
                        error={errorUnFollowUser}
                        loading={loadingUnFollowUser}
                        postUserId={postUserId}
                      >
                        UnFollow Me
                      </UnFollowButton>
                    </div>
                  );
                }}
              </UnFollowUserComponent>
            );
          return <div>no error or data or loading is present, big error</div>;
        }}
      </MeComponent>
    </div>
  );
};

export default UnFollowUserButtonGqlWrapper;
