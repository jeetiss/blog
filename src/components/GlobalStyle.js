import { css, createGlobalStyle } from "styled-components";
import theme from "../theme";

const xRay = props =>
  props.xray &&
  css`
    background-color: #001424;
    background-image: linear-gradient(
        0deg,
        transparent,
        transparent 7px,
        hsla(207, 100%, 70%, 0.25) 7px
      ),
      linear-gradient(
        90deg,
        transparent,
        transparent 7px,
        hsla(207, 100%, 70%, 0.25) 7px
      );
    background-size: 8px 8px;

    & * {
      color: #6bf !important;
      outline: 1px solid hsla(207, 100%, 70%, 0.5) !important;
      background-color: hsla(207, 100%, 70%, 0.125) !important;
    }
  `;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: ${theme("colors.text")};
    background-color: ${theme("colors.background")};

    transition:
      background-color ${theme("animations.duration.normal")} ease,
      color ${theme("animations.duration.normal")} ease;

    ${xRay}
  }

  ::selection {
    color: ${theme("colors.background")}
    background-color: ${theme("colors.interactive")};
  }
`;

export default GlobalStyle;
