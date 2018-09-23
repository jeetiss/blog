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
  margin-bottom: -7px;

  color: ${theme("text")};

  background-color: ${theme("background")};
  transition: color 0.3s ease, background-color 0.3s ease, opacity 0.1s ease;
  text-decoration: none;

  &:after {
    content: " ";
    display: block;

    position: absolute;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    mix-blend-mode: difference;
    background-color: ${theme("hover")};
    transform: translateX(-101%);
    transform-origin: 0%;
    transition: transform 0.3s ease;
  }

  &:hover {
    opacity: 1;
  }

  &:hover:after {
    transform: translateX(0);
  }
`;

const isAbsolute = url => /^[a-z][a-z0-9+.-]*:/.test(url);
const getLinkProps = link =>
  isAbsolute(link) ? { href: link, target: "_blank" } : { to: link, as: A };

const Link = ({ href, to, ...props }) => (
  <StyledLink {...getLinkProps(href || to)} {...props} />
);

export default Link;
