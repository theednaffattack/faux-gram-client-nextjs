import React from "react";
import styled from "styled-components";

import Tabs from "./tabs";
import { Flex } from "../../components/styled-rebass";
import { TFlexProps } from "./types";
import GlobalFeed from "./global-feed";
import MyFeed from "./my-feed";
import { MeQuery } from "../../components/generated/apollo-graphql";
import { ApolloError } from "apollo-boost";

interface SpecialFlexProps extends TFlexProps {
  label: string;
}

interface ITabViewerProps {
  dataMe: MeQuery["me"];
  errorMe: ApolloError | undefined;
  loadingMe: boolean;
}

const SpecialFlex = styled(Flex)<SpecialFlexProps>``;

export const TabViewer: React.FunctionComponent<ITabViewerProps> = ({
  dataMe,
  errorMe,
  loadingMe
}) => {
  console.log(dataMe);
  if (errorMe)
    return <div>Error loading "Me" data!{JSON.stringify(errorMe)}</div>;
  if (loadingMe) return <div>loading "ME" data...</div>;
  return (
    <Tabs>
      <SpecialFlex label="My Feed">
        <MyFeed me={dataMe} />
      </SpecialFlex>
      <SpecialFlex label="Global Feed">
        <GlobalFeed me={dataMe} />
      </SpecialFlex>
    </Tabs>
  );
};
