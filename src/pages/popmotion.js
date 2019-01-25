import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Box } from "../components/Flexbox";
import { easing, tween, styler, parallel } from "popmotion";
import useWindowSize from "@rehooks/window-size";
import useComponentSize from "@rehooks/component-size";

const Modal = styled.div`
  width: 400px;
  height: 300px;

  border-radius: 16px;
  border: 1px solid hsl(${props => props.color || 210}, 20%, 50%);

  background-color: hsl(${props => props.color || 210}, 60%, 60%);

  margin: 32px 0;
`;

const useClientRect = ref => {
  const [rect, setRect] = useState({});

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setRect(rect);
  }, []);

  return [rect, setRect];
};

export default () => {
  const ref = useRef();
  const windowSize = useWindowSize();
  const [rect] = useClientRect(ref);

  useEffect(
    () => {
      console.log(rect, windowSize);

      const divStyler = styler(ref.current);

      const scale = tween({
        from: { scaleX: 1, scaleY: 1 },
        to: {
          scaleX: windowSize.innerWidth / rect.width || 1,
          scaleY: windowSize.innerHeight / rect.height || 1
        },
        duration: 300,
        ease: {
          scaleX: easing.cubicBezier(0.55, 0.055, 0.675, 0.19),
          scaleY: easing.cubicBezier(0.55, 0.055, 0.675, 0.19)
        },
        yoyo: Infinity
      });

      const translate = tween({
        from: { y: 0 },
        to: { y: windowSize.innerHeight / 2 - rect.height / 2 - rect.top },
        duration: 300,
        ease: { y: easing.easeInOut },
        yoyo: Infinity
      });

      const animation = parallel(scale, translate).start(values =>
        values.forEach(value => divStyler.set(value))
      );

      return () => animation.stop();
    },
    [windowSize, rect]
  );

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Modal ref={ref} color={300} />
    </Flex>
  );
};
