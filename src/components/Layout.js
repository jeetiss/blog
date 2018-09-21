import React from "react";
import { Link } from "gatsby";
import { Flex, Box } from "./Grid";
import { css } from "styled-components";
import system from "../system";

const A = system({
  extend: Link,
  css: css`
    text-decoration: none;
    color: black;
    cursor: pointer;
  `
});

const activeStyle = { opacity: 0.5 };

const Layout = ({ children }) => (
  <Flex justifyContent="center">
    <Flex flexDirection="column" flex="0 1 800px">
      <Flex justifyContent="flex-end">
        <Box px={16} py="8px">
          <A to="/about/" activeStyle={activeStyle}>
            about
          </A>
        </Box>

        <Box px={16} py="8px">
          <A to="/articles/" activeStyle={activeStyle}>
            articles
          </A>
        </Box>

        <Box px={16} py="8px">
          <A to="/projects/" activeStyle={activeStyle}>
            projects
          </A>
        </Box>
      </Flex>

      {children}
    </Flex>
  </Flex>
);

export default Layout;
