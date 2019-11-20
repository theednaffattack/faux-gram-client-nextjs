import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";

import { theme } from "../src/styles/theme";
import withApollo from "../src/lib/withApollo";
// import "./empty.css";
import { GlobalStyles } from "../src/styles/global-styles";

class MyApp extends App<any> {
  render() {
    // @ts-ignore
    const { Component, pageProps, apolloClient, router } = this.props;
    const getLayout = Component.getLayout || ((page: any) => page);
    const title = Component.title || "Fake test title";
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <GlobalStyles />
          {getLayout(<Component title={title} {...pageProps} />)}
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
