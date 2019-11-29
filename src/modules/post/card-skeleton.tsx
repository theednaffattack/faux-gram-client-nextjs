/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";

import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Heading,
  Text
} from "../../components/styled-rebass";
import Icon from "../icon/icon";
import { IPageProps } from "../../page-types/types";
import UnFollowUserButtonGqlWrapper from "../feed/unfollow-user-button-gql-wrapper";
import {
  CreateOrUpdateLikesComponent,
  User
} from "../../../src/components/generated/apollo-graphql";
import { CommentCounter } from "../feed/comments-counter";
import { LikesCounter } from "../feed/likes-counter";
import UserProfileImage from "../../components/user-avatar";
import { ContentPlaceholder } from "../feed/content-placeholder";

export type TImage = {
  id: string;
  uri: string;
  __typename: string;
};

interface FakeOnClickProps {
  fakeHandlerName: string;
}

let cardWidths = [0.97, 0.95, 0.95, 1 / 2];

const fakeOnClick = ({ fakeHandlerName }: FakeOnClickProps) => {
  console.log(`${fakeHandlerName} firing!!!🚀`);
};

export interface CardSkeletonProps extends IPageProps {
  /** The ID of the user who created the Post */
  postUserId?: User["id"] | string | undefined;
  /** image URI */
  id?: string | undefined;
  /** image URI */
  images?: any[] | undefined;
  /** title given by user */
  title?: string | undefined;
  /** image description of the image */
  description?: string | undefined;
  /** count of Post comments */
  initialCommentsCount?: number | undefined;
  /** count of Post likes */
  initialLikesCount?: number | undefined;

  userInfo?: any | undefined;

  /** render prop for comment field */
  renderTextarea?: any | undefined;

  /** Has the user already liked this Post */
  currentlyLiked?: boolean | undefined;

  cardImage?: any;
}

const CardSkeleton: React.FunctionComponent<CardSkeletonProps> = ({
  cardImage,
  description,
  id,
  images,
  currentlyLiked,
  initialLikesCount,
  initialCommentsCount,
  pathname,
  postUserId,
  renderTextarea,
  title,
  userInfo
}) => {
  const isThisADynamicRoute =
    pathname && pathname[pathname.length - 1] === "]" ? true : false;

  return (
    <Card
      px={3}
      py={2}
      ml={2}
      my={2}
      width={cardWidths}
      sx={{
        p: 1,
        borderRadius: 18,
        boxShadow: "0 0 16px rgba(0, 0, 0, .25)"
      }}
    >
      <Flex mb={2}>
        <Flex alignItems="center">
          <UserProfileImage
            flexInstruction="row"
            buttonThing={false}
            color="blue"
            user={userInfo}
          />
        </Flex>
        <Box
          ml="auto"
          sx={{
            alignSelf: "center"
          }}
        >
          <Link href={isThisADynamicRoute === true ? "/feed" : `/feed/${id}`}>
            <a>
              <Icon
                name={isThisADynamicRoute ? "close" : "expand"}
                fill="grey"
                size="2em"
              />
            </a>
          </Link>
        </Box>
      </Flex>
      <Flex justifyContent="center">
        {images && images.length > 0 ? (
          <Image width={["400px", "400px"]} src={images[0].uri} />
        ) : cardImage ? (
          <Image src={cardImage} />
        ) : (
          <svg height="500px" width="500px">
            <rect height="500px" width="500px" style={{ fill: "green" }}></rect>
          </svg>
        )}
      </Flex>
      <Box py={3} px={2}>
        <Heading as="h3">{title}</Heading>
        <ContentPlaceholder />
        <Text fontSize={0}>{description}</Text>
      </Box>
      <Flex alignItems="center" mr={2}>
        <Flex flexDirection="column" alignItems="center">
          {initialLikesCount ? (
            <LikesCounter
              initialLikesCount={initialLikesCount}
              postId={id || ""}
            />
          ) : (
            ""
          )}

          <CreateOrUpdateLikesComponent>
            {likesMutation => {
              if (initialLikesCount && id) {
                return (
                  <Button
                    bg="transparent"
                    p={0}
                    type="button"
                    onClick={() => {
                      likesMutation({
                        variables: { input: { postId: id } },
                        update: (cache, { data }) => {
                          console.log({ cache, data });
                          // isThisADynamicRoute === true
                          //   ? getMyFollowingPostsByIdUpdateFunction(cache, {
                          //       data
                          //     })
                          //   : myFolloiwngPostsUpdateFunction(cache, { data });
                        }
                      });
                    }}
                  >
                    <Icon
                      name="heart"
                      fill={currentlyLiked ? "crimson" : "#ccc"}
                      size="2.5em"
                    />
                  </Button>
                );
              } else {
                return null;
              }
            }}
          </CreateOrUpdateLikesComponent>
        </Flex>
        <Flex ml={2} flexDirection="column" alignItems="center">
          {initialCommentsCount && id ? (
            <CommentCounter
              initialCommentsCount={initialCommentsCount}
              postId={id}
            />
          ) : (
            ""
          )}

          <Button
            bg="transparent"
            p={0}
            type="button"
            disabled={renderTextarea ? true : false}
            onClick={() => fakeOnClick({ fakeHandlerName: "Chat Click Event" })}
          >
            <Icon name="chat" fill="#ccc" size="2.5em" />
          </Button>
        </Flex>
        <Box ml="auto">
          <UnFollowUserButtonGqlWrapper postUserId={postUserId as string} />
        </Box>
      </Flex>
    </Card>
  );
};

export default CardSkeleton;
