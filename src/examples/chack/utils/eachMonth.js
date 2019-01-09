import { parse } from "date-fns";

export default function eachMonth(start, end) {
  if (arguments.length < 1) {
    throw new TypeError(
      "1 argument required, but only " + arguments.length + " present"
    );
  }

  var startDate = parse(start);
  var endDate = parse(end);

  var endTime = endDate.getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }

  var dates = [];

  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);

  while (currentDate.getTime() <= endTime) {
    dates.push(parse(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dates;
}
