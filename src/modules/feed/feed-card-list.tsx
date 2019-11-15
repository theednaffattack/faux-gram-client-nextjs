import React from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import FeedCard, { ISingleFeedCardProps } from "./feed-card";
import { IPageProps } from "../../page-types/types";
import { Flex } from "../../components/styled-rebass";

interface IFeedCardListProps extends IPageProps {
  cardData: ISingleFeedCardProps[];
}

export class FeedCardList extends React.Component<IFeedCardListProps> {
  listRef: React.RefObject<HTMLDivElement>;
  constructor(props: IFeedCardListProps) {
    super(props);
    this.listRef = React.createRef();
  }

  componentDidMount() {
    if (this.listRef.current) {
      disableBodyScroll(this.listRef.current);
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }
  render() {
    const { cardData, pathname, query } = this.props;

    return (
      <Flex flexDirection="column" flex="1 1 auto" ref={this.listRef}>
        {cardData.map((card, index) => {
          return (
            <FeedCard
              currentlyLiked={card.currentlyLiked}
              comments={null}
              initialLikesCount={card.initialLikesCount}
              initialCommentsCount={card.initialCommentsCount}
              pathname={pathname}
              postUserId={card.postUserId}
              query={query}
              id={card.id}
              key={`card-${index}`}
              images={card.images}
              title={card.title}
              description={card.description}
            />
          );
        })}
      </Flex>
    );
  }
}
