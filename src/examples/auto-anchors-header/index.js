import React, { useEffect, createContext, useContext, useMemo } from "react";
import GHSlugger from "github-slugger";

import Layout from "../../components/Layout";
import { Flex } from "../../components/Flexbox";

const sluggerContext = createContext(new GHSlugger());

const SluggerReseter = ({ children }) => {
  const slugger = useContext(sluggerContext);

  useEffect(() => {
    slugger.reset();
  }, []);

  return children;
};

const Header = ({ as: Component = "h1", anchor, children }) => {
  const slugger = useContext(sluggerContext);
  const autoAnchor = useMemo(() => anchor || slugger.slug(children), [
    slugger,
    anchor,
    children
  ]);

  return (
    <Component>
      <a id={autoAnchor} href={`#${autoAnchor}`}>
        {children}
      </a>
    </Component>
  );
};

export default () => (
  <Layout>
    <SluggerReseter>
      <Header as="h1">H1 header</Header>
      <Header as="h1">H1 header</Header>
     
      <Header as="h2" anchor='fuck-ea'>H2 header</Header>
      <Header as="h3">H3 header</Header>
      <Header as="h4">H4 header</Header>
      <Header as="h5">H5 header</Header>
      <Header as="h6">H6 header</Header>
    </SluggerReseter>
  </Layout>
);

export const frontmatter = {
  title: "Автоматические якоря",
  description: "Генерация автоматических якорей на странице",
  slug: "anchors",
  video: null
};
