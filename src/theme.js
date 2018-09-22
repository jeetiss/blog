const get = (obj, ...paths) =>
  paths
    .join(".")
    .split(".")
    .reduce((a, b) => (a && a[b] ? a[b] : null), obj);

const theme = (paths, fallback) => props =>
  get(props.theme, paths) || fallback;

export default theme;
