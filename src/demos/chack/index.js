import React, { createContext, useReducer, useRef } from "react";
import styled from "styled-components";
import combineReducers from "./utils/combineReducers";
import TodoForm from "./components/TodoForm";
import Sync from "./components/SyncWithLocalStorage";
import TodoNames from "./components/TodoNames";
import Scroller from "./components/Scroller";
import Checks from "./components/Checks";
import { Row, Column } from "./components/Blocks";
import { initialState, todos, checks } from "./redux";

export const storeContext = createContext({});

const finalReducer = combineReducers({
  checks,
  todos,
  days: a => a,
  months: a => a
});

const App = () => {
  const scrollerRef = useRef();
  const [state, dispatch] = useReducer(finalReducer, initialState);

  return (
    <storeContext.Provider value={[state, dispatch]}>
      <Layout>
        <Sync />

        {state.todos.loaded ? (
          <Row>
            <Column>
              <TodoNames />

              {/* FormNameInput */}
            </Column>

            {state.checks.loaded ? (
              <Scroller ref={scrollerRef}>
                <Checks scroll={() => scrollerRef.current.scroll(88 * 66, 0)} />

                {/* FormTypeInput */}
              </Scroller>
            ) : (
              <div> Loading... </div>
            )}
          </Row>
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
