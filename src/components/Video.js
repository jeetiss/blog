import React from "react";
import styled from "styled-components";

const Inner = styled.video`
  width: 100%;
  display: block;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.25);
  }
`;

const Video = ({ src }) => (
  <Inner src={src} autoPlay loop muted webkitplaysinline playsInline />
);

export default Video;
