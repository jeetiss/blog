import React, { createContext, useReducer, useContext, useEffect } from "react";
import Helmet from "react-helmet";
import { eachDay, startOfToday, subDays, addDays, format } from "date-fns";
import styled from "styled-components";
import { Day, Weak, Task } from "components/Entites";
import produce from "immer";
import combineReducers from "../utils/combineReducers";

const merge = key => (acc, { [key]: uniqProp, ...obj }) => ({
  ...acc,
  [uniqProp]: obj
});

const initialState = {
  days: eachDay(subDays(startOfToday(), 3), addDays(startOfToday(), 3))
    .map(day => ({ raw: format(day, "X"), formatted: format(day, "DD") }))
    .reduce(merge("raw"), {}),
  todos: { loaded: false },
  checks: { loaded: false }
};

const storeContext = createContext({});

const todos = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case "LOAD_TODOS": {
        draft.loaded = true;
        draft.items = action.payload;
        return;
      }
      case "ADD_TODO": {
        draft.items[action.payload.id] = action.payload;
        return;
      }
      default:
        return draft;
    }
  });

const checks = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case "LOAD_CHECKS": {
        draft.loaded = true;
        draft.items = action.payload;

        return draft;
      }

      case "ADD_TODO": {
        const { id } = action.payload;

        draft.items[id] = {};
        return draft;
      }

      case "TOGGLE_CHECK": {
        const { id } = action.payload;
        const today = format(startOfToday(), "X");

        if (!draft.items[id]) {
          draft.items[id] = {};
        }

        if (draft.items[id][today]) {
          delete draft.items[id][today];
        } else {
          draft.items[id][today] = 1;
        }

        return draft;
      }
      default:
        return draft;
    }
  });

const finalReducer = combineReducers({ checks, todos, days: a => a });

const App = () => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = finalReducer(state, action);

    console.log(state, newState);

    return newState;
  }, initialState);

  return (
    <storeContext.Provider value={[state, dispatch]}>
      <Layout>
        <Todos />
      </Layout>
    </storeContext.Provider>
  );
};

const Todos = () => {
  const [state, dispatch] = useContext(storeContext);

  useEffect(() => {
    const id = setTimeout(() => {
      const todos = JSON.parse(window.localStorage.getItem("chacks-todos"));

      dispatch({
        type: "LOAD_TODOS",
        payload: todos
      });

      const checks = Object.keys(todos).reduce(
        (acc, todoId) => ({
          ...acc,
          [todoId]: JSON.parse(window.localStorage.getItem(`checks-for-todo-${todoId}`))
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

const Layout = styled.div`
  margin: auto;
  max-width: 960px;
`;

const Todo = ({ onClick, todo, checks, days }) => {
  useEffect(
    () => {
      if (checks != null) {
        window.localStorage.setItem(
          `checks-for-todo-${todo.id}`,
          JSON.stringify(checks)
        );
      }
    },
    [checks]
  );

  return (
    <Weak onClick={onClick}>
      <Task>{todo.name}</Task>

      {Object.entries(days).map(([key, day]) => (
        <Day key={key} day={day.formatted} checked={checks[key]} />
      ))}
    </Weak>
  );
};
export default () => (
  <>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Fira+Sans:500&amp;subset=cyrillic"
        rel="stylesheet"
      />
    </Helmet>

    <App />
  </>
);
