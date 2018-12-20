import React, { useEffect } from "react";
import { eachDay, startOfToday, subDays, addDays, format } from "date-fns";
import { Day, Weak, Task } from "./Entites";
import styled from "styled-components";

const Todo = ({ onClick, todo, checks, days }) => {

  return (
    <>
      <Weak onClick={onClick}>
        <Task>{todo.name}</Task>

        <Scroller>
          <Callendar>
            {eachDay(subDays(startOfToday(), 70), addDays(startOfToday(), 30))
              .map(date => ({
                date: format(date, "X"),
                day: format(date, "DD"),
                month: format(date, "MMMM")
              }))
              .map((date, index) => (
                <>
                  {date.day === "01" ? (
                    <Month
                      key={date.month + date.date}
                      row={1}
                      column={index + 1}
                    >
                      {date.month}
                    </Month>
                  ) : null}
                  <Day
                    key={date.date}
                    day={date.day}
                    row={2}
                    checked={checks[date.date]}
                  />
                </>
              ))}

            <Today row={3} column={71}>
              Today
            </Today>
          </Callendar>
        </Scroller>
      </Weak>
    </>
  );
};

const Scroller = styled.div`
  overflow: scroll;
  flex: 1 1;
`;

const Empty = styled.div`
  grid-row: ${props => (props.row ? `${props.row} / span 1` : "auto")};
`;

const Today = styled.div`
  position: sticky;
  left: 0;
  right: 0;

  grid-row: ${props => (props.row ? `${props.row} / span 1` : "auto")};
  grid-column: ${props => (props.column ? `${props.column} / span 1` : "auto")};

  border-radius: 4px;
  background-color: #f4f4f4;
  padding: 0 8px;

  text-align: center;
  line-height: 24px;

  font-family: Fira Sans;
  font-weight: 500;
  font-size: 12px;
  color: hsla(0, 0%, 0%, 0.5);
`;

const Month = styled.div`
  position: sticky;
  left: 0;

  grid-row: ${props => (props.row ? `${props.row} / span 1` : "auto")};
  grid-column: ${props => (props.column ? `${props.column} / span 1` : "auto")};

  border-radius: 4px;
  background-color: #f4f4f4;
  padding: 0 8px;

  text-align: center;
  line-height: 24px;

  font-family: Fira Sans;
  font-weight: 500;
  font-size: 12px;
  color: hsla(0, 0%, 0%, 0.5);
`;

const Callendar = styled.div`
  display: grid;
  grid-auto-columns: 80px;
  grid-gap: 8px;
  padding-bottom: 16px;

  width: calc(100 * 88px);
`;

export default Todo;
