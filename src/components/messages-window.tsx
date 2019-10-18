import React from "react";
import { FixedSizeList as List } from "react-window";
import { Flex } from "./styled-rebass";
import { LastMessage } from "./other-functions";

interface IRowProps {
  index: number;
  style: any;
  data: any;
}

interface IMessagesWindowProps {
  handleThreadSelection?: any;
  data: any;
}

function handleOnWheel({ deltaY }: any) {
  // Your handler goes here ...
  console.log("handleOnWheel()", deltaY);
}

const Row = ({ data, index, style }: IRowProps) => {
  return (
    <Flex
      // bg={index ? "#363657" : "#545281"}
      bg="#545281"
      width={[1, 1, 1]}
      onClick={() => {
        console.log("WHAT IS THE THREAD INDEX", { index });
        data.handleThreadSelection({ index });
      }}
      style={style}
      borderTop="1px #eee solid"
      // border="lime"
    >
      <LastMessage message={data.itemData[index]} />
    </Flex>
  );
};

export const MessagesWindow = ({
  handleThreadSelection,
  data
}: IMessagesWindowProps) => {
  const outerElementType = React.forwardRef((props, ref: any) => {
    return (
      <div
        // onClick={() => {
        //   handleThreadSelection({ index: 1 });
        // }}
        ref={ref}
        onWheel={handleOnWheel}
        {...props}
      />
    );
  });

  return (
    <List
      outerElementType={outerElementType}
      itemData={{
        itemData: data.getMessageThreads,
        handleThreadSelection
      }}
      height={300}
      itemCount={data.getMessageThreads.length}
      itemSize={75}
      width="75%"
    >
      {Row}
    </List>
  );
};
