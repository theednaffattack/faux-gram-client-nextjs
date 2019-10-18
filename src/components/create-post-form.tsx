import React from "react";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";

import { InputField } from "./fields/input-field";
import {
  Button,
  Card,
  Flex,
  Icon,
  Image,
  MaxFlex,
  AbFlex
} from "./styled-rebass";

import { inputStyles } from "./dropzone";
import { PosedFlash } from "./posed-components";

const { log } = console;

const CreatePostSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  text: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  images: Yup.array().required("Required")
});

export interface ICreatePostFormProps {
  //   handleFormUpload: any;
  files: any[];
  handleDrop?: any;
  handlePost: any;
  me: any;
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

function CreatePostForm({
  handlePost,
  me,
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
}: ICreatePostFormProps) {
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handlePost}
      initialValues={{
        text: "",
        title: "",
        // pic: null,
        images: [],
        user: me
      }}
      validationSchema={CreatePostSchema}
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
                          {({ field, form }: any) => {
                            log({ form });
                            log("field", { field });

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

                                    console.log(
                                      "VIEW THE ONCHANGE EVENT and FILES",
                                      seeSomeFiles
                                    );
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
                                            log(
                                              "event.target from button",
                                              event.target
                                            );
                                            log(
                                              "event.currentTarget from button",
                                              event.currentTarget
                                            );
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
                                        // backgroundImage={`url(${files[index].blobUrl})`}
                                        // p={5}
                                        my={5}
                                        // bg="#f6f6ff"
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
                    <div>
                      <PosedFlash color="rebeccapurple">
                        {errors.images}
                      </PosedFlash>
                    </div>
                  ) : null}
                </Flex>
              </Flex>
              <Field
                id="title"
                name="title"
                placeholder="title this post"
                component={InputField}
              />

              <Field
                id="text"
                name="text"
                placeholder="say a few words"
                component={InputField}
              />
              <Field
                id="user"
                name="user"
                type="hidden"
                component={InputField}
              />

              <Button type="submit">submit</Button>

              <Button type="button" onClick={handleClearFilePreview}>
                Clear `Files` State
              </Button>
            </form>
          </Flex>
        );
      }}
    </Formik>
  );
}

export default CreatePostForm;
