import React, { createContext, useReducer } from "react";
import {
  eachDay,
  startOfToday,
  subDays,
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  differenceInDays
} from "date-fns";
import styled from "styled-components";
import produce from "immer";
import combineReducers from "./utils/combineReducers";
import TodoForm from "./components/TodoForm";
import Sync from "./components/SyncWithLocalStorage";
import Todos from "./components/Todos";
import eachMonth from "./utils/eachMonth";
import { diff } from 'deep-diff'

const formatter = str => date => ({
  value: format(date, str),
  unix: format(date, "X"),
  raw: date,
  key: `${str}-${format(date, "X")}`
});

const isFirst = (index, arr) => arr.length > 0 && index === 0;
const isLast = (index, arr) => arr.length - 1 === index;

const generateDataForDates = (start, end) => {
  const months = eachMonth(start, end)
    .map(formatter("MMMM"))
    .map((info, index, arr) => ({
      ...info,
      count: differenceInDays(
        addDays(isLast(index, arr) ? end : endOfMonth(info.raw), 1),
        isFirst(index, arr) ? start : startOfMonth(info.raw)
      )
    }));

  const days = eachDay(
    subDays(startOfToday(), 70),
    addDays(startOfToday(), 30)
  ).map(formatter("DD"));

  return { days, months };
};

const initialState = {
  ...generateDataForDates(
    subDays(startOfToday(), 70),
    addDays(startOfToday(), 30)
  ),
  todos: { loaded: false },
  checks: { loaded: false, items: {} }
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
      case "LOAD_ALL_CHECKS": {
        draft.loaded = true;
        draft.items = action.payload;

        return draft;
      }

      case "LOAD_CHECKS": {
        draft.items = draft.items || {};
        draft.items[action.payload.todo.id] = action.payload.checks;

        draft.loaded = draft.loaded || draft.countItems === Object.keys(draft.items).length

        return draft;
      }

      case "LOAD_TODOS": {
        draft.countItems = Object.keys(action.payload).length

        return draft
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

const finalReducer = combineReducers({
  checks,
  todos,
  days: a => a,
  months: a => a
});

const App = () => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = finalReducer(state, action);

    const differ = diff(state, newState)

    console.log(differ);

    return newState;
  }, initialState);

  return (
    <storeContext.Provider value={[state, dispatch]}>
      <Layout>
        <Sync />
        <Todos />
        <TodoForm />
      </Layout>
    </storeContext.Provider>
  );
};

const Layout = styled.div`
  margin: auto;
  max-width: 960px;

  padding: 160px 24px 0;
`;

export default App;
