import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Layout from "components/Layout";

import Today from "../chack/components/Today";
import Scroller from "../chack/components/Scroller";
import { Days } from "../chack/components/Days";
import { Months } from "../chack/components/Months";
import { Calendar } from "../chack/components/Calendar";

import { initialState } from "../chack/redux";

const Checks = ({ scroll, months, days }) => {
  useEffect(scroll, []);

  return (
    <Calendar>
      <Months months={months} />

      <Days days={days} todo={{ id: "krivieProps" }} index={0} checks={{}} />

      <Today row={3} column={71} onClick={scroll} />
    </Calendar>
  );
};

const Demo = () => {
  const scrollerRef = useRef();

  return (
    <Layout width={960} pt={160}>
      <Scroller ref={scrollerRef}>
        <Checks
          days={initialState.days}
          months={initialState.months}
          scroll={() => scrollerRef.current.scroll(88 * 65, 0)}
        />
      </Scroller>
    </Layout>
  );
};

export default Demo;
