import React, { useEffect, useRef, useState, useCallback } from "react";
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

// const useListeners = () => {
//   const listeners = useRef([]);

//   const addListener = useCallback((element, eventNames, listener) =>
//     listeners.current.push(_addListener(element, eventNames, listener))
//   );

//   const removeListener = useCallback((element, eventNames, listener) =>
//     _removeListener(element, eventNames, listener)
//   );

//   const removeAll = useCallback(() => {
//     listeners.current.forEach(unsub => unsub());
//     listeners.current = [];
//   });

//   return {
//     addListener,
//     removeListener,
//     removeAll
//   };
// };

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

const Draggable = () => {
  const draggableRef = useRef();
  const [draggingPosition, setDraggingPosition] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useDraggable(draggableRef, {
    onDragStart: pos => console.log("start", pos) || setDraggingPosition(pos),
    onDrag: ({ x, y }) =>
      console.log("progress") ||
      (draggingPosition &&
        setPosition({
          x: x - draggingPosition.x,
          y: y - draggingPosition.y
        })),
    onDragEnd: e => console.log("stop", e) || setDraggingPosition(null)
  });

  return (
    <Squre
      ref={draggableRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: draggingPosition ? "grabbing" : "grab"
      }}
    />
  );
};

export default () => {
  return <Draggable />;
};
