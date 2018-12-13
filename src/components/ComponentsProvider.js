import React from "react";
import { MDXProvider } from "@mdx-js/tag";

const components = {
  wrapper: props => <div {...props} style={{ height: "50vh" }} />
};

const Provider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default Provider;
