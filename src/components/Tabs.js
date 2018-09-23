import React, { Children } from "react";
import styled from "styled-components";
import Measure from "./Measure";
import { Flex } from "./Grid";
import theme from "../theme";

const Tab = styled.button`
  color: ${theme("text")};

  cursor: pointer;

  font-family: Rubik;
  font-size: 16px;
  line-height: 24px;

  padding: 0;

  outline: unset;
  border: unset;
  user-select: none;
  text-decoration: none;

  transition: color 0.3s ease, opacity ease 0.1s;
  opacity: ${props => (props.active ? 1 : 0.6)};

  &:hover {
    opacity: 1;
  }
`;

const Reffer = styled.div`
  margin-right: 32px;

  &:last-child {
    margin-right: 0;
  }
`;

const TabsContainer = styled.div`
  position: relative;

  background-color: ${theme("background")};
  transition: background-color ease 0.3s;

  display: flex;
`;

const CaretContainer = styled.div`
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  pointer-events: none;
`;

const Caret = styled.div`
  height: 100%;
  width: 1px;

  background-color: ${theme("hover")};
  mix-blend-mode: difference;

  transform-origin: left center;
  transition: transform ease-out 0.3s, background-color ease 0.3s;
`;

const getPosition = (measurements, value) =>
  Object.values(measurements).reduce(
    (res, cur, i) => res + (i < value ? cur.width : 0),
    0
  );

const getStyle = (measurements, index) =>
  index >= 0
    ? {
        transform: `translateX(${getPosition(measurements, index) +
          index * 32}px) scaleX(${measurements[index].width})`
      }
    : { opacity: 0 };

const Tabs = ({ children }) => (
  <Measure>
    {({ bind, measurements }) => (
      <TabsContainer>
        <Flex>
          {Children.toArray(children).map((el, i) => (
            <Reffer {...bind(i)} key={i}>
              {el}
            </Reffer>
          ))}
        </Flex>

        <CaretContainer>
          {measurements && (
            <Caret
              style={getStyle(
                measurements,
                Children.toArray(children).findIndex(
                  child => child.props.active
                )
              )}
            />
          )}
        </CaretContainer>
      </TabsContainer>
    )}
  </Measure>
);

export { Tabs, Tab };
