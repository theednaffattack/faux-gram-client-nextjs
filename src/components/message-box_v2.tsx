import React from "react";
import distanceInWords from "date-fns/distance_in_words";

import { Card, Flex, Text } from "./styled-rebass";
import UserProfileImage from "./user-avatar";
import { TImageModalState } from "./infinite-loader";

interface IMessageBoxProps {
  me: any;
  message: any;
  handleRemoveInviteeToThread: any;
  sentBy: any;
  createdAt: string;
  images: any[];
  style: any;
  handleToggleImageModal: any;
  imageModalState: TImageModalState;
  fetchMoreGetMessagesByThreadId: any;
  pageInfo: any;
  type: string;
  allData: any;
  threadId: string;
  itemIndex: number;
}
interface CustomImage {
  src: string;
  imgWidth?: string;
}

interface IShowAllImagesProps {
  images: CustomImage[];
  imageModalState: TImageModalState;
  itemIndex: number;
  handleToggleImageModal: any;
}

const ShowAllImages = ({
  itemIndex,
  images,
  imageModalState,
  handleToggleImageModal
}: IShowAllImagesProps) => {
  const size = images.length < 3 ? images.length : 3;

  const FirstThreeImages = images
    .slice(0, size)
    .map((image: any, index: number, imagesArr: any[]) => (
      <div
        className="message-image"
        key={`customImage-${index}`}
        onClick={() => handleToggleImageModal(itemIndex)}
        style={{
          overflow: "hidden",
          minHeight: "131px",
          width: imagesArr.length > 1 ? "175px" : "350px",
          // minWidth: "175px",
          // maxWidth: "175px",
          // borderRadius: "0.5px",
          backgroundImage: `url("${image.uri}")`,
          backgroundSize: "cover"
        }}
      >
        {imageModalState}
      </div>
    ));

  return <>{FirstThreeImages}</>;
};

export function MessageBox({
  me,
  message,
  handleRemoveInviteeToThread,
  sentBy,
  createdAt,
  images,
  handleToggleImageModal,
  imageModalState,
  type,
  itemIndex
}: IMessageBoxProps) {
  return (
    <Flex flexDirection="row" my="8px" p="16px" width={1}>
      {me.id === sentBy.id && type !== "LoadingIndicator" ? (
        <UserProfileImage
          isMe={me.id === sentBy.id}
          flexInstruction="column"
          user={sentBy}
          buttonThing={false}
          color="blue"
          handleRemoveInviteeToThread={handleRemoveInviteeToThread}
        />
      ) : (
        ""
      )}

      <Card
        color={me.id === sentBy.id ? "white" : "thread_selected"}
        bg={
          me.id === sentBy.id ? "chat_bubble_me" : "#eee" // "chat_bubble_them"
        }
        width={1}
        my="8px"
        p="16px"
        // ml={me !== sentBy.id ? [1, 1, "auto"] : 0}
        // mr={me === sentBy.id ? 0 : [1, 1, "auto"]}
        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
      >
        <Flex bg="#eee" flexDirection="column" p={0} m={0}>
          <Flex
            flexWrap="wrap"
            width={1}
            justifyContent="center"
            style={{ position: "relative" }}
          >
            {images && images.length > 0 ? (
              <ShowAllImages
                itemIndex={itemIndex}
                handleToggleImageModal={handleToggleImageModal}
                images={images}
                imageModalState={imageModalState}
              />
            ) : (
              ""
            )}
            {images && images.length > 3 ? (
              <button
                style={{ color: "crimson" }}
                onClick={handleToggleImageModal}
              >
                click to see more ({imageModalState})
              </button>
            ) : (
              ""
            )}
          </Flex>
          <Text color="#b2b2d8" fontSize="14.4px" mt={2} mb={1}>
            <em>
              {distanceInWords(Date.now(), new Date(Date.parse(createdAt)))}
            </em>
          </Text>
          <Text
            as="p"
            className="message-text"
            color="text"
            fontSize="16px"
            mt="16px"
          >
            {message}
          </Text>
        </Flex>
        {/* } */}
      </Card>
      {me.id !== sentBy.id && type !== "LoadingIndicator" ? (
        <UserProfileImage
          flexInstruction="column"
          isMe={me.id === sentBy.id}
          user={sentBy}
          buttonThing={false}
          color="blue"
          handleRemoveInviteeToThread={handleRemoveInviteeToThread}
        />
      ) : (
        // <Flex ml={3} flexDirection="column" alignItems="center">
        //   <Flex
        //     height="40px"
        //     width="40px"
        //     my={2}
        //     bg="thread_footer"
        //     alignItems="center"
        //     justifyContent="center"
        //     boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
        //     style={{
        //       borderRadius: "50%"
        //     }}
        //   >
        //     <Icon size="2em" name="user" fill="white" />
        //   </Flex>
        //   <Text color="text">{sentBy.firstName}</Text>
        // </Flex>
        ""
      )}
    </Flex>
  );
}
