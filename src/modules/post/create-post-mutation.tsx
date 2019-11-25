import React from "react";
import Axios from "axios";

import {
  CreatePostComponent,
  SignS3Component
  // CreatePostMutationVariables,
  // SignedS3SubPayload,
  // SignS3MutationVariables,
  // Image,
  // Post
} from "../../components/generated/apollo-graphql";
// import { ApolloError } from "apollo-client";
// import { MutationFunction } from "@apollo/react-common";

interface IFileListMutation {
  me: string;
  cardImage: Blob | undefined;
}

const CreatePostMutation = ({ cardImage, me }: IFileListMutation) => {
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
              return (
                <div
                  style={{
                    display: "flex",

                    flexDirection: "column",
                    border: "2px crimson solid"
                  }}
                >
                  {loadingSignS3 ? "contacting S3" : ""}
                  <button
                    onClick={async () => {
                      let getVariables = await makeBlobUrlsFromReference(
                        cardImage
                      );
                      // console.log("VIEW getVariables ", {
                      //   cardImage,
                      //   getVariables: {
                      //     filename: getVariables.name,
                      //     filetype: getVariables.type,
                      //     lastModified: getVariables.lastModified,
                      //     size: getVariables.size
                      //   },
                      //   signS3
                      // });
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
                        console.log("VIEW s3SignatureResponse", {
                          s3SignatureResponse
                        });

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
                              text: "some text",
                              title: "a title",
                              user: me
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
                    Sign S3 Upload to S3
                  </button>
                </div>
              );
            }}
          </CreatePostComponent>
        );
      }}
    </SignS3Component>
  );
};

async function makeBlobUrlsFromReference(myFile: any) {
  return await fetch(myFile)
    .then(r => r.blob())
    .then(blobFile => {
      const getFileName = "tempName";

      return new File([blobFile], getFileName, {
        type: blobFile.type
      });
    });
}

export default CreatePostMutation;
