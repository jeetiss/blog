import React from "react";
import ResizeObserver from "resize-observer-polyfill";

// function getMeasurements(node) {
//   const rect = node.getBoundingClientRect()
//   return {
//     x: rect.left,
//     y: rect.top,
//     width: rect.width,
//     height: rect.height,
//     top: rect.top,
//     right: rect.right,
//     bottom: rect.bottom,
//     left: rect.left,
//     offsetWidth: node.offsetWidth,
//     offsetHeight: node.offsetHeight,
//     scrollTop: node.scrollTop,
//     scrollLeft: node.scrollLeft,
//     scrollWidth: node.scrollWidth,
//     scrollHeight: node.scrollHeight,
//   }
// }

// class Measure extends React.Component {
//   static defaultProps = {
//     onMeasure: () => {},
//   }

//   // prevent firing two renders when component mounts, getting measurements in bind
//   // is faster than attaching a ResizeObserver and waiting for the first callback
//   firstResizeEvent = true
//   nodes = {}
//   refsById = {}
//   state = { measurements: null }

//   bind = (id) => {
//     if (!this.refsById[id]) {
//       this.refsById[id] = React.createRef()

//       // this.refsById[id] = node => {
//       //   if (node) {
//       //     this.nodes[id] = node
//       //     this.resizeObserver.observe(node)
//       //   } else {
//       //     this.resizeObserver.unobserve(this.nodes[id])
//       //     delete this.nodes[id]
//       //   }
//       //   this.setState(state => {
//       //     const newMeasurements = { ...state.measurements }
//       //     if (node) {
//       //       newMeasurements[id] = getMeasurements(node)
//       //     } else {
//       //       delete newMeasurements[id]
//       //     }
//       //     return { measurements: newMeasurements }
//       //   }, this.fireOnMeasure)
//       // }
//     }
//     return { ref: this.refsById[id] }
//   }

//   resizeObserver = new ResizeObserver(entries => {
//     if (this.firstResizeEvent) {
//       this.firstResizeEvent = false
//     } else {
//       this.setState(state => {
//         const newMeasurements = { ...state.measurements }
//         entries.forEach(entry => {
//           const id = this.getIdFromNode(entry.target)
//           if (id !== null && entry.target instanceof HTMLElement) {
//             newMeasurements[id] = getMeasurements(entry.target)
//           }
//         })
//         return { measurements: newMeasurements }
//       }, this.fireOnMeasure)
//     }
//   })

//   getIdFromNode = (node) => {
//     let id = null
//     Object.keys(this.nodes).some(key => {
//       if (this.nodes[key] === node) {
//         return (id = key)
//       }
//     })
//     return id
//   }

//   fireOnMeasure = () => {
//     if (this.state.measurements) {
//       this.props.onMeasure(this.state.measurements)
//     }
//   }

//   measure = () => {
//     this.setState(state => {
//       const newMeasurements = { ...state.measurements }
//       Object.keys(this.nodes).some(key => {
//         newMeasurements[key] = getMeasurements(this.nodes[key])
//       })
//       return { measurements: newMeasurements }
//     }, this.fireOnMeasure)
//   }

//   componentWillUnmount() {
//     this.resizeObserver.disconnect()
//   }

//   render() {
//     return this.props.children({
//       bind: this.bind,
//       measure: this.measure,
//       measurements: this.state.measurements,
//     })
//   }
// }

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
          console.log(entry.contentRect);
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

    entries.forEach(([key, ref]) => this.resizeObserver.observe(ref.current));
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
