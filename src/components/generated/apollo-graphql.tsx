import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};

export type AddCommentPayloadType = {
   __typename?: 'AddCommentPayloadType',
  id: Scalars['ID'],
  postId: Scalars['ID'],
  userId: Scalars['ID'],
  created_at?: Maybe<Scalars['String']>,
  content: Scalars['String'],
};

export type AddMessagePayload = {
   __typename?: 'AddMessagePayload',
  success: Scalars['Boolean'],
  threadId: Scalars['ID'],
  message: Message,
  user: User,
  invitees: Array<User>,
};

export type AddMessageToThreadInput_V2 = {
  threadId: Scalars['ID'],
  sentTo: Scalars['String'],
  invitees: Array<Scalars['ID']>,
  message: Scalars['String'],
  images?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type ChangePasswordInput = {
  password: Scalars['String'],
  token: Scalars['String'],
};

export type Comment = {
   __typename?: 'Comment',
  id: Scalars['ID'],
  post: Post,
  user: User,
  created_at?: Maybe<Scalars['DateTime']>,
  content: Scalars['String'],
};

export type CommentCountArgs = {
  postId: Scalars['ID'],
};

export type CommentCountType = {
   __typename?: 'CommentCountType',
  count: Scalars['Int'],
  postId: Scalars['ID'],
};


export type FeedInput = {
  cursor?: Maybe<Scalars['String']>,
  take?: Maybe<Scalars['Int']>,
};

export type FollowingPostReturnType = {
   __typename?: 'FollowingPostReturnType',
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  images?: Maybe<Array<Image>>,
  likes?: Maybe<Array<Like>>,
  comments?: Maybe<Array<Comment>>,
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars['Boolean']>,
  user?: Maybe<User>,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
  comments_count: Scalars['Int'],
  likes_count: Scalars['Int'],
  currently_liked: Scalars['Boolean'],
};

export type FollowUserInput = {
  userIDToFollow: Scalars['String'],
};

export type GetAllMyMessagesInput = {
  user: Scalars['String'],
};

export type GetAllMyMessageThreadsInput = {
  user: Scalars['String'],
};

export type GetMessagesByThreadIdInput = {
  cursor?: Maybe<Scalars['String']>,
  threadId: Scalars['String'],
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>,
};

export type GetMessagesFromUserInput = {
  sentBy: Scalars['String'],
  user: Scalars['String'],
};

export type GetMessageThreadsFromUserInput = {
  sentBy: Scalars['String'],
  user: Scalars['String'],
};

export type GetMyFollowingPostByIdInput = {
  postId: Scalars['ID'],
};

export type HandlePostPayload = {
   __typename?: 'HandlePostPayload',
  success: Scalars['Boolean'],
  action: Scalars['String'],
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['Boolean']>,
  images?: Maybe<Array<Image>>,
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars['Boolean']>,
  user?: Maybe<User>,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
  comment_count?: Maybe<Scalars['Int']>,
  likes_count: Scalars['Int'],
  currently_liked: Scalars['Boolean'],
};

export type Image = {
   __typename?: 'Image',
  id: Scalars['ID'],
  uri: Scalars['String'],
  post: Post,
  message?: Maybe<Message>,
  user: User,
};

export type ImageSubInput = {
  filename: Scalars['String'],
  filetype: Scalars['String'],
};

export type Like = {
   __typename?: 'Like',
  id: Scalars['ID'],
  post: Post,
  user: User,
  count: Scalars['Int'],
};

export type LikeReturnType = {
   __typename?: 'LikeReturnType',
  postId: Scalars['ID'],
  status: LikeStatus,
};

export type LikesCountArgs = {
  postId: Scalars['ID'],
};

export type LikesCountReturnType = {
   __typename?: 'LikesCountReturnType',
  postId: Scalars['ID'],
  status: LikeStatus,
  count: Scalars['Int'],
};

export type LikesCountType = {
   __typename?: 'LikesCountType',
  count: Scalars['Int'],
  postId: Scalars['ID'],
};

/** Describes whether a like has been created or deleted in the database. */
export enum LikeStatus {
  Created = 'Created',
  Deleted = 'Deleted',
  CountUpdated = 'CountUpdated',
  Undetermined = 'Undetermined'
}

export type Message = {
   __typename?: 'Message',
  id: Scalars['ID'],
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
  message: Scalars['String'],
  images?: Maybe<Array<Maybe<Image>>>,
  sentBy: User,
  user: User,
  thread?: Maybe<Thread>,
};

export type MessageConnection = {
   __typename?: 'MessageConnection',
  edges: Array<MessageEdge>,
  pageInfo: PageInfo,
};

export type MessageEdge = {
   __typename?: 'MessageEdge',
  node: Message,
};

export type MessageOutput = {
   __typename?: 'MessageOutput',
  message: Scalars['String'],
};

export type MessageSubType = {
   __typename?: 'MessageSubType',
  id: Scalars['ID'],
  message?: Maybe<Scalars['String']>,
  sentBy: User,
  user: User,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
};

export type MessageThreadOutput = {
   __typename?: 'MessageThreadOutput',
  message: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createProduct: Product,
  createUser: User,
  changePassword?: Maybe<User>,
  confirmUser: Scalars['Boolean'],
  forgotPassword: Scalars['Boolean'],
  login?: Maybe<User>,
  logout: Scalars['Boolean'],
  register: User,
  createPost: Post,
  followUser: Scalars['Boolean'],
  addNewMessage: Scalars['Boolean'],
  unFollowUser: Scalars['Boolean'],
  createMessageThread: Thread,
  addMessageToThread: AddMessagePayload,
  signS3: SignedS3Payload,
  createOrUpdateLikes?: Maybe<LikeReturnType>,
  addCommentToPost: AddCommentPayloadType,
};


export type MutationCreateProductArgs = {
  data: ProductInput
};


export type MutationCreateUserArgs = {
  data: RegisterInput
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  data: RegisterInput
};


export type MutationCreatePostArgs = {
  data: PostInput
};


export type MutationFollowUserArgs = {
  data: FollowUserInput
};


export type MutationAddNewMessageArgs = {
  sentTo: Scalars['String'],
  message: Scalars['String']
};


export type MutationUnFollowUserArgs = {
  data: UnFollowUserInput
};


export type MutationCreateMessageThreadArgs = {
  sentTo: Scalars['String'],
  invitees: Array<Scalars['ID']>,
  message: Scalars['String'],
  images?: Maybe<Array<Maybe<Scalars['Upload']>>>
};


export type MutationAddMessageToThreadArgs = {
  threadId: Scalars['ID'],
  sentTo: Scalars['String'],
  invitees: Array<Scalars['ID']>,
  message: Scalars['String'],
  images?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type MutationSignS3Args = {
  files: Array<ImageSubInput>
};


export type MutationCreateOrUpdateLikesArgs = {
  input: UpdateLikesInput
};


export type MutationAddCommentToPostArgs = {
  input: NewCommentsArgs
};

export type NewCommentsArgs = {
  postId: Scalars['ID'],
  content: Scalars['String'],
};

export type PageInfo = {
   __typename?: 'PageInfo',
  startCursor: Scalars['String'],
  endCursor: Scalars['String'],
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
};

export type PasswordInput = {
  password: Scalars['String'],
};

export type Post = {
   __typename?: 'Post',
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  images?: Maybe<Array<Image>>,
  likes?: Maybe<Array<Like>>,
  comments?: Maybe<Array<Comment>>,
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars['Boolean']>,
  user?: Maybe<User>,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
  comments_count: Scalars['Int'],
  likes_count: Scalars['Int'],
};

export type PostInput = {
  text: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  user: Scalars['ID'],
  images?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type PostInputOld = {
  text: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  user: Scalars['ID'],
  images?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type PostSubInput = {
  sentBy: Scalars['String'],
  message: Scalars['String'],
};

export type PostSubscriptionInput = {
  text: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  user: Scalars['ID'],
  images?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type PostSubType = {
   __typename?: 'PostSubType',
  id: Scalars['ID'],
  title: Scalars['String'],
  text: Scalars['String'],
  images: Array<Image>,
  user: User,
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
};

export type Product = {
   __typename?: 'Product',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type ProductInput = {
  name: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  helloWorld: Scalars['String'],
  GetAllMyImages: Array<Image>,
  getThoseIFollowAndTheirPostsResolver?: Maybe<User>,
  getMyMessagesFromUser?: Maybe<Array<Message>>,
  getGlobalPosts?: Maybe<Array<FollowingPostReturnType>>,
  meAndAllFollowers?: Maybe<User>,
  myFollowingPosts?: Maybe<Array<FollowingPostReturnType>>,
  getMyFollowingPostById?: Maybe<FollowingPostReturnType>,
  getAllMyMessages?: Maybe<User>,
  getMessageThreads?: Maybe<Array<Maybe<Thread>>>,
  getListToCreateThread?: Maybe<TransUserReturn>,
  getOnlyThreads?: Maybe<ThreadConnection>,
  getMessagesByThreadId?: Maybe<MessageConnection>,
};


export type QueryGetMyMessagesFromUserArgs = {
  input: GetMessagesFromUserInput
};


export type QueryGetMyFollowingPostByIdArgs = {
  getpostinput: GetMyFollowingPostByIdInput
};


export type QueryGetOnlyThreadsArgs = {
  feedinput: FeedInput
};


export type QueryGetMessagesByThreadIdArgs = {
  input: GetMessagesByThreadIdInput
};

export type RegisterInput = {
  password: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  termsAndConditions: Scalars['Boolean'],
  keepMeSignedIn: Scalars['Boolean'],
};

export type SignedS3Payload = {
   __typename?: 'SignedS3Payload',
  signatures: Array<SignedS3SubPayload>,
};

export type SignedS3SubPayload = {
   __typename?: 'SignedS3SubPayload',
  url: Scalars['String'],
  signedRequest: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  followingPosts: PostSubType,
  newMessage: MessageSubType,
  globalPosts?: Maybe<Post>,
  followingPostsSub: HandlePostPayload,
  messageThreads: AddMessagePayload,
  getMessagesByThreadId: AddMessagePayload,
  newMessageByThreadId: AddMessagePayload,
  likesUpdated: LikeReturnType,
  newComment: AddCommentPayloadType,
  commentCount: CommentCountType,
  likesCount: LikesCountType,
};


export type SubscriptionFollowingPostsArgs = {
  data: PostSubInput
};


export type SubscriptionNewMessageArgs = {
  sentTo: Scalars['String'],
  message: Scalars['String']
};


export type SubscriptionMessageThreadsArgs = {
  data: AddMessageToThreadInput_V2
};


export type SubscriptionGetMessagesByThreadIdArgs = {
  input: GetMessagesByThreadIdInput
};


export type SubscriptionNewCommentArgs = {
  input: NewCommentsArgs
};


export type SubscriptionCommentCountArgs = {
  input: CommentCountArgs
};


export type SubscriptionLikesCountArgs = {
  input: LikesCountArgs
};

export type Thread = {
   __typename?: 'Thread',
  id?: Maybe<Scalars['ID']>,
  messages?: Maybe<Array<Maybe<Message>>>,
  last_message?: Maybe<Scalars['String']>,
  message_count: Scalars['Int'],
  user: User,
  invitees: Array<User>,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
};

export type ThreadConnection = {
   __typename?: 'ThreadConnection',
  edges: Array<ThreadEdge>,
  pageInfo: PageInfo,
};

export type ThreadEdge = {
   __typename?: 'ThreadEdge',
  node: Thread,
};

export type TransUserReturn = {
   __typename?: 'TransUserReturn',
  id: Scalars['ID'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  thoseICanMessage?: Maybe<Array<User>>,
};

export type UnFollowUserInput = {
  userIDToUnFollow: Scalars['String'],
};

export type UpdateLikesInput = {
  postId: Scalars['ID'],
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName: Scalars['String'],
  mappedMessages: Array<Message>,
  lastName: Scalars['String'],
  email: Scalars['String'],
  threads?: Maybe<Array<Thread>>,
  likes?: Maybe<Array<Like>>,
  name: Scalars['String'],
  confirmed: Scalars['Boolean'],
  posts?: Maybe<Array<Post>>,
  images?: Maybe<Array<Image>>,
  profileImgUrl?: Maybe<Image>,
  messages?: Maybe<Array<Message>>,
  sent_messages?: Maybe<Array<Message>>,
  followers?: Maybe<Array<Maybe<User>>>,
  thread_invitations?: Maybe<Array<Maybe<Thread>>>,
  following?: Maybe<Array<Maybe<User>>>,
};

export type AddMessageToThreadMutationVariables = {
  threadId: Scalars['ID'],
  sentTo: Scalars['String'],
  message: Scalars['String'],
  invitees: Array<Scalars['ID']>,
  images?: Maybe<Array<Maybe<Scalars['String']>>>
};


export type AddMessageToThreadMutation = (
  { __typename?: 'Mutation' }
  & { addMessageToThread: (
    { __typename?: 'AddMessagePayload' }
    & Pick<AddMessagePayload, 'success' | 'threadId'>
    & { invitees: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )>, message: (
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'message'>
      & { images: Maybe<Array<Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'uri'>
      )>>>, sentBy: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName'>
      ), user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName'>
      ) }
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName'>
    ) }
  ) }
);

export type AddNewMessageMutationVariables = {
  sentTo: Scalars['String'],
  message: Scalars['String']
};


export type AddNewMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addNewMessage'>
);

export type CreateMessageThreadMutationVariables = {
  sentTo: Scalars['String'],
  message: Scalars['String'],
  images?: Maybe<Array<Maybe<Scalars['Upload']>>>,
  invitees: Array<Scalars['ID']>
};


export type CreateMessageThreadMutation = (
  { __typename?: 'Mutation' }
  & { createMessageThread: (
    { __typename?: 'Thread' }
    & Pick<Thread, 'id' | 'created_at' | 'updated_at'>
    & { invitees: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ) }
  ) }
);

export type SignS3MutationVariables = {
  files: Array<ImageSubInput>
};


export type SignS3Mutation = (
  { __typename?: 'Mutation' }
  & { signS3: (
    { __typename?: 'SignedS3Payload' }
    & { signatures: Array<(
      { __typename?: 'SignedS3SubPayload' }
      & Pick<SignedS3SubPayload, 'url' | 'signedRequest'>
    )> }
  ) }
);

export type GetAllMyMessagesQueryVariables = {};


export type GetAllMyMessagesQuery = (
  { __typename?: 'Query' }
  & { getAllMyMessages: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
    & { mappedMessages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'created_at' | 'updated_at' | 'message'>
      & { sentBy: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ), user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ) }
    )> }
  )> }
);

export type GetListToCreateThreadQueryVariables = {};


export type GetListToCreateThreadQuery = (
  { __typename?: 'Query' }
  & { getListToCreateThread: Maybe<(
    { __typename?: 'TransUserReturn' }
    & Pick<TransUserReturn, 'id' | 'firstName'>
    & { thoseICanMessage: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )>> }
  )> }
);

export type GetMessageThreadsQueryVariables = {};


export type GetMessageThreadsQuery = (
  { __typename?: 'Query' }
  & { getMessageThreads: Maybe<Array<Maybe<(
    { __typename?: 'Thread' }
    & Pick<Thread, 'id'>
    & { invitees: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )>, messages: Maybe<Array<Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'created_at' | 'message'>
      & { images: Maybe<Array<Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'uri'>
      )>>>, sentBy: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ), user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ) }
    )>>> }
  )>>> }
);

export type GetMessagesByThreadIdQueryVariables = {
  input: GetMessagesByThreadIdInput
};


export type GetMessagesByThreadIdQuery = (
  { __typename?: 'Query' }
  & { getMessagesByThreadId: Maybe<(
    { __typename?: 'MessageConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ), edges: Array<(
      { __typename?: 'MessageEdge' }
      & { node: (
        { __typename?: 'Message' }
        & Pick<Message, 'id' | 'created_at' | 'message'>
        & { images: Maybe<Array<Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'uri'>
        )>>>, user: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'firstName' | 'lastName'>
        ), sentBy: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'firstName' | 'lastName'>
        ) }
      ) }
    )> }
  )> }
);

export type GetMyMessagesFromUserQueryVariables = {
  input: GetMessagesFromUserInput
};


export type GetMyMessagesFromUserQuery = (
  { __typename?: 'Query' }
  & { getMyMessagesFromUser: Maybe<Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'message' | 'created_at'>
    & { sentBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ) }
  )>> }
);

export type NewMessageSubscriptionVariables = {
  message: Scalars['String'],
  sentTo: Scalars['String']
};


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'MessageSubType' }
    & Pick<MessageSubType, 'id' | 'message' | 'created_at' | 'updated_at'>
    & { sentBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ) }
  ) }
);

export type AddCommentToPostMutationVariables = {
  input: NewCommentsArgs
};


export type AddCommentToPostMutation = (
  { __typename?: 'Mutation' }
  & { addCommentToPost: (
    { __typename?: 'AddCommentPayloadType' }
    & Pick<AddCommentPayloadType, 'id' | 'postId' | 'content' | 'created_at'>
  ) }
);

export type CreateOrUpdateLikesMutationVariables = {
  input: UpdateLikesInput
};


export type CreateOrUpdateLikesMutation = (
  { __typename?: 'Mutation' }
  & { createOrUpdateLikes: Maybe<(
    { __typename?: 'LikeReturnType' }
    & Pick<LikeReturnType, 'postId' | 'status'>
  )> }
);

export type CommentCountSubscriptionVariables = {
  input: CommentCountArgs
};


export type CommentCountSubscription = (
  { __typename?: 'Subscription' }
  & { commentCount: (
    { __typename?: 'CommentCountType' }
    & Pick<CommentCountType, 'count' | 'postId'>
  ) }
);

export type LikesCountSubscriptionVariables = {
  input: LikesCountArgs
};


export type LikesCountSubscription = (
  { __typename?: 'Subscription' }
  & { likesCount: (
    { __typename?: 'LikesCountType' }
    & Pick<LikesCountType, 'count' | 'postId'>
  ) }
);

export type NewCommentSubscriptionVariables = {
  input: NewCommentsArgs
};


export type NewCommentSubscription = (
  { __typename?: 'Subscription' }
  & { newComment: (
    { __typename?: 'AddCommentPayloadType' }
    & Pick<AddCommentPayloadType, 'id' | 'postId' | 'content' | 'created_at'>
  ) }
);

export type ChangePasswordMutationVariables = {
  data: ChangePasswordInput
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
  )> }
);

export type CreatePostMutationVariables = {
  data: PostInput
};


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text'>
    & { images: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'uri'>
    )>> }
  ) }
);

export type FollowUserMutationVariables = {
  data: FollowUserInput
};


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followUser'>
);

export type ForgotPasswordMutationVariables = {
  email: Scalars['String']
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UnFollowUserMutationVariables = {
  data: UnFollowUserInput
};


export type UnFollowUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unFollowUser'>
);

export type ConfirmUserMutationVariables = {
  token: Scalars['String']
};


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
  )> }
);

export type RegisterMutationVariables = {
  data: RegisterInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
  ) }
);

export type GetGlobalPostsQueryVariables = {};


export type GetGlobalPostsQuery = (
  { __typename?: 'Query' }
  & { getGlobalPosts: Maybe<Array<(
    { __typename?: 'FollowingPostReturnType' }
    & Pick<FollowingPostReturnType, 'id' | 'title' | 'text' | 'created_at' | 'currently_liked' | 'likes_count' | 'comments_count' | 'isCtxUserIdAFollowerOfPostUser'>
    & { images: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'uri'>
    )>>, user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )> }
  )>> }
);

export type GetMyFollowingPostByIdQueryVariables = {
  getpostinput: GetMyFollowingPostByIdInput
};


export type GetMyFollowingPostByIdQuery = (
  { __typename?: 'Query' }
  & { getMyFollowingPostById: Maybe<(
    { __typename?: 'FollowingPostReturnType' }
    & Pick<FollowingPostReturnType, 'id' | 'title' | 'text' | 'currently_liked' | 'comments_count' | 'likes_count' | 'isCtxUserIdAFollowerOfPostUser'>
    & { comments: Maybe<Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'created_at'>
    )>>, images: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'uri'>
    )>>, user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);

export type GetThoseIFollowAndTheirPostsResolverQueryVariables = {};


export type GetThoseIFollowAndTheirPostsResolverQuery = (
  { __typename?: 'Query' }
  & { getThoseIFollowAndTheirPostsResolver: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
    & { following: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
      & { posts: Maybe<Array<(
        { __typename?: 'Post' }
        & Pick<Post, 'id' | 'title' | 'text'>
        & { images: Maybe<Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'uri'>
        )>> }
      )>> }
    )>>> }
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'email' | 'name' | 'id'>
  )> }
);

export type MyFollowingPostsQueryVariables = {};


export type MyFollowingPostsQuery = (
  { __typename?: 'Query' }
  & { myFollowingPosts: Maybe<Array<(
    { __typename?: 'FollowingPostReturnType' }
    & Pick<FollowingPostReturnType, 'id' | 'title' | 'text' | 'created_at' | 'currently_liked' | 'likes_count' | 'comments_count'>
    & { comments: Maybe<Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'created_at'>
    )>>, images: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'uri'>
    )>>, user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )> }
  )>> }
);

export type GetAllMyImagesQueryVariables = {};


export type GetAllMyImagesQuery = (
  { __typename?: 'Query' }
  & { GetAllMyImages: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'uri'>
  )> }
);

export type GetOnlyThreadsQueryVariables = {
  feedinput: FeedInput
};


export type GetOnlyThreadsQuery = (
  { __typename?: 'Query' }
  & { getOnlyThreads: Maybe<(
    { __typename?: 'ThreadConnection' }
    & { edges: Array<(
      { __typename?: 'ThreadEdge' }
      & { node: (
        { __typename?: 'Thread' }
        & Pick<Thread, 'created_at' | 'updated_at' | 'last_message' | 'message_count' | 'id'>
        & { invitees: Array<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'firstName' | 'lastName'>
        )> }
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'>
    ) }
  )> }
);

export type HelloWorldQueryVariables = {};


export type HelloWorldQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'helloWorld'>
);

export type FollowingPostsSubscriptionVariables = {
  data: PostSubInput
};


export type FollowingPostsSubscription = (
  { __typename?: 'Subscription' }
  & { followingPosts: (
    { __typename?: 'PostSubType' }
    & Pick<PostSubType, 'id' | 'title' | 'text' | 'created_at'>
    & { images: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'uri'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ) }
  ) }
);

export type GlobalPostsSubscriptionVariables = {};


export type GlobalPostsSubscription = (
  { __typename?: 'Subscription' }
  & { globalPosts: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'created_at'>
    & { images: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'uri'>
    )>>, user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )> }
  )> }
);

export type MessageThreadsSubscriptionVariables = {
  data: AddMessageToThreadInput_V2
};


export type MessageThreadsSubscription = (
  { __typename?: 'Subscription' }
  & { messageThreads: (
    { __typename?: 'AddMessagePayload' }
    & Pick<AddMessagePayload, 'success' | 'threadId'>
    & { message: (
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'created_at' | 'message'>
      & { images: Maybe<Array<Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'uri'>
      )>>>, sentBy: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ), user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ) }
    ) }
  ) }
);


export const AddMessageToThreadDocument = gql`
    mutation AddMessageToThread($threadId: ID!, $sentTo: String!, $message: String!, $invitees: [ID!]!, $images: [String]) {
  addMessageToThread(threadId: $threadId, sentTo: $sentTo, message: $message, invitees: $invitees, images: $images) {
    success
    invitees {
      id
      firstName
      lastName
    }
    threadId
    message {
      id
      message
      images {
        id
        uri
      }
      sentBy {
        id
        firstName
      }
      user {
        id
        firstName
      }
    }
    user {
      id
      firstName
    }
  }
}
    `;
export type AddMessageToThreadMutationFn = ApolloReactCommon.MutationFunction<AddMessageToThreadMutation, AddMessageToThreadMutationVariables>;
export type AddMessageToThreadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddMessageToThreadMutation, AddMessageToThreadMutationVariables>, 'mutation'>;

    export const AddMessageToThreadComponent = (props: AddMessageToThreadComponentProps) => (
      <ApolloReactComponents.Mutation<AddMessageToThreadMutation, AddMessageToThreadMutationVariables> mutation={AddMessageToThreadDocument} {...props} />
    );
    
export type AddMessageToThreadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddMessageToThreadMutation, AddMessageToThreadMutationVariables> & TChildProps;
export function withAddMessageToThread<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddMessageToThreadMutation,
  AddMessageToThreadMutationVariables,
  AddMessageToThreadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddMessageToThreadMutation, AddMessageToThreadMutationVariables, AddMessageToThreadProps<TChildProps>>(AddMessageToThreadDocument, {
      alias: 'addMessageToThread',
      ...operationOptions
    });
};
export type AddMessageToThreadMutationResult = ApolloReactCommon.MutationResult<AddMessageToThreadMutation>;
export type AddMessageToThreadMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMessageToThreadMutation, AddMessageToThreadMutationVariables>;
export const AddNewMessageDocument = gql`
    mutation AddNewMessage($sentTo: String!, $message: String!) {
  addNewMessage(sentTo: $sentTo, message: $message)
}
    `;
export type AddNewMessageMutationFn = ApolloReactCommon.MutationFunction<AddNewMessageMutation, AddNewMessageMutationVariables>;
export type AddNewMessageComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddNewMessageMutation, AddNewMessageMutationVariables>, 'mutation'>;

    export const AddNewMessageComponent = (props: AddNewMessageComponentProps) => (
      <ApolloReactComponents.Mutation<AddNewMessageMutation, AddNewMessageMutationVariables> mutation={AddNewMessageDocument} {...props} />
    );
    
export type AddNewMessageProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddNewMessageMutation, AddNewMessageMutationVariables> & TChildProps;
export function withAddNewMessage<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddNewMessageMutation,
  AddNewMessageMutationVariables,
  AddNewMessageProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddNewMessageMutation, AddNewMessageMutationVariables, AddNewMessageProps<TChildProps>>(AddNewMessageDocument, {
      alias: 'addNewMessage',
      ...operationOptions
    });
};
export type AddNewMessageMutationResult = ApolloReactCommon.MutationResult<AddNewMessageMutation>;
export type AddNewMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<AddNewMessageMutation, AddNewMessageMutationVariables>;
export const CreateMessageThreadDocument = gql`
    mutation CreateMessageThread($sentTo: String!, $message: String!, $images: [Upload], $invitees: [ID!]!) {
  createMessageThread(sentTo: $sentTo, message: $message, images: $images, invitees: $invitees) {
    id
    created_at
    updated_at
    invitees {
      id
      firstName
      lastName
    }
    user {
      id
      firstName
      lastName
    }
  }
}
    `;
export type CreateMessageThreadMutationFn = ApolloReactCommon.MutationFunction<CreateMessageThreadMutation, CreateMessageThreadMutationVariables>;
export type CreateMessageThreadComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateMessageThreadMutation, CreateMessageThreadMutationVariables>, 'mutation'>;

    export const CreateMessageThreadComponent = (props: CreateMessageThreadComponentProps) => (
      <ApolloReactComponents.Mutation<CreateMessageThreadMutation, CreateMessageThreadMutationVariables> mutation={CreateMessageThreadDocument} {...props} />
    );
    
export type CreateMessageThreadProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateMessageThreadMutation, CreateMessageThreadMutationVariables> & TChildProps;
export function withCreateMessageThread<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateMessageThreadMutation,
  CreateMessageThreadMutationVariables,
  CreateMessageThreadProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateMessageThreadMutation, CreateMessageThreadMutationVariables, CreateMessageThreadProps<TChildProps>>(CreateMessageThreadDocument, {
      alias: 'createMessageThread',
      ...operationOptions
    });
};
export type CreateMessageThreadMutationResult = ApolloReactCommon.MutationResult<CreateMessageThreadMutation>;
export type CreateMessageThreadMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMessageThreadMutation, CreateMessageThreadMutationVariables>;
export const SignS3Document = gql`
    mutation SignS3($files: [ImageSubInput!]!) {
  signS3(files: $files) {
    signatures {
      url
      signedRequest
    }
  }
}
    `;
export type SignS3MutationFn = ApolloReactCommon.MutationFunction<SignS3Mutation, SignS3MutationVariables>;
export type SignS3ComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignS3Mutation, SignS3MutationVariables>, 'mutation'>;

    export const SignS3Component = (props: SignS3ComponentProps) => (
      <ApolloReactComponents.Mutation<SignS3Mutation, SignS3MutationVariables> mutation={SignS3Document} {...props} />
    );
    
export type SignS3Props<TChildProps = {}> = ApolloReactHoc.MutateProps<SignS3Mutation, SignS3MutationVariables> & TChildProps;
export function withSignS3<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignS3Mutation,
  SignS3MutationVariables,
  SignS3Props<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SignS3Mutation, SignS3MutationVariables, SignS3Props<TChildProps>>(SignS3Document, {
      alias: 'signS3',
      ...operationOptions
    });
};
export type SignS3MutationResult = ApolloReactCommon.MutationResult<SignS3Mutation>;
export type SignS3MutationOptions = ApolloReactCommon.BaseMutationOptions<SignS3Mutation, SignS3MutationVariables>;
export const GetAllMyMessagesDocument = gql`
    query GetAllMyMessages {
  getAllMyMessages {
    id
    firstName
    lastName
    mappedMessages {
      id
      created_at
      updated_at
      message
      sentBy {
        id
        firstName
        lastName
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
}
    `;
export type GetAllMyMessagesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>, 'query'>;

    export const GetAllMyMessagesComponent = (props: GetAllMyMessagesComponentProps) => (
      <ApolloReactComponents.Query<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables> query={GetAllMyMessagesDocument} {...props} />
    );
    
export type GetAllMyMessagesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables> & TChildProps;
export function withGetAllMyMessages<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllMyMessagesQuery,
  GetAllMyMessagesQueryVariables,
  GetAllMyMessagesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables, GetAllMyMessagesProps<TChildProps>>(GetAllMyMessagesDocument, {
      alias: 'getAllMyMessages',
      ...operationOptions
    });
};
export type GetAllMyMessagesQueryResult = ApolloReactCommon.QueryResult<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>;
export const GetListToCreateThreadDocument = gql`
    query GetListToCreateThread {
  getListToCreateThread {
    id
    firstName
    thoseICanMessage {
      id
      firstName
      lastName
    }
  }
}
    `;
export type GetListToCreateThreadComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>, 'query'>;

    export const GetListToCreateThreadComponent = (props: GetListToCreateThreadComponentProps) => (
      <ApolloReactComponents.Query<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables> query={GetListToCreateThreadDocument} {...props} />
    );
    
export type GetListToCreateThreadProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables> & TChildProps;
export function withGetListToCreateThread<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetListToCreateThreadQuery,
  GetListToCreateThreadQueryVariables,
  GetListToCreateThreadProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables, GetListToCreateThreadProps<TChildProps>>(GetListToCreateThreadDocument, {
      alias: 'getListToCreateThread',
      ...operationOptions
    });
};
export type GetListToCreateThreadQueryResult = ApolloReactCommon.QueryResult<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>;
export const GetMessageThreadsDocument = gql`
    query GetMessageThreads {
  getMessageThreads {
    id
    invitees {
      id
      firstName
      lastName
    }
    messages {
      id
      created_at
      message
      images {
        id
        uri
      }
      sentBy {
        id
        firstName
        lastName
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
}
    `;
export type GetMessageThreadsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMessageThreadsQuery, GetMessageThreadsQueryVariables>, 'query'>;

    export const GetMessageThreadsComponent = (props: GetMessageThreadsComponentProps) => (
      <ApolloReactComponents.Query<GetMessageThreadsQuery, GetMessageThreadsQueryVariables> query={GetMessageThreadsDocument} {...props} />
    );
    
export type GetMessageThreadsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMessageThreadsQuery, GetMessageThreadsQueryVariables> & TChildProps;
export function withGetMessageThreads<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMessageThreadsQuery,
  GetMessageThreadsQueryVariables,
  GetMessageThreadsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMessageThreadsQuery, GetMessageThreadsQueryVariables, GetMessageThreadsProps<TChildProps>>(GetMessageThreadsDocument, {
      alias: 'getMessageThreads',
      ...operationOptions
    });
};
export type GetMessageThreadsQueryResult = ApolloReactCommon.QueryResult<GetMessageThreadsQuery, GetMessageThreadsQueryVariables>;
export const GetMessagesByThreadIdDocument = gql`
    query GetMessagesByThreadId($input: GetMessagesByThreadIdInput!) {
  getMessagesByThreadId(input: $input) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        created_at
        message
        images {
          id
          uri
        }
        user {
          id
          firstName
          lastName
        }
        sentBy {
          id
          firstName
          lastName
        }
      }
    }
  }
}
    `;
export type GetMessagesByThreadIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables>, 'query'> & ({ variables: GetMessagesByThreadIdQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetMessagesByThreadIdComponent = (props: GetMessagesByThreadIdComponentProps) => (
      <ApolloReactComponents.Query<GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables> query={GetMessagesByThreadIdDocument} {...props} />
    );
    
export type GetMessagesByThreadIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables> & TChildProps;
export function withGetMessagesByThreadId<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMessagesByThreadIdQuery,
  GetMessagesByThreadIdQueryVariables,
  GetMessagesByThreadIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables, GetMessagesByThreadIdProps<TChildProps>>(GetMessagesByThreadIdDocument, {
      alias: 'getMessagesByThreadId',
      ...operationOptions
    });
};
export type GetMessagesByThreadIdQueryResult = ApolloReactCommon.QueryResult<GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables>;
export const GetMyMessagesFromUserDocument = gql`
    query GetMyMessagesFromUser($input: GetMessagesFromUserInput!) {
  getMyMessagesFromUser(input: $input) {
    id
    message
    created_at
    sentBy {
      id
      firstName
      lastName
    }
  }
}
    `;
export type GetMyMessagesFromUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>, 'query'> & ({ variables: GetMyMessagesFromUserQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetMyMessagesFromUserComponent = (props: GetMyMessagesFromUserComponentProps) => (
      <ApolloReactComponents.Query<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables> query={GetMyMessagesFromUserDocument} {...props} />
    );
    
export type GetMyMessagesFromUserProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables> & TChildProps;
export function withGetMyMessagesFromUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMyMessagesFromUserQuery,
  GetMyMessagesFromUserQueryVariables,
  GetMyMessagesFromUserProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables, GetMyMessagesFromUserProps<TChildProps>>(GetMyMessagesFromUserDocument, {
      alias: 'getMyMessagesFromUser',
      ...operationOptions
    });
};
export type GetMyMessagesFromUserQueryResult = ApolloReactCommon.QueryResult<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage($message: String!, $sentTo: String!) {
  newMessage(message: $message, sentTo: $sentTo) {
    id
    message
    sentBy {
      id
      firstName
      lastName
    }
    user {
      id
      firstName
      lastName
    }
    created_at
    updated_at
  }
}
    `;
export type NewMessageComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<NewMessageSubscription, NewMessageSubscriptionVariables>, 'subscription'>;

    export const NewMessageComponent = (props: NewMessageComponentProps) => (
      <ApolloReactComponents.Subscription<NewMessageSubscription, NewMessageSubscriptionVariables> subscription={NewMessageDocument} {...props} />
    );
    
export type NewMessageProps<TChildProps = {}> = ApolloReactHoc.DataProps<NewMessageSubscription, NewMessageSubscriptionVariables> & TChildProps;
export function withNewMessage<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
  NewMessageProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, NewMessageSubscription, NewMessageSubscriptionVariables, NewMessageProps<TChildProps>>(NewMessageDocument, {
      alias: 'newMessage',
      ...operationOptions
    });
};
export type NewMessageSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewMessageSubscription>;
export const AddCommentToPostDocument = gql`
    mutation AddCommentToPost($input: NewCommentsArgs!) {
  addCommentToPost(input: $input) {
    id
    postId
    content
    created_at
  }
}
    `;
export type AddCommentToPostMutationFn = ApolloReactCommon.MutationFunction<AddCommentToPostMutation, AddCommentToPostMutationVariables>;
export type AddCommentToPostComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddCommentToPostMutation, AddCommentToPostMutationVariables>, 'mutation'>;

    export const AddCommentToPostComponent = (props: AddCommentToPostComponentProps) => (
      <ApolloReactComponents.Mutation<AddCommentToPostMutation, AddCommentToPostMutationVariables> mutation={AddCommentToPostDocument} {...props} />
    );
    
export type AddCommentToPostProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddCommentToPostMutation, AddCommentToPostMutationVariables> & TChildProps;
export function withAddCommentToPost<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddCommentToPostMutation,
  AddCommentToPostMutationVariables,
  AddCommentToPostProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddCommentToPostMutation, AddCommentToPostMutationVariables, AddCommentToPostProps<TChildProps>>(AddCommentToPostDocument, {
      alias: 'addCommentToPost',
      ...operationOptions
    });
};
export type AddCommentToPostMutationResult = ApolloReactCommon.MutationResult<AddCommentToPostMutation>;
export type AddCommentToPostMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCommentToPostMutation, AddCommentToPostMutationVariables>;
export const CreateOrUpdateLikesDocument = gql`
    mutation CreateOrUpdateLikes($input: UpdateLikesInput!) {
  createOrUpdateLikes(input: $input) {
    postId
    status
  }
}
    `;
export type CreateOrUpdateLikesMutationFn = ApolloReactCommon.MutationFunction<CreateOrUpdateLikesMutation, CreateOrUpdateLikesMutationVariables>;
export type CreateOrUpdateLikesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateOrUpdateLikesMutation, CreateOrUpdateLikesMutationVariables>, 'mutation'>;

    export const CreateOrUpdateLikesComponent = (props: CreateOrUpdateLikesComponentProps) => (
      <ApolloReactComponents.Mutation<CreateOrUpdateLikesMutation, CreateOrUpdateLikesMutationVariables> mutation={CreateOrUpdateLikesDocument} {...props} />
    );
    
export type CreateOrUpdateLikesProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateOrUpdateLikesMutation, CreateOrUpdateLikesMutationVariables> & TChildProps;
export function withCreateOrUpdateLikes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateOrUpdateLikesMutation,
  CreateOrUpdateLikesMutationVariables,
  CreateOrUpdateLikesProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateOrUpdateLikesMutation, CreateOrUpdateLikesMutationVariables, CreateOrUpdateLikesProps<TChildProps>>(CreateOrUpdateLikesDocument, {
      alias: 'createOrUpdateLikes',
      ...operationOptions
    });
};
export type CreateOrUpdateLikesMutationResult = ApolloReactCommon.MutationResult<CreateOrUpdateLikesMutation>;
export type CreateOrUpdateLikesMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOrUpdateLikesMutation, CreateOrUpdateLikesMutationVariables>;
export const CommentCountDocument = gql`
    subscription CommentCount($input: CommentCountArgs!) {
  commentCount(input: $input) {
    count
    postId
  }
}
    `;
export type CommentCountComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<CommentCountSubscription, CommentCountSubscriptionVariables>, 'subscription'>;

    export const CommentCountComponent = (props: CommentCountComponentProps) => (
      <ApolloReactComponents.Subscription<CommentCountSubscription, CommentCountSubscriptionVariables> subscription={CommentCountDocument} {...props} />
    );
    
export type CommentCountProps<TChildProps = {}> = ApolloReactHoc.DataProps<CommentCountSubscription, CommentCountSubscriptionVariables> & TChildProps;
export function withCommentCount<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CommentCountSubscription,
  CommentCountSubscriptionVariables,
  CommentCountProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, CommentCountSubscription, CommentCountSubscriptionVariables, CommentCountProps<TChildProps>>(CommentCountDocument, {
      alias: 'commentCount',
      ...operationOptions
    });
};
export type CommentCountSubscriptionResult = ApolloReactCommon.SubscriptionResult<CommentCountSubscription>;
export const LikesCountDocument = gql`
    subscription LikesCount($input: LikesCountArgs!) {
  likesCount(input: $input) {
    count
    postId
  }
}
    `;
export type LikesCountComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<LikesCountSubscription, LikesCountSubscriptionVariables>, 'subscription'>;

    export const LikesCountComponent = (props: LikesCountComponentProps) => (
      <ApolloReactComponents.Subscription<LikesCountSubscription, LikesCountSubscriptionVariables> subscription={LikesCountDocument} {...props} />
    );
    
export type LikesCountProps<TChildProps = {}> = ApolloReactHoc.DataProps<LikesCountSubscription, LikesCountSubscriptionVariables> & TChildProps;
export function withLikesCount<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LikesCountSubscription,
  LikesCountSubscriptionVariables,
  LikesCountProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, LikesCountSubscription, LikesCountSubscriptionVariables, LikesCountProps<TChildProps>>(LikesCountDocument, {
      alias: 'likesCount',
      ...operationOptions
    });
};
export type LikesCountSubscriptionResult = ApolloReactCommon.SubscriptionResult<LikesCountSubscription>;
export const NewCommentDocument = gql`
    subscription NewComment($input: NewCommentsArgs!) {
  newComment(input: $input) {
    id
    postId
    content
    created_at
  }
}
    `;
export type NewCommentComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<NewCommentSubscription, NewCommentSubscriptionVariables>, 'subscription'>;

    export const NewCommentComponent = (props: NewCommentComponentProps) => (
      <ApolloReactComponents.Subscription<NewCommentSubscription, NewCommentSubscriptionVariables> subscription={NewCommentDocument} {...props} />
    );
    
export type NewCommentProps<TChildProps = {}> = ApolloReactHoc.DataProps<NewCommentSubscription, NewCommentSubscriptionVariables> & TChildProps;
export function withNewComment<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  NewCommentSubscription,
  NewCommentSubscriptionVariables,
  NewCommentProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, NewCommentSubscription, NewCommentSubscriptionVariables, NewCommentProps<TChildProps>>(NewCommentDocument, {
      alias: 'newComment',
      ...operationOptions
    });
};
export type NewCommentSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewCommentSubscription>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    id
    firstName
    lastName
    email
    name
  }
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;
export type ChangePasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ChangePasswordMutation, ChangePasswordMutationVariables>, 'mutation'>;

    export const ChangePasswordComponent = (props: ChangePasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ChangePasswordMutation, ChangePasswordMutationVariables> mutation={ChangePasswordDocument} {...props} />
    );
    
export type ChangePasswordProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ChangePasswordMutation, ChangePasswordMutationVariables> & TChildProps;
export function withChangePassword<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  ChangePasswordProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ChangePasswordMutation, ChangePasswordMutationVariables, ChangePasswordProps<TChildProps>>(ChangePasswordDocument, {
      alias: 'changePassword',
      ...operationOptions
    });
};
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($data: PostInput!) {
  createPost(data: $data) {
    id
    title
    text
    images {
      id
      uri
    }
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;
export type CreatePostComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreatePostMutation, CreatePostMutationVariables>, 'mutation'>;

    export const CreatePostComponent = (props: CreatePostComponentProps) => (
      <ApolloReactComponents.Mutation<CreatePostMutation, CreatePostMutationVariables> mutation={CreatePostDocument} {...props} />
    );
    
export type CreatePostProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreatePostMutation, CreatePostMutationVariables> & TChildProps;
export function withCreatePost<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreatePostMutation,
  CreatePostMutationVariables,
  CreatePostProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreatePostMutation, CreatePostMutationVariables, CreatePostProps<TChildProps>>(CreatePostDocument, {
      alias: 'createPost',
      ...operationOptions
    });
};
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($data: FollowUserInput!) {
  followUser(data: $data)
}
    `;
export type FollowUserMutationFn = ApolloReactCommon.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;
export type FollowUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<FollowUserMutation, FollowUserMutationVariables>, 'mutation'>;

    export const FollowUserComponent = (props: FollowUserComponentProps) => (
      <ApolloReactComponents.Mutation<FollowUserMutation, FollowUserMutationVariables> mutation={FollowUserDocument} {...props} />
    );
    
export type FollowUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<FollowUserMutation, FollowUserMutationVariables> & TChildProps;
export function withFollowUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FollowUserMutation,
  FollowUserMutationVariables,
  FollowUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, FollowUserMutation, FollowUserMutationVariables, FollowUserProps<TChildProps>>(FollowUserDocument, {
      alias: 'followUser',
      ...operationOptions
    });
};
export type FollowUserMutationResult = ApolloReactCommon.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = ApolloReactCommon.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export type ForgotPasswordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>, 'mutation'>;

    export const ForgotPasswordComponent = (props: ForgotPasswordComponentProps) => (
      <ApolloReactComponents.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> mutation={ForgotPasswordDocument} {...props} />
    );
    
export type ForgotPasswordProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ForgotPasswordMutation, ForgotPasswordMutationVariables> & TChildProps;
export function withForgotPassword<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  ForgotPasswordProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ForgotPasswordMutation, ForgotPasswordMutationVariables, ForgotPasswordProps<TChildProps>>(ForgotPasswordDocument, {
      alias: 'forgotPassword',
      ...operationOptions
    });
};
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    
export type LogoutProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LogoutMutation, LogoutMutationVariables> & TChildProps;
export function withLogout<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutation, LogoutMutationVariables, LogoutProps<TChildProps>>(LogoutDocument, {
      alias: 'logout',
      ...operationOptions
    });
};
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UnFollowUserDocument = gql`
    mutation UnFollowUser($data: UnFollowUserInput!) {
  unFollowUser(data: $data)
}
    `;
export type UnFollowUserMutationFn = ApolloReactCommon.MutationFunction<UnFollowUserMutation, UnFollowUserMutationVariables>;
export type UnFollowUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UnFollowUserMutation, UnFollowUserMutationVariables>, 'mutation'>;

    export const UnFollowUserComponent = (props: UnFollowUserComponentProps) => (
      <ApolloReactComponents.Mutation<UnFollowUserMutation, UnFollowUserMutationVariables> mutation={UnFollowUserDocument} {...props} />
    );
    
export type UnFollowUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<UnFollowUserMutation, UnFollowUserMutationVariables> & TChildProps;
export function withUnFollowUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UnFollowUserMutation,
  UnFollowUserMutationVariables,
  UnFollowUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, UnFollowUserMutation, UnFollowUserMutationVariables, UnFollowUserProps<TChildProps>>(UnFollowUserDocument, {
      alias: 'unFollowUser',
      ...operationOptions
    });
};
export type UnFollowUserMutationResult = ApolloReactCommon.MutationResult<UnFollowUserMutation>;
export type UnFollowUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UnFollowUserMutation, UnFollowUserMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = ApolloReactCommon.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;
export type ConfirmUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ConfirmUserMutation, ConfirmUserMutationVariables>, 'mutation'>;

    export const ConfirmUserComponent = (props: ConfirmUserComponentProps) => (
      <ApolloReactComponents.Mutation<ConfirmUserMutation, ConfirmUserMutationVariables> mutation={ConfirmUserDocument} {...props} />
    );
    
export type ConfirmUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<ConfirmUserMutation, ConfirmUserMutationVariables> & TChildProps;
export function withConfirmUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ConfirmUserMutation,
  ConfirmUserMutationVariables,
  ConfirmUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, ConfirmUserMutation, ConfirmUserMutationVariables, ConfirmUserProps<TChildProps>>(ConfirmUserDocument, {
      alias: 'confirmUser',
      ...operationOptions
    });
};
export type ConfirmUserMutationResult = ApolloReactCommon.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    firstName
    lastName
    email
    name
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> & TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    firstName
    lastName
    email
    name
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    
export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables> & TChildProps;
export function withRegister<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetGlobalPostsDocument = gql`
    query GetGlobalPosts {
  getGlobalPosts {
    id
    title
    text
    created_at
    currently_liked
    likes_count
    comments_count
    images {
      id
      uri
    }
    isCtxUserIdAFollowerOfPostUser
    user {
      id
      firstName
      lastName
    }
  }
}
    `;
export type GetGlobalPostsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetGlobalPostsQuery, GetGlobalPostsQueryVariables>, 'query'>;

    export const GetGlobalPostsComponent = (props: GetGlobalPostsComponentProps) => (
      <ApolloReactComponents.Query<GetGlobalPostsQuery, GetGlobalPostsQueryVariables> query={GetGlobalPostsDocument} {...props} />
    );
    
export type GetGlobalPostsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetGlobalPostsQuery, GetGlobalPostsQueryVariables> & TChildProps;
export function withGetGlobalPosts<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetGlobalPostsQuery,
  GetGlobalPostsQueryVariables,
  GetGlobalPostsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetGlobalPostsQuery, GetGlobalPostsQueryVariables, GetGlobalPostsProps<TChildProps>>(GetGlobalPostsDocument, {
      alias: 'getGlobalPosts',
      ...operationOptions
    });
};
export type GetGlobalPostsQueryResult = ApolloReactCommon.QueryResult<GetGlobalPostsQuery, GetGlobalPostsQueryVariables>;
export const GetMyFollowingPostByIdDocument = gql`
    query GetMyFollowingPostById($getpostinput: GetMyFollowingPostByIdInput!) {
  getMyFollowingPostById(getpostinput: $getpostinput) {
    id
    title
    text
    currently_liked
    comments {
      id
      content
      created_at
    }
    comments_count
    likes_count
    isCtxUserIdAFollowerOfPostUser
    images {
      id
      uri
    }
    user {
      id
    }
  }
}
    `;
export type GetMyFollowingPostByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables>, 'query'> & ({ variables: GetMyFollowingPostByIdQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetMyFollowingPostByIdComponent = (props: GetMyFollowingPostByIdComponentProps) => (
      <ApolloReactComponents.Query<GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables> query={GetMyFollowingPostByIdDocument} {...props} />
    );
    
export type GetMyFollowingPostByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables> & TChildProps;
export function withGetMyFollowingPostById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMyFollowingPostByIdQuery,
  GetMyFollowingPostByIdQueryVariables,
  GetMyFollowingPostByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables, GetMyFollowingPostByIdProps<TChildProps>>(GetMyFollowingPostByIdDocument, {
      alias: 'getMyFollowingPostById',
      ...operationOptions
    });
};
export type GetMyFollowingPostByIdQueryResult = ApolloReactCommon.QueryResult<GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables>;
export const GetThoseIFollowAndTheirPostsResolverDocument = gql`
    query GetThoseIFollowAndTheirPostsResolver {
  getThoseIFollowAndTheirPostsResolver {
    id
    firstName
    lastName
    email
    name
    following {
      id
      firstName
      lastName
      posts {
        id
        title
        text
        images {
          id
          uri
        }
      }
    }
  }
}
    `;
export type GetThoseIFollowAndTheirPostsResolverComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables>, 'query'>;

    export const GetThoseIFollowAndTheirPostsResolverComponent = (props: GetThoseIFollowAndTheirPostsResolverComponentProps) => (
      <ApolloReactComponents.Query<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables> query={GetThoseIFollowAndTheirPostsResolverDocument} {...props} />
    );
    
export type GetThoseIFollowAndTheirPostsResolverProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables> & TChildProps;
export function withGetThoseIFollowAndTheirPostsResolver<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetThoseIFollowAndTheirPostsResolverQuery,
  GetThoseIFollowAndTheirPostsResolverQueryVariables,
  GetThoseIFollowAndTheirPostsResolverProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables, GetThoseIFollowAndTheirPostsResolverProps<TChildProps>>(GetThoseIFollowAndTheirPostsResolverDocument, {
      alias: 'getThoseIFollowAndTheirPostsResolver',
      ...operationOptions
    });
};
export type GetThoseIFollowAndTheirPostsResolverQueryResult = ApolloReactCommon.QueryResult<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    firstName
    lastName
    email
    name
    id
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<MeQuery, MeQueryVariables> & TChildProps;
export function withMe<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MyFollowingPostsDocument = gql`
    query MyFollowingPosts {
  myFollowingPosts {
    id
    title
    text
    created_at
    currently_liked
    likes_count
    comments {
      id
      content
      created_at
    }
    comments_count
    images {
      id
      uri
    }
    user {
      id
      firstName
      lastName
    }
  }
}
    `;
export type MyFollowingPostsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MyFollowingPostsQuery, MyFollowingPostsQueryVariables>, 'query'>;

    export const MyFollowingPostsComponent = (props: MyFollowingPostsComponentProps) => (
      <ApolloReactComponents.Query<MyFollowingPostsQuery, MyFollowingPostsQueryVariables> query={MyFollowingPostsDocument} {...props} />
    );
    
export type MyFollowingPostsProps<TChildProps = {}> = ApolloReactHoc.DataProps<MyFollowingPostsQuery, MyFollowingPostsQueryVariables> & TChildProps;
export function withMyFollowingPosts<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MyFollowingPostsQuery,
  MyFollowingPostsQueryVariables,
  MyFollowingPostsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MyFollowingPostsQuery, MyFollowingPostsQueryVariables, MyFollowingPostsProps<TChildProps>>(MyFollowingPostsDocument, {
      alias: 'myFollowingPosts',
      ...operationOptions
    });
};
export type MyFollowingPostsQueryResult = ApolloReactCommon.QueryResult<MyFollowingPostsQuery, MyFollowingPostsQueryVariables>;
export const GetAllMyImagesDocument = gql`
    query GetAllMyImages {
  GetAllMyImages {
    id
    uri
  }
}
    `;
export type GetAllMyImagesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllMyImagesQuery, GetAllMyImagesQueryVariables>, 'query'>;

    export const GetAllMyImagesComponent = (props: GetAllMyImagesComponentProps) => (
      <ApolloReactComponents.Query<GetAllMyImagesQuery, GetAllMyImagesQueryVariables> query={GetAllMyImagesDocument} {...props} />
    );
    
export type GetAllMyImagesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetAllMyImagesQuery, GetAllMyImagesQueryVariables> & TChildProps;
export function withGetAllMyImages<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllMyImagesQuery,
  GetAllMyImagesQueryVariables,
  GetAllMyImagesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllMyImagesQuery, GetAllMyImagesQueryVariables, GetAllMyImagesProps<TChildProps>>(GetAllMyImagesDocument, {
      alias: 'getAllMyImages',
      ...operationOptions
    });
};
export type GetAllMyImagesQueryResult = ApolloReactCommon.QueryResult<GetAllMyImagesQuery, GetAllMyImagesQueryVariables>;
export const GetOnlyThreadsDocument = gql`
    query GetOnlyThreads($feedinput: FeedInput!) {
  getOnlyThreads(feedinput: $feedinput) {
    edges {
      node {
        created_at
        updated_at
        last_message
        message_count
        id
        invitees {
          id
          firstName
          lastName
        }
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;
export type GetOnlyThreadsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables>, 'query'> & ({ variables: GetOnlyThreadsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetOnlyThreadsComponent = (props: GetOnlyThreadsComponentProps) => (
      <ApolloReactComponents.Query<GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables> query={GetOnlyThreadsDocument} {...props} />
    );
    
export type GetOnlyThreadsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables> & TChildProps;
export function withGetOnlyThreads<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetOnlyThreadsQuery,
  GetOnlyThreadsQueryVariables,
  GetOnlyThreadsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables, GetOnlyThreadsProps<TChildProps>>(GetOnlyThreadsDocument, {
      alias: 'getOnlyThreads',
      ...operationOptions
    });
};
export type GetOnlyThreadsQueryResult = ApolloReactCommon.QueryResult<GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables>;
export const HelloWorldDocument = gql`
    query HelloWorld {
  helloWorld
}
    `;
export type HelloWorldComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<HelloWorldQuery, HelloWorldQueryVariables>, 'query'>;

    export const HelloWorldComponent = (props: HelloWorldComponentProps) => (
      <ApolloReactComponents.Query<HelloWorldQuery, HelloWorldQueryVariables> query={HelloWorldDocument} {...props} />
    );
    
export type HelloWorldProps<TChildProps = {}> = ApolloReactHoc.DataProps<HelloWorldQuery, HelloWorldQueryVariables> & TChildProps;
export function withHelloWorld<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  HelloWorldQuery,
  HelloWorldQueryVariables,
  HelloWorldProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, HelloWorldQuery, HelloWorldQueryVariables, HelloWorldProps<TChildProps>>(HelloWorldDocument, {
      alias: 'helloWorld',
      ...operationOptions
    });
};
export type HelloWorldQueryResult = ApolloReactCommon.QueryResult<HelloWorldQuery, HelloWorldQueryVariables>;
export const FollowingPostsDocument = gql`
    subscription FollowingPosts($data: PostSubInput!) {
  followingPosts(data: $data) {
    id
    title
    text
    created_at
    images {
      id
      uri
    }
    user {
      id
      firstName
      lastName
    }
  }
}
    `;
export type FollowingPostsComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<FollowingPostsSubscription, FollowingPostsSubscriptionVariables>, 'subscription'>;

    export const FollowingPostsComponent = (props: FollowingPostsComponentProps) => (
      <ApolloReactComponents.Subscription<FollowingPostsSubscription, FollowingPostsSubscriptionVariables> subscription={FollowingPostsDocument} {...props} />
    );
    
export type FollowingPostsProps<TChildProps = {}> = ApolloReactHoc.DataProps<FollowingPostsSubscription, FollowingPostsSubscriptionVariables> & TChildProps;
export function withFollowingPosts<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  FollowingPostsSubscription,
  FollowingPostsSubscriptionVariables,
  FollowingPostsProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, FollowingPostsSubscription, FollowingPostsSubscriptionVariables, FollowingPostsProps<TChildProps>>(FollowingPostsDocument, {
      alias: 'followingPosts',
      ...operationOptions
    });
};
export type FollowingPostsSubscriptionResult = ApolloReactCommon.SubscriptionResult<FollowingPostsSubscription>;
export const GlobalPostsDocument = gql`
    subscription GlobalPosts {
  globalPosts {
    id
    title
    text
    created_at
    images {
      id
      uri
    }
    user {
      id
      firstName
      lastName
    }
  }
}
    `;
export type GlobalPostsComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<GlobalPostsSubscription, GlobalPostsSubscriptionVariables>, 'subscription'>;

    export const GlobalPostsComponent = (props: GlobalPostsComponentProps) => (
      <ApolloReactComponents.Subscription<GlobalPostsSubscription, GlobalPostsSubscriptionVariables> subscription={GlobalPostsDocument} {...props} />
    );
    
export type GlobalPostsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GlobalPostsSubscription, GlobalPostsSubscriptionVariables> & TChildProps;
export function withGlobalPosts<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GlobalPostsSubscription,
  GlobalPostsSubscriptionVariables,
  GlobalPostsProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, GlobalPostsSubscription, GlobalPostsSubscriptionVariables, GlobalPostsProps<TChildProps>>(GlobalPostsDocument, {
      alias: 'globalPosts',
      ...operationOptions
    });
};
export type GlobalPostsSubscriptionResult = ApolloReactCommon.SubscriptionResult<GlobalPostsSubscription>;
export const MessageThreadsDocument = gql`
    subscription MessageThreads($data: AddMessageToThreadInput_v2!) {
  messageThreads(data: $data) {
    success
    threadId
    message {
      id
      created_at
      message
      images {
        id
        uri
      }
      sentBy {
        id
        firstName
        lastName
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
}
    `;
export type MessageThreadsComponentProps = Omit<ApolloReactComponents.SubscriptionComponentOptions<MessageThreadsSubscription, MessageThreadsSubscriptionVariables>, 'subscription'>;

    export const MessageThreadsComponent = (props: MessageThreadsComponentProps) => (
      <ApolloReactComponents.Subscription<MessageThreadsSubscription, MessageThreadsSubscriptionVariables> subscription={MessageThreadsDocument} {...props} />
    );
    
export type MessageThreadsProps<TChildProps = {}> = ApolloReactHoc.DataProps<MessageThreadsSubscription, MessageThreadsSubscriptionVariables> & TChildProps;
export function withMessageThreads<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MessageThreadsSubscription,
  MessageThreadsSubscriptionVariables,
  MessageThreadsProps<TChildProps>>) {
    return ApolloReactHoc.withSubscription<TProps, MessageThreadsSubscription, MessageThreadsSubscriptionVariables, MessageThreadsProps<TChildProps>>(MessageThreadsDocument, {
      alias: 'messageThreads',
      ...operationOptions
    });
};
export type MessageThreadsSubscriptionResult = ApolloReactCommon.SubscriptionResult<MessageThreadsSubscription>;