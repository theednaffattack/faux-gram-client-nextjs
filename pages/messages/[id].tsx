import { NextPage } from "next";

import Layout from "../../src/components/layout";
import GetMessagesByThreadIdPage from "../../src/components/messages/get-messages-by-thread-id-page";
import { IMessagesPageProps } from "../../src/page-types/types";

const MessagesById: NextPage<IMessagesPageProps> = ({ id }) => {
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
    <Layout>
      <GetMessagesByThreadIdPage
        threadIdSelected={preppedId}
        handleCloseThread={() =>
          console.log("handleCloseThread passed as prop")
        }
        me=""
        handleDisplayMessages={() =>
          console.log("handleDisplayMessages passed as prop")
        }
        formDisabled={false}
      />
    </Layout>
  );
};

MessagesById.getInitialProps = async ({ pathname, query }) => {
  const { id } = query;

  return { pathname, query, id };
};

export default MessagesById;
