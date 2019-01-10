import React from "react";
import styled from "styled-components";

const Inner = styled.video`
  width: 100%;
  height: 100%;
  display: block;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 16px 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 16px 32px;
  }
`;

const Relative = styled.div`
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const RatioBlock = ({ ratio, children }) => (
  <Relative>
    <div style={{ paddingBottom: Math.round(100 / ratio) + "%" }} />

    <Absolute>{children}</Absolute>
  </Relative>
);

const Video = ({ src }) => (
  <RatioBlock ratio={16 / 9}>
    <Inner src={src} autoPlay loop muted webkitplaysinline playsInline />
  </RatioBlock>
);

export default Video;
