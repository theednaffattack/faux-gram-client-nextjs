import { Field, Formik } from "formik";
import React from "react";

import { InputField } from "../src/components/fields/input-field";
import { ChangePasswordComponent } from "../src/components/generated/apollo-graphql";
import Router from "next/router";

const ChangePassword = () => {
  return (
    <ChangePasswordComponent>
      {changePassword => (
        <Formik
          // validateOnBlur={false}
          // validateOnChange={false}
          onSubmit={async (data, { setErrors }) => {
            try {
              const response = await changePassword({
                variables: {
                  data: {
                    password: data.password,
                    token: ""
                  }
                }
              });

              console.log({ response });

              Router.push("/");
            } catch (error) {
              const displayErrors: { [key: string]: string } = {};

              let myErrors =
                error.graphQLErrors[0].extensions.exception.validationErrors;

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
            password: ""
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="password"
                type="password"
                placeholder="change password"
                component={InputField}
              />
              <button type="submit">change password</button>
            </form>
          )}
        </Formik>
      )}
    </ChangePasswordComponent>
  );
};

// ChangePassword.getInitialProps = ({
//   query: { token }
// }: NextContext<{ token: string }>) => {
//   return {
//     token
//   };
// };

export default ChangePassword;
