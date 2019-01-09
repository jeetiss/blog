import React from "react";
import styled from "styled-components";

const Inner = styled.video`
  width: 100%;
  display: block;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 16px 32px;
  border: 1px solid rgba(0,0,0,.10);

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 16px 32px;
  }
`;

const Video = ({ src }) => (
  <Inner src={src} autoPlay loop muted webkitplaysinline playsInline />
);

export default Video;
