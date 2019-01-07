import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Day } from "./Day";
import Today from "./Today";
import { storeContext } from "../";

const Checks = ({ scroll }) => {
  const [state, dispatch] = useContext(storeContext);

  useEffect(scroll, []);

  return (
    <Callendar>
      <Months months={state.months} />

      {Object.values(state.todos.items).map((todo, index) => (
        <Days
          key={todo.id}
          onClick={() =>
            dispatch({
              type: "TOGGLE_CHECK",
              payload: { id: todo.id }
            })
          }
          days={state.days}
          todo={todo}
          index={index}
          checks={state.checks.items[todo.id]}
        />
      ))}

      <Today
        row={Object.keys(state.todos.items).length + 2}
        column={71}
        onClick={scroll}
      />
    </Callendar>
  );
};

const Days = React.memo(
  ({ onClick, todo, index, days, checks }) =>
    days.map(info => (
      <Day
        onClick={onClick}
        key={`${info.key}+++${todo.id}`}
        day={info.value}
        row={index + 2}
        checked={checks[info.unix]}
      />
    )),
  (prevProps, nextProps) => prevProps.checks === nextProps.checks
);

const Months = ({ months }) =>
  months.map(info => (
    <Month key={info.key} count={info.count}>
      {info.value}
    </Month>
  ));

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
  width: ${props =>
    props.count ? `calc(${props.count} * 88px - 8px)` : "unset"};

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

export default Checks;
