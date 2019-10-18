import React from "react";
import { VariableSizeList as List, VariableSizeList } from "react-window";
import ChatMessage from "./chat-message";
import { IChatHistoryStateObject } from "./Chat";

interface IChatHistoryProps {
  chatHistoryRef: React.RefObject<HTMLDivElement>;
  listRef: React.RefObject<VariableSizeList>;
  listHeight: number;
  chatHistory: IChatHistoryStateObject[];
}

const ChatHistory = ({
  listHeight,
  chatHistoryRef,
  listRef,
  chatHistory
}: IChatHistoryProps) => (
  <React.Fragment>
    <div ref={chatHistoryRef} className="chatHistory" style={{ width: "100%" }}>
      {chatHistory.length > 0 && (
        <List
          height={listHeight}
          itemCount={chatHistory.length}
          itemSize={index => chatHistory[index].height}
          width="100%"
          ref={listRef}
        >
          {({ index, style }) => (
            <div style={{ width: "100%", ...style }}>
              <ChatMessage message={chatHistory[index]} />
            </div>
          )}
        </List>
      )}
    </div>
  </React.Fragment>
);

export default ChatHistory;
