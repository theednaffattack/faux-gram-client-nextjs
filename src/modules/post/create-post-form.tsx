import React from "react";
import { Formik, Field, Form } from "formik";
import { TextFormField } from "./tex-form-field";

interface CreatePostFormProps {
  onSubmit: () => void;
}

export const CreatePostForm: React.FunctionComponent<CreatePostFormProps> = ({
  onSubmit
}) => {
  return (
    <Formik initialValues={{ text: "", title: "" }} onSubmit={() => onSubmit()}>
      {({ handleReset, handleSubmit }) => {
        console.log("formik values", { handleReset, handleSubmit });
        return (
          <Form>
            <Field name="text" component={TextFormField} />
            <Field name="title" component={TextFormField} />
          </Form>
          // <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          //   <TextFormField

          //    />
          //   <input name="title" type="input" />
          //   <input name="text" type="input" />
          // </form>
        );
      }}
    </Formik>
  );
};
