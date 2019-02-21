import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useReducer
} from "react";
import styled from "styled-components";

const noop = () => void 0;

function addListener(element, eventNames, listener) {
  var events = eventNames.split(" ");
  for (var i = 0, iLen = events.length; i < iLen; i++) {
    element.addEventListener(events[i], listener, false);
  }

  return () => {
    for (var i = 0, iLen = events.length; i < iLen; i++) {
      element.removeEventListener(events[i], listener, false);
    }
  };
}

function removeListener(element, eventNames, listener) {
  var events = eventNames.split(" ");
  for (var i = 0, iLen = events.length; i < iLen; i++) {
    element.removeEventListener(events[i], listener, false);
  }
}

const defaultCallbacks = { onDrag: noop, onDragStart: noop, onDragEnd: noop };

const useDraggable = (elementRef, callbacks) => {
  const savedCallbacks = useRef({ ...defaultCallbacks, ...callbacks });
  const dragState = useRef(false);

  useEffect(() => {
    const all = { ...defaultCallbacks, ...callbacks };
    savedCallbacks.current = all;
  }, [callbacks]);

  useEffect(() => {
    const getPosition = e => ({
      x: typeof e.pageX !== "undefined" ? e.pageX : e.touches[0].pageX,
      y: typeof e.pageY !== "undefined" ? e.pageY : e.touches[0].pageY
    });

    const processDrag = e => {
      savedCallbacks.current.onDrag(getPosition(e));
    };

    const stopDrag = e => {
      removeListener(document, "mousemove touchmove", processDrag);
      removeListener(document, "mouseup touchend touchcancel", stopDrag);
      dragState.current = false;
      savedCallbacks.current.onDragEnd(e);
    };

    const startDrag = e => {
      if (e && e.button !== 0) return;

      addListener(document, "mouseup touchend touchcancel", stopDrag);
      addListener(document, "mousemove touchmove", processDrag);
      dragState.current = true;

      if (e) {
        const mousePosition = getPosition(e);
        const elementPosition = e.target.getBoundingClientRect();
        savedCallbacks.current.onDragStart({
          x: mousePosition.x - elementPosition.left,
          y: mousePosition.y - elementPosition.top
        });
      }
    };

    addListener(elementRef.current, "mousedown touchstart", startDrag);
    dragState.current && startDrag();

    return () => {
      removeListener(elementRef.current, "mousedown touchstart", startDrag);
      removeListener(document, "mousemove touchmove", processDrag);
      removeListener(document, "mouseup touchend touchcancel", stopDrag);
    };
  }, [elementRef.current]);
};

const Squre = styled.div`
  position: absolute;

  width: 100px;
  height: 100px;
  top: 0;
  left: 0;
  cursor: grab;

  background-color: wheat;
`;

const useBoundingClientRect = (nodeRef, onChange, { resize, scroll }) => {
  const [rect, setRect] = useState({});

  const handleChange = () =>
    nodeRef.current && onChange(nodeRef.current.getBoundingClientRect());

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

const initialState = {
  value: 50,
  persent: 50,

  left: null,
  top: null,
  width: null,
  height: null,

  isDragging: false,
  position: { x: null, y: null },
  dragPosition: { x: null, y: null },

  min: 0,
  max: 100
};

const minmax = (min, max) => value => Math.min(Math.max(min, value), max);
const borders = minmax(0, 1);

const reducer = (state, action) => {
  switch (action.type) {
    case "DRAG_START": {
      return { ...state, isDragging: true, dragPosition: action.position };
    }
    case "DRAGINNG": {
      const { position } = action;
      const persent = borders((position.x - state.left) / state.width);
      const value = (state.max - state.min) * persent + state.min;

      return { ...state, value, persent: persent * 100, position };
    }
    case "DRAG_END": {
      return { ...state, isDragging: false, dragPosition: null };
    }

    case "RESIZE": {
      return {
        ...state,
        left: action.size.left,
        top: action.size.top,
        width: action.size.width,
        height: action.size.height
      };
    }
    default: {
      throw new Error(`unknown action ${action.type}`);
    }
  }
};

const useSlider = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const trackRef = useRef();
  const thumbRef = useRef();

  useDraggable(trackRef, {
    onDragStart: position => dispatch({ type: "DRAG_START", position }),
    onDrag: position => dispatch({ type: "DRAGINNG", position }),
    onDragEnd: () => dispatch({ type: "DRAG_END" })
  });

  useBoundingClientRect(
    trackRef,
    trackRect => dispatch({ type: "RESIZE", size: trackRect }),
    { resize: true }
  );

  return [trackRef, thumbRef, state];
};

const useLogger = state => {
  useEffect(() => {
    console.log(state);
  }, [state]);
};

const Slider = () => {
  const [trackRef, thumbRef, state] = useSlider();

  useLogger(state);

  return (
    <div
      style={{
        position: "relative",
        width: "300px",
        height: "32px"
      }}
      ref={trackRef}
    >
      <div
        style={{
          userSelect: "none",
          position: "absolute",
          top: "12px",
          width: "100%",
          height: "8px",
          backgroundColor: "#E2e2e2"
        }}
      />

      <div
        style={{ width: "100%", transform: `translateX(${state.persent}%)` }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "black",
            transform: "translateX(-50%)"
          }}
          ref={thumbRef}
        />
      </div>
    </div>
  );
};

export default () => {
  return <Slider />;
};

// const Draggable = () => {
//   const draggableRef = useRef();
//   const [draggingPosition, setDraggingPosition] = useState(null);
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useDraggable(draggableRef, {
//     onDragStart: pos => console.log("start", pos) || setDraggingPosition(pos),
//     onDrag: ({ x, y }) =>
//       console.log("progress") ||
//       (draggingPosition &&
//         setPosition({
//           x: x - draggingPosition.x,
//           y: y - draggingPosition.y
//         })),
//     onDragEnd: e => console.log("stop", e) || setDraggingPosition(null)
//   });

//   return (
//     <Squre
//       ref={draggableRef}
//       style={{
//         transform: `translate(${position.x}px, ${position.y}px)`,
//         cursor: draggingPosition ? "grabbing" : "grab"
//       }}
//     />
//   );
// };
