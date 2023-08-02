import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  display: flex;
  height: 15vh;
  position: fixed;
  width: 100%;
  // width: clamp(200px, 100%, 740px);
  background-color: #ffffff;
  font-size: 25px;
  align-items: center;
  @media (min-width: 740px) {
    width: 740px;
  }
`;
const TextWrapper = styled("span")`
  font-size: 20x;
`;
const TitleWrapper = styled(TextWrapper)`
  padding-left: 12.5%;
`;

const ButtonWrapperPlus = styled("button")`
  border: unset;
  background-color: #ffff;
  color: #ff3131;
  font-size: 40px;
  margin-left: 60%;
`;

const Header = ({ plusHandler }) => {
  return (
    <DivWrapper>
      <TitleWrapper>Interview Calendar</TitleWrapper>
      <ButtonWrapperPlus onClick={plusHandler}>+</ButtonWrapperPlus>
    </DivWrapper>
  );
};

export default Header;
