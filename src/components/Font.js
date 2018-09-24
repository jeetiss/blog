import system from "../system";
import { css } from 'styled-components'
import { fontFamily, fontSize, lineHeight, space } from "styled-system";
import theme from "../theme";


const Font = system(
  {
    tag: 'span',
    fontFamily: 'Rubik',
    fontSize: 16,
    lineHeight: '24px'
  },
  fontFamily,
  fontSize,
  lineHeight
);

const Text = system(
  {
    tag: 'p',
    fontFamily: 'Rubik',
    fontSize: 16,
    lineHeight: '24px',
    my: 16,
  },
  fontFamily,
  fontSize,
  lineHeight,
  space,
  props => css`
    color: ${theme('text')(props)};
    transition: color ease 0.3s;
  `,
);

export {Text, Font}
export default Font;
