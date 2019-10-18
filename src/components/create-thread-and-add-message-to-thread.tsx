import React from "react";
import { Formik, Field } from "formik";

import { Flex, MinButton } from "./styled-rebass";
import {
  CreateMessageThreadComponent,
  GetOnlyThreadsQuery
} from "./generated/apollo-graphql";
import ImagePreview from "./image-preview";
import { ChatField } from "./fields/chat-input-field";
import IconAddFile from "./add-file-icon";

import { GET_ONLY_THREADS } from "../graphql/user/queries/get-only-threads";

export const inputStyles = {
  display: "none"
};

export interface ICreateThreadAndAddMessageToThreadProps {
  chatEmoji: string;
  emojiPickerVisible: boolean;
  fileInputRef: any;
  files: any[];
  getS3Signature: any;
  handleClearFilePreview: any;
  handleEngageMicrophoneClick: any;
  handleOpenEmojiMenuClick: any;
  handleRemoveIndividualImagePreview: any;
  handleThreadSelection: any;
  makeBlobUrls: any;
  newThreadDisabled: boolean;
  newThreadInvitees: any[];
  openFileDialog: any;
  onFilesAdded: any;
  sentTo: any;
  threadId: string | null;
}

const CreateThreadAndAddMessageToThread = ({
  chatEmoji,
  fileInputRef,
  files,
  newThreadInvitees,
  handleThreadSelection,
  handleClearFilePreview,
  openFileDialog,
  onFilesAdded,
  makeBlobUrls,
  newThreadDisabled,
  sentTo
}: ICreateThreadAndAddMessageToThreadProps) => {
  return (
    <CreateMessageThreadComponent>
      {(
        createMessageThread
        // ,
        // {
        //   data: dataAddMessage,
        //   error: errorAddMessage,
        //   loading: loadingAddMessage
        // }
      ) => {
        return (
          <Formik
            // enableReinitialize={true}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { resetForm }) => {
              let dataForSubmitting;
              let mySentTo;

              if (files && files.length > 0) {
                mySentTo = newThreadInvitees[0];
                let someFiles = await makeBlobUrls();
                dataForSubmitting = {
                  sentTo: mySentTo.id,
                  invitees: newThreadInvitees.map(person => person.id),
                  message: data.message,
                  images: [...someFiles]
                };
              } else {
                mySentTo = newThreadInvitees[0];
                console.log({ mySentTo });
                dataForSubmitting = {
                  sentTo: mySentTo.id,
                  invitees: newThreadInvitees.map(person => person.id),
                  message: data.message
                };
              }

              let response;
              let myStuff: any;

              try {
                response = await createMessageThread({
                  variables: dataForSubmitting,
                  update: (cache, { data }) => {
                    console.log("ERROR UPDATING?", data);
                    console.log("CACHE?", cache);

                    if (!data || !data.createMessageThread) {
                      return;
                    }
                    // myStuff = cache.readQuery<GetOnlyThreadsQuery>({
                    //   query: GET_ONLY_THREADS
                    // });

                    let fromCache = cache.readQuery<GetOnlyThreadsQuery>({
                      query: GET_ONLY_THREADS
                    });

                    if (fromCache && fromCache.getOnlyThreads) {
                      console.log("ERROR UPDATING?", data);
                      console.log("MYSTUFF?", fromCache);

                      // COME BACK TO THIS
                      // fromCache.getOnlyThreads.push(data.createMessageThread);

                      myStuff = fromCache;

                      cache.writeQuery<GetOnlyThreadsQuery>({
                        query: GET_ONLY_THREADS,
                        data: fromCache
                      });
                    } else {
                      return;
                    }
                  }
                });
              } catch (error) {
                console.log("A BIG ERROR", error);
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

                // return setErrors(displayErrors);

                // return setErrors({
                //   chat: "invalid character?"
                // });
              }

              if (response && response.data) {
                // setErrors({
                //   chat: "invalid character?"
                // });

                handleClearFilePreview();

                resetForm({
                  sentTo,
                  message: chatEmoji
                });

                // @ts-ignore
                if (myStuff && myStuff.getOnlyThreads) {
                  // @ts-ignore
                  let newThreadId =
                    myStuff.getOnlyThreads[myStuff.getOnlyThreads.length - 1]
                      .id;
                  console.log("SHOULD BE SUBMITTING PROPERLY");
                  handleThreadSelection({ threadId: newThreadId });
                }
                return;
              }
            }}
            initialValues={{
              sentTo,
              message: ""
            }}
          >
            {({ handleChange, handleSubmit, setFieldValue, values }) => {
              const myChange = (e: any) => {
                // const targetEl = e.target;
                // const fieldName = targetEl.name;

                // handleChatFieldChange(values.message);
                setFieldValue("message", values.message + chatEmoji);

                // setFormValues({
                //   ...formValues,
                //   [fieldName]: targetEl.value
                // });
                return handleChange(e);
              };

              return (
                <Flex width={[1, 1, 1]}>
                  <Flex
                    width={[1, 1, 1]}
                    mr="auto"
                    alignItems="center"
                    flexDirection="column"
                    style={{ position: "relative" }}
                  >
                    <ImagePreview imageFiles={files} />
                    <Flex width={[1, 1, 1]}>
                      <form
                        action=""
                        onSubmit={handleSubmit}
                        style={{ width: "100%" }}
                      >
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
                          disabled={newThreadDisabled}
                          component={ChatField}
                          onChange={(e: any) => {
                            // alert(e);
                            myChange(e);
                            // handleChatFieldChange(values.message);
                            // setFormValues({
                            //   ...formValues,
                            //   [fieldName]: targetEl.value
                            // });
                            // return handleChange(e);
                          }}
                          // onChange={e => {
                          //   myChange(e);
                          //   return handleChange(e);
                          // }}

                          // onChange={onChange}
                          // InputProps={{ onChange: onChange }}
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
                      </form>

                      <Flex style={{ position: "relative" }}>
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
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={onFilesAdded}
                            style={inputStyles}
                            disabled={newThreadDisabled}
                            multiple
                          />
                          <IconAddFile
                            fill="#b2b2d8"
                            size="1.4em"
                            name="add-file"
                          />
                        </MinButton>
                        {/* <MinButton
                            onClick={
                              newThreadDisabled
                                ? null
                                : handleEngageMicrophoneClick
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
                </Flex>
              );
            }}
          </Formik>
        );
      }}
    </CreateMessageThreadComponent>
  );
};

export default CreateThreadAndAddMessageToThread;
