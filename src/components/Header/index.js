import React from "react";
import styled from "styled-components";

const DivWrapper = styled("div")`
  display: flex;
  width:100vw;
  background-color: #ffff;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 10vh;
  @media (min-width: 740px) {
    width: 740px; 
  }
  }
`;
const TextWrapper = styled("span")`
  font-size: 3vh;
  @media (min-width: 740px) {
    font-size: 6vh;
  }
`;
const TitleWrapper = styled(TextWrapper)`
  padding-left: 8%;
`;

const ButtonWrapperPlus = styled("button")`
  border: unset;
  background-color: #ffff;
  color: #ff3131;
  font-size: 6vh;
  @media (min-width: 740px) {
    font-size: 10vh;
  }
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
