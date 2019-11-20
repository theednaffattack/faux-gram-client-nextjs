import Router from "next/router";

import { IExtendedPageProps } from "../../src/page-types/types";
import { MyContext } from "../../types/types";
import { MeComponent } from "../../src/components/generated/apollo-graphql";
import { isBrowser } from "../../src/lib/isBrowser";
import { FeedItemPage } from "../../src/modules/feed/feed-item-page";
import Layout, { getLayout } from "../../src/modules/site-layout/layout";

interface IMessageById {
  ({ id, pathname, query }: IExtendedPageProps): JSX.Element;

  getInitialProps: ({
    pathname,
    query
  }: MyContext) => Promise<IExtendedPageProps>;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const MessagesById: IMessageById = ({ id, pathname, query }) => {
  let preppedId: string;
  if (id && id.constructor === Array) {
    preppedId = id[0];
  }
  if (id && typeof id === "string") {
    preppedId = id;
  } else {
    preppedId = "";
  }

  return (
    <Layout title="View post">
      <MeComponent>
        {({ data: dataMe, loading: loadingMe, error: errorMe }) => {
          let isData = dataMe && dataMe.me ? dataMe.me : null;
          let isLoading = loadingMe ? loadingMe : null;
          let isError = errorMe ? errorMe : null;

          if (!isError && !isLoading && !isData && isBrowser) {
            Router.push("/login");
          }

          if (isError) return <div>"Me" data loading Error!</div>;
          if (isLoading) {
            return <div>"Me" data is loading</div>;
          }
          if (isData) {
            return (
              <FeedItemPage
                pathname={pathname}
                query={query}
                itemId={preppedId}
              />
            );
          } else {
            return (
              <div>
                None of three "Me" states (loaded data, loading data, error
                loading data) is present!
              </div>
            );
          }
        }}
      </MeComponent>
    </Layout>
  );
};

MessagesById.getInitialProps = async ({ pathname, query }: MyContext) => {
  const { id } = query;

  return { pathname, query, id };
};

MessagesById.getLayout = getLayout;
MessagesById.title = "Individual post";

export default MessagesById;
