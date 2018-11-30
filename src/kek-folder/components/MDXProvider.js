import React, { Fragment } from "react";
import { MDXProvider } from "@mdx-js/tag";
import { Paragraph, H1, H2 } from "./Font";
import { List, Item } from "./List";
import Link from "./Link";
import { createGlobalStyle } from "styled-components";
import "prism-themes/themes/prism-xonokai.css";

const PrismStyles = createGlobalStyle`
  .gatsby-highlight pre {
    padding: 16px;
    margin: 32px;
  }
`;

const components = {
  wrapper: props => (
    <Fragment>
      <PrismStyles />
      {props.children}
    </Fragment>
  ),
  h1: H1,
  h2: H2,
  p: Paragraph,
  a: Link,
  ul: List,
  li: Item
};

const Provider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default Provider;
