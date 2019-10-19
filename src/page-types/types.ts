import { ParsedUrlQuery } from "querystring";

export interface IPageProps {
  pathname?: string;
  query?: ParsedUrlQuery;
}

export interface IMessagesPageProps extends IPageProps {
  id?: string | string[];
}
