import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Box } from "../components/Flexbox";
import { easing, tween, styler, parallel, delay, chain } from "popmotion";
import { useWindowSize } from "react-use";

const Modal = styled.div`
  width: 400px;
  height: 300px;

  border-radius: 16px;
  border: 1px solid hsl(${props => props.color || 210}, 20%, 50%);

  background-color: hsl(${props => props.color || 210}, 60%, 60%);

  margin: 10px 0;
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
          scaleX: windowSize.width / rect.width || 1,
          scaleY: windowSize.height / rect.height || 1
        },
        duration: 300,
        yoyo: Infinity,
        ease: {
          scaleX: easing.cubicBezier(0.55, 0.055, 0.675, 0.19),
          scaleY: easing.cubicBezier(0.55, 0.055, 0.675, 0.19)
        }
      });

      const radius = tween({
        from: { borderRadius: "16px" },
        to: { borderRadius: "0px" },
        duration: 300,
        yoyo: Infinity,
        ease: easing.easeIn
      });

      const translate = tween({
        from: { y: 0 },
        to: { y: windowSize.height / 2 - rect.height / 2 - rect.top },
        duration: 300,
        yoyo: Infinity,
        ease: { y: easing.easeOut }
      });

      const animation = parallel(scale, translate, radius).start({
        update: values => values.forEach(value => divStyler.set(value))
      });

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
