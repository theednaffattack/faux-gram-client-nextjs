import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";

import { theme } from "../src/styles/theme";
import withApollo from "../src/lib/withApollo";
// import "./empty.css";
import { GlobalStyles } from "../src/styles/global-styles";
import Layout from "../src/components/layout";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <GlobalStyles />
          <Layout title="A title">
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
