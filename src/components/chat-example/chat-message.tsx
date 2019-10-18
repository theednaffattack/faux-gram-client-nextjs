import React from "react";
import { IChatHistoryStateObject } from "./Chat";

interface IChatMessageProps {
  message: IChatHistoryStateObject;
}

interface IImageSwappyProps {
  imageUrl: string;
}

interface IImageSwappyState {
  imageStatus: string;
}

class ImageSwappy extends React.PureComponent<
  IImageSwappyProps,
  IImageSwappyState
> {
  constructor(props: IImageSwappyProps) {
    super(props);
    this.state = { imageStatus: "loading" };
  }

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "failed to load" });
  }

  render() {
    // if (this.state.imageStatus === "loading") {
    //   return (
    //     <svg width="400" height="110" style={{ display: "block" }}>
    //       <rect
    //         width="175"
    //         height="131"
    //         style={{
    //           fill: "rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"
    //         }}
    //       />
    //     </svg>
    //   );
    // }
    // if (this.state.imageStatus === "loaded") {
    return (
      <>
        {this.state.imageStatus === "loading" ? (
          <svg width="400" height="110" style={{ display: "block" }}>
            <rect
              width="175"
              height="131"
              style={{
                fill: "rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"
              }}
            />
          </svg>
        ) : (
          ""
        )}
        <img
          src={this.props.imageUrl}
          alt="preview"
          style={{
            maxWidth: "175px",
            maxHeight: "131px",
            display: "block",
            height: this.state.imageStatus === "loading" ? 0 : "100%"
          }}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
        />
      </>
    );
  }
}

const ChatMessage = ({ message }: IChatMessageProps) => {
  const { text } = message;
  return (
    <div className="message" style={{ fontSize: "20px" }}>
      <ImageSwappy imageUrl="https://source.unsplash.com/random/800x600" />
      {text}
    </div>
  );
};
export default ChatMessage;
