import React, { Component } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { style, themeGet } from "styled-system";
import Helmet from "react-helmet";

const px = str => (window.Number.isFinite(str) ? `${str}px` : str);

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background-color: #262626
  }
`;

const injectVars = obj =>
  obj
    ? Object.entries(obj).reduce(
        (out, [key, value]) => ({
          ...out,
          [`--${key}`]: px(value)
        }),
        {}
      )
    : {};

class Size extends Component {
  state = {
    width: 0,
    height: 0
  };

  update = () =>
    this.setState({ width: window.innerWidth, height: window.innerHeight });

  componentDidMount() {
    window.addEventListener("resize", this.update);
    this.update();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.update);
  }

  render() {
    const { children } = this.props;

    if (typeof children === "function") {
      return children(this.state);
    }

    return null;
  }
}

class Scroll extends Component {
  state = {
    scroll: 0
  };

  update = () => this.setState({ scroll: window.scrollY });

  componentDidMount() {
    window.addEventListener("scroll", this.update);
    this.update();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.update);
  }

  render() {
    const { children } = this.props;

    if (typeof children === "function") {
      return children(this.state);
    }

    return null;
  }
}

const TEXT_WIDTH_COOF = {
  JS: 1.4851,
  RND: 2.5013,
  "7": 1.69
};

const BigRow = styled.div`
  position: relative;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: calc(var(--fontsize) * 1.25);
  line-height: calc(var(--fontsize));
  transform: translateX(var(--offset));
  color: ${themeGet("colors.background.1", "black")};
  &:after {
    content: var(--text);
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-100%);
  }
`;

const Block = styled.div`
  position: relative;
`;

const SmallRow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: calc(var(--fontsize) * 1.25);
  line-height: calc(var(--fontsize));
  transform: translateX(var(--scroll));
  color: ${themeGet("colors.primary", "black")};
`;

const Row = ({ text, children, vars }) => (
  <Block style={injectVars(vars)}>
    <BigRow>{children}</BigRow>
    {text && <SmallRow>{text}</SmallRow>}
  </Block>
);

const Fullscreen = styled.div`
  position: fixed;
  transform: translateY(var(--offsety));
  overflow: hidden;
  background-color: ${themeGet("colors.background.0", "black")};
  width: 100%;
  z-index: -1;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transform: translateX(var(--offsetx));
`;

const range = count => Array.from({ length: count }, (_, i) => i);

const textShadow = style({
  prop: "textShadow",
  key: "shadows"
});

const Number = styled.div`
  display: inline-block;
  color: ${themeGet("colors.secondary", "black")};
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  transform: translate(var(--numberoffsetx), var(--numberoffsety));
  font-size: calc(var(--fontsize) * (1.25 + 0.1) * 2);
  line-height: calc(var(--fontsize) * 1.05 * 2);
  ${textShadow};
`;

const SizeParams = ({ children }) => (
  <Size>
    {size => {
      const fontSize = Math.round(
        Math.min(size.width / 2 / TEXT_WIDTH_COOF["RND"], size.height / 3.5)
      );
      const lines = Math.ceil(size.height / fontSize) + 2;
      const centerIndex = Math.floor(lines / 2) - 1;

      return children({
        size,
        fontSize,
        lines,
        centerIndex
      });
    }}
  </Size>
);

const shadow = "rgba(13, 8, 26, 0.3)";
const mainTheme = {
  breakpoints: [40, 52, 72].map(n => n + "em"),
  colors: {
    primary: Object.assign("#6624FF", {
      ligther: "hsl(258, 95%, 60%)"
    }),
    secondary: "#fd2148",
    tertiary: "rgba(101, 37, 255, 0.2);",

    font: "#262626",
    shadow,

    background: ["#262626", "#1C1B1F"]
  },

  shadows: [
    `8px 16px 0px ${shadow}`,
    `16px 24px 0px ${shadow}`,
    `24px 32px 0px ${shadow}`,
    `32px 48px 0px ${shadow}`
  ],

  offsets: [
    "translate(8px, 16px)",
    "translate(16px, 24px)",
    "translate(24px, 32px)",
    "translate(32px, 48px)"
  ]
};

const BgWithLogo = ({ children, theme }) => (
  <SizeParams>
    {({ size, fontSize, lines, centerIndex }) => {
      const magikParam = centerIndex % 2;

      const numberoffsety = size.height / 2 - fontSize;
      const numberoffsetx =
        size.width / 2 -
        ((TEXT_WIDTH_COOF["RND"] + TEXT_WIDTH_COOF["7"]) * fontSize) / 2;

      const offsety = numberoffsety - centerIndex * fontSize;
      const offsetx = numberoffsetx + TEXT_WIDTH_COOF["7"] * fontSize;

      return (
        <Scroll>
          {({ scroll }) => (
            <div
              style={injectVars({
                numberoffsety,
                numberoffsetx,
                offsetx,
                offsety,
                fontsize: fontSize
              })}
            >
              <Fullscreen>
                <Center>
                  {range(lines).map(index => {
                    const text = index % 2 !== magikParam ? "JS" : "RND";
                    const width = TEXT_WIDTH_COOF[text] * fontSize;
                    const numbers = Math.ceil(size.width / width) / 1.5 + 2;
                    const direction = index % 2 === magikParam ? 1 : -1;
                    const directionScroll =
                      scroll * direction - (text === "JS" ? width * 0.24 : 0);
                    const offset = directionScroll % width;
                    const fullText = range(numbers).reduce(
                      str => str.concat(text),
                      ""
                    );
                    const isMain =
                      centerIndex === index || index === centerIndex + 1;

                    return (
                      <Row
                        key={index}
                        text={isMain ? text : null}
                        vars={{
                          direction,
                          scroll: directionScroll,
                          offset,
                          width,
                          text: `"${fullText}"`
                        }}
                      >
                        {fullText}
                      </Row>
                    );
                  })}
                </Center>
              </Fullscreen>

              <Number textShadow={themeGet("shadows")({ theme })}>7</Number>

              <div style={{ paddingBottom: "90vh" }} />

              {children}
            </div>
          )}
        </Scroll>
      );
    }}
  </SizeParams>
);

export default () => (
  <ThemeProvider theme={mainTheme}>
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:900"
          rel="stylesheet"
        />
      </Helmet>

      <GlobalStyles />
      <BgWithLogo>
        <div style={{ paddingBottom: "100vh" }} />
      </BgWithLogo>
    </>
  </ThemeProvider>
);
