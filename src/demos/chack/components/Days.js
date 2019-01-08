import React from "react";
import { Day } from "./Day";

export const Days = React.memo(
  ({ onClick, todo, index, days, checks }) =>
    days.map(info => (
      <Day
        onClick={onClick}
        key={`${info.key}+++${todo.id}`}
        day={info.value}
        row={index + 2}
        checked={checks[info.unix]}
      />
    )),
  (prevProps, nextProps) => prevProps.checks === nextProps.checks
);
