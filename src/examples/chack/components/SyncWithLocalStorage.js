import { useContext } from "react";
import { useLocalStorageSync } from "./LocalStorage";
import { storeContext } from "../";

const Sync = () => {
  const [state, dispatch] = useContext(storeContext);

  useLocalStorageSync(
    state.todos.items,
    todos =>
      dispatch({
        type: "LOAD_TODOS",
        payload: todos || {}
      }),
    "chacks-todos"
  );

  Object.values(state.todos.items || {}).map(todo =>
    useLocalStorageSync(
      state.checks.items[todo.id],
      checks =>
        dispatch({
          type: "LOAD_CHECKS",
          payload: { checks, todo }
        }),
      `checks-for-todo-${todo.id}`
    )
  );

  return null;
};

export default Sync;
