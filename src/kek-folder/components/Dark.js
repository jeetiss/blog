import React from "react";
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  cursor: pointer;
  background-color: transparent;

  appearance: none;
  outline: none;
  border: none;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  width: 24px;
  height: 24px;

  padding: 0;
  margin: 0;
`;

const Svg = styled.svg`
  position: absolute;

  top: 0;
  left: 0;

  transition: fill 0.3s ease, transform 0.3s ease-out, opacity 0.3s ease;
`;

const Moon = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" {...props}>
    <path d="M108.8 27.1c1.6-.2 2.9-1.4 3.3-3 .4-1.5-.1-3.2-1.3-4.2A58.03 58.03 0 0 0 73.4 6.2a58.3 58.3 0 1 0 0 116.6c14.4 0 28.3-5.4 39.1-15.1 1.2-1.1 1.6-2.8 1.2-4.3s-1.8-2.6-3.4-2.8c-18.6-2.2-32.7-18-32.7-36.8a36.69 36.69 0 0 1 31.2-36.7zM69.3 63.7a45.4 45.4 0 0 0 31 43c-8 5.1-17.3 7.9-26.9 7.9-27.6 0-50-22.5-50-50s22.5-50 50-50c8.9 0 17.6 2.4 25.2 6.8-17.4 6.4-29.3 23-29.3 42.3z" />
  </Svg>
);

const Sun = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" {...props}>
    <path d="M64.5 92.6a28 28 0 1 0 0-56 28 28 0 0 0 0 56zm0-47.9a19.9 19.9 0 1 1 0 39.8 19.9 19.9 0 0 1 0-39.8zM68.6 23.6V10.7c0-2.3-1.8-4.1-4.1-4.1s-4.1 1.8-4.1 4.1v12.9c0 2.3 1.8 4.1 4.1 4.1s4.1-1.8 4.1-4.1zM60.4 105.6v12.9c0 2.3 1.8 4.1 4.1 4.1s4.1-1.8 4.1-4.1v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1 1.8-4.1 4.1zM96.4 38.5l9.1-9.1a4.1 4.1 0 0 0-5.8-5.8l-9.1 9.1a4.1 4.1 0 0 0 5.8 5.8zM23.5 105.6a4 4 0 0 0 2.9 1.2c1 0 2.1-.4 2.9-1.2l9.1-9.1a4.1 4.1 0 0 0-5.8-5.8l-9.1 9.1a4.1 4.1 0 0 0 0 5.8zM122.5 64.6a4 4 0 0 0-4.1-4.1h-12.9a4 4 0 0 0-4.1 4.1 4 4 0 0 0 4.1 4.1h12.9c2.2 0 4.1-1.8 4.1-4.1zM10.6 68.7h12.9a4 4 0 0 0 4.1-4.1 4 4 0 0 0-4.1-4.1H10.6a4 4 0 0 0-4.1 4.1c0 2.3 1.9 4.1 4.1 4.1zM102.6 106.8a4.1 4.1 0 0 0 2.9-7l-9.1-9.1a4.1 4.1 0 0 0-5.8 5.8l9.1 9.1c.8.8 1.9 1.2 2.9 1.2zM38.4 38.5a4.1 4.1 0 0 0 0-5.8l-9.1-9.1a4.1 4.1 0 0 0-5.8 5.8l9.1 9.1c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2z" />
  </Svg>
);

const getMoonStyle = on =>
  on
    ? { transform: "rotate(0deg)", fill: "white" }
    : { transform: "rotate(360deg)", opacity: 0 };

const getSunStyle = on =>
  on
    ? { transform: "rotate(0deg)", opacity: 0 }
    : { transform: "rotate(180deg)", fill: "black" };

const Dark = ({ onClick, on }) => (
  <Button onClick={onClick}>
    <Moon width={24} height={24} style={getMoonStyle(on)} />
    <Sun width={24} height={24} style={getSunStyle(on)} />
  </Button>
);

export default Dark;
