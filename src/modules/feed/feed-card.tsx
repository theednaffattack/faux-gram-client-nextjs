import React from "react";
import Link from "next/link";
import { Field, Formik } from "formik";
import { MutationUpdaterFn } from "apollo-boost";
import Maybe from "graphql/tsutils/Maybe";

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
  LikeReturnType,
  MyFollowingPostsQuery,
  MyFollowingPostsDocument
} from "../../../src/components/generated/apollo-graphql";
import { CommentCounter } from "./comments-counter";
import { LikesCounter } from "./likes-counter";
import UserProfileImage from "../../components/user-avatar";
import { TextareaField } from "../../../src/modules/form-fields/textarea";
import Badge from "./badge";

export type TImage = {
  id: string;
  uri: string;
  __typename: string;
};

interface FakeOnClickProps {
  fakeHandlerName: string;
}

const fakeOnClick = ({ fakeHandlerName }: FakeOnClickProps) => {
  console.log(`${fakeHandlerName} firing!!!🚀`);
};

type MutationUpdateFunc =
  | MutationUpdaterFn<
      {
        __typename?: "Mutation" | undefined;
      } & {
        createOrUpdateLikes: Maybe<
          {
            __typename?: "LikeReturnType" | undefined;
          } & Pick<LikeReturnType, "postId" | "status">
        >;
      }
    >
  | undefined;

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
}

interface CommentFieldProps {
  postId: string;
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

type CommentType = {
  id: Comment["id"];
  content: Comment["content"];
  created_at?: Comment["created_at"];
  __typename?: Comment["__typename"];
};

interface CommentListProps {
  comments: CommentType[] | null;
}

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

export const FeedCard: React.FunctionComponent<ISingleFeedCardProps> = ({
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

  const myFolloiwngPostsUpdateFunction: MutationUpdateFunc = (
    cache,
    { data }
  ) => {
    let fromCache = cache.readQuery<MyFollowingPostsQuery>({
      query: MyFollowingPostsDocument,
      variables: {
        getpostinput: {
          postId: id
        }
      }
    });

    if (
      data &&
      data.createOrUpdateLikes &&
      data.createOrUpdateLikes.status === "Deleted" &&
      fromCache &&
      fromCache.myFollowingPosts
    ) {
      let newCacheData = [
        ...fromCache.myFollowingPosts.map(post => {
          if (post.id === id) {
            post.currently_liked = false;
          }
          return post;
        })
      ];

      cache.writeQuery<MyFollowingPostsQuery>({
        query: MyFollowingPostsDocument,
        variables: {
          getpostinput: {
            postId: id
          }
        },
        data: { myFollowingPosts: newCacheData }
      });

      cache.readQuery<MyFollowingPostsQuery>({
        query: MyFollowingPostsDocument,
        variables: {
          getpostinput: {
            postId: id
          }
        }
      });

      return fromCache;
    }

    if (
      data &&
      data.createOrUpdateLikes &&
      data.createOrUpdateLikes.status === "Created" &&
      fromCache &&
      fromCache.myFollowingPosts
    ) {
      let newCacheData = [
        ...fromCache.myFollowingPosts.map(post => {
          if (post.id === id) {
            post.currently_liked = true;
          }
          return post;
        })
      ];

      cache.writeQuery<MyFollowingPostsQuery>({
        query: MyFollowingPostsDocument,
        variables: {
          getpostinput: {
            postId: id
          }
        },
        data: { myFollowingPosts: newCacheData }
      });

      cache.readQuery<MyFollowingPostsQuery>({
        query: MyFollowingPostsDocument,
        variables: {
          getpostinput: {
            postId: id
          }
        }
      });

      return fromCache;
    }
    return fromCache;
  };

  const getMyFollowingPostsByIdUpdateFunction: MutationUpdateFunc = (
    cache,
    { data }
  ) => {
    let fromCache = cache.readQuery<GetMyFollowingPostByIdQuery>({
      query: GetMyFollowingPostByIdDocument,
      variables: {
        getpostinput: {
          postId: id
        }
      }
    });

    if (
      data &&
      data.createOrUpdateLikes &&
      data.createOrUpdateLikes.status === "Deleted" &&
      fromCache &&
      fromCache.getMyFollowingPostById
    ) {
      let newCacheData = {
        ...fromCache.getMyFollowingPostById,
        currently_liked: false
      };

      cache.writeQuery<GetMyFollowingPostByIdQuery>({
        query: GetMyFollowingPostByIdDocument,
        variables: {
          getpostinput: {
            postId: id
          }
        },
        data: { getMyFollowingPostById: newCacheData }
      });

      cache.readQuery<GetMyFollowingPostByIdQuery>({
        query: GetMyFollowingPostByIdDocument,
        variables: {
          getpostinput: {
            postId: id
          }
        }
      });

      return fromCache;
    }

    if (
      data &&
      data.createOrUpdateLikes &&
      data.createOrUpdateLikes.status === "Created" &&
      fromCache &&
      fromCache.getMyFollowingPostById
    ) {
      let newCacheData = {
        ...fromCache.getMyFollowingPostById,
        currently_liked: true
      };

      cache.writeQuery<GetMyFollowingPostByIdQuery>({
        query: GetMyFollowingPostByIdDocument,
        variables: {
          getpostinput: {
            postId: id
          }
        },
        data: { getMyFollowingPostById: newCacheData }
      });

      cache.readQuery<GetMyFollowingPostByIdQuery>({
        query: GetMyFollowingPostByIdDocument,
        variables: {
          getpostinput: {
            postId: id
          }
        }
      });

      return fromCache;
    }
    return fromCache;
  };

  return (
    <Card
      px={3}
      py={2}
      ml={2}
      my={2}
      width={1 / 2}
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
          <Badge bg="pink">following</Badge>
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
          <Image width={["300px", "400px"]} src={images[0].uri} />
        ) : null}
      </Flex>
      <Box px={2}>
        <Heading as="h3">{title}</Heading>
        <Text fontSize={0}>{description}</Text>
      </Box>
      <Flex alignItems="center">
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
                      update: (cache, { data }) => {
                        isThisADynamicRoute === true
                          ? getMyFollowingPostsByIdUpdateFunction(cache, {
                              data
                            })
                          : myFolloiwngPostsUpdateFunction(cache, { data });
                      }
                    });
                  }}
                >
                  <Icon
                    name="heart"
                    fill={currentlyLiked ? "crimson" : "yellow"}
                    size="3em"
                  />
                </Button>
              );
            }}
          </CreateOrUpdateLikesComponent>
        </Flex>

        <Flex flexDirection="column" alignItems="center">
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
            <Icon name="chat" fill="fuchsia" size="3em" />
          </Button>
        </Flex>
        <UnFollowUserButtonGqlWrapper postUserId={postUserId as string} />
      </Flex>
      {renderTextarea ? <RenderCommentField postId={id} /> : null}
      {renderTextarea && comments && comments.length > 0 ? (
        <RenderCommentList comments={comments} />
      ) : null}
    </Card>
  );
};

export default FeedCard;
