import React from "react";
import { Link as A } from "gatsby";
import styled from "styled-components";
import theme from "../theme";

const StyledLink = styled.a`
  display: inline-block;
  position: relative;

  opacity: 0.5;

  font-family: Rubik;
  font-size: 16px;
  line-height: 24px;
  overflow: hidden;
  padding: 0 8px;

  color: ${theme("text")};
  background-color: ${theme("background")};
  transition: color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;

  text-decoration: none;

  &:after {
    content: " ";
    display: block;

    position: absolute;

    top: 0;
    left: 0;
    width: 120%;
    height: 100%;
    mix-blend-mode: difference;
    background-color: #fff;
    transform: rotate(30deg);
    transform-origin: -50% -50%;
    transition: transform 0.3s ease;
  }

  &:hover {
    opacity: 1;
  }

  &:hover:after {
    transform: rotate(0deg);
  }
`;

const Link = props => <StyledLink {...props} as={A} />;

export default Link;
