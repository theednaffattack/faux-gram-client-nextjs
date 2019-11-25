import React from "react";

import { getLayout } from "../src/modules/site-layout/layout";
import { Flex, Heading } from "../src/components/styled-rebass";

interface IIndexPage {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const IndexPage: IIndexPage = () => {
  return (
    <Flex flex="1 1 auto" alignItems="center" justifyContent="center">
      <Heading fontFamily="main" as="h1">
        Welcome to FauxGram!
      </Heading>
    </Flex>
  );
};

IndexPage.getLayout = getLayout;
IndexPage.title = "Home";

export default IndexPage;
