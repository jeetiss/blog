import React, { useContext, useEffect } from "react";
import Todo from "./Todo";
import { storeContext } from "../pages/chack";

const Todos = () => {
  const [state, dispatch] = useContext(storeContext);

  useEffect(() => {
    const id = setTimeout(() => {
      const todos =
        JSON.parse(window.localStorage.getItem("chacks-todos")) || {};
      dispatch({
        type: "LOAD_TODOS",
        payload: todos
      });
      const checks = Object.keys(todos).reduce(
        (acc, todoId) => ({
          ...acc,
          [todoId]: JSON.parse(
            window.localStorage.getItem(`checks-for-todo-${todoId}`)
          )
        }),
        {}
      );
      dispatch({
        type: "LOAD_CHECKS",
        payload: checks
      });
    }, 500);
    return () => clearTimeout(id);
  }, []);

  useEffect(
    () => {
      if (state.todos.items != null) {
        window.localStorage.setItem(
          `chacks-todos`,
          JSON.stringify(state.todos.items)
        );
      }
    },
    [state.todos.items]
  );

  return state.todos.loaded && state.checks.loaded ? (
    Object.values(state.todos.items).map(todo => (
      <Todo
        onClick={() =>
          dispatch({ type: "TOGGLE_CHECK", payload: { id: todo.id } })
        }
        key={todo.id}
        todo={todo}
        checks={state.checks.items[todo.id]}
        days={state.days}
      />
    ))
  ) : (
    <div>loading...</div>
  );
};

export default Todos
