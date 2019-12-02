import React from "react";
import Axios from "axios";
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import Nope from "nope-validator";
import uuid from "uuid/v4";

import {
  SignS3Component,
  CreatePostMutationResult,
  CreatePostMutationFn
} from "../../components/generated/apollo-graphql";
import { Button, Flex, Text } from "../../components/styled-rebass";
import { TextFormField } from "./text-form-field";

const PostSchema = Nope.object().shape({
  text: Nope.string()
    .required("Description is required")
    .min(2, "The description must be at least two characters"),
  title: Nope.string(),
  user: Nope.string()
});

interface IFileListMutation {
  me: string;

  cardImage: Blob | undefined;
  createPost: CreatePostMutationFn;
  dataCreatePost: CreatePostMutationResult["data"];
  errorCreatePost: CreatePostMutationResult["error"];
  loadingCreatePost: CreatePostMutationResult["loading"];
}

const CreatePostMutation = ({
  cardImage,
  createPost,
  dataCreatePost,
  errorCreatePost,
  loadingCreatePost,
  me
}: IFileListMutation) => {
  const makeBlobUrlsFromReference = async (myFile: any) => {
    return await fetch(myFile)
      .then(r => r.blob())
      .then(blobFile => {
        const getFileName = uuid();

        let createNewFile = new File([blobFile], getFileName, {
          type: "image/png" // blobFile.type
        });

        return createNewFile;
      });
  };
  const uploadToS3 = async ({ file, signedRequest }: any) => {
    const options = {
      headers: {
        "Content-Type": "image/png"
      }
    };
    let theFile = file;

    let s3ReturnInfo = await Axios.put(
      signedRequest,
      theFile,
      options
    ).catch(error => console.error({ error }));

    return s3ReturnInfo;
  };

  return (
    <SignS3Component>
      {(
        signS3,
        // @ts-ignore
        { data: dataSignS3, error: errorSignS3, loading: loadingSignS3 }
      ) => {
        return (
          <Flex
            border="1px #ccc solid"
            width={1}
            mt={3}
            p={3}
            flexDirection="column"
            style={{
              position: "relative"
            }}
          >
            <Text>{dataCreatePost ? "post created" : ""}</Text>
            <Text>{errorCreatePost ? "error creating post" : ""}</Text>
            <Formik
              // validationSchema={PostSchema}

              validate={values => {
                type myErrorObj = {
                  [key: string]: string;
                };
                let validationErrors: myErrorObj = {};
                let nopeValidationErrors = PostSchema.validate(values);

                if (nopeValidationErrors) {
                  // if nope validation returns `ShapeErrors` push...
                  // each error onto the error object...
                  // if it's undefined there were no errors
                  let errorValues = Object.entries(nopeValidationErrors);
                  errorValues.forEach(fieldError => {
                    validationErrors[fieldError[0]] = fieldError[1];
                  });
                }

                // if there are object keys for `errors` return the errors object
                if (Object.keys(validationErrors).length > 0) {
                  return validationErrors;
                }

                if (Object.keys(validationErrors).length === 0) {
                  return {};
                }
              }}
              initialValues={{
                text: "",
                title: "",
                user: me
              }}
              onSubmit={async ({ user, text, title }, { resetForm }) => {
                let getVariables = await makeBlobUrlsFromReference(cardImage);

                let s3SignatureResponse = await signS3({
                  variables: {
                    files: [
                      {
                        filename: getVariables.name,
                        filetype: getVariables.name
                      }
                    ]
                  }
                });

                if (s3SignatureResponse && s3SignatureResponse.data) {
                  await uploadToS3({
                    file: cardImage,
                    signedRequest:
                      s3SignatureResponse.data.signS3.signatures[0]
                        .signedRequest
                  });

                  resetForm();

                  await createPost({
                    variables: {
                      data: {
                        images: [
                          s3SignatureResponse.data.signS3.signatures[0].url
                        ],
                        text,
                        title,
                        user
                      }
                    }
                  });
                }
              }}
            >
              {() => {
                return (
                  <Form>
                    <Field name="user" hidden component={TextFormField} />
                    <Field
                      name="text"
                      label="Text"
                      loadingCreatePost={loadingCreatePost}
                      placeholder="Propel ships"
                      component={TextFormField}
                    />
                    <Field
                      name="title"
                      label="Title"
                      loadingCreatePost={loadingCreatePost}
                      placeholder="Fuel trucks"
                      component={TextFormField}
                    />
                    <Button
                      type="submit"
                      // onClick={() => submitForm()}
                      // disabled={loadingCreatePost}
                      bg={loadingCreatePost ? "#ccc" : "blue"}
                      mt={3}
                    >
                      Sign S3 Upload to S3
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Flex>
        );
      }}
    </SignS3Component>
  );
};

export default CreatePostMutation;
