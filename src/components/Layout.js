import React from "react";
import Helmet from "react-helmet";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: auto;
    max-width: ${props => props.width + "px"};
    padding: 16px;
    padding-top: ${props => props.pt + "px"};
  }
`;

export default ({ children, width = 496, pt = 16 }) => (
  <>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600&amp;subset=cyrillic"
        rel="stylesheet"
      />
    </Helmet>

    <GlobalStyle width={width} pt={pt} />

    {children}
  </>
);
