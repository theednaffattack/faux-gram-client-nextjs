import React, { Component, createRef } from "react";
import { calculateMessageMaxRowWidth } from "./get-size";
import ChatHistory from "./chat-history";
// import casual from "casual-browserify";
import { VariableSizeList } from "react-window";

export interface IChatHistoryStateObject {
  text: string;
  height: number;
}

interface IChatState {
  listHeight: number;
  chatHistory: IChatHistoryStateObject[];
  warning: string;
}

const WARNING = {
  noHistory:
    "warning: there is no chat history (chatHistoryRef.current is null)",
  noListRef: "warning: there is no list present (noListRef.current is null)"
};

class Chat extends Component<object, IChatState> {
  chatHistoryRef: React.RefObject<HTMLDivElement>;
  listRef: React.RefObject<VariableSizeList>;
  constructor(props: object) {
    super(props);
    this.listRef = createRef();
    this.chatHistoryRef = createRef();

    this.casualInteger = this.casualInteger.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      listHeight: 600,
      chatHistory: [],
      warning: ""
    };
  }

  casualInteger() {
    return 5;
  }

  // startChatMessages = () => {
  //   setInterval(() => {
  //     const { chatHistory } = this.state;
  //     const text = casual.sentences(this.casualInteger()); // randomSentence({ min: 120, max: 280 });
  //     const size = getSize({
  //       text,
  //       attributes: { fontSize: "20px" },
  //       className: "message"
  //     });
  //     let { height } = size;
  //     // height += 20;
  //     chatHistory.push({ text, height });
  //     this.setState((prevState: any) => {
  //       if (
  //         prevState.chatHistory &&
  //         prevState.chatHistory.length !== this.state.chatHistory.length
  //       ) {
  //         let newHistory = chatHistory.concat(...prevState.chatHistory, {
  //           text,
  //           height
  //         });
  //         return { chatHistory: [...newHistory] };
  //       } else {
  //         return { chatHistory: prevState.chatHistory };
  //       }
  //     }, this.handleScroll);
  //   }, 2000);
  // };

  handleScroll = () => {
    const { chatHistory } = this.state;
    if (this.listRef.current) {
      this.listRef.current.resetAfterIndex(0, true);
      // this.listRef.current.scrollToItem(chatHistory.length - 1, "end");
      this.listRef.current.scrollToItem(chatHistory.length - 1, "end");
      return;
    }
    if (!this.listRef.current) {
      this.setState({
        warning: WARNING["noListRef"]
      });
      return;
    }
  };

  componentDidMount() {
    if (this.chatHistoryRef.current) {
      const listHeight = this.chatHistoryRef.current.offsetHeight;
      this.setState({ listHeight });
    }

    if (!this.chatHistoryRef.current) {
      this.setState({ warning: WARNING["noHistory"] });
    }

    // this.startChatMessages();

    calculateMessageMaxRowWidth();
    console.log("calculateMessageMaxRowWidth", calculateMessageMaxRowWidth());
  }

  render() {
    const { chatHistory, listHeight } = this.state;
    return (
      <ChatHistory
        chatHistoryRef={this.chatHistoryRef}
        listRef={this.listRef}
        listHeight={listHeight}
        chatHistory={chatHistory}
      />
    );
  }
}

export default Chat;
