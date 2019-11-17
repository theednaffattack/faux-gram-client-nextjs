import React from "react";
import { Field } from "formik";

import { InputField } from "./input-field";
import { Button, Flex } from "../../components/styled-rebass";

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface EditUserInfoFormBodyProps {
  handleSubmit: any;
  values: FormValues;
}

const EditUserInfoFormBody: React.FunctionComponent<EditUserInfoFormBodyProps> = ({
  handleSubmit,
  values
}) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Field
        label="first name"
        name="firstName"
        placeholder="enter first name"
        component={InputField}
        value={values.firstName}
      />
      <Field
        label="last name"
        name="lastName"
        placeholder="enter last name"
        component={InputField}
        value={values.lastName}
      />
      <Field
        label="email"
        name="email"
        placeholder="enter email"
        component={InputField}
        value={values.email}
      />
      <Field
        label="password"
        name="password"
        type="password"
        component={InputField}
        value={values.password}
      />

      <Flex justifyContent="center">
        <Button
          bg="blue"
          type="submit"
          // onClick={handleSubmit}
          label="Sign up"
        >
          Save Changes
        </Button>

        <Button
          type="button"
          bg="red"
          onClick={() => console.log("CANCELED!!!")}
        >
          cancel
        </Button>
      </Flex>
    </form>
  );
};

export default EditUserInfoFormBody;
