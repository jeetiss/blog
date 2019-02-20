import styled, { css } from "styled-components";

const svg = encodeURIComponent(`
<svg
  width="14px"
  height="12px"
  viewBox="0 0 14 12"
  xmlns="http://www.w3.org/2000/svg"
  style="fill: none; stroke-linecap: round; stroke-linejoin: round;"
>
  <polyline points="1 7.6 5 11 13 1" style="stroke-width: 2; stroke: #18CDA6;"></polyline>
</svg>
`);

const Checkbox = styled.input(
  {},
  props => css`
    position: relative;

    appearance: none;
    outline: none;
    cursor: pointer;

    width: 70px;
    height: 70px;

    background-color: transparent;
    border: 5px solid rgba(50, 49, 104, 0.15);
    border-radius: 15px;

    transition: border-color 0.3s ease;
  `,
  props => css`
    &:after {
      content: "";
      position: absolute;
      top: 20px;
      left: 20px;
      width: 20px;
      height: 20px;
      border-radius: 15px;
      box-shadow: 0 -90px 0 #18cda6, 60px -60px 0 #18cda6, 90px 0 0 #18cda6,
        60px 60px 0 #18cda6, 0 90px 0 #18cda6, -60px 60px 0 #18cda6,
        -90px 0 0 #18cda6, -60px -60px 0 #18cda6, 0 0 0px 50px #18cda6,
        inset 0 0 0px 50px #18cda6;

      transform: scale(0);
      transition: transform 0.3s ease,
        opacity 0.3s cubic-bezier(0.95, 0.05, 0.795, 0.035);
    }
  `,
  props => css`
    &:before {
      content: '';
      
      display: block;
      width: 70px;
      height: 70px;

      background-image: url("data:image/svg+xml;charset=utf-8,${svg}");
      background-size: 70px;
      background-position: center;
      background-repeat: no-repeat;

      opacity: 0;
      transform: scale(0);

      transition: transform 0.3s ease, opacity 0.3s ease;
    }
  `,
  props =>
    props.error
      ? []
      : css`
          &:hover {
            border: 5px solid rgba(50, 49, 104, 0.4);
          }
        `,
  props => css`
    &:checked {
      border-color: transparent;
    }

    &:checked:after {
      transform: scale(1);
      opacity: 0;
      transition: transform 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955),
        opacity 0.4s ease;
    }

    &:checked:before {
      transform: scale(1);
      opacity: 1;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
        opacity 0.3s ease;
      transition-delay: 0.1s;
    }
  `,
  props =>
    props.error
      ? css`
          border-color: #e83232;
        `
      : []
);

export default Checkbox;
