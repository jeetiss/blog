import React, { useContext } from "react";
import styled from "styled-components";
import { storeContext } from "../";

const TodoNames = () => {
  const [state] = useContext(storeContext);

  return (
    <Tasks>
      {Object.values(state.todos.items).map(todo => (
        <Task key={todo.id}>{todo.name}</Task>
      ))}
    </Tasks>
  );
};

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

export default TodoNames;
