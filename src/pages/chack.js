import React, { createContext, useReducer, useContext, useEffect } from "react";
import Helmet from "react-helmet";
import { eachDay, startOfToday, subDays, addDays, format } from "date-fns";
import styled from "styled-components";
import { Day, Weak, Task } from "components/Entites";

const merge = key => (acc, { [key]: uniqProp, ...obj }) => ({
  ...acc,
  [uniqProp]: obj
});

const initialState = {
  days: eachDay(subDays(startOfToday(), 3), addDays(startOfToday(), 3))
    .map(day => ({ raw: format(day, "X"), formatted: format(day, "DD") }))
    .reduce(merge("raw"), {})
};

const StoreContext = createContext({});

function reducer(state, action) {
  switch (action.type) {
    case "toggle_item": {
      const item = { ...state.item };
      const today = format(startOfToday(), "X");

      if (item[today]) {
        delete item[today];
      } else {
        item[today] = { checked: true };
      }

      return { ...state, item };
    }

    case "loaded": {
      return { ...state, item: action.payload };
    }

    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch({
        type: "loaded",
        payload:
          JSON.parse(window.localStorage.getItem("chack_item-name")) || {}
      });
    }, 500);

    return () => clearTimeout(id);
  }, []);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      <Layout>
        <Table>{state.item ? <Item /> : <div>loading...</div>}</Table>
      </Layout>
    </StoreContext.Provider>
  );
};

const Table = props => <div {...props} />;

const Layout = styled.div`
  margin: auto;
  max-width: 640px;
`;

const Item = () => {
  const [state, dispatch] = useContext(StoreContext);

  useEffect(
    () => {
      window.localStorage.setItem(
        "chack_item-name",
        JSON.stringify(state.item)
      );
    },
    [state.item]
  );

  return (
    <Weak onClick={() => dispatch({ type: "toggle_item" })}>
      <Task>Пописать на реакте</Task>

      {Object.entries(state.days).map(([key, day]) => (
        <Day key={key} day={day.formatted} checked={state.item[key]} />
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
