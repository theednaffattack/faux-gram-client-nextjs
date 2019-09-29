import App, { Container } from "next/app";
import React from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "theme-ui";
import { theme } from "../styles/theme";

import { ApolloProvider } from "react-apollo";
// import { ThemeProvider } from "styled-components";
// import { createGlobalStyle } from "styled-components";

import withApollo from "../lib/withApollo";

// Global styles but theme- and update-able!
// const GlobalStyle = createGlobalStyle`
// html {
//   box-sizing: border-box;
// }
// body {
//     margin: 0;
//     text-size-adjust: 100%;
//     font-family: 'Montserrat', sans-serif;
//   }
// *, *:before, *:after {
//   box-sizing: inherit;
// }
// `;

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
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
          `}
        />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
