const defaultTheme = {
  animations: {
    duration: {
      normal: '300ms',
      fast: '160ms'
    }
  }
};

const whiteTheme = {
  ...defaultTheme,
  colors: {
    text: "#121212",
    low: "#919191",
    background: "#FEFEFE",
    interactive: "#3760F2",
    hover: "#204EEF",
    active: "#728CE8",
    focus: 'rgba(55, 96, 242, 0.5)',
  }
};

const blackTheme = {
  ...defaultTheme,
  colors: {
    text: "#FEFEFE",
    low: "#919191",
    background: "#121212",
    interactive: "#3760F2",
    hover: "#204EEF",
    active: "#728CE8",
    focus: 'rgba(55, 96, 242, 0.5)',
  }
};

const themes = [whiteTheme, blackTheme];

const get = (obj, ...paths) =>
  paths
    .join(".")
    .split(".")
    .reduce((a, b) => (a && a[b] ? a[b] : null), obj);

const theme = (paths, fallback) => props => get(props.theme, paths) || fallback;

export { themes };
export default theme;
