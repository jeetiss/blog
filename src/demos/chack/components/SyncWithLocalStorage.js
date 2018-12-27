import React, { useContext } from "react";
import LocalStorage from "./LocalStorage";
import { storeContext } from "../";

const Sync = () => {
  const [state, dispatch] = useContext(storeContext);

  return (
    <>
      <LocalStorage
        item={state.todos.items}
        itemKey="chacks-todos"
        onLoaded={todos =>
          dispatch({
            type: "LOAD_TODOS",
            payload: todos || {}
          })
        }
      />

      {state.todos.loaded &&
        Object.values(state.todos.items).map(todo => (
          <LocalStorage
            key={todo.id}
            item={todo}
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
