import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
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


export type EditUserInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
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

export type GetGlobalPostByIdInput = {
  postId: Scalars['ID'],
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

export type GlobalPostReturnType = {
   __typename?: 'GlobalPostReturnType',
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
  images?: Maybe<Array<Image>>,
  likes?: Maybe<Array<Like>>,
  comments?: Maybe<Array<Comment>>,
  user?: Maybe<User>,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
  isCtxUserIdAFollowerOfPostUser?: Maybe<Scalars['Boolean']>,
  comments_count: Scalars['Int'],
  likes_count: Scalars['Int'],
  currently_liked: Scalars['Boolean'],
  success?: Maybe<Scalars['Boolean']>,
  action?: Maybe<Scalars['String']>,
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
  addProfilePicture: UploadProfilePictueReturnType,
  createPost: Post,
  editUserInfo: User,
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


export type MutationAddProfilePictureArgs = {
  data: UploadProfilePictureInput
};


export type MutationCreatePostArgs = {
  data: PostInput
};


export type MutationEditUserInfoArgs = {
  data: EditUserInput
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
  getGlobalPosts?: Maybe<Array<GlobalPostReturnType>>,
  getGlobalPostById?: Maybe<GlobalPostReturnType>,
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


export type QueryGetGlobalPostsArgs = {
  cursor?: Maybe<Scalars['String']>,
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type QueryGetGlobalPostByIdArgs = {
  getpostinput: GetGlobalPostByIdInput
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
  globalPosts?: Maybe<GlobalPostReturnType>,
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


export type UploadProfilePictueReturnType = {
   __typename?: 'UploadProfilePictueReturnType',
  message: Scalars['String'],
  profileImgUrl: Scalars['String'],
};

export type UploadProfilePictureInput = {
  user: Scalars['ID'],
  image?: Maybe<Scalars['String']>,
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
  images?: Maybe<Array<Maybe<Image>>>,
  profileImgUrl?: Maybe<Scalars['String']>,
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

export type AddProfilePictureMutationVariables = {
  data: UploadProfilePictureInput
};


export type AddProfilePictureMutation = (
  { __typename?: 'Mutation' }
  & { addProfilePicture: (
    { __typename?: 'UploadProfilePictueReturnType' }
    & Pick<UploadProfilePictueReturnType, 'message' | 'profileImgUrl'>
  ) }
);

export type ConfirmUserMutationVariables = {
  token: Scalars['String']
};


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type EditUserInfoMutationVariables = {
  data: EditUserInput
};


export type EditUserInfoMutation = (
  { __typename?: 'Mutation' }
  & { editUserInfo: (
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'email' | 'name' | 'id' | 'profileImgUrl'>
  ) }
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

export type GetGlobalPostsQueryVariables = {
  cursor?: Maybe<Scalars['String']>,
  skip?: Maybe<Scalars['Int']>,
  take?: Maybe<Scalars['Int']>
};


export type GetGlobalPostsQuery = (
  { __typename?: 'Query' }
  & { getGlobalPosts: Maybe<Array<(
    { __typename?: 'GlobalPostReturnType' }
    & Pick<GlobalPostReturnType, 'id' | 'title' | 'text' | 'created_at' | 'currently_liked' | 'comments_count' | 'likes_count' | 'isCtxUserIdAFollowerOfPostUser'>
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
    & Pick<User, 'firstName' | 'lastName' | 'email' | 'name' | 'id' | 'profileImgUrl'>
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

export type GetGlobalPostByIdQueryVariables = {
  getpostinput: GetGlobalPostByIdInput
};


export type GetGlobalPostByIdQuery = (
  { __typename?: 'Query' }
  & { getGlobalPostById: Maybe<(
    { __typename?: 'GlobalPostReturnType' }
    & Pick<GlobalPostReturnType, 'id' | 'title' | 'text' | 'created_at' | 'currently_liked' | 'comments_count' | 'likes_count' | 'isCtxUserIdAFollowerOfPostUser'>
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
    { __typename?: 'GlobalPostReturnType' }
    & Pick<GlobalPostReturnType, 'id' | 'title' | 'text' | 'created_at' | 'currently_liked' | 'comments_count' | 'likes_count' | 'isCtxUserIdAFollowerOfPostUser'>
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

/**
 * __useAddMessageToThreadMutation__
 *
 * To run a mutation, you first call `useAddMessageToThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageToThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageToThreadMutation, { data, loading, error }] = useAddMessageToThreadMutation({
 *   variables: {
 *      threadId: // value for 'threadId'
 *      sentTo: // value for 'sentTo'
 *      message: // value for 'message'
 *      invitees: // value for 'invitees'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useAddMessageToThreadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMessageToThreadMutation, AddMessageToThreadMutationVariables>) {
        return ApolloReactHooks.useMutation<AddMessageToThreadMutation, AddMessageToThreadMutationVariables>(AddMessageToThreadDocument, baseOptions);
      }
export type AddMessageToThreadMutationHookResult = ReturnType<typeof useAddMessageToThreadMutation>;
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

/**
 * __useAddNewMessageMutation__
 *
 * To run a mutation, you first call `useAddNewMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewMessageMutation, { data, loading, error }] = useAddNewMessageMutation({
 *   variables: {
 *      sentTo: // value for 'sentTo'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useAddNewMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddNewMessageMutation, AddNewMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<AddNewMessageMutation, AddNewMessageMutationVariables>(AddNewMessageDocument, baseOptions);
      }
export type AddNewMessageMutationHookResult = ReturnType<typeof useAddNewMessageMutation>;
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

/**
 * __useCreateMessageThreadMutation__
 *
 * To run a mutation, you first call `useCreateMessageThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageThreadMutation, { data, loading, error }] = useCreateMessageThreadMutation({
 *   variables: {
 *      sentTo: // value for 'sentTo'
 *      message: // value for 'message'
 *      images: // value for 'images'
 *      invitees: // value for 'invitees'
 *   },
 * });
 */
export function useCreateMessageThreadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMessageThreadMutation, CreateMessageThreadMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMessageThreadMutation, CreateMessageThreadMutationVariables>(CreateMessageThreadDocument, baseOptions);
      }
export type CreateMessageThreadMutationHookResult = ReturnType<typeof useCreateMessageThreadMutation>;
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

/**
 * __useSignS3Mutation__
 *
 * To run a mutation, you first call `useSignS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3Mutation, { data, loading, error }] = useSignS3Mutation({
 *   variables: {
 *      files: // value for 'files'
 *   },
 * });
 */
export function useSignS3Mutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignS3Mutation, SignS3MutationVariables>) {
        return ApolloReactHooks.useMutation<SignS3Mutation, SignS3MutationVariables>(SignS3Document, baseOptions);
      }
export type SignS3MutationHookResult = ReturnType<typeof useSignS3Mutation>;
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

/**
 * __useGetAllMyMessagesQuery__
 *
 * To run a query within a React component, call `useGetAllMyMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMyMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMyMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMyMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>(GetAllMyMessagesDocument, baseOptions);
      }
export function useGetAllMyMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllMyMessagesQuery, GetAllMyMessagesQueryVariables>(GetAllMyMessagesDocument, baseOptions);
        }
export type GetAllMyMessagesQueryHookResult = ReturnType<typeof useGetAllMyMessagesQuery>;
export type GetAllMyMessagesLazyQueryHookResult = ReturnType<typeof useGetAllMyMessagesLazyQuery>;
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

/**
 * __useGetListToCreateThreadQuery__
 *
 * To run a query within a React component, call `useGetListToCreateThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListToCreateThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListToCreateThreadQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListToCreateThreadQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>) {
        return ApolloReactHooks.useQuery<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>(GetListToCreateThreadDocument, baseOptions);
      }
export function useGetListToCreateThreadLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetListToCreateThreadQuery, GetListToCreateThreadQueryVariables>(GetListToCreateThreadDocument, baseOptions);
        }
export type GetListToCreateThreadQueryHookResult = ReturnType<typeof useGetListToCreateThreadQuery>;
export type GetListToCreateThreadLazyQueryHookResult = ReturnType<typeof useGetListToCreateThreadLazyQuery>;
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

/**
 * __useGetMessageThreadsQuery__
 *
 * To run a query within a React component, call `useGetMessageThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessageThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessageThreadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMessageThreadsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMessageThreadsQuery, GetMessageThreadsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMessageThreadsQuery, GetMessageThreadsQueryVariables>(GetMessageThreadsDocument, baseOptions);
      }
export function useGetMessageThreadsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMessageThreadsQuery, GetMessageThreadsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMessageThreadsQuery, GetMessageThreadsQueryVariables>(GetMessageThreadsDocument, baseOptions);
        }
export type GetMessageThreadsQueryHookResult = ReturnType<typeof useGetMessageThreadsQuery>;
export type GetMessageThreadsLazyQueryHookResult = ReturnType<typeof useGetMessageThreadsLazyQuery>;
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

/**
 * __useGetMessagesByThreadIdQuery__
 *
 * To run a query within a React component, call `useGetMessagesByThreadIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByThreadIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByThreadIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMessagesByThreadIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables>(GetMessagesByThreadIdDocument, baseOptions);
      }
export function useGetMessagesByThreadIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMessagesByThreadIdQuery, GetMessagesByThreadIdQueryVariables>(GetMessagesByThreadIdDocument, baseOptions);
        }
export type GetMessagesByThreadIdQueryHookResult = ReturnType<typeof useGetMessagesByThreadIdQuery>;
export type GetMessagesByThreadIdLazyQueryHookResult = ReturnType<typeof useGetMessagesByThreadIdLazyQuery>;
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

/**
 * __useGetMyMessagesFromUserQuery__
 *
 * To run a query within a React component, call `useGetMyMessagesFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMessagesFromUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMessagesFromUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyMessagesFromUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>(GetMyMessagesFromUserDocument, baseOptions);
      }
export function useGetMyMessagesFromUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyMessagesFromUserQuery, GetMyMessagesFromUserQueryVariables>(GetMyMessagesFromUserDocument, baseOptions);
        }
export type GetMyMessagesFromUserQueryHookResult = ReturnType<typeof useGetMyMessagesFromUserQuery>;
export type GetMyMessagesFromUserLazyQueryHookResult = ReturnType<typeof useGetMyMessagesFromUserLazyQuery>;
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

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      message: // value for 'message'
 *      sentTo: // value for 'sentTo'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
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

/**
 * __useAddCommentToPostMutation__
 *
 * To run a mutation, you first call `useAddCommentToPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentToPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentToPostMutation, { data, loading, error }] = useAddCommentToPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCommentToPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCommentToPostMutation, AddCommentToPostMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCommentToPostMutation, AddCommentToPostMutationVariables>(AddCommentToPostDocument, baseOptions);
      }
export type AddCommentToPostMutationHookResult = ReturnType<typeof useAddCommentToPostMutation>;
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

/**
 * __useCreateOrUpdateLikesMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateLikesMutation, { data, loading, error }] = useCreateOrUpdateLikesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateLikesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOrUpdateLikesMutation, CreateOrUpdateLikesMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOrUpdateLikesMutation, CreateOrUpdateLikesMutationVariables>(CreateOrUpdateLikesDocument, baseOptions);
      }
export type CreateOrUpdateLikesMutationHookResult = ReturnType<typeof useCreateOrUpdateLikesMutation>;
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

/**
 * __useCommentCountSubscription__
 *
 * To run a query within a React component, call `useCommentCountSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCommentCountSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentCountSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommentCountSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<CommentCountSubscription, CommentCountSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<CommentCountSubscription, CommentCountSubscriptionVariables>(CommentCountDocument, baseOptions);
      }
export type CommentCountSubscriptionHookResult = ReturnType<typeof useCommentCountSubscription>;
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

/**
 * __useLikesCountSubscription__
 *
 * To run a query within a React component, call `useLikesCountSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLikesCountSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLikesCountSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLikesCountSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<LikesCountSubscription, LikesCountSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<LikesCountSubscription, LikesCountSubscriptionVariables>(LikesCountDocument, baseOptions);
      }
export type LikesCountSubscriptionHookResult = ReturnType<typeof useLikesCountSubscription>;
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

/**
 * __useNewCommentSubscription__
 *
 * To run a query within a React component, call `useNewCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewCommentSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewCommentSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewCommentSubscription, NewCommentSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NewCommentSubscription, NewCommentSubscriptionVariables>(NewCommentDocument, baseOptions);
      }
export type NewCommentSubscriptionHookResult = ReturnType<typeof useNewCommentSubscription>;
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

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
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

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
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

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        return ApolloReactHooks.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, baseOptions);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
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

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
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

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
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

/**
 * __useUnFollowUserMutation__
 *
 * To run a mutation, you first call `useUnFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowUserMutation, { data, loading, error }] = useUnFollowUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUnFollowUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnFollowUserMutation, UnFollowUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UnFollowUserMutation, UnFollowUserMutationVariables>(UnFollowUserDocument, baseOptions);
      }
export type UnFollowUserMutationHookResult = ReturnType<typeof useUnFollowUserMutation>;
export type UnFollowUserMutationResult = ApolloReactCommon.MutationResult<UnFollowUserMutation>;
export type UnFollowUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UnFollowUserMutation, UnFollowUserMutationVariables>;
export const AddProfilePictureDocument = gql`
    mutation AddProfilePicture($data: UploadProfilePictureInput!) {
  addProfilePicture(data: $data) {
    message
    profileImgUrl
  }
}
    `;
export type AddProfilePictureMutationFn = ApolloReactCommon.MutationFunction<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
export type AddProfilePictureComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>, 'mutation'>;

    export const AddProfilePictureComponent = (props: AddProfilePictureComponentProps) => (
      <ApolloReactComponents.Mutation<AddProfilePictureMutation, AddProfilePictureMutationVariables> mutation={AddProfilePictureDocument} {...props} />
    );
    
export type AddProfilePictureProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddProfilePictureMutation, AddProfilePictureMutationVariables> & TChildProps;
export function withAddProfilePicture<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddProfilePictureMutation,
  AddProfilePictureMutationVariables,
  AddProfilePictureProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddProfilePictureMutation, AddProfilePictureMutationVariables, AddProfilePictureProps<TChildProps>>(AddProfilePictureDocument, {
      alias: 'addProfilePicture',
      ...operationOptions
    });
};

/**
 * __useAddProfilePictureMutation__
 *
 * To run a mutation, you first call `useAddProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfilePictureMutation, { data, loading, error }] = useAddProfilePictureMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddProfilePictureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>) {
        return ApolloReactHooks.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument, baseOptions);
      }
export type AddProfilePictureMutationHookResult = ReturnType<typeof useAddProfilePictureMutation>;
export type AddProfilePictureMutationResult = ApolloReactCommon.MutationResult<AddProfilePictureMutation>;
export type AddProfilePictureMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
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

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        return ApolloReactHooks.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = ApolloReactCommon.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const EditUserInfoDocument = gql`
    mutation EditUserInfo($data: EditUserInput!) {
  editUserInfo(data: $data) {
    firstName
    lastName
    email
    name
    id
    profileImgUrl
  }
}
    `;
export type EditUserInfoMutationFn = ApolloReactCommon.MutationFunction<EditUserInfoMutation, EditUserInfoMutationVariables>;
export type EditUserInfoComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EditUserInfoMutation, EditUserInfoMutationVariables>, 'mutation'>;

    export const EditUserInfoComponent = (props: EditUserInfoComponentProps) => (
      <ApolloReactComponents.Mutation<EditUserInfoMutation, EditUserInfoMutationVariables> mutation={EditUserInfoDocument} {...props} />
    );
    
export type EditUserInfoProps<TChildProps = {}> = ApolloReactHoc.MutateProps<EditUserInfoMutation, EditUserInfoMutationVariables> & TChildProps;
export function withEditUserInfo<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditUserInfoMutation,
  EditUserInfoMutationVariables,
  EditUserInfoProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, EditUserInfoMutation, EditUserInfoMutationVariables, EditUserInfoProps<TChildProps>>(EditUserInfoDocument, {
      alias: 'editUserInfo',
      ...operationOptions
    });
};

/**
 * __useEditUserInfoMutation__
 *
 * To run a mutation, you first call `useEditUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserInfoMutation, { data, loading, error }] = useEditUserInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserInfoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditUserInfoMutation, EditUserInfoMutationVariables>) {
        return ApolloReactHooks.useMutation<EditUserInfoMutation, EditUserInfoMutationVariables>(EditUserInfoDocument, baseOptions);
      }
export type EditUserInfoMutationHookResult = ReturnType<typeof useEditUserInfoMutation>;
export type EditUserInfoMutationResult = ApolloReactCommon.MutationResult<EditUserInfoMutation>;
export type EditUserInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<EditUserInfoMutation, EditUserInfoMutationVariables>;
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

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
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

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetGlobalPostsDocument = gql`
    query GetGlobalPosts($cursor: String, $skip: Int, $take: Int) {
  getGlobalPosts(cursor: $cursor, skip: $skip, take: $take) {
    id
    title
    text
    created_at
    currently_liked
    comments_count
    likes_count
    isCtxUserIdAFollowerOfPostUser
    comments {
      id
      content
      created_at
    }
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

/**
 * __useGetGlobalPostsQuery__
 *
 * To run a query within a React component, call `useGetGlobalPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGlobalPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGlobalPostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useGetGlobalPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGlobalPostsQuery, GetGlobalPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetGlobalPostsQuery, GetGlobalPostsQueryVariables>(GetGlobalPostsDocument, baseOptions);
      }
export function useGetGlobalPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGlobalPostsQuery, GetGlobalPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetGlobalPostsQuery, GetGlobalPostsQueryVariables>(GetGlobalPostsDocument, baseOptions);
        }
export type GetGlobalPostsQueryHookResult = ReturnType<typeof useGetGlobalPostsQuery>;
export type GetGlobalPostsLazyQueryHookResult = ReturnType<typeof useGetGlobalPostsLazyQuery>;
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

/**
 * __useGetMyFollowingPostByIdQuery__
 *
 * To run a query within a React component, call `useGetMyFollowingPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFollowingPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFollowingPostByIdQuery({
 *   variables: {
 *      getpostinput: // value for 'getpostinput'
 *   },
 * });
 */
export function useGetMyFollowingPostByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables>(GetMyFollowingPostByIdDocument, baseOptions);
      }
export function useGetMyFollowingPostByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyFollowingPostByIdQuery, GetMyFollowingPostByIdQueryVariables>(GetMyFollowingPostByIdDocument, baseOptions);
        }
export type GetMyFollowingPostByIdQueryHookResult = ReturnType<typeof useGetMyFollowingPostByIdQuery>;
export type GetMyFollowingPostByIdLazyQueryHookResult = ReturnType<typeof useGetMyFollowingPostByIdLazyQuery>;
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

/**
 * __useGetThoseIFollowAndTheirPostsResolverQuery__
 *
 * To run a query within a React component, call `useGetThoseIFollowAndTheirPostsResolverQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThoseIFollowAndTheirPostsResolverQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThoseIFollowAndTheirPostsResolverQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetThoseIFollowAndTheirPostsResolverQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables>) {
        return ApolloReactHooks.useQuery<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables>(GetThoseIFollowAndTheirPostsResolverDocument, baseOptions);
      }
export function useGetThoseIFollowAndTheirPostsResolverLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables>(GetThoseIFollowAndTheirPostsResolverDocument, baseOptions);
        }
export type GetThoseIFollowAndTheirPostsResolverQueryHookResult = ReturnType<typeof useGetThoseIFollowAndTheirPostsResolverQuery>;
export type GetThoseIFollowAndTheirPostsResolverLazyQueryHookResult = ReturnType<typeof useGetThoseIFollowAndTheirPostsResolverLazyQuery>;
export type GetThoseIFollowAndTheirPostsResolverQueryResult = ApolloReactCommon.QueryResult<GetThoseIFollowAndTheirPostsResolverQuery, GetThoseIFollowAndTheirPostsResolverQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    firstName
    lastName
    email
    name
    id
    profileImgUrl
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
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

/**
 * __useMyFollowingPostsQuery__
 *
 * To run a query within a React component, call `useMyFollowingPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFollowingPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFollowingPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFollowingPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyFollowingPostsQuery, MyFollowingPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<MyFollowingPostsQuery, MyFollowingPostsQueryVariables>(MyFollowingPostsDocument, baseOptions);
      }
export function useMyFollowingPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyFollowingPostsQuery, MyFollowingPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyFollowingPostsQuery, MyFollowingPostsQueryVariables>(MyFollowingPostsDocument, baseOptions);
        }
export type MyFollowingPostsQueryHookResult = ReturnType<typeof useMyFollowingPostsQuery>;
export type MyFollowingPostsLazyQueryHookResult = ReturnType<typeof useMyFollowingPostsLazyQuery>;
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

/**
 * __useGetAllMyImagesQuery__
 *
 * To run a query within a React component, call `useGetAllMyImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMyImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMyImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMyImagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllMyImagesQuery, GetAllMyImagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllMyImagesQuery, GetAllMyImagesQueryVariables>(GetAllMyImagesDocument, baseOptions);
      }
export function useGetAllMyImagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllMyImagesQuery, GetAllMyImagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllMyImagesQuery, GetAllMyImagesQueryVariables>(GetAllMyImagesDocument, baseOptions);
        }
export type GetAllMyImagesQueryHookResult = ReturnType<typeof useGetAllMyImagesQuery>;
export type GetAllMyImagesLazyQueryHookResult = ReturnType<typeof useGetAllMyImagesLazyQuery>;
export type GetAllMyImagesQueryResult = ApolloReactCommon.QueryResult<GetAllMyImagesQuery, GetAllMyImagesQueryVariables>;
export const GetGlobalPostByIdDocument = gql`
    query GetGlobalPostById($getpostinput: GetGlobalPostByIdInput!) {
  getGlobalPostById(getpostinput: $getpostinput) {
    id
    title
    text
    created_at
    currently_liked
    comments_count
    likes_count
    isCtxUserIdAFollowerOfPostUser
    comments {
      id
      content
      created_at
    }
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
export type GetGlobalPostByIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables>, 'query'> & ({ variables: GetGlobalPostByIdQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetGlobalPostByIdComponent = (props: GetGlobalPostByIdComponentProps) => (
      <ApolloReactComponents.Query<GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables> query={GetGlobalPostByIdDocument} {...props} />
    );
    
export type GetGlobalPostByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables> & TChildProps;
export function withGetGlobalPostById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetGlobalPostByIdQuery,
  GetGlobalPostByIdQueryVariables,
  GetGlobalPostByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables, GetGlobalPostByIdProps<TChildProps>>(GetGlobalPostByIdDocument, {
      alias: 'getGlobalPostById',
      ...operationOptions
    });
};

/**
 * __useGetGlobalPostByIdQuery__
 *
 * To run a query within a React component, call `useGetGlobalPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGlobalPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGlobalPostByIdQuery({
 *   variables: {
 *      getpostinput: // value for 'getpostinput'
 *   },
 * });
 */
export function useGetGlobalPostByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables>(GetGlobalPostByIdDocument, baseOptions);
      }
export function useGetGlobalPostByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables>(GetGlobalPostByIdDocument, baseOptions);
        }
export type GetGlobalPostByIdQueryHookResult = ReturnType<typeof useGetGlobalPostByIdQuery>;
export type GetGlobalPostByIdLazyQueryHookResult = ReturnType<typeof useGetGlobalPostByIdLazyQuery>;
export type GetGlobalPostByIdQueryResult = ApolloReactCommon.QueryResult<GetGlobalPostByIdQuery, GetGlobalPostByIdQueryVariables>;
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

/**
 * __useGetOnlyThreadsQuery__
 *
 * To run a query within a React component, call `useGetOnlyThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnlyThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnlyThreadsQuery({
 *   variables: {
 *      feedinput: // value for 'feedinput'
 *   },
 * });
 */
export function useGetOnlyThreadsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables>(GetOnlyThreadsDocument, baseOptions);
      }
export function useGetOnlyThreadsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetOnlyThreadsQuery, GetOnlyThreadsQueryVariables>(GetOnlyThreadsDocument, baseOptions);
        }
export type GetOnlyThreadsQueryHookResult = ReturnType<typeof useGetOnlyThreadsQuery>;
export type GetOnlyThreadsLazyQueryHookResult = ReturnType<typeof useGetOnlyThreadsLazyQuery>;
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

/**
 * __useHelloWorldQuery__
 *
 * To run a query within a React component, call `useHelloWorldQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloWorldQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloWorldQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloWorldQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
        return ApolloReactHooks.useQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, baseOptions);
      }
export function useHelloWorldLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, baseOptions);
        }
export type HelloWorldQueryHookResult = ReturnType<typeof useHelloWorldQuery>;
export type HelloWorldLazyQueryHookResult = ReturnType<typeof useHelloWorldLazyQuery>;
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

/**
 * __useFollowingPostsSubscription__
 *
 * To run a query within a React component, call `useFollowingPostsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFollowingPostsSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingPostsSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFollowingPostsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<FollowingPostsSubscription, FollowingPostsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<FollowingPostsSubscription, FollowingPostsSubscriptionVariables>(FollowingPostsDocument, baseOptions);
      }
export type FollowingPostsSubscriptionHookResult = ReturnType<typeof useFollowingPostsSubscription>;
export type FollowingPostsSubscriptionResult = ApolloReactCommon.SubscriptionResult<FollowingPostsSubscription>;
export const GlobalPostsDocument = gql`
    subscription GlobalPosts {
  globalPosts {
    id
    title
    text
    created_at
    currently_liked
    comments_count
    likes_count
    isCtxUserIdAFollowerOfPostUser
    comments {
      id
      content
      created_at
    }
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

/**
 * __useGlobalPostsSubscription__
 *
 * To run a query within a React component, call `useGlobalPostsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGlobalPostsSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalPostsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGlobalPostsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<GlobalPostsSubscription, GlobalPostsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<GlobalPostsSubscription, GlobalPostsSubscriptionVariables>(GlobalPostsDocument, baseOptions);
      }
export type GlobalPostsSubscriptionHookResult = ReturnType<typeof useGlobalPostsSubscription>;
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

/**
 * __useMessageThreadsSubscription__
 *
 * To run a query within a React component, call `useMessageThreadsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageThreadsSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageThreadsSubscription({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMessageThreadsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<MessageThreadsSubscription, MessageThreadsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<MessageThreadsSubscription, MessageThreadsSubscriptionVariables>(MessageThreadsDocument, baseOptions);
      }
export type MessageThreadsSubscriptionHookResult = ReturnType<typeof useMessageThreadsSubscription>;
export type MessageThreadsSubscriptionResult = ApolloReactCommon.SubscriptionResult<MessageThreadsSubscription>;