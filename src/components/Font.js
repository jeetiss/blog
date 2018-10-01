import system from "../system";
import { css } from "styled-components";
import {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  space
} from "styled-system";
import theme from "../theme";

const Font = system(
  {
    tag: "span",
    fontFamily: "Fira Sans",
    fontSize: 16,
    lineHeight: "24px"
  },
  fontFamily,
  fontSize,
  lineHeight
);

const H1 = system(
  {
    tag: "h1",
    fontFamily: "Fira Sans",
    fontSize: 24,
    lineHeight: "32px",
    my: "8px"
  },
  fontFamily,
  fontSize,
  lineHeight,
  space,
  props => css`
    color: ${theme("colors.interactive")(props)};
    transition: color ease 0.3s;
  `
);

const H2 = system(
  {
    tag: "h2",
    fontFamily: "Fira Sans",
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 300,
    my: "8px",
    css: css`
      letter-spacing: 0.02em;
    `
  },
  fontWeight,
  fontFamily,
  fontSize,
  lineHeight,
  space,
  props => css`
    color: ${theme("colors.interactive")(props)};
    transition: color ease 0.3s;
  `
);

const Text = system(
  {
    tag: "p",
    fontFamily: "Fira Sans",
    fontSize: 16,
    lineHeight: "24px",
    my: 16
  },
  fontFamily,
  fontSize,
  lineHeight,
  space,
  props => css`
    color: ${theme("colors.text")(props)};
    transition: color ease 0.3s;
  `
);

export { Text, Font, H1, H2 };
export default Font;
