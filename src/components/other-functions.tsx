import React from "react";
import Icon from "../modules/icon/icon";

import { Flex, Text } from "./styled-rebass";

export function LastMessage({ message }: any) {
  return (
    <Flex width={[1, 1, 1]}>
      <Flex ml={3} flexDirection="column" justifyContent="center">
        <Icon name="user" fill="white" size="2em" />
      </Flex>

      <Flex width={1} p={3} flexDirection="row" alignItems="center">
        <Text fontWeight={600} fontSize="1em">
          {message.messages[message.messages.length - 1].sentBy.firstName}{" "}
          {message.messages[message.messages.length - 1].sentBy.lastName}
        </Text>
        <Text ml={2} fontSize="1em">
          {message.messages[message.messages.length - 1].message}
        </Text>
      </Flex>
    </Flex>
  );
}

export function MappedMessage(data: any) {
  return data.data.map((message: any) => {
    return (
      <div key={`${message.__typename}-${message.id}`}>
        <Text>{message.id}</Text>
        <Text>{message.user.firstName}</Text>
        <Text>{message.message}</Text>
      </div>
    );
  });
}

export function MappedThreads({
  data,
  handleThreadSelection,
  selectedThread
}: any) {
  return data.map((thread: any, index: any) => {
    return (
      <Flex
        bg={selectedThread === index ? "#363657" : "#545281"}
        // bg="#545281"
        width={[1, 1, 1]}
        key={`${index}-${thread.__typename}`}
        onClick={() =>
          handleThreadSelection({ index, key: `${index}-${thread.__typename}` })
        }
      >
        <LastMessage message={thread} />
      </Flex>
    );
  });
}
