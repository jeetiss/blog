import { css } from "styled-components";
import { zIndex, top, left, bottom, right } from "styled-system";
import system from "../system";

const Relative = system(
  {
    css: css`
      position: relative;
    `
  },
  zIndex,
  top,
  left,
  bottom,
  right
);

const Absolute = system(
  {
    css: css`
      position: absolute;
    `
  },
  zIndex,
  top,
  left,
  bottom,
  right
);

export { Absolute, Relative };
