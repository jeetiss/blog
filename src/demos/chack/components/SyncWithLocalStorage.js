import React, { useContext } from "react";
import LocalStorage , {useLocalStorageSync} from "./LocalStorage";
import { storeContext } from "../";

const Sync = () => {
  const [state, dispatch] = useContext(storeContext);

  useLocalStorageSync(state.todos.items, todos =>
    dispatch({
      type: "LOAD_TODOS",
      payload: todos || {}
    }), "chacks-todos")

  return (
    <>
      {state.todos.loaded &&
        Object.values(state.todos.items).map(todo => (
          <LocalStorage
            key={todo.id}
            item={state.checks.items[todo.id]}
            itemKey={`checks-for-todo-${todo.id}`}
            onLoaded={checks =>
              dispatch({
                type: "LOAD_CHECKS",
                payload: { checks, todo }
              })
            }
          />
        ))}
    </>
  );
};

export default Sync;
