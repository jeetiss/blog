import styled from "styled-components";
import {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  space
} from "styled-system";
import theme from "../theme";

const Badge = styled.span`
  font-family: Fira Sans;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  font-size: 12px;
  letter-spacing: 0.04em;

  padding: 4px;
  border-radius: 5px;
  vertical-align: top;

  color: #fefefe;
  background-color: ${theme('colors.low')};
`

export default Badge