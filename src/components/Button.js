import styled, { css } from "styled-components";
import theme from "../theme";

// html[data-focus-source="${sourceType}"] ${selector}`

const style = props => {
  switch (props.type) {
    case "cancel":
      return css`
        border-color: transparent;
        background-color: transparent;
        color: ${theme("colors.low")(props)};

        &:hover {
          color: ${theme("colors.text")(props)};

          transition: color ${theme("animations.duration.fast")} ease;
        }
      `;

    case "secondary":
      return css`
        border-color: ${theme("colors.interactive")(props)};
        background-color: transparent;
        color: ${theme("colors.interactive")(props)};

        &:hover {
          color: ${theme("colors.background")(props)};
          border-color: ${theme("colors.hover")(props)};
          background-color: ${theme("colors.hover")(props)};

          transition: color ${theme("animations.duration.fast")} ease,
            border-color ${theme("animations.duration.fast")} ease,
            background-color ${theme("animations.duration.fast")} ease;
        }

        &:active {
          border-color: ${theme("colors.active")(props)};
          background-color: ${theme("colors.active")(props)};

          transition: transform ${theme("animations.duration.fast")} ease,
            border-color ${theme("animations.duration.fast")} ease,
            background-color ${theme("animations.duration.fast")} ease;
        }
      `;

    default:
    case "primary":
      return css`
        color: #fefefe;
        border-color: ${theme("colors.interactive")(props)};
        background-color: ${theme("colors.interactive")(props)};

        &:hover {
          border-color: ${theme("colors.hover")(props)};
          background-color: ${theme("colors.hover")(props)};

          transition: border-color ${theme("animations.duration.fast")} ease,
            background-color ${theme("animations.duration.fast")} ease;
        }

        &:active {
          border-color: ${theme("colors.active")(props)};
          background-color: ${theme("colors.active")(props)};

          transition: transform ${theme("animations.duration.fast")} ease,
            border-color ${theme("animations.duration.fast")} ease,
            background-color ${theme("animations.duration.fast")} ease;
        }
      `;
  }
};

const Button = styled.button`
  appearance: none;
  cursor: pointer;
  user-select: none;
  display: block;

  height: 24px;

  padding: 0 8px;
  margin: 0;

  outline: none;

  border: 1px solid;
  border-radius: 5px;

  font-family: Fira Sans;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 16px;
  letter-spacing: 0.02em;
  text-decoration: none;

  transition: color ${theme("animations.duration.fast")} ease,
    border-color ${theme("animations.duration.fast")} ease,
    background-color ${theme("animations.duration.fast")} ease;

  ${style};

  &:active {
    transform: translateY(1px);

    transition: transform ${theme("animations.duration.fast")} ease;
  }

  html[data-focus-source="other"] &:focus {
    box-shadow: 0px 0px 0px 3px ${theme("colors.focus")};
  }
`;

export default Button;
