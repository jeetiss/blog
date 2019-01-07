import React, { createContext, useReducer } from "react";
import styled from "styled-components";
import combineReducers from "./utils/combineReducers";
import TodoForm from "./components/TodoForm";
import Sync from "./components/SyncWithLocalStorage";
import TodoNames from "./components/TodoNames";
import Scroller from "./components/Scroller";
import Checks from "./components/Checks";
import FirstBlock from "./components/FirstBlock";
import { diff } from "deep-diff";
import { initialState, todos, checks } from "./redux";

export const storeContext = createContext({});

const finalReducer = combineReducers({
  checks,
  todos,
  days: a => a,
  months: a => a
});

const App = () => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = finalReducer(state, action);

    const differ = diff(state, newState);

    console.log(differ);

    return newState;
  }, initialState);

  return (
    <storeContext.Provider value={[state, dispatch]}>
      <Layout>
        <Sync />

        {state.todos.loaded ? (
          <FirstBlock>
            <div>
              {/* <Todos /> */}
              <TodoNames />

              {/* FormNameInput */}
            </div>

            {state.checks.loaded ? (
              <Scroller>
                <Checks />
              </Scroller>
            ) : (
              <div> Loading... </div>
            )}

            {/* FormTypeInput */}
          </FirstBlock>
        ) : (
          <div> Loading... </div>
        )}

        <TodoForm />
        {/* FormControls */}
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
