import React, {
  useRef,
  useEffect,
  useState,
  useImperativeMethods
} from "react";
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
  const rect = useRef({});

  useEffect(
    () => {
      const handler = () => {
        console.log("scroll");
        rect.current = ref.current.getBoundingClientRect();
      };

      window.addEventListener("scroll", handler, false);

      return () => window.removeEventListener("scroll", handler, false);
    },
    [ref.current]
  );

  return rect;
};

const usePopmotion = (animationCreator, inputs) => {
  const betterApi = useRef({});
  const referense = useRef(animationCreator());

  useEffect(
    () => {
      referense.current = animationCreator();
    },
    [...inputs]
  );

  useImperativeMethods(betterApi, () => ({
    start: ellReff => {
      const elStyler = styler(ellReff.current);

      return referense.current.start(values =>
        values.forEach(value => elStyler.set(value))
      );
    }
  }));

  return betterApi;
};

const Block = ({ color }) => {
  const duration = 300;

  const ref = useRef();
  const windowSize = useWindowSize();
  const rect = useClientRect(ref);
  const [showed, setShowed] = useState(true);

  const goIn = usePopmotion(
    () => {
      const scale = tween({
        from: { scaleX: 1, scaleY: 1 },
        to: {
          scaleX: windowSize.width / rect.current.width || 1,
          scaleY: windowSize.height / rect.current.height || 1
        },
        duration,
        ease: easing.cubicBezier(0.55, 0.055, 0.675, 0.19)
      });

      const radius = chain(
        delay(duration / 2),
        tween({
          from: { borderRadius: "16px" },
          to: { borderRadius: "0px" },
          duration: duration / 2,
          ease: easing.easeInOut
        })
      );

      const translate = tween({
        from: { y: 0 },
        to: {
          y: windowSize.height / 2 - rect.current.height / 2 - rect.current.top
        },
        duration,
        ease: easing.easeInOut
      });

      const animation = parallel(scale, translate, radius);

      return animation;
    },
    [windowSize, rect.current]
  );

  const goOut = usePopmotion(
    () => {
      const scale = tween({
        from: {
          scaleX: windowSize.width / rect.current.width || 1,
          scaleY: windowSize.height / rect.current.height || 1
        },
        to: { scaleX: 1, scaleY: 1 },
        duration,
        ease: easing.cubicBezier(0.215, 0.61, 0.355, 1)
      });

      const radius = tween({
        from: { borderRadius: "0px" },
        to: { borderRadius: "16px" },
        duration: duration / 2,
        ease: easing.easeInOut
      });

      const translate = tween({
        from: {
          y: windowSize.height / 2 - rect.current.height / 2 - rect.current.top
        },
        to: { y: 0 },
        duration,
        ease: easing.easeInOut
      });

      const animation = parallel(scale, translate, radius);

      return animation;
    },
    [windowSize, rect.current]
  );

  return (
    <Modal
      ref={ref}
      color={color}
      onClick={() => {
        if (showed) {
          goIn.current.start(ref);
        } else {
          goOut.current.start(ref);
        }

        setShowed(!showed);
      }}
    />
  );
};

export default () => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Block color={100} />
      <Block color={200} />
      <Block color={300} />
    </Flex>
  );
};
