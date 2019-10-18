import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import Icon from "../modules/icon/icon";

import { AddMessageToThreadComponent } from "./generated/apollo-graphql";
import { Flex, AbFlex, Button, Card, Image, MinButton } from "./styled-rebass";
// import ImagePreview from "./messages-image-preview";
// import ImagePreview from "./messages-image-preview_v2";
import { ChatField } from "./fields/chat-input-field";
import IconAddFile from "./add-file-icon";

export const inputStyles = {
  display: "none"
};

// const { log } = console;

export interface IAddMessageToThreadProps {
  chatEmoji: string;
  disabled: boolean;
  emojiPickerVisible: boolean;
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  sentTo: any;
  threadId: string;

  handleClearFilePreview: any;
  handleRemoveIndividualImagePreview: any;
  files: any[];
  openFileDialog: any;
  fileInputRef: any;
  onFilesAdded: any;
  makeBlobUrls: any;
  newThreadInvitees: any[];
  getS3Signature: any;
}

// const isBrowser = typeof window !== "undefined";

function AddMessageToThread({
  chatEmoji,
  disabled,
  // emojiPickerVisible,
  // handleOpenEmojiMenuClick,
  sentTo,
  threadId,
  handleClearFilePreview,
  handleRemoveIndividualImagePreview,
  files,
  openFileDialog,
  fileInputRef,
  onFilesAdded,
  newThreadInvitees,
  getS3Signature
}: IAddMessageToThreadProps) {
  return (
    <AddMessageToThreadComponent>
      {(
        addMessageToThread
        // ,
        // {
        //   data: dataAddMessage,
        //   error: errorAddMessage,
        //   loading: loadingAddMessage
        // }
      ) => {
        return (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors, resetForm }) => {
              let dataForSubmitting;

              if (files && files.length > 0) {
                const imagesAreUploadedToS3 = await getS3Signature();

                // let preppedImages = imagesAreUploadedToS3.map(
                //   (image: any) => image.url
                // );

                // let someFiles = await makeBlobUrls();
                dataForSubmitting = {
                  threadId,
                  sentTo,
                  invitees: newThreadInvitees.map(person => person.id),
                  message: data.message,
                  images: imagesAreUploadedToS3.map((image: any) => image.url)
                };
              } else {
                dataForSubmitting = {
                  threadId,
                  sentTo,
                  invitees: newThreadInvitees.map(person => person.id),
                  message: data.message
                };
              }

              let response;

              try {
                response = await addMessageToThread({
                  variables: dataForSubmitting
                  // we don't update here because of subscriptions
                });
              } catch (error) {
                const displayErrors: { [key: string]: string } = {};

                let myErrors = error.graphQLErrors; //.extensions.exception.validationErrors;

                myErrors.forEach((errorThing: any) => {
                  displayErrors[errorThing.path[0]] = errorThing.message;
                });
                // myErrors.forEach((validationError: any) => {
                //   Object.values(validationError.constraints).forEach(
                //     (message: any) => {
                //       displayErrors[validationError.property] = message;
                //     }
                //   );
                // });

                return setErrors(displayErrors);

                // return setErrors({
                //   chat: "invalid character?"
                // });
              }

              if (response && response.data) {
                // setErrors({
                //   chat: "invalid character?"
                // });

                resetForm({
                  threadId,
                  sentTo,
                  message: chatEmoji,
                  images: []
                });

                handleClearFilePreview();
                return;
              }
            }}
            initialValues={{
              threadId,
              sentTo,
              message: "",
              images: files
            }}
          >
            {({ handleChange, setFieldValue, values }) => {
              const myChange = (e: any) => {
                setFieldValue("message", values.message + chatEmoji);

                return handleChange(e);
              };

              return (
                <Flex width={[1, 1, 1]} borderTop="2px #eee solid">
                  <Form
                    // action=""
                    // onSubmit={handleSubmit}
                    style={{ width: "100%" }}
                  >
                    <Flex
                      width={[1, 1, 1]}
                      mr="auto"
                      // alignItems="center"
                      flexDirection="column"
                      style={{ position: "relative" }}
                    >
                      <FieldArray
                        name="images"
                        render={arrayHelpers => (
                          <>
                            <Flex flexDirection="column" width={1}>
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
                                      size="2em"
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
                                              style={{
                                                cursor: "pointer"
                                                // borderRadius: "50%"
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
                                              <Image
                                                // height="auto"
                                                width={["200px"]}
                                                src={image.blobUrl}
                                                style={{
                                                  maxHeight: "175px"
                                                }}
                                              />
                                            </Flex>
                                          </Card>
                                        </Flex>
                                      )
                                    )
                                  : ""}
                              </Flex>
                            </Flex>

                            <Field id="images" name="images">
                              {() => {
                                return (
                                  <input
                                    ref={fileInputRef}
                                    type="file"
                                    // onChange={onFilesAdded}

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
                                    disabled={disabled}
                                    multiple
                                  />
                                );
                              }}
                            </Field>
                          </>
                        )}
                      />

                      <Flex width={[1, 1, 1]}>
                        <button type="submit" style={{ display: "none" }} />
                        <Field
                          id="message"
                          name="message"
                          label="message"
                          placeholder="Type something to send..."
                          type="text"
                          width="100%"
                          color="#504aa4"
                          border={0}
                          fontSize="1.1em"
                          disabled={disabled}
                          component={ChatField}
                          onChange={(e: any) => {
                            myChange(e);
                          }}
                        />

                        <Field
                          id="sentTo"
                          name="sentTo"
                          label="sentTo"
                          value={sentTo}
                          placeholder="Send to..."
                          type="hidden"
                          width="100%"
                          color="#504aa4"
                          border={0}
                          fontSize="1.1em"
                          component={ChatField}
                        />

                        <Field
                          id="threadId"
                          name="threadId"
                          label="threadId"
                          value={threadId}
                          placeholder="Thread ID..."
                          type="hidden"
                          width="100%"
                          color="#504aa4"
                          border={0}
                          fontSize="1.1em"
                          component={ChatField}
                        />
                        <Flex
                          style={{ position: "relative" }}
                          flexWrap="nowrap"
                        >
                          {/* <AbFlex
                            width={1}
                            position="absolute"
                            right={70}
                            bottom={"100%"}
                          >
                            {emojiPickerVisible && isBrowser ? (
                              <Picker
                                onSelect={
                                  emoji =>
                                    setFieldValue(
                                      "message",
                                      // @ts-ignore
                                      values.message + emoji.native
                                    )
                                  // handleSelectEmojiClick({ item: emoji })
                                }
                                title="Pick your emoji..."
                              />
                            ) : (
                              ""
                            )}
                          </AbFlex> */}
                          <MinButton
                            onClick={openFileDialog}
                            bg="transparent"
                            minHeight="35px"
                            width="3.5em"
                            style={{ padding: 0 }}
                            // mb={2}
                          >
                            {/* <input
                              ref={fileInputRef}
                              type="file"
                              onChange={onFilesAdded}
                              style={inputStyles}
                              disabled={disabled}
                              multiple
                            /> */}
                            <IconAddFile
                              fill="#b2b2d8"
                              size="1.4em"
                              name="add-file"
                              width="1.4em"
                            />
                          </MinButton>
                          {/* <MinButton
                            onClick={disabled ? null : handleOpenEmojiMenuClick}
                            bg="transparent"
                            minHeight="35px"
                            ml={[2, 2, 2]}
                            // mb={2}
                            width="3.5em"
                            style={{ padding: 0, position: "relative" }}
                          >
                            <SmileyIcon
                              name="smiley"
                              width="1.6em"
                              fill="#b2b2d8"
                            />
                          </MinButton> */}
                          {/* <MinButton
                          onClick={
                            disabled ? null : handleEngageMicrophoneClick
                          }
                          bg="transparent"
                          borderLeft="2px #eee solid"
                          // mb={2}
                          mx={3}
                          minHeight="35px"
                          width="3.5em"
                          style={{ padding: 0 }}
                        >
                          <IconMic width="1.4em" fill="#b2b2d8" />
                        </MinButton> */}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Form>
                </Flex>
              );
            }}
          </Formik>
        );
      }}
    </AddMessageToThreadComponent>
  );
}

export default AddMessageToThread;
