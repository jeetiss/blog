import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components";
import { Toggle, Compose } from "react-powerplug/dist/react-powerplug.umd";
import { Link } from "gatsby";
import { Tab, Tabs } from "./Tabs";
import { Flex, Box } from "./Grid";
import Dark from "./Dark";
import MDXProvider from "./MDXProvider";
import GlobalStyle from "./GlobalStyle";

const isPropd = process.env.NODE_ENV === "production";

const themes = [
  {
    text: "#121212",
    background: "#FEFEFE",
    interactive: "#919191",
    hover: "white"
  },
  {
    text: "#FEFEFE",
    background: "#121212",
    interactive: "#919191",
    hover: "white"
  }
];

const compare = (to, location) =>
  typeof location === "function" ? location(to) : to === location.pathname;

const linkProps = (to, location) => ({
  as: Link,
  to: to,
  active: compare(to, location) ? true : undefined
});

const isBlog = location => to =>
  location.pathname.startsWith("/posts/") || location.pathname === to;

const Layout = ({ location, children }) => (
  <Fragment>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Fira+Sans:400,600&amp;subset=cyrillic"
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
                <Flex mt={32} justifyContent="flex-end" alignItems="center">
                  <Flex flex="1">
                    <Dark onClick={tgDark} on={dark} />

                    {!isPropd && <button onClick={tgXRay}>x-ray</button>}
                  </Flex>

                  <Tabs>
                    <Tab {...linkProps("/", isBlog(location))}>Блог</Tab>

                    <Tab {...linkProps("/projects/", location)}>Проекты</Tab>

                    <Tab {...linkProps("/about/", location)}>Обо мне</Tab>
                  </Tabs>
                </Flex>

                <Box my={16}>
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
