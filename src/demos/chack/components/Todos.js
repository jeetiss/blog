import React, { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { Day } from "./Day";
import Today from "./Today";
import { storeContext } from "../";

const Todos = () => {
  const [state, dispatch] = useContext(storeContext);
  const scrollerRef = useRef();
  const { days, months } = state;

  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scroll(88 * 66, 0);
  }, []);

  return state.todos.loaded && state.checks.loaded ? (
    <Block>
      <Scroller ref={scrollerRef}>
        {newFunction(months, state, dispatch, days, scrollerRef)}
      </Scroller>
    </Block>
  ) : (
    <div>loading...</div>
  );
};


export default Todos;

