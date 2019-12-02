import React from "react";
import Axios from "axios";
import { Formik, Form, Field } from "formik";
import uuid from "uuid/v4";

import {
  SignS3Component,
  CreatePostMutationResult,
  CreatePostMutationFn
} from "../../components/generated/apollo-graphql";
import { Button, Flex } from "../../components/styled-rebass";
import { TextFormField } from "./text-form-field";
import { isBrowser } from "../../lib/isBrowser";

// const UserSchema = Nope.object().shape({
//   name: Nope.string()
//     .min(5, "Please provide a longer name")
//     .max(255, "Name is too long!"),
//   email: Nope.string()
//     .email()
//     .required(),
//   confirmEmail: Nope.string()
//     .oneOf([Nope.ref("email")])
//     .requried()
// });

// const PostSchema = Nope.object().shape({
//   text: Nope.string()
//     .required()
//     .min(2),
//   title: Nope.string()
// });

const PostSchema = Yup.object({
  text: Yup.string()
    .required()
    .min(2),
  title: Yup.string()
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
    console.log("look at theFile", file);

    // const theFile = await this.makeBlobUrlsFromReference(file)
    let theFile = file;

    console.log("look at theFile", theFile);

    let s3ReturnInfo = await Axios.put(
      signedRequest,
      theFile,
      options
    ).catch(error => console.error({ error }));

    console.log("s3ReturnInfo".toUpperCase(), s3ReturnInfo);

    return s3ReturnInfo;
  };

  console.log("INSIDE create-post-mutation.tsx", {
    dataCreatePost,
    errorCreatePost
  });
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
            <Formik
              validationSchema={PostSchema}
              initialValues={{
                text: "",
                title: "",
                user: me
              }}
              onSubmit={async ({ user, text, title }) => {
                alert(
                  `submitting!\n${JSON.stringify(
                    { user, text, title },
                    null,
                    2
                  )}`
                );
                let getVariables = await makeBlobUrlsFromReference(cardImage);
                alert(JSON.stringify(getVariables, null, 2));
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
                  let getUrl = await uploadToS3({
                    file: cardImage,
                    signedRequest:
                      s3SignatureResponse.data.signS3.signatures[0]
                        .signedRequest
                  });

                  let newPost = await createPost({
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

                  if (isBrowser) {
                    alert(
                      `createPost!\n${JSON.stringify(
                        {
                          trudell:
                            s3SignatureResponse.data.signS3.signatures[0].url
                        },
                        null,
                        2
                      )}`
                    );
                  }

                  console.log("AFTER ALL POSTS", {
                    getUrl,
                    newPost
                  });
                }
              }}
            >
              {({ errors, submitForm }) => {
                console.log("VIEW ERRORS", { errors, loadingCreatePost });
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
                      type="button"
                      onClick={() => submitForm()}
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
