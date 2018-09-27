import React from "react";
import styled from "styled-components";
import theme from "../theme";
import { Text } from "components/Font";
import { getLinkProps } from "./Link";

const Actor = styled.a`
  text-decoration: none;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 16px 0;
`;

const Container = styled.div`
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  background-color: ${theme("background")};
  transition: background-color 0.3s ease;
`;

const Opacitier = styled.span`
  opacity: 0.6;
  transition: opacity 0.1s ease;

  ${Actor}:hover & {
    opacity: 1;
  }
`;

const Hoverer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  pointer-events: none;
  background-color: ${theme("hover")};
  mix-blend-mode: difference;
  transform: translateX(-101%);
  transform-origin: 0%;
  transition: transform 0.3s ease, background-color 0.3s ease;

  ${Actor}:hover & {
    transform: translateX(0);
  }
`;

const Title = styled.span`
  font-family: Rubik;
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;

  color: ${theme("text")};
  transition: color 0.3s ease;
`;

const Preview = ({ title, description, href, to }) => (
  <Actor {...getLinkProps(href || to)}>
    <Container>
      <Opacitier>
        <Title>{title}</Title>
      </Opacitier>

      <Hoverer />
    </Container>
    <Text my="8px" mb={32}>
      {description}
    </Text>
  </Actor>
);

export default Preview;
