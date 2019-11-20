import { ParsedUrlQuery } from "querystring";

export interface IPageProps {
  pathname?: string;
  query?: ParsedUrlQuery;
}

export interface IExtendedPageProps extends IPageProps {
  id?: string | string[];
}
