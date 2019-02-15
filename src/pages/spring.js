import React from "react";
import styled from "styled-components";
// import { useSpring, animated } from "react-spring/hooks";
import { Flex } from "../components/Flexbox";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Modal = styled.div`
  width: 400px;
  height: 300px;

  border-radius: 16px;
  border: 1px solid hsl(${props => props.color || 210}, 20%, 50%);

  background-color: hsl(${props => props.color || 210}, 60%, 60%);

  margin: 10px 0;
`;

function Card(props) {
  // const [spring, set] = useSpring(() => ({
  //   xys: [0, 0, 1],
  //   config: { mass: 5, tension: 350, friction: 40 }
  // }));

  return (
    <Modal
      {...props}
      // as={animated.div}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      // style={{ transform: spring.xys.interpolate(trans) }}
    />
  );
}

export default () => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Card color={100} />
      <Card color={200} />
      <Card color={300} />
    </Flex>
  );
};
