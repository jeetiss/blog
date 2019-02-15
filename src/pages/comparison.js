import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { Flex } from "../components/Flexbox";

const Container = styled.div`
  position: relative;
`;

const Left = React.memo(
  styled.div`
    position: absolute;
    top: 0;
    left: 0;

    bottom: 0;
    right: 0;

    background-color: wheat;

    @supports (clip-path: polygon(0 0, 0 0, 0 0, 0 0)) {
      will-change: transform;
      clip-path: polygon(0 0, var(--position) 0, var(--position) 100%, 0% 100%);
    }

    @supports not (clip-path: polygon(0 0, 0 0, 0 0, 0 0)) {
      width: var(--position);
      overflow: hidden;
    }

    & > img {
      user-select: none;
      width: 100%;
      height: 100%;
    }
  `,
  () => true
);

const Right = React.memo(
  styled.div`
    background-color: yellow;

    display: flex;
    justify-content: flex-end;

    & > img {
      user-select: none;
      width: 100%;
      height: 100%;
    }
  `,
  () => true
);

const Handler = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;

  box-sizing: border-box;
  padding: 16px 24px;
`;

const minmax = (min, max) => value => Math.min(Math.max(min, value), max);

function addListener(element, eventNames, listener) {
  var events = eventNames.split(" ");
  for (var i = 0, iLen = events.length; i < iLen; i++) {
    element.addEventListener(events[i], listener, false);
  }
}

function removeListener(element, eventNames, listener) {
  var events = eventNames.split(" ");
  for (var i = 0, iLen = events.length; i < iLen; i++) {
    element.removeEventListener(events[i], listener, false);
  }
}

const useDrag = (elementRef, onDrag) => {
  let prevX = 0;
  let prevY = 0;

  useEffect(() => {
    const processDrag = e => {
      const x = typeof e.pageX !== "undefined" ? e.pageX : e.touches[0].pageX;
      const y = typeof e.pageY !== "undefined" ? e.pageY : e.touches[0].pageY;

      const changedX = x !== prevX;
      const changedY = y !== prevY;
      onDrag({ x, y, changedX, changedY });
      prevX = x;
      prevY = y;
    };

    const stopDrag = e => {
      removeListener(document, "mousemove touchmove", processDrag);
      removeListener(document, "mouseup touchend touchcancel", stopDrag);
    };

    const startDrag = e => {
      addListener(document, "mouseup touchend touchcancel", stopDrag);
      addListener(document, "mousemove touchmove", processDrag);
    };

    addListener(elementRef.current, "mousedown touchstart", startDrag);

    return () => {
      removeListener(elementRef.current, "mousedown touchstart", startDrag);
      removeListener(document, "mousemove touchmove", processDrag);
      removeListener(document, "mouseup touchend touchcancel", stopDrag);
    };
  }, [elementRef.current, onDrag]);
};

const Wrapper = styled.div`
  user-select: none;
  position: relative;
  width: calc(100% - 24px);
  transform: translateX(var(--position));
`;

const Thumb = styled.button`
  user-select: none;
  position: absolute;
  top: 4px;
  width: 24px;
  height: 16px;

  border: none;
  outline: none;

  background-color: #e2e2e2;

  &:focus {
    box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.2);
  }
`;

const Track = styled.div`
  user-select: none;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 24px;
`;

const TrackBackDrop = styled.div`
  user-select: none;
  position: absolute;
  top: 4px;
  width: 100%;
  height: 16px;

  background-color: #e2e2e2;
  backdrop-filter: blur(10px);
  opacity: 0.3;
`;

const useBoundingClientRect = (nodeRef, { resize, scroll }) => {
  const [rect, setRect] = useState({});

  const handleChange = () =>
    console.log("change") ||
    (nodeRef.current && setRect(nodeRef.current.getBoundingClientRect()));

  useEffect(handleChange, [nodeRef.current]);

  useEffect(() => {
    resize && addListener(window, "resize", handleChange);
    scroll && addListener(document, "scroll", handleChange);

    return () => {
      removeListener(window, "resize", handleChange);
      removeListener(document, "scroll", handleChange);
    };
  }, [resize, scroll]);

  return [rect, setRect];
};

const Slider = ({ value, onChange, min = 0, max = 100 }) => {
  const thumbRef = useRef();
  const trackRef = useRef();
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [trackSize] = useBoundingClientRect(trackRef, { resize: true });
  // const [value, setValue] = useState(defaultValue);

  const focusIn = () => {
    console.log("focusin");
    thumbRef.current.focus();
  };

  useEffect(() => {
    addListener(trackRef.current, "click mouseup", focusIn);

    return () => removeListener(trackRef.current, "click mouseup", focusIn);
  }, [trackRef.current, thumbRef.current]);

  let borders = minmax(min, max);

  useDrag(
    trackRef,
    useCallback(
      ({ x, changedX }) =>
        changedX &&
        onChange(
          borders(((x - trackSize.left) / trackSize.width) * (max - min) + min)
        ),
      [trackSize.left, trackSize.width]
    )
  );

  return (
    <Track ref={trackRef}>
      <TrackBackDrop />

      <Wrapper
        style={{ "--position": `${((value - min) / (max - min)) * 100}%` }}
      >
        <Thumb ref={thumbRef} />
      </Wrapper>
    </Track>
  );
};

// export default () => {
//   return <Slider />;
// };

export default () => {
  const [hafl, set] = useState(50);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Container
        style={{
          "--position": `${hafl}%`
        }}
      >
        <Left>
          <img
            src="https://ucarecdn.com/9eaf4b7b-6688-43e9-a6e5-9690142d765a/-/preview/"
            alt=""
          />
        </Left>

        <Right>
          <img
            src="https://ucarecdn.com/9eaf4b7b-6688-43e9-a6e5-9690142d765a/-/preview/-/blur/100/"
            alt=""
          />
        </Right>

        <Handler>
          <Slider value={hafl} onChange={value => set(value)} />
        </Handler>
      </Container>
    </Flex>
  );
};
