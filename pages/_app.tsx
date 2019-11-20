import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";

import { theme } from "../src/styles/theme";
import withApollo from "../src/lib/withApollo";
// import "./empty.css";
import { GlobalStyles } from "../src/styles/global-styles";
import Layout from "../src/modules/site-layout/layout";

class MyApp extends App<any> {
  render() {
    // @ts-ignore
    const { Component, pageProps, apolloClient, router } = this.props;
    const getLayout = Component.getLayout || ((page: any) => page);
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <GlobalStyles />
          <Layout title="A title">
            {getLayout(<Component {...pageProps} />)}
          </Layout>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default withApollo(MyApp);
