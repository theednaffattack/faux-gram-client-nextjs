import React from "react";
import styled from "styled-components";
import IconBase from "../modules/icon/icon";
import {
  borders,
  color,
  fontSize,
  minHeight,
  space,
  width
} from "styled-system";

import { Button, Flex, Heading, AbFlex } from "./styled-rebass";
import { MappedThreads } from "./other-functions";
import { Box } from "rebass";

export const Icon = styled(IconBase)`
  ${space}
`;

export const MinButton = styled(Button)`
  ${minHeight}
  ${space}
`;

// interface IThreadInputProps
//   extends BordersProps,
//     ColorProps,
//     FontSizeProps,
//     SpaceProps,
//     WidthProps {
//   type: string;
//   placeholder: string;
// }

// : React.FC<IThreadInputProps>

export const ThreadInput = styled.input`
  ${borders}
  ${color}
  ${fontSize}
  ${space}
  ${width}

  box-sizing: border-box;

/* ::placeholder, */
&::-webkit-input-placeholder {
  color: ${props => props.theme.colors.chat_placeholder};
}
:-ms-input-placeholder {
  color: ${props => props.theme.colors.chat_placeholder};
}
`;

const breakWidths = [0, 0, 0, 0, 1 / 5];

interface IThreadBodyProps {
  data: any;
  handleThreadMenuClick: any;
  selectedThreadIndex: any;
  handleThreadSelection: any;
  handleThreadAddThreadClick: any;
  selectedThread: any;
}

function ThreadBody({
  data,
  handleThreadMenuClick,
  handleThreadSelection,
  handleThreadAddThreadClick,
  selectedThread
}: IThreadBodyProps) {
  return (
    <Flex
      bg="thread_bg"
      // flex="1 1 auto"

      flexDirection="column"
      width={breakWidths}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0
      }}
    >
      <Flex bg="thread_header" flexDirection="column">
        <Flex alignItems="center">
          <Heading p={3} mr="auto">
            Thread Header
          </Heading>
          <MinButton
            width="45px"
            mr={3}
            bg="transparent"
            type="button"
            onClick={handleThreadMenuClick}
            style={{
              padding: 0
            }}
          >
            <Icon size="1.7em" fill="#b2b2d8" name="list" />
          </MinButton>
        </Flex>
        <Flex
          // p={0}
          // pr={3}
          bg="thread_bg"
          borderBottom="1px rgba(255,255,255, 0.2) solid"
          alignItems="center"
        >
          <Box mx={3}>
            <Icon name="search" fill="#b2b2d8" size="1.3em" />
          </Box>

          <ThreadInput
            // border={0}
            type="text"
            width="150px"
            // width={[1, 1, 1]}
            // color="#b2b2d8"
            // mr="auto"
            // p={2}
            // fontSize="1em"
            // bg="#3F3C62"
            placeholder="Search"
          />

          <MinButton
            width="45px"
            //   minHeight="35px"
            //   border="lime"
            p={0}
            mr={2}
            color="#b2b2d8"
            fontSize="2em"
            fontWeight={200}
            bg="transparent"
            type="button"
            onClick={handleThreadAddThreadClick}
            style={{
              padding: 0,
              paddingBottom: "4px"
            }}
          >
            +
          </MinButton>
        </Flex>
      </Flex>
      <Flex
        flex="1 1 auto"
        flexDirection="column"
        style={{
          overflowY: "auto"
        }}
      >
        <MappedThreads
          selectedThread={selectedThread}
          handleThreadSelection={handleThreadSelection}
          data={data && data.getMessageThreads ? data.getMessageThreads : []}
        />
      </Flex>
      <AbFlex
        position="absolute"
        width={breakWidths}
        bottom={0}
        p={3}
        alignSelf="flex-end"
        flexDirection="column"
        bg="thread_footer"
      >
        Thread Footer
      </AbFlex>
    </Flex>
  );
}

export default ThreadBody;
