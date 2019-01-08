import React from "react";
import styled from "styled-components";
import { space, fontWeight, fontSize, lineHeight } from "styled-system";

const Font = styled.div(
  {
    margin: 0,
    fontFamily: 'Fira Sans'
  },
  fontWeight,
  fontSize,
  lineHeight,
  space
);

const Text = props => (
  <Font
    as="p"
    {...{
      fontWeight: 400,
      fontSize: 22,
      lineHeight: '32px',
      my: 16
    }}
    {...props}
  />
);

const Header = props => (
  <Font
    as="h1"
    {...{
      fontWeight: 600,
      fontSize: 32,
      lineHeight: '32px'
    }}
    {...props}
  />
);

export { Header, Text };
