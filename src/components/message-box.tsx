import React from "react";
import distanceInWords from "date-fns/distance_in_words";

import { Card, Flex, Text, Box } from "./styled-rebass";
import { Image } from "rebass";
import UserProfileImage from "./user-avatar";

interface IMessageBox {
  me: any;
  message: any;
  handleRemoveInviteeToThread: any;
}

export function MessageBox({
  me,
  message,
  handleRemoveInviteeToThread
}: IMessageBox) {
  return (
    <Flex
      flexDirection="row"
      my={2}
      p={3}
      ml={me !== message.sentBy.id ? [1, 1, "auto"] : 0}
      mr={me === message.sentBy.id ? 0 : [1, 1, "auto"]}
      width={1}
    >
      {me === message.sentBy.id ? (
        <UserProfileImage
          isMe={me === message.sentBy.id}
          flexInstruction="column"
          user={message.sentBy}
          buttonThing={false}
          color="blue"
          handleRemoveInviteeToThread={handleRemoveInviteeToThread}
        />
      ) : (
        ""
      )}
      <Card
        my={2}
        p={3}
        color={me === message.sentBy.id ? "white" : "thread_selected"}
        bg={
          me === message.sentBy.id ? "chat_bubble_me" : "#eee" // "chat_bubble_them"
        }
        ml={me !== message.sentBy.id ? [1, 1, "auto"] : 0}
        mr={me === message.sentBy.id ? 0 : [1, 1, "auto"]}
        width={1}
        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
      >
        {message.images && message.images.length > 0 ? (
          <Image src={`${message.images[0].uri}`} />
        ) : (
          ""
        )}

        <Box
          bg="white" // {me === message.sentBy.id ? "white" : "transparent"}
          p={3}
          color="thread_selected"
        >
          <Text color="#b2b2d8" fontSize="0.9em" mt={2} mb={1}>
            <em>
              {" "}
              {distanceInWords(
                Date.now(),
                new Date(Date.parse(message.created_at))
              )}
            </em>
          </Text>
          <Text>{message.message}</Text>
        </Box>
      </Card>
      {me !== message.sentBy.id ? (
        <UserProfileImage
          flexInstruction="column"
          isMe={me === message.sentBy.id}
          user={message.sentBy}
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
        //   <Text color="text">{message.sentBy.firstName}</Text>
        // </Flex>
        ""
      )}
    </Flex>
  );
}
