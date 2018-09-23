import React, { Fragment } from "react";
import { MDXProvider } from "@mdx-js/tag";
import { Text } from "./Font";
import { List, Item } from "./List";
import Link from "./Link";

const components = {
  wrapper: Fragment,
  p: Text,
  a: Link,
  ul: List,
  li: Item
};

const Provider = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default Provider;
