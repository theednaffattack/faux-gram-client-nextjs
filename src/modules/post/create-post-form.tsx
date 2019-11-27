import React from "react";
import { Formik, Field, Form } from "formik";

import { TextFormField } from "./text-form-field";
import { SelectFormField } from "./select-form-field";
import {
  CreatePostProps,
  SignS3MutationVariables,
  SignedS3SubPayload
} from "src/components/generated/apollo-graphql";
import { MutationFunction } from "react-apollo";
import { ApolloError } from "apollo-boost";

type SignS3Mutation = MutationFunction<
  {
    __typename?: "Mutation" | undefined;
  } & {
    signS3: {
      __typename?: "SignedS3Payload" | undefined;
    } & {
      signatures: ({
        __typename?: "SignedS3SubPayload" | undefined;
      } & Pick<SignedS3SubPayload, "url" | "signedRequest">)[];
    };
  },
  SignS3MutationVariables
>;

type DataS3 =
  | ({
      __typename?: "Mutation" | undefined;
    } & {
      signS3: {
        __typename?: "SignedS3Payload" | undefined;
      } & {
        signatures: ({
          __typename?: "SignedS3SubPayload" | undefined;
        } & Pick<SignedS3SubPayload, "url" | "signedRequest">)[];
      };
    })
  | undefined;

type ErrorS3 = ApolloError | undefined;

type LoadingS3 = boolean;

interface CreatePostFormProps {
  onSubmit: CreatePostProps["mutate"];
  otherProps: any;
}

export const CreatePostForm: React.FunctionComponent<CreatePostFormProps> = ({
  onSubmit
}) => {
  return (
    <Formik
      initialValues={{
        images: [""],
        fake1: 15,
        fake2: 20,
        text: "",
        title: "",
        user: ""
      }}
      onSubmit={({ images, text, title, user }) =>
        onSubmit({
          variables: {
            data: {
              images,
              text,
              title,
              user
            }
          }
        })
      }
    >
      {() => {
        return (
          <Form>
            <Field name="user" hidden component={TextFormField} />
            <Field name="text" component={TextFormField} />
            <Field name="title" component={TextFormField} />
            <Field
              name="fake2"
              options={[
                { label: "a label", value: "a value" },
                { label: "another label", value: "another value" }
              ]}
              component={SelectFormField}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
