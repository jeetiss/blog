import React from "react";
import ResizeObserver from "resize-observer-polyfill";

class Measure extends React.Component {
  nodeToId = new WeakMap();
  bindedRefs = new Map();
  state = { measurements: null };

  bind = id => {
    if (!this.bindedRefs.has(id)) {
      this.bindedRefs.set(id, React.createRef());
    }

    return { ref: this.bindedRefs.get(id) };
  };

  resizeObserver = new ResizeObserver(entries => {
    this.setState(state => {
      const newMeasurements = { ...state.measurements };
      entries.forEach(entry => {
        if (
          this.nodeToId.has(entry.target) &&
          entry.target instanceof HTMLElement
        ) {
          newMeasurements[this.nodeToId.get(entry.target)] = {
            width: entry.contentRect.width,
            height: entry.contentRect.height
          };
        }
      });
      return { measurements: newMeasurements };
    });
  });

  componentDidMount() {
    const entries = Array.from(this.bindedRefs[Symbol.iterator]());

    this.nodeToId = new WeakMap(
      entries.map(([key, ref]) => [ref.current, key])
    );

    entries.forEach(
      ([key, ref]) => ref.current && this.resizeObserver.observe(ref.current)
    );
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect();
  }

  render() {
    return this.props.children({
      bind: this.bind,
      measurements: this.state.measurements
    });
  }
}

export default Measure;
