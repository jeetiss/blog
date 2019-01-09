import React from "react";
import styled from "styled-components";
import { Stick } from "./Stick";

const BlockMonth = styled.div`
  width: ${props =>
    props.count ? `calc(${props.count} * 88px - 8px)` : "unset"};

  grid-column: ${props =>
    props.count ? `auto / span ${props.count}` : "auto"};
`;

const Month = ({ children, ...props }) => (
  <BlockMonth {...props}>
    <Stick>{children}</Stick>
  </BlockMonth>
);

export const Months = ({ months }) =>
  months.map(info => (
    <Month key={info.key} count={info.count}>
      {info.value}
    </Month>
  ));
