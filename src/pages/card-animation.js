import React, { useState } from "react";
import styled from "styled-components";
import CalendarDemo, { frontmatter } from "../examples/calendar";
import { Flex, Box } from "../components/Flexbox";
import Video from "../components/Video";
import { Text, Header } from "../components/Text";

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const EaseOut = styled.div`
  opacity: ${props => (props.fire ? 1 : 0)};
  transform: ${props => (props.fire ? "translateY(0)" : "translateY(-20px)")};

  transition: opacity 0.3s, transform 0.3s;
  transition-delay: ${props => (props.delay ? props.delay + "s" : "unset")};
`;

const Move = styled.div`
  transform: ${props =>
    props.fire ? `translateY(${props.from}px)` : `translateY(${props.to}px)`};

  transition: transform 0.3s ease;
  transition-delay: ${props => (props.delay ? props.delay + "s" : "unset")};
`;

const Scale = styled.div`
  transform: ${props =>
    props.fire ? `scale(${props.from})` : `scale(${props.to})`};

  transition: transform 0.3s;
  transition-timing-function: ${props =>
    !props.fire
      ? "cubic-bezier(0.55, 0.085, 0.68, 0.53)"
      : "cubic-bezier(0.165, 0.84, 0.44, 1)"};
  transition-delay: ${props => (props.delay ? props.delay + "s" : "unset")};
`;

// opacity: 0.5;
const Opacity = styled.div`
  opacity: ${props => (props.fire ? 1 : 0)};

  transition: opacity 0.3s ease;
  transition-delay: ${props => (props.delay ? props.delay + "s" : "unset")};
`;

export default () => {
  const [state, toggle] = useState(true);

  return (
    <Relative>
      <Absolute>
        <Opacity fire={!state} delay={state ? 0 : 0.1}>
          <Move fire={state} from={280} to={0}>
            <Scale fire={state} from={0.64} to={1}>
              <CalendarDemo />
            </Scale>
          </Move>
        </Opacity>
      </Absolute>

      <Absolute>
        <Flex justifyContent="center" alignItems="center">
          <Flex my={120} flexDirection="column" onClick={() => toggle(!state)}>
            <EaseOut fire={state} delay={state ? 0.3 : -0.2}>
              <Box>
                <Header>{frontmatter.title}</Header>
              </Box>
            </EaseOut>

            <EaseOut fire={state} delay={state ? 0.2 : -0.1}>
              <Box>
                <Text>{frontmatter.description}</Text>
              </Box>
            </EaseOut>

            <Opacity fire={state} delay={state ? 0.1 : 0}>
              <Move fire={state} from={0} to={-300}>
                <Scale fire={state} from={1} to={1.55}>
                  <Box>
                    <Video src={frontmatter.video} />
                  </Box>
                </Scale>
              </Move>
            </Opacity>
          </Flex>
        </Flex>
      </Absolute>
    </Relative>
  );
};
