import system from "../system";
import { fontFamily, fontSize, lineHeight, space } from "styled-system";


const Font = system(
  {
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
    my: '8px',
  },
  fontFamily,
  fontSize,
  lineHeight,
  space
);

export {Text, Font}
export default Font;
