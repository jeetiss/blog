import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components";
import { Toggle, Compose } from "react-powerplug/dist/react-powerplug.umd";
import { MDXProvider } from "@mdx-js/tag";
import { Flex, Box } from "./Grid";
import { Text } from "./Font";
import GlobalStyle from "./GlobalStyle";
import Link from "./Link";

const components = {
  p: Text
};

const themes = [
  { text: "black", background: "white" },
  { text: "white", background: "black" }
];

const Layout = ({ children }) => (
  <Fragment>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Rubik&amp;subset=cyrillic"
        rel="stylesheet"
      />
    </Helmet>

    <Compose components={[Toggle, Toggle]}>
      {({ on: dark, toggle: tgDark }, { on: xray, toggle: tgXRay }) => (
        <ThemeProvider theme={themes[+dark]}>
          <Fragment>
            <GlobalStyle xray={xray} />

            <Flex justifyContent="center">
              <Flex flexDirection="column" flex="0 1 800px" px={16}>
                <Flex justifyContent="flex-end" alignItems="center">
                  <Flex flex="1">
                    <button onClick={tgDark}>dark</button>
                    <button onClick={tgXRay}>x-ray</button>
                  </Flex>

                  <Box px={16} py="8px">
                    <Link to="/about/">обо мне</Link>
                  </Box>

                  {/* <Box px={16} py="8px">
                    <Link to="/articles/">
                      посты
                    </Link>
                  </Box> */}

                  <Box px={16} py="8px">
                    <Link to="/projects/">проекты</Link>
                  </Box>
                </Flex>

                <MDXProvider components={components}>{children}</MDXProvider>
              </Flex>
            </Flex>
          </Fragment>
        </ThemeProvider>
      )}
    </Compose>
  </Fragment>
);

export default Layout;
