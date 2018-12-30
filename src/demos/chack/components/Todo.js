import React, { useEffect } from "react";
import { eachDay, startOfToday, subDays, addDays, format } from "date-fns";
import styled from "styled-components";
import { Day, Weak, Task } from "./Entites";
import Today from "./Today";

const Todo = ({ onClick, todo, checks, days, months }) => {
  console.log(days, months);

  return (
    <>
      <Weak onClick={onClick}>
        {/* <Task>{todo.name}</Task> */}

        <Scroller>
          <Callendar>
            {months.map(info => (
              <Month key={info.key} count={info.count}>
                {info.value}
              </Month>
            ))}

            {days.map(info => (
              <Day key={info.key} day={info.value} row={2} />
            ))}

            <Today row={3} column={71} />
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

const Month = ({ children, ...props }) => (
  <BlockMonth {...props}>
    <Stick>{children}</Stick>
  </BlockMonth>
);

const Stick = styled.div`
  position: sticky;
  left: 0;

  border-radius: 4px;
  background-color: #f4f4f4;
  padding: 0 8px;

  text-align: center;
  line-height: 24px;

  box-sizing: border-box;
  width: 80px;

  font-family: Fira Sans;
  font-weight: 500;
  font-size: 12px;
  color: hsla(0, 0%, 0%, 0.5);
`;

const BlockMonth = styled.div`
  width: ${props => (props.count ? `calc(${props.count} * 88px - 8px)` : "unset")};

  grid-column: ${props =>
    props.count ? `auto / span ${props.count}` : "auto"};
`;

const Callendar = styled.div`
  display: grid;
  grid-auto-columns: 80px;
  grid-gap: 8px;
  padding-bottom: 16px;

  width: calc(100 * 88px);
`;

export default Todo;
