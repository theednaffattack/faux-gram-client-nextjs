import React from "react";

import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  FlexUserProfileWrap,
  Avatar
} from "./styled-rebass";

export interface IUserProfileImage {
  user?: any;
  flexInstruction?: "row" | "column";
  color?: string;
  handleRemoveInviteeToThread?: any;
  isMe?: boolean;
  buttonThing?: boolean;
}

function UserProfileImage({
  user,
  flexInstruction,
  color,
  handleRemoveInviteeToThread,
  isMe,
  buttonThing
}: IUserProfileImage) {
  const isMeLeftMargin = isMe ? 0 : 3;
  const isMeRightMargin = isMe ? 3 : 1;
  return (
    <Flex
      mt={2}
      ml={isMeLeftMargin}
      mr={isMeRightMargin}
      flexDirection={flexInstruction ? flexInstruction : "row"}
      alignItems="center"
      style={{ minHeight: "40px" }}
      // width="200px"
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
        {user && user.profileImage ? (
          <Avatar src={user.profileImage} />
        ) : (
          <Icon mt={3} size="2em" name="user" fill="white" />
        )}
      </FlexUserProfileWrap>
      <Box>
        {user ? (
          <Text
            ml={flexInstruction === "row" ? 2 : 0}
            color={color ? color : "text"}
          >
            {user.firstName} {user.lastName}
          </Text>
        ) : (
          ""
        )}
        {user && user.username ? <Text>{user.username}</Text> : ""}
      </Box>

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
