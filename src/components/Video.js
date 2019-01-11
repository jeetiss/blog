import React from "react";
import styled from "styled-components";

const Vds = styled.video`
  width: 100%;
  height: 100%;
  display: block;
`;

const Shadow = styled.div`
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

  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatioBlock = ({ ratio, children }) => (
  <Relative>
    <div style={{ paddingBottom: Math.round(100 / ratio) + "%" }} />

    <Absolute>{children}</Absolute>
  </Relative>
);

const Video = ({ src }) => (
  <Shadow>
    <RatioBlock ratio={16 / 9}>
      <Vds src={src} autoPlay loop muted webkitplaysinline playsInline />
    </RatioBlock>
  </Shadow>
);

export default Video;
