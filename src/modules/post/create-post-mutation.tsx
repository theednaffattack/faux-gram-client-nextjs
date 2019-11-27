import React from "react";
import Axios from "axios";
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import Nope from "nope-validator";

import {
  CreatePostComponent,
  SignS3Component
} from "../../components/generated/apollo-graphql";
import { Button, AbFlex } from "../../components/styled-rebass";
import { TextFormField } from "./text-form-field";

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

const PostSchema = Nope.object().shape({
  text: Nope.string()
    .required()
    .min(2),
  title: Nope.string()
});

// const PostSchema = Yup.object({
//   text: Yup.string()
//     .required()
//     .min(2),
//   title: Yup.string()
// });

interface IFileListMutation {
  me: string;
  cardImage: Blob | undefined;
}

const CreatePostMutation = ({ cardImage, me }: IFileListMutation) => {
  const makeBlobUrlsFromReference = async (myFile: any) => {
    return await fetch(myFile)
      .then(r => r.blob())
      .then(blobFile => {
        const getFileName = "tempName";

        return new File([blobFile], getFileName, {
          type: blobFile.type
        });
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

  return (
    <SignS3Component>
      {(
        signS3,
        // @ts-ignore
        { data: dataSignS3, error: errorSignS3, loading: loadingSignS3 }
      ) => {
        return (
          <CreatePostComponent>
            {(
              createPost,
              // @ts-ignore
              {
                data: dataCreatePost,
                error: errorCreatePost,
                loading: loadingCreatePost
              }
            ) => {
              console.log({ dataCreatePost, errorCreatePost });
              return (
                <div
                  style={{
                    display: "flex",
                    padding: "16px",
                    flexDirection: "column",
                    border: "1px #ccc solid",
                    marginTop: "8px",
                    width: "640px",
                    position: "relative"
                  }}
                >
                  {loadingCreatePost ? (
                    <AbFlex
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="rgba(255,255,255,0.7)"
                      justifyContent="center"
                      alignItems="center"
                    >
                      WEIRD
                    </AbFlex>
                  ) : (
                    ""
                  )}
                  {loadingSignS3 ? "contacting S3" : ""}

                  <Formik
                    validationSchema={PostSchema}
                    initialValues={{
                      text: "",
                      title: "",
                      user: me
                    }}
                    onSubmit={async ({ user, text, title }) => {
                      let getVariables = await makeBlobUrlsFromReference(
                        cardImage
                      );

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
                                s3SignatureResponse.data.signS3.signatures[0]
                                  .url
                              ],
                              text,
                              title,
                              user
                            }
                          }
                        });

                        console.log("AFTER ALL POSTS", {
                          getUrl,
                          newPost
                        });
                      }
                    }}
                  >
                    {({ errors }) => {
                      console.log("VIEW ERRORS", { errors });
                      return (
                        <Form>
                          <Field name="user" hidden component={TextFormField} />
                          <Field
                            name="text"
                            label="Text"
                            placeholder="Propel ships"
                            component={TextFormField}
                          />
                          <Field
                            name="title"
                            label="Title"
                            placeholder="Fuel trucks"
                            component={TextFormField}
                          />
                          <Button mt={3}>Sign S3 Upload to S3</Button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              );
            }}
          </CreatePostComponent>
        );
      }}
    </SignS3Component>
  );
};

export default CreatePostMutation;
