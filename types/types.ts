import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { NextPageContext } from "next";

export interface MyContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  referer: string;
}

export interface IDropZoneProps {
  data: any;
  disabled: boolean;
  error: any;
  loading: any;
  me: any;
  mutation: any;
  onFilesAdded: any;
  signS3: any;
}

export interface IDropZoneContainerProps {
  mutateCreatePost: any;
  me: any;
  mutateSignS3: any;

  dataCreatePost: any;
  errorCreatePost: any;
  loadingCreatePost: any;
}

// safe to delete? I think I just renamed this,
// but can't really remember
// export interface IDropZoneState {
//   highlight: boolean;
//   files: any[];
//   name: string;
// }

export interface IDropZoneContainerState {
  highlight: boolean;
  files: any[];
  name: string;
  disabled: boolean;
  fileInputKey: string;
}
