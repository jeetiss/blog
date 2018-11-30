import {
  space,
  width,
  fontSize,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  flex,
  order,
  alignSelf,
  bgColor,
} from "styled-system";
import system from "../system";

export const Box = system(
  {
    css: { boxSizing: "border-box" }
  },
  bgColor,
  space,
  width,
  fontSize,
  flex,
  order,
  alignSelf
);

export const Flex = system(
  {
    extend: Box,
    css: { display: "flex" }
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
);
