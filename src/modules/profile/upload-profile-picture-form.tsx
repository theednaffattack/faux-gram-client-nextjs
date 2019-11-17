import React from "react";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";

import { InputField } from "../../components/fields/input-field";
import {
  Button,
  Card,
  Flex,
  Icon,
  Image,
  MaxFlex,
  AbFlex
} from "../../components/styled-rebass";

import { inputStyles } from "./dropzone";
import { User } from "../../components/generated/apollo-graphql";

const UploadProfilePictureFormSchema = Yup.object().shape({
  images: Yup.array().required("Required")
});

export interface UploadProfilePictureFormProps {
  files: any[];
  handleDrop?: any;
  handlePost: any;
  userId: User["id"];
  fileInputKey?: string;
  setPreviewImageRef?: any;
  mutationSignS3: any;
  dataSignS3: any;
  errorSignS3: any;
  loadingSignS3: any;
  disabled: boolean;
  handleRemoveIndividualImagePreview: any;
  handleClearFilePreview: any;
  getSignature: any;
  fileListToArray: any;
  openFileDialog: any;
  onDragOver: any;
  onDragLeave: any;
  onDrop: any;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFilesAdded: any;
  highlight: boolean;
  dataCreatePost: any;
  errorCreatePost: any;
  loadingCreatePost: any;
}

function UploadProfilePictureForm({
  handlePost,
  userId,
  disabled,
  openFileDialog,
  onDragOver,
  onDragLeave,
  onDrop,
  fileInputRef,
  onFilesAdded,
  highlight,
  handleRemoveIndividualImagePreview,
  handleClearFilePreview
}: UploadProfilePictureFormProps) {
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handlePost}
      initialValues={{
        images: [],
        user: userId
      }}
      validationSchema={UploadProfilePictureFormSchema}
    >
      {({ errors, handleSubmit, setFieldValue, touched, values }) => {
        return (
          <Flex width={1} flexDirection="column" alignItems="center">
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Flex flexDirection="column" width={[1, 1, 1]}>
                <Flex
                  alignItems="center"
                  flexDirection="column"
                  width={[1, 1, 1]}
                >
                  <FieldArray
                    name="images"
                    render={arrayHelpers => (
                      <MaxFlex
                        id="clickable-overlay"
                        bg={highlight ? "rgb(188,185,236)" : "#fff"}
                        width={values.images.length === 0 ? "350px" : 1}
                        // border="2px dashed rgb(187, 186, 186)"
                        border={values.images.length === 0 ? "lime" : ""}
                        minHeight={["350px"]}
                        maxHeight={
                          values.images.length === 0 ? "350px" : "auto"
                        }
                        style={{
                          borderRadius: values.images.length === 0 ? "50%" : "",
                          fontSize: "16px",
                          cursor: disabled ? "default" : "pointer"
                        }}
                        onClick={() => {
                          // const { target, currentTarget } = event;
                          // event.preventDefault();
                          openFileDialog();
                        }}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                      >
                        <Field id="images" name="images">
                          {() => {
                            return (
                              <input
                                id="images"
                                name="images"
                                ref={fileInputRef}
                                type="file"
                                // onChange={onFilesAdded}
                                // value={field.value}
                                onChange={event => {
                                  if (
                                    event &&
                                    event.currentTarget &&
                                    event.currentTarget.files
                                  ) {
                                    let seeSomeFiles = onFilesAdded(event);

                                    setFieldValue(
                                      "images",
                                      values.images.concat(seeSomeFiles)
                                    );
                                  } else {
                                    return;
                                  }
                                }}
                                style={inputStyles}
                                multiple
                              />
                            );
                          }}
                        </Field>

                        <Flex flexDirection="column">
                          {values.images && values.images.length > 0 ? (
                            <Button
                              width={1}
                              color="text"
                              id="remove-all"
                              className="btn-remove"
                              bg="blue"
                              fontSize="1.2em"
                              type="button"
                              onClick={event => {
                                event.stopPropagation();

                                values.images.forEach(() =>
                                  arrayHelpers.remove(0)
                                );
                              }}
                              style={{
                                cursor: "pointer"
                              }}
                            >
                              <span role="img">
                                <Icon
                                  name="close"
                                  fill="crimson"
                                  size="1.5em"
                                />
                              </span>
                              Close All
                            </Button>
                          ) : (
                            ""
                          )}
                          <Flex width={1} flexWrap="wrap">
                            {values.images && values.images.length > 0
                              ? values.images.map(
                                  (image: any, index: number) => (
                                    <Flex
                                      key={index}
                                      width={["200px"]}
                                      flexDirection="column"
                                      style={{
                                        position: "relative"
                                      }}
                                    >
                                      <AbFlex
                                        position="absolute"
                                        top={0}
                                        right={0}
                                      >
                                        <Button
                                          width={0.18}
                                          id={`remove-${index}`}
                                          className="btn-remove"
                                          bg="transparent"
                                          fontSize="2em"
                                          type="button"
                                          onClick={event => {
                                            event.stopPropagation();

                                            handleRemoveIndividualImagePreview(
                                              index
                                            );
                                            arrayHelpers.remove(index);
                                          }} // remove a friend from the list
                                          sx={{
                                            borderRadius: "50%"
                                          }}
                                          style={{
                                            cursor: "pointer"
                                          }}
                                        >
                                          <span role="img">
                                            <Icon
                                              name="close"
                                              fill="rebeccapurple"
                                              size="1.5em"
                                            />
                                          </span>
                                        </Button>
                                      </AbFlex>

                                      <Card
                                        fontSize={6}
                                        fontWeight="bold"
                                        width={[1, 1, 1]}
                                        my={5}
                                        bg="blue"
                                        sx={{
                                          borderRadius: 8
                                        }}
                                        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                                      >
                                        <Flex
                                          flexDirection="column"
                                          width={[1, 1, 1]}
                                        >
                                          {
                                            <Image
                                              // height="auto"
                                              width={["200px"]}
                                              src={image.blobUrl}
                                              style={{ maxHeight: "175px" }}
                                            />
                                          }
                                        </Flex>
                                      </Card>
                                    </Flex>
                                  )
                                )
                              : ""}
                          </Flex>
                        </Flex>
                      </MaxFlex>
                    )}
                  />
                  {errors.images && touched.images ? (
                    <div>{errors.images}</div>
                  ) : null}
                </Flex>
              </Flex>

              <Field
                id="user"
                name="user"
                type="hidden"
                component={InputField}
              />

              <Button type="submit">submit</Button>

              <Button
                bg={values.images.length < 1 ? "grey" : "blue"}
                disabled={values.images.length < 1}
                type="button"
                onClick={handleClearFilePreview}
              >
                Clear Preview
              </Button>
            </form>
          </Flex>
        );
      }}
    </Formik>
  );
}

export default UploadProfilePictureForm;
