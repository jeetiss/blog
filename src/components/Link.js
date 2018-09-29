import React from "react";
import { Link as GatsbyLink } from "gatsby";
import Font from "./Font";
import styled from "styled-components";
import theme from "../theme";

const Actor = styled.span`
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  margin-bottom: -7px;

  background-color: ${theme("background")};
  transition: background-color 0.3s ease;
`;

const Colorier = styled.span`
  color: ${theme('interactive')};
  transition: color 0.1s ease;

  ${Actor}:hover & {
    color: ${theme('text')};
  }
`;

const Hoverer = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  pointer-events: none;
  background-color: ${theme("hover")};
  mix-blend-mode: difference;
  transform: translateX(-101%);
  transform-origin: 0%;
  transition: transform 0.3s ease, background-color 0.3s ease;

  ${Actor}:hover & {
    transform: translateX(0);
  }
`;

const Hover = ({ children }) => (
  <Actor>
    <Colorier>{children}</Colorier>

    <Hoverer />
  </Actor>
);

const A = styled.a`
  text-decoration: none;
`;

const isAbsolute = url => /^[a-z][a-z0-9+.-]*:/.test(url);
const getLinkProps = link =>
  isAbsolute(link)
    ? { href: link, target: "_blank" }
    : { to: link, as: GatsbyLink };

const Link = ({ href, to, children, ...props }) => (
  <A {...getLinkProps(href || to)}>
    <Hover>
      <Font>{children}</Font>
    </Hover>
  </A>
);

export { getLinkProps };
export default Link;
