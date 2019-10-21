import React from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

import {
  Box,
  Card,
  Flex,
  Image,
  Heading,
  Text
} from "../../components/styled-rebass";

type TImage = {
  id: string;
  uri: string;
  __typename: string;
};

/**
 * ISingleFeedCardProps
 * @param image string;
 */
interface ISingleFeedCardProps {
  /** image URI */
  images: TImage[];
  /** title given by user */
  title: string;
  /** image description of the image */
  description: string;
  /** graphql schema type */
  // __typename?: string;
}

export const FeedCard: React.FunctionComponent<ISingleFeedCardProps> = ({
  images,
  title,
  description
}) => {
  return (
    <Box width={1} px={3} py={2}>
      <Card
        width={1}
        sx={{
          p: 1,
          borderRadius: 2,
          boxShadow: "0 0 16px rgba(0, 0, 0, .25)"
        }}
      >
        {images && images.length > 0 ? <Image src={images[0].uri} /> : null}
        <Box px={2}>
          <Heading as="h3">{title}</Heading>
          <Text fontSize={0}>{description}</Text>
        </Box>
      </Card>
    </Box>
  );
};

export default FeedCard;

interface IFeedCardsProps {
  cardData: ISingleFeedCardProps[];
}

export class FeedCards extends React.Component<IFeedCardsProps> {
  listRef: React.RefObject<HTMLDivElement>;
  constructor(props: IFeedCardsProps) {
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
    const { cardData } = this.props;

    return (
      <Flex flexDirection="column" flex="1 1 auto" ref={this.listRef}>
        {cardData.map((card, index) => {
          console.log("VIEW CARD DATA", card);

          return (
            <FeedCard
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
