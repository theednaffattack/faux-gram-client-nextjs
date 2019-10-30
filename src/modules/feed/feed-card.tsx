import React from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import Link from "next/link";

import {
  Box,
  Card,
  Flex,
  Image,
  Heading,
  Text
} from "../../components/styled-rebass";
import Icon from "../icon/icon";
import { IPageProps } from "../../page-types/types";
import UnFollowUserButtonGqlWrapper from "./unfollow-user-button-gql-wrapper";
import { User } from "../../../src/components/generated/apollo-graphql";

export type TImage = {
  id: string;
  uri: string;
  __typename: string;
};

/**
 * ISingleFeedCardProps
 * @param id ID;
 * @param TImage [Image];
 * @param title string;
 * @param description string;
 */
export interface ISingleFeedCardProps extends IPageProps {
  /**
   * ISingleFeedCardProps
   * @param image string;
   */

  /** The ID of the user who created the Post */
  postUserId: User["id"] | string;
  /** image URI */
  id: string;
  /** image URI */
  images: any[];
  /** title given by user */
  title: string;
  /** image description of the image */
  description: string;
  /** pageProps from top-level getInitialProps */
}

export const FeedCard: React.FunctionComponent<ISingleFeedCardProps> = ({
  id,
  images,
  description,
  title,
  pathname,
  postUserId
}) => {
  const isThisADynamicRoute =
    pathname && pathname[pathname.length - 1] === "]" ? true : false;
  return (
    <Card
      px={3}
      py={2}
      ml={2}
      my={2}
      width={0.98}
      sx={{
        p: 1,
        borderRadius: 18,
        boxShadow: "0 0 16px rgba(0, 0, 0, .25)"
        // minHeight: "100%"
        // border: "2px pink solid"
        // display: "flex",
        // flex: "1 1 auto"
      }}
    >
      <Flex>
        <Box ml="auto">
          <Link href={isThisADynamicRoute === true ? "/feed" : `/feed/${id}`}>
            <a>
              <Icon
                name={isThisADynamicRoute ? "close" : "expand"}
                fill="fuchsia"
                size="3em"
              />
            </a>
          </Link>
        </Box>
      </Flex>

      {images && images.length > 0 ? (
        <Image width={["300px", "600px"]} src={images[0].uri} />
      ) : null}
      <Box px={2}>
        <Heading as="h3">{title}</Heading>
        <Text fontSize={0}>{description}</Text>
      </Box>
      <Flex border="lime">
        <Icon name="heart" fill="fuchsia" size="3em" />

        <Icon name="chat" fill="fuchsia" size="3em" />
        <UnFollowUserButtonGqlWrapper postUserId={postUserId as string} />
      </Flex>
    </Card>
  );
};

export default FeedCard;

interface IFeedCardsProps extends IPageProps {
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
    const { cardData, pathname, query } = this.props;

    return (
      <Flex flexDirection="column" flex="1 1 auto" ref={this.listRef}>
        {cardData.map((card, index) => {
          return (
            <FeedCard
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
