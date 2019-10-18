import App from "next/app";
import React from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "theme-ui";
import { theme } from "../src/styles/theme";

import { ApolloProvider } from "react-apollo";
// import { ThemeProvider } from "styled-components";
// import { createGlobalStyle } from "styled-components";

import withApollo from "../src/lib/withApollo";
import "./empty.css";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Global
            styles={css`
              html {
                box-sizing: border-box;
              }
              body {
                margin: 0;
                text-size-adjust: 100%;
                font-family: "Montserrat", sans-serif;
              }
              *,
              *:before,
              *:after {
                box-sizing: inherit;
              }
#__next { min-height: 100vh; display: flex }
`;
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
