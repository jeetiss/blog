import React from "react";
import Helmet from "react-helmet";
import App from "../examples/chack";

export default () => (
  <>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Fira+Sans:500&amp;subset=cyrillic"
        rel="stylesheet"
      />
    </Helmet>

    <App />
  </>
);
