import React from "react";
import styled from "styled-components";

const css = props => props.css;

const omit = (obj, blacklist) => {
  const next = {};
  for (let key in obj) {
    if (blacklist.indexOf(key) > -1) continue;
    next[key] = obj[key];
  }
  return next;
};

const _blacklist = ["tag", "extend", "css"];

const createTag = _blacklist => ({ blacklist = [], ...props }) => {
  const Base = props.extend || props.tag || "div";
  const next = omit(props, [..._blacklist, ...blacklist]);
  return React.createElement(Base, { ...next });
};

const system = (props = {}, ...funcs) => {
  const propNames = funcs.reduce(
    (a, func) => [...a, ...Object.keys(func.propTypes || {})],
    []
  );

  const tag = createTag([...propNames, ..._blacklist]);
  const Component = styled.div([], ...funcs, css);

  Component.defaultProps = { as: tag, ...props };

  return Component;
};

export default system;
