import React from "react";
import styled from "styled-components";
import theme from "../theme";

const Button = styled.button`
  position: relative;
  cursor: pointer;
  background-color: #3d435e;

  appearance: none;
  outline: none;
  border: none;
  border-radius: 12px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  width: 48px;
  height: 24px;

  padding: 0;
  margin: 0;

  transition: background-color 0.3s ease;

  html[data-focus-source="other"] &:focus {
    box-shadow: 0px 0px 0px 3px ${theme("colors.focus")};
  }
`;

const Svg = styled.svg`
  position: absolute;

  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};

  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const Clouds = props => (
  <Svg
    width="24"
    height="18"
    viewBox="0 0 25 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.6 9.6c-2-1.2-4.5.6-3.3 3-2.6 1.8-1 5.7 2.7 4.3 1.2 2 4 1 4-.9 4 .4 3.7-3.7 1-4.3.3-2.5-3.2-3.4-4.4-2.1zM4.4 1.7C2.7 1.3 1.3 3 2.7 4.5 1 6.3 3 8.8 5.4 7c1.3 1.2 3 0 2.7-1.4C11 5 10 2.2 8 2.3 7.6.5 5 .5 4.4 1.7zM4.7 17.4c1.2.4 2.1-.8 1.2-1.9 1.1-1.1-.1-2.8-1.7-1.7-.9-.9-2.2 0-2 1C.4 15 1 17 2.3 17c.3 1.2 2 1.2 2.5.4z"
      fill="#fff"
    />
  </Svg>
);

const Starts = props => (
  <Svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.5 11l.44.9.99.14-.72.7.17.97-.88-.46-.88.46.17-.98-.72-.7.99-.14.44-.89zM1 5l.3.6.65.1-.47.45.1.66L1 6.5l-.59.3.11-.65-.47-.46.66-.1L1 5zM13 0l.3.6.65.1-.47.45.1.66L13 1.5l-.59.3.11-.65-.47-.46.66-.1L13 0z"
      fill="#F0FEFE"
    />
  </Svg>
);

const Moon = props => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="10" cy="10" r="10" fill="#fff" />
    <circle cx="5.5" cy="16.5" r="1.5" fill="#F3F3F9" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 9.8c-.6.7-1.5 1.2-2.5 1.2-2 0-3.5-1.8-3.5-4 0-2 1.4-3.8 3.2-4A10 10 0 0 1 20 9.8z"
      fill="#EFEFEF"
    />
    <circle cx="7.5" cy="8.5" r="2.5" fill="#F0F7F7" />
  </Svg>
);

const Sun = props => (
  <Svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="10" cy="10" r="10" fill="#FBECA2" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 20c5-.3 9-4.7 9-10S15 .3 10 0h.5C15.7 0 20 4.5 20 10a9.8 9.8 0 0 1-10 10z"
      fill="#E2D492"
    />
  </Svg>
);

const getMoonStyle = on =>
  on
    ? { transform: "translateX(0)" }
    : { transform: "translateX(24px)", opacity: 0 };

const getSunStyle = on =>
  on
    ? { transform: "translateX(-24px)", opacity: 0 }
    : { transform: "translateX(0)" };

const getButtonStyle = on =>
  on ? { backgroundColor: "#3D435E" } : { backgroundColor: "#B9DEE9" };

const getStatsStyle = on =>
  on
    ? { transform: "translateX(0)" }
    : { transform: "translateX(-20px)", opacity: 0 };

const getCloudsStyle = on =>
  on
    ? { transform: "translateX(15px)", opacity: 0 }
    : { transform: "translateX(0)" };

const Dark = ({ onClick, on }) => (
  <Button onClick={onClick} style={getButtonStyle(on)}>
    <Moon left="2px" top="2px" style={getMoonStyle(on)} />
    <Sun right="2px" top="2px" style={getSunStyle(on)} />
    <Starts right="7px" top="5px" style={getStatsStyle(on)} />
    <Clouds left="7px" top="3px" style={getCloudsStyle(on)} />
  </Button>
);

export default Dark;
