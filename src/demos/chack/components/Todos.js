import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { Day } from "./Day";
import Today from "./Today";
import { storeContext } from "../";

const Todos = () => {
  const [state, dispatch] = useContext(storeContext);
  const scrollerRef = useRef();
  const { days, months } = state;

  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scroll(88 * 66, 0);
  }, []);

  return state.todos.loaded && state.checks.loaded ? (
    <Block>
      <Tasks>
        {Object.values(state.todos.items).map(todo => (
          <Task key={todo.id}>{todo.name}</Task>
        ))}
      </Tasks>

      <Scroller ref={scrollerRef}>
        <Callendar>
          <Months months={months} />

          {Object.values(state.todos.items).map((todo, index) => (
            <Days
              key={todo.id}
              onClick={() =>
                dispatch({
                  type: "TOGGLE_CHECK",
                  payload: { id: todo.id }
                })
              }
              days={days}
              todo={todo}
              index={index}
              checks={state.checks.items[todo.id]}
            />
          ))}

          <Today
            row={Object.keys(state.todos.items).length + 2}
            column={71}
            onClick={() => scrollerRef.current.scroll(88 * 66, 0)}
          />
        </Callendar>
      </Scroller>
    </Block>
  ) : (
    <div>loading...</div>
  );
};

const Scroller = styled.div`
  overflow: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  flex: 1 1;
`;

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

const Block = styled.div`
  display: flex;

  margin-top: 8px;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;

  margin: 32px 8px 8px 0;
`;

const Task = styled.div`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  padding: 8px 16px;
  margin: 8px 0 0;
  width: 256px;
  height: 80px;

  border-radius: 4px;
  background-color: #f4f4f4;
  color: black;

  font-family: Fira Sans;
  font-weight: 500;
  font-size: 21px;

  &:first-child {
    margin: 0;
  }
`;

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

export default Todos;
