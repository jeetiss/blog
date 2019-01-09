import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import Today from "../chack/components/Today";
import Scroller from "../chack/components/Scroller";
import { Days } from "../chack/components/Days";
import { Months } from "../chack/components/Months";
import { Calendar } from "../chack/components/Calendar";
import { initialState } from "../chack/redux";

import Layout from "../../components/Layout";

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

export const frontmatter = {
  title: 'Position sticky && grid layout',
  description: 'Демка календаря с месяцем на плавающих блоках',
  slug: 'calendar',
  video: 'https://ucarecdn.com/e9c96dc9-4f84-4a1d-91e6-0ad535d48245/',
}

export default Demo;
