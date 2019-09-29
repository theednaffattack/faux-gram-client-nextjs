import React from "react";
import Link from "next/link";

export const Header: React.FunctionComponent = () => (
  <header>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
      |{" "}
      <Link href="/about">
        <a>About</a>
      </Link>{" "}
      |{" "}
      <Link href="/initial-props">
        <a>With Initial Props</a>
      </Link>{" "}
      |{" "}
      <Link href="/a">
        <a>a</a>
      </Link>{" "}
      |{" "}
      <Link href="/b">
        <a>b</a>
      </Link>
    </nav>
  </header>
);
