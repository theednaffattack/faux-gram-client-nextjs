/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import { Field, Formik } from "formik";

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
import UnFollowUserButtonGqlWrapper from "./unfollow-user-button-gql-wrapper";
import {
  CreateOrUpdateLikesComponent,
  User,
  Comment,
  AddCommentToPostComponent,
  GetMyFollowingPostByIdQuery,
  GetMyFollowingPostByIdDocument,
  FollowUserMutationFn,
  FollowUserMutationResult,
  MeQueryResult,
  GetGlobalPostsQueryResult
} from "../../../src/components/generated/apollo-graphql";
import { CommentCounter } from "./comments-counter";
import { LikesCounter } from "./likes-counter";
import UserProfileImage from "../../components/user-avatar";
import { TextareaField } from "../../../src/modules/form-fields/textarea";

export type TImage = {
  id: string;
  uri: string;
  __typename: string;
};

interface FakeOnClickProps {
  fakeHandlerName: string;
}

let cardWidths = [0.97, 0.95, 0.95, 1 / 2];

// let cardWidths = [1, 1, 1, 1 / 2];

const fakeOnClick = ({ fakeHandlerName }: FakeOnClickProps) => {
  console.log(`${fakeHandlerName} firing!!!🚀`);
};

export interface GlobalFeedCardProps extends IPageProps {
  /** Array of Post comments */
  comments: CommentType[] | null;
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
  /** count of Post comments */
  initialCommentsCount: number;
  /** count of Post likes */
  initialLikesCount: number;

  userInfo?: any;

  /** render prop for comment field */
  renderTextarea?: any;

  /** Has the user already liked this Post */
  currentlyLiked: boolean;

  /** Is the logged in user a follower of the user who created this post */
  isCtxUserIdAFollowerOfPostUser?: boolean | undefined;

  followUser?: FollowUserMutationFn;
  errorFollowUser: FollowUserMutationResult["error"];
  loadingFollowUser?: FollowUserMutationResult["loading"];
  me?: MeQueryResult["data"];
  refetchGetGlobalPosts: GetGlobalPostsQueryResult["refetch"];
}

interface CommentFieldProps {
  postId: string;
}

type CommentType = {
  id: Comment["id"];
  content: Comment["content"];
  created_at?: Comment["created_at"];
  __typename?: Comment["__typename"];
};

interface CommentListProps {
  comments: CommentType[] | null;
}

const RenderCommentField: React.FunctionComponent<CommentFieldProps> = ({
  postId
}) => {
  return (
    <AddCommentToPostComponent>
      {(addCommentToPost, { data, error, loading }) => {
        if (error) return <div>Error adding comment to Post</div>;
        if (data) {
          console.log("ADD COMMENT TO POST RETURN DATA FROM SERVER", { data });
        }
        return (
          <>
            <Flex>
              {loading ? "LOADING" : ""}
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                // @ts-ignore
                onSubmit={async (data, { setErrors, resetForm }) => {
                  addCommentToPost({
                    variables: {
                      input: {
                        postId,
                        content: data.comment
                      }
                    },
                    update: (cache, { data }) => {
                      if (!data || !data.addCommentToPost) {
                        return;
                      }

                      let fromCache = cache.readQuery<
                        GetMyFollowingPostByIdQuery
                      >({
                        query: GetMyFollowingPostByIdDocument,
                        variables: {
                          getpostinput: {
                            postId: postId
                          }
                        }
                      });

                      if (
                        fromCache &&
                        fromCache.getMyFollowingPostById &&
                        fromCache.getMyFollowingPostById.comments
                      ) {
                        cache.writeQuery<GetMyFollowingPostByIdQuery>({
                          query: GetMyFollowingPostByIdDocument,
                          data: {
                            getMyFollowingPostById: {
                              ...fromCache.getMyFollowingPostById,

                              comments:
                                fromCache.getMyFollowingPostById.comments &&
                                fromCache.getMyFollowingPostById.comments.concat(
                                  data.addCommentToPost
                                )
                            }
                          }
                        });
                      } else {
                        return;
                      }
                    }
                  });
                  resetForm();
                }}
                initialValues={{
                  comment: ""
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Field
                      label="comment"
                      id="comment"
                      name="comment"
                      placeholder="input comment"
                      type="text"
                      component={TextareaField}
                      style={{ width: "100%", fontSize: "1.3em" }}
                    />
                    <Button type="submit">submit</Button>
                  </form>
                )}
              </Formik>
            </Flex>
          </>
        );
      }}
    </AddCommentToPostComponent>
  );
};

const RenderCommentList: React.FunctionComponent<CommentListProps> = ({
  comments
}) => {
  return (
    <>
      {comments &&
        comments.map((comment, index, commentsArr) => {
          const borderFormat = "1px grey solid";
          let isTop = index === 0;
          let isBottom = index === commentsArr.length - 1;

          const topItemStyles = {
            borderTop: borderFormat,
            borderRight: borderFormat,
            borderLeft: borderFormat,
            padding: "8px",
            marginTop: "8px"
          };
          const bottomItemStyles = {
            borderTop: borderFormat,
            borderBottom: borderFormat,
            borderRight: borderFormat,
            borderLeft: borderFormat,
            padding: "8px",
            marginBottom: "8px"
          };

          const elseItemStyles = {
            borderRight: borderFormat,
            borderTop: borderFormat,
            borderLeft: borderFormat,
            padding: "8px"
          };

          const determineStyles = isTop
            ? topItemStyles
            : isBottom
            ? bottomItemStyles
            : elseItemStyles;
          return (
            <div
              key={comment.__typename + comment.id + "-" + index}
              style={determineStyles}
              tabIndex={0}
            >
              <Text color="text">{comment.content}</Text>
            </div>
          );
        })}
    </>
  );
};

export const FeedCard: React.FunctionComponent<GlobalFeedCardProps> = ({
  refetchGetGlobalPosts,
  comments,
  description,
  id,
  images,
  currentlyLiked,
  initialLikesCount,
  initialCommentsCount,
  postUserId,
  pathname,
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
          <Link
            href={
              isThisADynamicRoute === true
                ? "/feed/global"
                : `/feed/global/${id}?referer=/feed/global`
            }
          >
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
        {images && images.length > 0 ? <Image src={images[0].uri} /> : null}
      </Flex>
      <Box py={3} px={2}>
        <Heading as="h3">{title}</Heading>
        <Text fontSize={0}>{description}</Text>
      </Box>
      <Flex alignItems="center" mr={2}>
        <Flex flexDirection="column" alignItems="center">
          <LikesCounter initialLikesCount={initialLikesCount} postId={id} />

          <CreateOrUpdateLikesComponent>
            {likesMutation => {
              return (
                <Button
                  bg="transparent"
                  p={0}
                  type="button"
                  onClick={() => {
                    likesMutation({
                      variables: { input: { postId: id } },
                      // @ts-ignore
                      update: (cache, { data }) => {
                        refetchGetGlobalPosts({
                          skip: 0,
                          take: 15
                        });
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
            }}
          </CreateOrUpdateLikesComponent>
        </Flex>
        <Flex ml={2} flexDirection="column" alignItems="center">
          <CommentCounter
            initialCommentsCount={initialCommentsCount}
            postId={id}
          />

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
        </Box>{" "}
      </Flex>
      {renderTextarea ? <RenderCommentField postId={id} /> : null}
      {renderTextarea && comments && comments.length > 0 ? (
        <RenderCommentList comments={comments} />
      ) : null}
    </Card>
  );
};

export default FeedCard;
