import React from "react";

import { Flex } from "./styled-rebass";
import { GetMessageThreadsComponent } from "./generated/apollo-graphql";
import { ViewThreadStateContainer } from "./view-thread-state-container";

export interface IViewThreadsProps {
  me: any;
  data: any;
}

function ViewThreads(props: IViewThreadsProps) {
  const { me } = props;
  return (
    <GetMessageThreadsComponent>
      {({
        subscribeToMore,
        data: dataThread,
        error: errorThread,
        loading: loadingThread,
        ...apolloBag
      }) => {
        return (
          <Flex
            flexDirection="column"
            flex="1 1 auto"
            width={[1, 1, 1]}
            style={{ height: "100%", position: "relative" }}
          >
            {loadingThread ? (
              <div>Loading...</div>
            ) : (
              <ViewThreadStateContainer
                data={dataThread}
                loading={loadingThread}
                error={errorThread}
                subscribeToMore={subscribeToMore}
                me={me}
                {...apolloBag}
              />
            )}
          </Flex>
        );
      }}
    </GetMessageThreadsComponent>
  );
}

export default ViewThreads;
