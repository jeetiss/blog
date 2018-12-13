import React from "react";
import { setConfig } from "react-hot-loader";
import Helmet from "react-helmet";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme, { themes } from '../theme';

const isProd = process.env.NODE_ENV === "production";
!isProd && setConfig({ pureSFC: true });

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-y: scroll;
    color: ${theme("colors.text")};
    background-color: ${theme("colors.background")};

    transition:
      background-color ${theme("animations.duration.normal")} ease,
      color ${theme("animations.duration.normal")} ease;
  }
`;

export default ({ children }) => (
  <ThemeProvider theme={themes[0]}>
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Fira+Sans:400,600&amp;subset=cyrillic"
          rel="stylesheet"
        />
      </Helmet>

      <GlobalStyle />

      {children}
    </>
  </ThemeProvider>
);
