import React from "react";
import { MDXProvider } from "@mdx-js/tag";
import { Text } from "./Font";
import Link from "./Link";

const components = {
  p: Text,
  a: Link
};

const Provider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default Provider;
