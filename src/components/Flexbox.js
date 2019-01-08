import styled from "styled-components";
import {
  space,
  color,
  width,
  fontSize,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  flex,
  order,
  alignSelf
} from "styled-system";

const Box = styled("div")(
  {
    boxSizing: "border-box"
  },
  space,
  color,
  width,
  fontSize,
  flex,
  order,
  alignSelf
);

const Flex = styled(Box)(
  {
    display: "flex",
    boxSizing: "border-box"
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  space,
  color,
  width,
  fontSize,
  flex,
  order,
  alignSelf
);

export { Flex, Box };
