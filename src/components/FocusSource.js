import { Component } from "react";

/**
 * copy-paste from https://github.com/rambler-digital-solutions/rambler-ui/blob/master/src/utils/focus-source.js
 * Module determines focus source (by pointer device or by keyboard/scripts)
 * and sets an appropriate value ('pointer' or 'other') to <html> attribute 'data-focus-source'
 */

const pointerStartEvents = ["touchstart", "pointerdown", "mousedown"];

const pointerEndEvents = [
  "touchend",
  "touchcancel",
  "pointerup",
  "pointercancel",
  "mouseup"
];

const focusEvents = ["focusin", "focusout"];

let activePointers = 0;

const handlePointerStartEvent = () => {
  activePointers++;
};

const handlePointerEndEvent = event => {
  let touches;

  if (event.touches) touches = event.touches.length;

  setTimeout(() => {
    activePointers =
      touches != null ? touches : Math.max(activePointers - 1, 0);
  }, 0);
};

const handleFocusEvent = event => {
  let source = "";

  if (event.type === "focusin") source = activePointers ? "pointer" : "other";

  // Source is empty on blur event
  document.documentElement.setAttribute("data-focus-source", source);
};

let subscribed = false;
const subscribe = () => {
  // Subscribe only once
  if (subscribed) return;
  subscribed = true;

  pointerStartEvents.forEach(event => {
    document.documentElement.addEventListener(event, handlePointerStartEvent);
  });

  pointerEndEvents.forEach(event => {
    document.documentElement.addEventListener(event, handlePointerEndEvent);
  });

  focusEvents.forEach(event => {
    document.documentElement.addEventListener(event, handleFocusEvent);
  });
};

/* end copy-paste */

class FocusSource extends Component {
  componentDidMount() {
    subscribe();
  }

  render() {
    return this.props.children;
  }
}

export default FocusSource
