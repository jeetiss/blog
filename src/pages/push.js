import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Flex, Box } from "../components/Flexbox";
import Video from "../components/Video";
import { Text, Header } from "../components/Text";

// transform-origin: var(--origin);
const Block = styled.div`
  transition-timing-function: cubic-bezier(0.05, 0.58, 0.44, 1.53);
  transition-duration: 0.35s;
  transition-property: transform;
  transform: scale(1);

  &:active {
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.09, 0.58, 0.42, 0.96);
    transform: scale(0.95) rotate3d(var(--x), var(--y), 0, 10deg);
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: hsl(200, 50%, 85%);
  }
`;

const Tap = ({ children }) => {
  const ref = useRef();
  const [info, setInfo] = useState();
  const [origin, setOrigin] = useState([50, 50]);

  useEffect(() => {
    const clientRect = ref.current.getBoundingClientRect();

    setInfo({
      offsetLeft: clientRect.left,
      offsetTop: clientRect.top,

      width: clientRect.width,
      height: clientRect.height
    });
  }, []);

  return (
    <Block
      ref={ref}
      onMouseMove={e =>
        info &&
        setOrigin([
          ((e.pageX - info.offsetLeft) / info.width) * 2 - 1,
          -((e.pageY - info.offsetTop) / info.height) * 2 + 1
        ])
      }
      style={{
        "--x": `${origin[1]}`,
        "--y": `${origin[0]}`
      }}
    >
      {children}
    </Block>
  );
};
// Math.sign(origin[0] * origin[1]) *
const Perspective = styled.div`
  perspective: 1000px;
`;

const Joja = styled.div`
  background-color: hsl(200, 60%, 55%);

  width: 494px;
  height: 276px;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: hsla(200, 90%, 20%, 0.2) 0px 16px 32px;
  border: 1px solid hsla(200, 20%, 50%, 0.3);

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: hsla(200, 90%, 20%, 0.3) 0px 16px 32px;
  }

  &:active {
    box-shadow: hsla(200, 90%, 20%, 0.3) calc(0px - var(--y) * 8px)
      calc(16px + var(--x) * 8px) 32px;
  }
`;

export default () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <GlobalStyle />

      <Box my={120}>
        <Perspective>
          <Tap>
            <Joja />
          </Tap>
        </Perspective>
      </Box>
    </Flex>
  );
};
