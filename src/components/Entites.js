import React from "react";
import styled from "styled-components";

const DayBlock = styled.div`
  position: relative;

  width: 64px;
  height: 64px;

  margin: 0 4px;

  &:last-child {
    margin-right: 0;
  }

  &:first-child {
    margin-left: 0;
  }
`;

const Checked = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  line-height: 21px;
  color: hsla(0, 77%, 65%, 1);
`;

const Date = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  box-sizing: border-box;
  padding: 8px;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  font-family: Fira Sans;
  font-weight: 500;
  font-size: 12px;
  color: hsla(0, 77%, 65%, 0.3);
`;

const Ya = props => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 22.33L21 33l17-17"
      stroke="hsla(0, 77%, 65%, 1)"
      strokeWidth="4"
    />
  </svg>
);

const Day = ({ checked, day }) => (
  <DayBlock>
    <Checked>{checked ? <Ya /> : ""}</Checked>

    <Date>{day}</Date>
  </DayBlock>
);

const Weak = styled.div`
  cursor: pointer;

  display: flex;

  margin-top: 160px;

  border-radius: 4px;
  background-color: hsla(0, 77%, 65%, 0.08);
`;

const Task = styled.div`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  padding: 8px;
  margin-right: 4px;
  width: 136px;

  color: hsla(0, 77%, 65%, 1);

  font-family: Fira Sans;
  font-weight: 500;
  font-size: 21px;
`;

export { Day, Weak, Task };
