import React from "react";
import styled from "styled-components";

const Block = styled.div`
  position: sticky;
  left: 0;
  right: 0;

  grid-row: ${props => (props.row ? `${props.row} / span 1` : "auto")};
  grid-column: ${props => (props.column ? `${props.column} / span 1` : "auto")};

  border-radius: 4px;
  background-color: #f4f4f4;
  padding: 0 8px;

  text-align: center;
  line-height: 24px;

  font-family: Fira Sans;
  font-weight: 500;
  font-size: 12px;
  color: hsla(0, 0%, 0%, 0.5);
`;

const Cover = styled.div`
  position: sticky;
  left: ${props => (props.left ? 'unset' : '56px')};
  right: ${props => (props.right ? 'unset' : '56px')};

  justify-self: ${props => (props.right ? 'end' : 'unset')};

  margin: 4px;

  width: 16px;
  height: 16px;
  background-color: #f4f4f4;

  grid-row: ${props => (props.row ? `${props.row} / span 1` : "auto")};
  grid-column: ${props => (props.column ? `${props.column} / span 1` : "auto")};
`;

const Today = props => (
  <>
    <Block {...props}>{"<- Today ->"}</Block>
    <Cover {...props} left/>
    <Cover {...props} right/>
  </>
);

export default Today;
