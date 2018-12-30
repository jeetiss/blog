import React, { useContext, useEffect } from "react";
import Todo from "./Todo";
import LocalStorage from "./LocalStorage";
import { storeContext } from "../";

const Todos = () => {
  const [state, dispatch] = useContext(storeContext);

  return (
      state.todos.loaded && state.checks.loaded ? (
        Object.values(state.todos.items).map(todo => (
          <Todo
            onClick={() =>
              dispatch({ type: "TOGGLE_CHECK", payload: { id: todo.id } })
            }
            key={todo.id}
            todo={todo}
            checks={state.checks.items[todo.id]}
            days={state.days}
            months={state.months}
          />
        ))
      ) : (
        <div>loading...</div>
      )
  );
};

export default Todos;
