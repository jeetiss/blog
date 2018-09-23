import styled from "styled-components";
import theme from "../theme";

const List = styled.ul`
  margin: 16px 0;
  padding-left: 16px;
`;

const Item = styled.li`
  font-family: Rubik;
  font-size: 16px;
  line-height: 24px;

  color: ${theme("text")};
  transition: color 0.3s ease;
`;

export { List, Item };
