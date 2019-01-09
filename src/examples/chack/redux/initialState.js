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
import eachMonth from "../utils/eachMonth";

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

export default initialState;
