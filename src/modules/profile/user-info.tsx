import React from "react";
import { useState } from "react";
import { Formik } from "formik";

import { Button, Flex, Text } from "../../components/styled-rebass";
import UserProfileImage from "./user-profile-image";
import { MeQueryResult } from "../../components/generated/apollo-graphql";
import EditUserInfoFormBody from "./edit-user-info-form-body";

interface UserInfoProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  dataMe: MeQueryResult["data"];
  errorMe: MeQueryResult["error"];
  loadingMe: MeQueryResult["loading"];
}

const variables = {
  data: "some fake data"
};

const register = ({ variables }: any) => {
  console.log();
  return { response: variables };
};

const UserInfo: React.FunctionComponent<UserInfoProps> = ({
  expanded,
  setExpanded,
  dataMe,
  errorMe,
  loadingMe
}) => {
  if (errorMe)
    return (
      <div>Error loading user data, {JSON.stringify(errorMe, null, 2)}</div>
    );
  if (dataMe) {
    return (
      <>
        <Flex
          mb={3}
          alignItems="center"
          border={expanded ? "crimson" : "2px transparent dashed"}
        >
          <UserProfileImage flexInstruction="row" user={dataMe && dataMe.me} />

          {expanded ? (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              // @ts-ignore
              onSubmit={async (data, { setErrors }) => {
                try {
                  const response = await register({
                    variables: variables
                  });

                  console.log({ response });
                } catch (error) {
                  const displayErrors: { [key: string]: string } = {};

                  let myErrors =
                    error.graphQLErrors[0].extensions.exception
                      .validationErrors;

                  myErrors.forEach((validationError: any) => {
                    Object.values(validationError.constraints).forEach(
                      (message: any) => {
                        displayErrors[validationError.property] = message;
                      }
                    );
                  });
                  return setErrors(displayErrors);

                  // const errors: { [key: string]: string } = {};
                  // err.graphQLErrors[0].validationErrors.forEach(
                  //   (validationErr: any) => {
                  //     Object.values(validationErr.constraints).forEach(
                  //       (message: any) => {
                  //         errors[validationErr.property] = message;
                  //       }
                  //     );
                  //   }
                  // );
                  // setErrors(errors);
                }
              }}
              initialValues={{
                email: "test@test.com",
                firstName: "test-firstName",
                lastName: "test-lastName",
                password: "testPassword"
              }}
            >
              {({ handleSubmit, values }) => (
                <EditUserInfoFormBody
                  handleSubmit={handleSubmit}
                  values={values}
                />
              )}
            </Formik>
          ) : (
            <Flex flexDirection="column">
              <Text fontFamily="main">
                {loadingMe
                  ? "loading..."
                  : dataMe && dataMe.me && dataMe.me.name}
              </Text>

              <Text>
                {loadingMe
                  ? "loading..."
                  : dataMe && dataMe.me && dataMe.me.email}
              </Text>
            </Flex>
          )}
        </Flex>
        <Button
          type="button"
          variant="outline"
          onClick={() => setExpanded(!expanded)}
        >
          edit profile
        </Button>
      </>
    );
  } else {
    throw Error("Error! Data fetching states (Me) are all undefined!");
  }
};

interface UserInfoContainerProps {
  dataMe: MeQueryResult["data"];
  errorMe: MeQueryResult["error"];
  loadingMe: MeQueryResult["loading"];
}

const UserInfoContainer: React.FunctionComponent<UserInfoContainerProps> = ({
  dataMe,
  errorMe,
  loadingMe
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <UserInfo
      dataMe={dataMe}
      errorMe={errorMe}
      loadingMe={loadingMe}
      expanded={expanded}
      setExpanded={setExpanded}
    />
  );
};

export default UserInfoContainer;
