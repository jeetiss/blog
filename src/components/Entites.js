import React from "react";
import styled from "styled-components";

const DayBlock = styled.div`
  position: relative;

  grid-row: ${props => (props.row ? `${props.row} / span 1` : "auto")};
  grid-column: ${props => (props.column ? `${props.column} / span 1` : "auto")};

  width: 80px;
  height: 80px;
  flex: 0 0 80px;

  border-radius: 4px;
  background-color: #f4f4f4;

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
  color: hsla(0, 0%, 0%, 0.5);
`;

const Ya = props => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 22.33L21 33l17-17" stroke="black" strokeWidth="4" />
  </svg>
);

const Day = ({ row, column, checked, day }) => (
  <DayBlock row={row} column={column}>
    <Checked>{checked ? <Ya /> : ""}</Checked>

    <Date>{day}</Date>
  </DayBlock>
);

const Weak = styled.div`
  cursor: pointer;
  display: flex;

  margin-top: 8px;
`;

const Task = styled.div`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  padding: 8px 16px;
  margin: 32px 8px 48px 0;
  width: 256px;

  border-radius: 4px;
  background-color: #f4f4f4;
  color: black;

  font-family: Fira Sans;
  font-weight: 500;
  font-size: 21px;
`;

export { Day, Weak, Task };
