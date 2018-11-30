const plural = (number, one, two, five) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

const pluralize = (...args) => plural(...args).replace(/:n/gi, args[0]);

const months = {
  январь: "января",
  февраль: "февраля",
  март: "марта",
  апрель: "апреля",
  май: "мая",
  июнь: "июня",
  июль: "июля",
  август: "августа",
  сентябрь: "сентября",
  октябрь: "октября",
  ноябрь: "ноября",
  декабрь: "декабря"
};

const pick = (obj, value) => obj[value] || value;

const pluralizeDate = date => {
  const [day, month, year] = date.split(" ");
  return `${day} ${pick(months, month)} ${year}`;
};

module.exports = { pluralize, pluralizeDate };
