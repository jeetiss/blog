import React, { Fragment } from "react";
import { setConfig } from "react-hot-loader";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components";
import { Link } from "gatsby";
import { Tab, Tabs } from "./Tabs";
import { Flex, Box } from "./Grid";
import Dark from "./Dark2";
import FocusSource from "./FocusSource";
import MDXProvider from "./MDXProvider";
import GlobalStyle from "./GlobalStyle";
import { themes } from "../theme";
import useToggle from "../hooks/toggle";

const isProd = process.env.NODE_ENV === "production";
!isProd && setConfig({ pureSFC: true });

const compare = (to, location) =>
  typeof location === "function" ? location(to) : to === location.pathname;

const linkProps = (to, location) => ({
  as: Link,
  to: to,
  active: compare(to, location) ? true : undefined
});

const isBlog = location => to =>
  location.pathname.startsWith("/posts/") || location.pathname === to;

const Layout = ({ location, children }) => {
  const [dark, tgDark] = useToggle(false);
  const [xray, tgXRay] = useToggle(false);

  return (
    <FocusSource>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Fira+Sans:400,600&amp;subset=cyrillic"
          rel="stylesheet"
        />
      </Helmet>

      <ThemeProvider theme={themes[+dark]}>
        <>
          <GlobalStyle xray={xray} />

          <Flex justifyContent="center">
            <Flex flexDirection="column" flex="0 1 800px" px={16} width={1}>
              <Flex mt={40} justifyContent="flex-end" alignItems="center">
                <Flex flex="1">
                  <Dark onClick={tgDark} on={dark} />

                  {!isProd && <button onClick={tgXRay}>x-ray</button>}
                </Flex>

                <Tabs>
                  <Tab {...linkProps("/", isBlog(location))}>Блог</Tab>

                  <Tab {...linkProps("/projects/", location)}>Проекты</Tab>

                  <Tab {...linkProps("/about/", location)}>Обо мне</Tab>
                </Tabs>
              </Flex>

              <Box my={32}>
                <MDXProvider>{children}</MDXProvider>
              </Box>
            </Flex>
          </Flex>
        </>
      </ThemeProvider>
    </FocusSource>
  );
};

export default Layout;
