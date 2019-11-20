import React from "react";
import Link from "next/link";

import { getLayout } from "../src/modules/site-layout/layout";

interface IIndexPage {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const IndexPage: IIndexPage = () => {
  return (
    <>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about" as="/about">
          <a>About</a>
        </Link>
      </p>
    </>
  );
};

IndexPage.getLayout = getLayout;
IndexPage.title = "Home";

export default IndexPage;
