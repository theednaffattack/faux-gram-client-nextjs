import React from "react";
import { Flex, Card, Heading, Text, Box, Button } from "rebass";
import Router from "next/router";
import { Formik, Field } from "formik";

import { InputField } from "../form-fields/input-fleld";
import { CheckBox } from "../../components/checkbox";
import Flash from "../flash/flash";
import {
  LoginComponent,
  MeQuery
} from "../../components/generated/apollo-graphql";
import { meQuery } from "../../graphql/user/queries/Me";
import { SignUpLink } from "../../components/sign-up-link";

export default function Login() {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Flex width={[1]} minHeight="100vh">
        <Flex
          mt={[0, 5, 0]}
          flexDirection="column"
          width={[1]}
          justifyContent="center"
          alignItems="center"
        >
          <Flash
            justifyContent="center"
            alignItems="center"
            border="crimson"
            p={4}
            // pose={flash ? "enter" : "exit"}
          >
            hello
          </Flash>
          <Card
            mx={3}
            width={1}
            maxWidth={["350px", "350px"]}
            p={4}
            sx={{
              borderRadius: "10px",
              boxShadow: "0 2px 16px rgba(0, 0, 0, 0.25)"
            }}
            bg="rgb(242,242,242)"
          >
            <Flex mt={3} mb={4} justifyContent="center">
              <Heading color="text" fontSize={[5]} fontFamily="montserrat">
                Sign in
              </Heading>
            </Flex>
            <LoginComponent>
              {login => (
                <Formik
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={async (data, { setErrors }) => {
                    let response;
                    try {
                      response = await login({
                        variables: data,
                        update: (cache, { data }) => {
                          if (!data || !data.login) {
                            return;
                          }
                          cache.writeQuery<MeQuery>({
                            query: meQuery,
                            data: {
                              __typename: "Query",
                              me: data.login
                            }
                          });
                        }
                      });
                    } catch (error) {
                      // const displayErrors: { [key: string]: string } = {};

                      let myErrors = error.graphQLErrors; //.extensions.exception.validationErrors;
                      console.log(
                        "myErrors",
                        JSON.stringify(myErrors, null, 2)
                      );
                      // myErrors.forEach((errorThing: any) => {
                      //   displayErrors[errorThing.path[0]] =
                      //     errorThing.message;
                      // });

                      // myErrors.forEach((validationError: any) => {
                      //   Object.values(validationError.constraints).forEach(
                      //     (message: any) => {
                      //       displayErrors[validationError.property] = message;
                      //     }
                      //   );
                      // });

                      // return setErrors(displayErrors);

                      return setErrors({
                        email: "invalid login"
                      });
                    }

                    if (response && response.data && !response.data.login) {
                      setErrors({
                        email: "invalid login"
                      });
                      return;
                    }

                    Router.push("/welcome");
                    // navigate("/welcome");
                  }}
                  initialValues={{
                    email: "",
                    password: "",
                    keepMeSigned: true
                  }}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Field
                        id="email"
                        name="email"
                        placeholder="input email"
                        component={InputField}
                      />
                      <Field
                        id="password"
                        name="password"
                        placeholder="input password"
                        type="password"
                        component={InputField}
                      />
                      <Flex my={2}>
                        <Box mr="auto">
                          <Text
                            htmlFor="keepMeSignedIn"
                            fontFamily="montserrat"
                          >
                            Keep me logged in
                          </Text>
                        </Box>
                        <Box mr={2}>
                          <label>
                            <Field
                              id="keepMeSignedIn"
                              name="keepMeSignedIn"
                              type="checkbox"
                              shadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
                              component={CheckBox}
                            />
                          </label>
                        </Box>
                      </Flex>
                      <Flex justifyContent="center">
                        <Button
                          mt={2}
                          width="340px"
                          height="47px"
                          type="submit"
                          sx={{
                            borderRadius: "30px"
                          }}
                        >
                          <Text fontFamily="montserrat">Login</Text>
                        </Button>
                      </Flex>
                    </form>
                  )}
                </Formik>
              )}
            </LoginComponent>
          </Card>
          <SignUpLink width={1} />
        </Flex>
      </Flex>
    </Flex>
  );
}
