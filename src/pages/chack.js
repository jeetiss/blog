import React, {
  createContext,
  useReducer} from "react";
import Helmet from "react-helmet";
import { eachDay, startOfToday, subDays, addDays, format } from "date-fns";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";
import produce from "immer";
import combineReducers from "../utils/combineReducers";
import TodoForm from "../components/TodoForm";
import Todos from "../components/Todos";

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

export const storeContext = createContext({});

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
        <TodoForm />
      </Layout>
    </storeContext.Provider>
  );
};

const Layout = styled.div`
  margin: auto;
  max-width: 960px;

  padding-top: 160px;
`;

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
