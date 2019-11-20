import { Field, Formik } from "formik";
import React from "react";
import Router from "next/router";

import { InputField } from "../src/components/fields/input-field";
import { ForgotPasswordComponent } from "../src/components/generated/apollo-graphql";
import { getLayout } from "../src/modules/site-layout/layout";

interface IForgotPassword {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const ForgotPassword: IForgotPassword = () => {
  return (
    <ForgotPasswordComponent>
      {forgotPassword => (
        <Formik
          // validateOnBlur={false}
          // validateOnChange={false}
          onSubmit={async (data, { setErrors }) => {
            try {
              await forgotPassword({
                variables: data
              });

              Router.push("/check-email");
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
            email: ""
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="email" placeholder="email" component={InputField} />
              <button type="submit">submit</button>
            </form>
          )}
        </Formik>
      )}
    </ForgotPasswordComponent>
  );
};

ForgotPassword.getLayout = getLayout;
ForgotPassword.title = "Forgot password";

export default ForgotPassword;
