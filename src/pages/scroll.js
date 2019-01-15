import React from "react";
import styled from "styled-components";

const Scroll = styled.div`
  position: relative;
  width: 300px;
  height: 100px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
  }

  &::-webkit-scrollbar:window-inactive {
    background-image: ;
  }
`;

const Content = styled.div`
  width: 290px;
  height: 1000px;

  background-color: wheat;
`;

export default () => (
  <Scroll>
    <Content />
  </Scroll>
);
