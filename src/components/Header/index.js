import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  background-color: #ffffff;
  height: 10vh;
  font-size: 25px;
  position: fixed;
  width: 100%;
`;
const ButtonWrapperPlus = styled("button")`
  border: unset;
  background-color: #f6f6f6;
  color: #ff3131;
  height: 20px;
  grid-area: 3 / 2 / 4 / 3;
  font-size: x-large;
`;

const Header = ({ plusHandler }) => {
  return (
    <>
      <ButtonWrapperPlus onClick={plusHandler}>+</ButtonWrapperPlus>
      <DivWrapper>Interview Calendar</DivWrapper>
    </>
  );
};

export default Header;
