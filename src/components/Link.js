import React, { Children } from "react";
import { Link as GatsbyLink } from "gatsby";
import styled, { css } from "styled-components";
import theme from "../theme";

const active = props =>
  props.single
    ? css`
        text-decoration: underline;
        outline: none;

        &:hover,
        html[data-focus-source="other"] &:focus {
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

const StyledLink = styled.a`
  color: ${theme("colors.text")};
  transition: color ${theme("animations.duration.normal")} ease;

  ${active};
`;

const isAbsolute = url => /^[a-z][a-z0-9+.-]*:/.test(url);
const getLinkProps = link =>
  isAbsolute(link)
    ? { href: link, target: "_blank" }
    : { to: link, as: GatsbyLink };

const Link = ({ href, to, children, ...props }) => (
  <StyledLink
    {...getLinkProps(href || to)}
    {...props}
    single={!Children.toArray(children).some(el => React.isValidElement(el))}
  >
    {children}
  </StyledLink>
);

export { getLinkProps };
export default Link;
