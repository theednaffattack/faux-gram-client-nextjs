import React from "react";
import { Formik, Field, Form } from "formik";

import { TextFormField } from "./text-form-field";
import { SelectFormField } from "./select-form-field";
import { CreatePostProps } from "../../components/generated/apollo-graphql";

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
