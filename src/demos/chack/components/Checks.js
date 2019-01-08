import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Today from "./Today";
import { storeContext } from "../";
import { Days } from "./Days";
import { Months } from "./Months";
import { Calendar } from "./Calendar";

const Checks = ({ scroll }) => {
  const [state, dispatch] = useContext(storeContext);

  useEffect(scroll, []);

  return (
    <Calendar>
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
    </Calendar>
  );
};

export default Checks;
