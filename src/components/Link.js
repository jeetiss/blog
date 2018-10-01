import React, { Children } from "react";
import { Link as GatsbyLink } from "gatsby";
import styled, { css } from "styled-components";
import theme from "../theme";

const active = props =>
  props.single
    ? css`
        text-decoration: underline;

        &:hover {
          color: ${theme("colors.hover")(props)};
          transition: color ${theme("animations.duration.fast")(props)} ease;
        }

        &:active {
          color: ${theme("colors.active")(props)};
          transition: color ${theme("animations.duration.fast")(props)} ease;
        }
      `
    : css`
        text-decoration: none;
      `;

const A = styled.a`
  color: ${theme("colors.text")};
  transition: color ${theme("animations.duration.normal")} ease;

  ${active};
`;

const isAbsolute = url => /^[a-z][a-z0-9+.-]*:/.test(url);
const getLinkProps = link =>
  isAbsolute(link)
    ? { href: link, target: "_blank" }
    : { to: link, as: GatsbyLink };

const Link = ({ href, to, children, ...props }) =>
  console.log(Children.toArray(children).length) || (
    <A
      {...getLinkProps(href || to)}
      single={Children.toArray(children).length <= 1}
    >
      {children}
    </A>
  );

export { getLinkProps };
export default Link;
