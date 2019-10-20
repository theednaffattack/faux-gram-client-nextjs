import React from "react";
import { Text, Heading } from "rebass/styled-components";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

interface IFeedItemPageProps {
  itemId: string;
}

export interface IFeedContainerProps {}

export default class FeedContainer extends React.Component<
  IFeedContainerProps
> {
  listContainerRef: React.RefObject<HTMLDivElement>;
  constructor(props: IFeedItemPageProps) {
    super(props);
    this.listContainerRef = React.createRef();
  }

  componentDidMount() {
    if (this.listContainerRef && this.listContainerRef.current) {
      disableBodyScroll(this.listContainerRef.current);
    }
  }
  componentWillUnmount() {
    if (this.listContainerRef && this.listContainerRef.current) {
      clearAllBodyScrollLocks();
    }
  }
  render() {
    return (
      <div
        ref={this.listContainerRef}
        id="feedRoot"
        style={{
          overflowY: "scroll",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          WebkitOverflowScrolling: "touch"
        }}
      >
        FeedContainer
      </div>
    );
  }
}

export const FeedItemPage: React.FC<IFeedItemPageProps> = ({ itemId }) => {
  return (
    <>
      <div>
        <Heading as="h1">Feed Item Page</Heading>
        <Text>Item Id: {itemId}</Text>
      </div>
      {/* <FeedContainer /> */}
    </>
  );
};
