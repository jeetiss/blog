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

const H1 = system(
  {
    tag: "h1",
    fontFamily: "Fira Sans",
    fontSize: 24,
    lineHeight: "32px",
    fontWeight: 600,
    my: "8px"
  },
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  space
);

const H2 = system(
  {
    tag: "h2",
    fontFamily: "Fira Sans",
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 400,
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
    color: ${theme("colors.low")(props)};
    transition: color ${theme("animation.duration.normal")(props)} ease;
  `
);

const Low = system(
  {
    tag: "span",
    fontFamily: "Fira Sans",
    fontSize: 12,
    lineHeight: "24px",
    fontWeight: 400,
    css: css`
      letter-spacing: 0.04em;
    `
  },
  fontWeight,
  fontFamily,
  fontSize,
  lineHeight,
  space,
  props => css`
    color: ${theme("colors.low")(props)};
    transition: color ${theme("animation.duration.normal")(props)} ease;
  `
);

const Paragraph = system(
  {
    tag: "p",
    fontFamily: "Fira Sans",
    fontSize: 16,
    lineHeight: "24px",
    my: '8px'
  },
  fontFamily,
  fontSize,
  lineHeight,
  space,
);

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

export { Paragraph, Font, H1, H2, Low };
export default Font;
