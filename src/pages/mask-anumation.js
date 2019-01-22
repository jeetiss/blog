import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Box } from "../components/Flexbox";
import mask from "../mask.svg";

// src="https://ucarecdn.com/33c58bc6-e0d2-4120-aa11-7863e4a0772c/-/resize/640x/"

const vars = {
  size: {
    from: "100x100",
    to: "window"
  },
  position: {
    from: "current",
    to: "center"
  }
};

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Mask = styled.div`
  width: 100vmax;
  height: 100vmax;

  background-color: white;

  mask-image: url(${mask});
  mask-size: contain;
  mask-position: center;
`;

const Scale = styled.div`
  transform: ${props =>
    props.fire ? `scale(${props.from})` : `scale(${props.to})`};

  transition: transform 0.3s;
  transition-timing-function: ${props =>
    !props.fire
      ? "cubic-bezier(0.55, 0.085, 0.68, 0.53)"
      : "cubic-bezier(0.165, 0.84, 0.44, 1)"};
  transition-delay: ${props => (props.delay ? props.delay + "s" : "unset")};
`;

const Move = styled.div`
  transform: ${props =>
    props.fire ? `translateY(${props.from}px)` : `translateY(${props.to}px)`};

  transition: transform 0.3s ease;
  transition-delay: ${props => (props.delay ? props.delay + "s" : "unset")};
`;

const Overflow = styled.div`
  overflow: hidden;
`;

export default () => {
  const [state, toggle] = useState(true);

  return (
    <Relative>
      <Absolute>
        <Flex justifyContent="center" alignItems="center">
          <img
            src="https://ucarecdn.com/33c58bc6-e0d2-4120-aa11-7863e4a0772c/-/resize/640x/"
            alt=""
          />
        </Flex>
      </Absolute>

      <Overflow>
        <Scale fire={state} from={1} to={8} onClick={() => toggle(!state)}>
          <Move fire={state} from={0} to={-20}>
            <Mask />
          </Move>
        </Scale>
      </Overflow>
    </Relative>
  );
};
