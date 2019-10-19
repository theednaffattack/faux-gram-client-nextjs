import React from "react";

import {
  Button,
  Flex,
  Icon,
  Text,
  FlexUserProfileWrap,
  Avatar
} from "./styled-rebass";
import { IUserProfileImage } from "./types";

function UserProfileImage({
  user,
  flexInstruction,
  color,
  handleRemoveInviteeToThread,
  isMe,
  buttonThing
}: IUserProfileImage) {
  const isMeLeftMargin = isMe ? 0 : 3;
  const isMeRightMargin = isMe ? 3 : 0;
  return (
    <Flex
      mt={2}
      ml={isMeLeftMargin}
      mr={isMeRightMargin}
      flexDirection={flexInstruction ? flexInstruction : "row"}
      alignItems="center"
      style={{ minHeight: "40px" }}
    >
      <FlexUserProfileWrap
        height="40px"
        width="40px"
        overflow="hidden"
        borderRadius="50%"
        bg="thread_footer"
        alignItems="center"
        justifyContent="center"
        boxShadow="2px 2px 16px rgba(0, 0, 0, 0.25)"
      >
        {user.profileImage ? (
          <Avatar src={user.profileImage} />
        ) : (
          <Icon mt={3} size="2em" name="user" fill="white" />
        )}
      </FlexUserProfileWrap>

      <Text color={color ? color : "text"}>
        {user.firstName} {user.lastName}
      </Text>
      {buttonThing}
      {flexInstruction === "column" || !buttonThing ? (
        ""
      ) : (
        <Button
          m={0}
          ml={2}
          type="button"
          bg="rgba(0,0,0,0.2)"
          style={{ overflow: "hidden", padding: 0 }}
          onClick={() => handleRemoveInviteeToThread({ user })}
        >
          <Icon name="close" size="1.5em" fill="#b2b2d8" />
        </Button>
      )}
    </Flex>
  );
}

export default UserProfileImage;
