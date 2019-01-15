import styled from "styled-components";

const Scroller = styled.div`
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;

  scroll-behavior: smooth;

  flex: 1 1;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: hsla(0,0%,0%,0.5);
  }

  &::-webkit-scrollbar-track-piece:start:hover {
    background-color: hsla(0,0%,0%,0.05);
  }
  
  &::-webkit-scrollbar-track-piece:end:hover {
    background-color: hsla(0,0%,0%,0.05);
  }
`;

export default Scroller;
