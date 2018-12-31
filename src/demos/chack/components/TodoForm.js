import React, { useContext, useState, useRef } from "react";
import nanoid from "nanoid";
import { storeContext } from "../";

const TodoForm = () => {
  const input = useRef();
  const [adding, set] = useState(false);
  const [, dispatch] = useContext(storeContext);

  return adding ? (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!input.current.value.trim()) {
          return;
        }
        dispatch({
          type: "ADD_TODO",
          payload: { id: nanoid(5), name: input.current.value }
        });
        set(!adding);
      }}
    >
      <input ref={input} />
      <button type="submit">+</button>
      <button onClick={() => set(!adding)}>-</button>
    </form>
  ) : (
    // <button onClick={() => set(!adding)}>add</button>
    null
  );
};

export default TodoForm;
