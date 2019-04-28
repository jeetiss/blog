import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: unset;
`;

export default props => <StyledLink {...props} />;
