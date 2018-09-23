import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components";
import { Toggle, Compose } from "react-powerplug/dist/react-powerplug.umd";
import { Link } from "gatsby";
import { Tab, Tabs } from "./Tabs";
import { Flex, Box } from "./Grid";
import MDXProvider from "./MDXProvider";
import GlobalStyle from "./GlobalStyle";

const themes = [
  { text: "black", background: "white", hover: "white" },
  { text: "white", background: "black", hover: "white" }
];

const linkProps = (to, location) => ({
  to: to,
  active: to === location.pathname ? true : undefined
});

const Layout = ({ location, children }) => (
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
                <Flex mt={48} alignItems="center">
                  <Flex flex="1">
                    <button onClick={tgDark}>dark</button>
                    <button onClick={tgXRay}>x-ray</button>
                  </Flex>

                  <Tabs>
                    <Tab as={Link} {...linkProps("/about/", location)}>
                      Обо мне
                    </Tab>

                    <Tab as={Link} {...linkProps("/projects/", location)}>
                      Проекты
                    </Tab>
                  </Tabs>
                </Flex>

                <Box my={32}>
                  <MDXProvider>{children}</MDXProvider>
                </Box>
              </Flex>
            </Flex>
          </Fragment>
        </ThemeProvider>
      )}
    </Compose>
  </Fragment>
);

export default Layout;
